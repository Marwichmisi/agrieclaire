export type ZoneCategoryId =
  | "exces-eau"
  | "stress-hydrique"
  | "vigueur-moyenne"
  | "vigueur-forte";

export interface CultureRecommendation {
  titre: string;
  points: string[];
}

export interface ZoneFiche {
  id: ZoneCategoryId;
  /** Nom court et parlant, affiché sur la carte et dans les listes */
  nomCourt: string;
  /** Nom complet technique tel qu'issu du zonage QGIS */
  nomTechnique: string;
  /** Statut compréhensible sans jargon */
  statut: string;
  /** Explication courte de ce que ça signifie concrètement pour le champ */
  explication: string;
  mais: CultureRecommendation;
  manioc: CultureRecommendation;
  alternative?: {
    culture: string;
    raison: string;
  };
  /** Couleurs utilisées sur la carte interactive */
  couleur: string;
  couleurSoft: string;
  /** Chiffres réels issus de la carte de zonage (zonage/carte_zonage_recommandations_essaie.docx) */
  surfaceHa: number;
  pctParcelle: number;
  nbZones: number;
  /** Fichier audio associé (dans /public/audio) */
  audioFile: string;
  /** Sources réelles consultées (recherches agronomiques) */
  sources: { label: string; url: string }[];
}

