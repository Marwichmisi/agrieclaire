import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cartes sources et méthode",
  description:
    "Les cartes sources produites sous QGIS (orthomosaïque, VARI, plan topo/drainage, zonage) et la méthodologie complète du projet AgriÉclair.",
};

const MAPS = [
  {
    src: "/maps/orthomosaique.webp",
    alt: "Orthomosaïque de la parcelle vue du ciel",
    title: "1 · Orthomosaïque",
    desc: "La photographie aérienne complète de la parcelle (59 photos assemblées). Résolution 5 cm/pixel — on distingue les rangs de culture.",
  },
  {
    src: "/maps/carte-vigueur-vari.jpg",
    alt: "Carte de vigueur végétale VARI",
    title: "2 · Carte de vigueur (VARI)",
    desc: "La « photo de santé » de la végétation : le calcul de l'indice VARI sur les bandes visibles classe la parcelle en 4 classes de vigueur (stress sévère → vigueur forte).",
  },
  {
    src: "/maps/plan-topo-drainage.jpg",
    alt: "Plan topographique et de drainage",
    title: "3 · Plan topographique / drainage",
    desc: "Relief et écoulements : pentes, courbes de niveau, zones basses (dépressions) où l'eau s'accumule après la pluie.",
  },
  {
    src: "/maps/carte-zonage.jpg",
    alt: "Carte de zonage et recommandations",
    title: "4 · Carte de zonage",
    desc: "Le croisement vigueur × relief : 16 zones de gestion homogènes, chacune avec sa cause probable et sa recommandation d'intervention.",
  },
];

export default function JuryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wider text-ec-orange">
          Pour le jury · Volet technique
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Des cartes QGIS aux conseils de terrain
        </h1>
        <p className="mt-3 leading-relaxed text-foreground/80">
          AgriÉclair ne repose pas sur des illustrations : chaque zone
          cliquable de la carte interactive est un polygone réel issu de la
          chaîne de traitement QGIS ci-dessous, exporté en GeoJSON avec ses
          coordonnées géographiques et sa catégorie.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">Les cartes sources</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {MAPS.map((m) => (
            <figure
              key={m.title}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              <img
                src={m.src}
                alt={m.alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="p-4">
                <p className="font-display font-bold">{m.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                  {m.desc}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold">
          Méthodologie du zonage (QGIS)
        </h2>
        <ol className="mt-4 space-y-3">
          {[
            [
              "Vectorisation",
              "Le raster VARI classifié (4 classes) est vectorisé (polygonize) : chaque classe devient une catégorie de zone de gestion.",
            ],
            [
              "Nettoyage et simplification",
              "Tamisage des polygones < 50 m² (fusion au voisin majoritaire), dissolution des polygones adjacents de même classe, simplification Douglas-Peucker à 0,15 m, réparation des géométries.",
            ],
            [
              "Croisement avec le relief",
              "Chaque zone de stress est intersectée avec les dépressions issues du pseudo-MNT (analyse topo). Si la surface interceptée ≥ 1 m², la cause probable passe de « stress hydrique » à « excès d'eau probable ».",
            ],
            [
              "Résultat",
              "16 zones de gestion, 4 catégories : excès d'eau probable (0,83 ha), stress hydrique (0,02 ha), vigueur moyenne (0,78 ha), vigueur forte (0,46 ha).",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ec-orange font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-bold">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                  {d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="font-display text-lg font-bold">
            Précision et limites (transparence)
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
            <li>
              <b>Positionnement :</b> GPS du drone seul, sans point de contrôle
              au sol — précision ≈ 50 cm (CE90 0,49 m). Suffisant pour le
              zonage parcellaire, pas pour du guidage sub-métrique.
            </li>
            <li>
              <b>Relief :</b> pseudo-MNT dérivé du MNS par ouverture
              morphologique, précision altimétrique ± 3-5 m. Le croisement
              stress × dépressions reste indicatif.
            </li>
            <li>
              <b>Date de validité :</b> état au 13/08/2026 — une carte est une
              photographie à un instant T.
            </li>
            <li>
              <b>Règle d'or :</b> la carte guide, le terrain décide. Les zones
              marquées doivent être validées visuellement avant toute
              prescription.
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h2 className="font-display text-lg font-bold">Livrables du vol</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/80">
            <li>Vol drone DJI M3E — 13/08/2026, 59 photos, 100 % d'images alignées (WebODM), GSD moyen 1,8 cm → sortie 5 cm.</li>
            <li>Orthomosaïque, carte de vigueur VARI, plan topo/drainage (DXF + PDF), carte de zonage avec recommandations.</li>
            <li>Fichier de zones (SHP / GeoPackage, EPSG:32631) compatible consoles ISOBUS pour l'application à dose variable (VRA).</li>
            <li>Projets QGIS complets (styles + mise en page) pour reproductibilité.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}