"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, MousePointerClick, X, ChevronDown, ListTree } from "lucide-react";

import { ZONE_FICHES, ZONE_BY_ID, classifyZone, type ZoneCategoryId } from "@/lib/zone-data";
import { formatHa } from "@/lib/utils";
import type { ZoneClick, ZonedFeature } from "@/components/map/agri-map";
import { ZoneFiche } from "@/components/zone/zone-fiche";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const AgriMap = dynamic(
  () => import("@/components/map/agri-map").then((m) => m.AgriMap),
  { ssr: false, loading: () => <MapLoading /> }
);

function MapLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-ec-paper text-sm text-muted-foreground">
      Chargement de la carte…
    </div>
  );
}

type Filter = ZoneCategoryId | "all";

export default function CartePage() {
  const [zones, setZones] = useState<ZonedFeature[]>([]);
  const [selected, setSelected] = useState<ZoneClick | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data/zones.geojson")
      .then((r) => r.json())
      .then((gj: GeoJSON.FeatureCollection) => {
        const feats: ZonedFeature[] = gj.features
          .map((f) => {
            const p = f.properties as Record<string, unknown>;
            return {
              fid: Number(p.fid),
              categorie: String(p.categorie ?? ""),
              causePro: String(p.cause_pro ?? ""),
              recomm: String(p.recomm ?? ""),
              legende: String(p.legende ?? ""),
              surfaceHa: Number(p.superf_ha ?? 0),
              areaM2: Number(p.area_m2 ?? 0),
              depM2: p.dep_m2 == null ? null : Number(p.dep_m2),
              categoryId: classifyZone(
                String(p.categorie ?? ""),
                String(p.cause_pro ?? "")
              ),
              geometry: f.geometry as GeoJSON.Geometry,
            };
          })
          .filter((z) => z.geometry != null);
        setZones(feats);
      })
      .catch((e) => console.error("Chargement des zones", e));
  }, []);

  const visibleZones = useMemo(
    () => (filter === "all" ? zones : zones.filter((z) => z.categoryId === filter)),
    [zones, filter]
  );

  const selectZone = (zone: ZoneClick | null) => {
    setSelected(zone);
    if (zone && window.innerWidth < 1024) {
      // Sur mobile, faire défiler jusqu'au panneau de conseil
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const selectCategory = (catId: ZoneCategoryId) => {
    const first = zones.find((z) => z.categoryId === catId);
    if (first) {
      setFilter(catId);
      selectZone(first);
    }
  };

  const fiche = selected ? ZONE_FICHES.find((f) => f.id === selected.categoryId) : null;

  return (
    <div className="lg:grid lg:h-[calc(100vh-3.5rem)] lg:grid-cols-[1fr_440px] lg:overflow-hidden">
      {/* Carte */}
      <section className="relative h-[52vh] lg:h-full">
        <AgriMap
          zones={visibleZones}
          selectedFid={selected?.fid ?? null}
          onSelect={selectZone}
        />
        <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              setFilter("all");
              setSelected(null);
            }}
            className={cn(
              "pointer-events-auto rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur",
              filter === "all"
                ? "border-ec-orange bg-ec-orange text-white"
                : "border-stone-300 bg-white/95 text-stone-700"
            )}
          >
            Toutes ({zones.length})
          </button>
          {ZONE_FICHES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => selectCategory(f.id)}
              className={cn(
                "pointer-events-auto flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur",
                filter === f.id
                  ? "border-transparent text-white"
                  : "border-stone-300 bg-white/95 text-stone-700"
              )}
              style={filter === f.id ? { backgroundColor: f.couleur } : undefined}
            >
              <span
                className="h-2.5 w-2.5 rounded-full border border-black/15"
                style={{ backgroundColor: f.couleur }}
              />
              {f.nomCourt}
            </button>
          ))}
        </div>
      </section>

      {/* Panneau conseils */}
      <section
        ref={panelRef}
        className="scroll-mt-14 border-t bg-ec-paper p-4 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-5"
      >
        {selected && fiche ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
              <div className="flex min-w-0 items-center gap-2">
                <MapPin className="size-4 shrink-0 text-ec-orange" aria-hidden />
                <span className="truncate">
                  Zone n°{selected.fid} · {formatHa(selected.surfaceHa)} ·{" "}
                  {selected.legende}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Fermer le conseil de cette zone"
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-500 transition-colors hover:border-ec-orange hover:text-ec-orange"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <ZoneFiche fiche={fiche} zone={selected} />
          </div>
        ) : (
          <div className="mb-4 rounded-2xl border border-dashed border-stone-300 bg-white/60 p-5 text-center">
            <MousePointerClick
              className="mx-auto size-8 text-ec-orange"
              aria-hidden
            />
            <p className="mt-2 font-display text-lg font-bold">
              Touchez une zone colorée sur la carte
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Ou choisissez une situation ci-dessous : le conseil s'affiche
              aussitôt, avec le message vocal.
            </p>
          </div>
        )}

        <div className="mt-5 border-t border-stone-200 pt-4">
          <details className="group mb-4 rounded-2xl border border-stone-200 bg-white">
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-foreground/90 hover:text-ec-orange-dark [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <ListTree className="size-4 text-ec-orange" aria-hidden />
                Toutes les {zones.length} zones de la parcelle
              </span>
              <ChevronDown
                className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <ul className="grid gap-1 border-t border-stone-100 p-2 sm:grid-cols-2">
              {zones
                .slice()
                .sort((a, b) => b.areaM2 - a.areaM2)
                .map((z) => {
                  const f = ZONE_BY_ID[z.categoryId];
                  return (
                    <li key={z.fid}>
                      <button
                        type="button"
                        onClick={() =>
                          selectZone(
                            selected?.fid === z.fid ? null : z
                          )
                        }
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors",
                          selected?.fid === z.fid
                            ? "bg-ec-orange-soft text-ec-orange-dark"
                            : "hover:bg-ec-orange-soft/60 hover:text-ec-orange-dark"
                        )}
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-sm border border-black/10"
                          style={{ backgroundColor: f?.couleur }}
                        />
                        <span className="font-semibold">Zone n°{z.fid}</span>
                        <span className="ml-auto text-muted-foreground">
                          {formatHa(z.surfaceHa)}
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </details>

          <Accordion type="multiple">
            {ZONE_FICHES.map((f) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger className="gap-3">
                  <span className="flex items-center gap-2.5">
                    <span
                      className="h-3.5 w-3.5 rounded-sm border border-black/10"
                      style={{ backgroundColor: f.couleur }}
                    />
                    {f.nomCourt}
                    <span className="text-xs font-medium text-muted-foreground">
                      {f.nbZones} zone{f.nbZones > 1 ? "s" : ""} · {f.pctParcelle.toLocaleString("fr-FR")} % de la parcelle
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ZoneFiche fiche={f} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}