"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, ImageOverlay, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { ZONE_FICHES, type ZoneCategoryId } from "@/lib/zone-data";

export interface ZoneClick {
  fid: number;
  categorie: string;
  causePro: string;
  recomm: string;
  legende: string;
  surfaceHa: number;
  areaM2: number;
  depM2: number | null;
  categoryId: ZoneCategoryId;
}

interface ZonedFeature extends ZoneClick {
  geometry: GeoJSON.Geometry;
}

export type { ZonedFeature };

interface AgriMapProps {
  zones: ZonedFeature[];
  selectedFid: number | null;
  onSelect: (zone: ZoneClick | null) => void;
}

/** Bornes réelles de l'orthomosaïque exportée (EPSG:4326) */
const ORTHO_BOUNDS: [[number, number], [number, number]] = [
  [6.3950793, 2.3289512],
  [6.3976455, 2.3310284],
];

type PathWithFeature = L.Path & { feature?: GeoJSON.Feature };

const PARCEL_CENTER: [number, number] = [6.3964, 2.3296];

function getStyle(catId: ZoneCategoryId, selected: boolean): L.PathOptions {
  const fiche = ZONE_FICHES.find((f) => f.id === catId);
  return {
    color: fiche?.couleur ?? "#666",
    weight: selected ? 4 : 2,
    fillColor: fiche?.couleur ?? "#666",
    fillOpacity: selected ? 0.72 : 0.45,
    opacity: 0.9,
    className: "zone-polygon",
  };
}

/** Vue initiale : toute la parcelle, sans animation (cadrage net dès l'arrivée) */
function FitOnLoad({ zones }: { zones: ZonedFeature[] }) {
  const map = useMap();
  const done = useRef(false);
  useEffect(() => {
    if (done.current || zones.length === 0) return;
    done.current = true;
    map.fitBounds(L.latLngBounds(ORTHO_BOUNDS), {
      padding: [4, 4],
      animate: false,
    });
  }, [map, zones]);
  return null;
}

/** Zoom doux sur la zone sélectionnée, plafonné pour rester net */
function FocusZone({
  layerByFid,
  selectedFid,
}: {
  layerByFid: React.RefObject<Map<number, L.Path> | null>;
  selectedFid: number | null;
}) {
  const map = useMap();
  const prev = useRef<number | null>(null);
  useEffect(() => {
    if (selectedFid == null || selectedFid === prev.current) return;
    prev.current = selectedFid;
    const layer = layerByFid.current?.get(selectedFid);
    if (layer) {
      map.fitBounds((layer as L.Polygon).getBounds(), {
        padding: [36, 36],
        maxZoom: 19,
        animate: true,
        duration: 0.45,
        easeLinearity: 0.25,
      });
    }
  }, [selectedFid, map, layerByFid]);
  return null;
}

/** Point-in-polygon (ray casting) sur une géométrie GeoJSON Polygon/MultiPolygon */
function pointInGeoJson(
  geometry: GeoJSON.Geometry,
  lat: number,
  lng: number
): boolean {
  const rings: number[][][][] =
    geometry.type === "Polygon"
      ? [geometry.coordinates as number[][][]]
      : geometry.type === "MultiPolygon"
        ? (geometry.coordinates as number[][][][])
        : [];
  for (const polygon of rings) {
    let inside = false;
    for (const ring of polygon) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i];
        const [xj, yj] = ring[j];
        const intersects =
          yi > lat !== yj > lat &&
          lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
        if (intersects) inside = !inside;
      }
    }
    if (inside) return true;
  }
  return false;
}

/** Clic sur la carte : sélection par hit-test, désélection si zone vide */
function MapClickDeselect({
  onMapClick,
}: {
  onMapClick: (latlng: L.LatLng) => void;
}) {
  const map = useMap();
  const handlerRef = useRef(onMapClick);
  useEffect(() => {
    handlerRef.current = onMapClick;
  }, [onMapClick]);
  useEffect(() => {
    const onClick = (e: L.LeafletMouseEvent) => handlerRef.current(e.latlng);
    map.on("click", onClick);
    return () => {
      map.off("click", onClick);
    };
  }, [map]);
  return null;
}