export const ZONE_FICHES: ZoneFiche[] = [
  {
    id: "exces-eau",
    nomCourt: "Zone trop humide",
    nomTechnique: "Stress modéré · excès d'eau probable",
    statut: "L'eau s'accumule ici après les pluies",
    explication:
      "Ces endroits sont les points bas de la parcelle : l'eau de pluie s'y rassemble et stagne. Les racines manquent d'oxygène, la croissance ralentit et l'engrais azoté peut partir avec l'eau. C'est la plus grande zone à surveiller : elle couvre 0,83 ha, soit près de 40 % de la parcelle.",
    mais: {
      titre: "Ce que ça change pour le maïs",
      points: [
        "Le maïs jeune est très fragile : tant qu'il a moins de 8 feuilles, son bourgeon reste près de la surface et un sol gorgé d'eau 2 à 4 jours peut le faire mourir.",
        "Plus tard, un excès d'eau au moment de la floraison (apparition des épis) peut faire chuter le rendement. C'est le stade à protéger en priorité.",
        "Creusez des rigoles pour évacuer l'eau vers l'extérieur de la parcelle, et n'apportez pas d'engrais azoté juste avant de fortes pluies : il partirait avec l'eau.",
      ],
    },
    manioc: {
      titre: "Ce que ça change pour le manioc",
      points: [
        "Le manioc est la culture la plus menacée ici : dans un sol gorgé d'eau, ses tubercules pourrissent et le rendement s'effondre.",
        "Évitez de planter le manioc dans ces zones. Si c'est impossible, plantez-le sur des buttes ou des billons surélevés, et prévoyez des fossés de drainage autour.",
      ],
    },
    alternative: {
      culture: "Le riz de bas-fond",
      raison:
        "Si l'eau stagne chaque année malgré le drainage, ces zones peuvent accueillir du riz de bas-fond, une culture faite pour les sols humides et très répandue au Bénin (inondation suivie de drainage = meilleur rendement).",
    },
    couleur: "#0e7490",
    couleurSoft: "#cffafe",
    surfaceHa: 0.83,
    pctParcelle: 39.9,
    nbZones: 4,
    audioFile: "zone-exces-eau.mp3",
    sources: [
      {
        label: "AgriRéseau — Réponse du maïs aux inondations (2025)",
        url: "https://www.agrireseau.net/rap/documents/117971",
      },
      {
        label: "Pioneer — Dommages du maïs par les inondations",
        url: "https://www.pioneer.com/ca-fr/ressources-agronomiques/dommages-causes-au-mais-par-les-inondations-du-printemps.html",
      },
      {
        label: "Effa-Effa — Manioc et inondation : pourriture des racines (2026)",
        url: "https://assets.ippc.int/static/media/uploads/files/pestreport/2026/08/03/Tol%C3%A9rance_du_manioc_%C3%A0_linondation_stagnante_de_courte_dur%C3%A9e.pdf",
      },
      {
        label: "Mahungu et al. (IITA) — Manioc : éviter les sols engorgés, planter sur buttes",
        url: "https://hdl.handle.net/10568/80757",
      },
      {
        label: "Gbeto Dansou et al. — Riz de bas-fond au Bénin (2017)",
        url: "https://www.ajol.info/index.php/jab/article/view/156059",
      },
    ],
  },
  {
    id: "stress-hydrique",
    nomCourt: "Zone qui manque d'eau",
    nomTechnique: "Stress modéré · stress hydrique",
    statut: "Le sol y sèche plus vite qu'ailleurs",
    explication:
      "Ces petites zones sont placées en position haute : l'eau de pluie s'écoule rapidement et le sol s'assèche plus tôt qu'ailleurs. La végétation y est plus faible qu'au reste de la parcelle (2 zones, 0,02 ha au total).",
    mais: {
      titre: "Ce que ça change pour le maïs",
      points: [
        "Le maïs est très sensible au manque d'eau au moment de la floraison : c'est là qu'il fixe son nombre de grains. Un stress à ce stade, même court, se paie directement sur la récolte.",
        "Arrosez ces zones en priorité quand la floraison approche, et paillez le sol (herbe, résidus de récolte) pour garder l'humidité.",
      ],
    },
    manioc: {
      titre: "Ce que ça change pour le manioc",
      points: [
        "Le manioc supporte bien la sécheresse : il ralentit sa croissance, perd des feuilles, mais repart dès le retour des pluies. C'est la culture la moins à risque dans ces zones.",
        "Choisissez des variétés locales réputées tolérantes au sec si vous replantez ici.",
      ],
    },
    alternative: {
      culture: "Sorgho, mil ou niébé",
      raison:
        "Si le manque d'eau revient chaque année, ces céréales et cette légumineuse sont mieux adaptées aux sols qui sèchent vite que le maïs, très demandeur en eau.",
    },
    couleur: "#b45309",
    couleurSoft: "#fef3c7",
    surfaceHa: 0.02,
    pctParcelle: 0.8,
    nbZones: 2,
    audioFile: "zone-stress-hydrique.mp3",
    sources: [
      {
        label: "Chambre d'agriculture de la Vienne — Irrigation du maïs grain (2021)",
        url: "https://vienne.chambres-agriculture.fr/fileadmin/user_upload/250_chambre_dagriculture_de_la_vienne/Documents/Piloter_son_entreprise/Reglementation/Irrigation/20210604_FT5_Mais.pdf",
      },
      {
        label: "CIRAD — Réponse du maïs à l'eau en Afrique de l'Ouest",
        url: "https://agritrop.cirad.fr/428953/1/ID428953.pdf",
      },
      {
        label: "Yao N'Guettia et al. (IRD) — Manioc et efficience hydrique",
        url: "https://horizon.documentation.ird.fr/exl-doc/pleins_textes/pleins_textes_5/b_fdi_20-21/27393.pdf",
      },
    ],
  },
  {
    id: "vigueur-moyenne",
    nomCourt: "Zone normale",
    nomTechnique: "Vigueur moyenne · aucun stress",
    statut: "La culture s'y porte correctement",
    explication:
      "Dans ces zones, la végétation est dans la moyenne de la parcelle : ni signe de manque d'eau, ni excès d'eau. C'est le cas de 9 zones, qui couvrent 0,78 ha (37,3 % de la parcelle).",
    mais: {
      titre: "Ce que ça change pour le maïs",
      points: [
        "Appliquez la dose d'entretien habituelle : ces zones ne demandent pas d'adaptation particulière.",
        "Continuez simplement à surveiller la météo et l'arrivée de la floraison.",
      ],
    },
    manioc: {
      titre: "Ce que ça change pour le manioc",
      points: [
        "Conduite normale, sans changement par rapport à votre habitude : sarclage, entretien courant.",
        "Ces zones conviennent bien au manioc si le sol est drainant.",
      ],
    },
    couleur: "#15803d",
    couleurSoft: "#dcfce7",
    surfaceHa: 0.78,
    pctParcelle: 37.3,
    nbZones: 9,
    audioFile: "zone-vigueur-moyenne.mp3",
    sources: [
      {
        label: "Carte de zonage — recommandations d'intervention (projet Essaie, 2026)",
        url: "#",
      },
    ],
  },
  {
    id: "vigueur-forte",
    nomCourt: "Zone en excellente santé",
    nomTechnique: "Vigueur forte · aucun stress",
    statut: "La culture y pousse très bien",
    explication:
      "La végétation y est nettement plus vigoureuse qu'ailleurs (0,46 ha, soit 22,1 % de la parcelle) : la culture y trouve tout ce qu'il lui faut — eau et nutriments. Une seule grande zone, au nord de la parcelle.",
    mais: {
      titre: "Ce que ça change pour le maïs",
      points: [
        "La culture se débrouille seule : réduisez la dose d'engrais par rapport à votre dose normale, elle n'en manque pas.",
        "C'est le principe de l'application à dose variable : économiser sur ce qui va bien pour investir là où ça va mal.",
      ],
    },
    manioc: {
      titre: "Ce que ça change pour le manioc",
      points: [
        "Excellente zone pour le manioc : belle croissance de la partie aérienne, bonne santé générale.",
        "Pas d'apport supplémentaire nécessaire : gardez la conduite normale.",
      ],
    },
    couleur: "#166534",
    couleurSoft: "#bbf7d0",
    surfaceHa: 0.46,
    pctParcelle: 22.1,
    nbZones: 1,
    audioFile: "zone-vigueur-forte.mp3",
    sources: [
      {
        label: "Carte de zonage — recommandations d'intervention (projet Essaie, 2026)",
        url: "#",
      },
    ],
  },
];

export const ZONE_BY_ID: Record<ZoneCategoryId, ZoneFiche> = Object.fromEntries(
  ZONE_FICHES.map((f) => [f.id, f])
) as Record<ZoneCategoryId, ZoneFiche>;

export interface ZoneFeature {
  fid: number;
  categorie: string;
  causePro: string;
  recomm: string;
  legende: string;
  surfaceHa: number;
  areaM2: number;
  depM2: number | null;
}

export function classifyZone(
  categorie: string,
  causePro: string
): ZoneCategoryId {
  const cat = (categorie ?? "").toLowerCase();
  const cause = (causePro ?? "").toLowerCase();
  if (cat.includes("forte")) return "vigueur-forte";
  if (cat.includes("moyenne")) return "vigueur-moyenne";
  if (cause.includes("excès") || cause.includes("exces"))
    return "exces-eau";
  return "stress-hydrique";
}

export function getCategoryInfo(
  catId: ZoneCategoryId
): { label: string; color: string; soft: string } {
  const f = ZONE_BY_ID[catId];
  return { label: f.nomCourt, color: f.couleur, soft: f.couleurSoft };
}