export function AgriMap({ zones, selectedFid, onSelect }: AgriMapProps) {
  const [parcel, setParcel] = useState<GeoJSON.Feature | null>(null);
  const layerByFid = useRef<Map<number, L.Path> | null>(null);

  // Refs synchronisées : les handlers Leaflet ne sont attachés qu'une fois,
  // ils lisent toujours la valeur la plus récente (aucune closure obsolète).
  const zonesRef = useRef(zones);
  const selectedFidRef = useRef(selectedFid);
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    zonesRef.current = zones;
  }, [zones]);
  useEffect(() => {
    selectedFidRef.current = selectedFid;
  }, [selectedFid]);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    fetch("/data/parcelle.geojson")
      .then((r) => r.json())
      .then((gj: GeoJSON.FeatureCollection) => setParcel(gj.features[0] ?? null))
      .catch((e) => console.error("Chargement de la parcelle", e));
  }, []);

  const geoJsonData = useMemo<GeoJSON.FeatureCollection>(
    () => ({
      type: "FeatureCollection",
      features: zones.map((z) => ({
        type: "Feature" as const,
        properties: { fid: z.fid, categoryId: z.categoryId },
        geometry: z.geometry,
      })),
    }),
    [zones]
  );

  return (
    <MapContainer
      center={PARCEL_CENTER}
      zoom={17}
      minZoom={15}
      maxZoom={20}
      zoomSnap={0.5}
      zoomDelta={0.5}
      attributionControl={true}
      className="h-full w-full"
      maxBounds={ORTHO_BOUNDS}
    >
      <MapClickDeselect
        onMapClick={(latlng) => {
          // Sélection par hit-test : quel polygone contient le point cliqué ?
          // Indépendant de la livraison d'événements par polygone (fiable
          // sur tous les appareils, tactile inclus).
          const { lat, lng } = latlng;
          const zones = zonesRef.current;
          const hit = zones.find((z) => pointInGeoJson(z.geometry, lat, lng));
          if (hit) {
            if (selectedFidRef.current === hit.fid) {
              onSelectRef.current(null);
              return;
            }
            onSelectRef.current({
              fid: hit.fid,
              categorie: hit.categorie,
              causePro: hit.causePro,
              recomm: hit.recomm,
              legende: hit.legende,
              surfaceHa: hit.surfaceHa,
              areaM2: hit.areaM2,
              depM2: hit.depM2,
              categoryId: hit.categoryId,
            });
          } else if (selectedFidRef.current != null) {
            onSelectRef.current(null);
          }
        }}
      />
      <FitOnLoad zones={zones} />
      <FocusZone layerByFid={layerByFid} selectedFid={selectedFid} />
      <ImageOverlay
        url="/maps/orthomosaique.webp"
        bounds={ORTHO_BOUNDS}
        opacity={1}
        zIndex={1}
        interactive={false}
      />
      {parcel && (
        <GeoJSON
          data={parcel as GeoJSON.Feature}
          style={{
            color: "#22130a",
            weight: 3,
            fill: false,
            dashArray: "6 6",
            opacity: 0.85,
          }}
          interactive={false}
        />
      )}
      <GeoJSON
        data={geoJsonData}
        style={(feature) =>
          getStyle(
            (feature?.properties?.categoryId as ZoneCategoryId) ??
              "vigueur-moyenne",
            (feature?.properties?.fid as number) === selectedFid
          )
        }
        onEachFeature={(feature, layer) => {
          const fid = feature.properties?.fid as number | undefined;
          if (fid == null) return;
          const path = layer as L.Path;
          if (!layerByFid.current) layerByFid.current = new Map();
          layerByFid.current.set(fid, path);
          path.on("add", () => {
            path.getElement()?.setAttribute("data-fid", String(fid));
          });

          // La sélection passe par le hit-test de la carte (MapClickDeselect),
          // robuste sur tous les appareils. Ici : uniquement le survol.
          path.on("mouseover", () => {
            path.setStyle({ weight: 4 });
            path.bringToFront();
          });

          path.on("mouseout", () => {
            const catId = feature.properties?.categoryId as ZoneCategoryId;
            path.setStyle(
              getStyle(
                catId ?? "vigueur-moyenne",
                fid === selectedFidRef.current
              )
            );
          });
        }}
      />
      <Legend />
    </MapContainer>
  );
}

function Legend() {
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-[1000] hidden rounded-xl border bg-white/95 p-3 shadow-md backdrop-blur sm:block">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-stone-500">
        Légende
      </p>
      <ul className="space-y-1.5">
        {ZONE_FICHES.map((f) => (
          <li key={f.id} className="flex items-center gap-2 text-xs">
            <span
              className="h-3 w-3 shrink-0 rounded-sm border border-black/10"
              style={{ backgroundColor: f.couleur }}
            />
            <span className="font-medium text-stone-700">{f.nomCourt}</span>
            <span className="text-stone-400">
              {f.nbZones} zone{f.nbZones > 1 ? "s" : ""}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
