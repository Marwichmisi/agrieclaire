# GUIDE — Ajouter les messages vocaux d'AgriÉclair

Ce guide est destiné à **toute personne de l'équipe, même sans connaissance technique**. Il explique comment ajouter les enregistrements vocaux qui font la particularité du site : chaque zone de la parcelle a un conseil **écoutable en plein champ**, sans avoir à lire.

---

## 1. Où déposer les fichiers audio ?

Tous les fichiers audio vont dans le dossier :

```
site-web/public/audio/
```

Ce dossier contient déjà **4 fichiers de remplacement temporaires** (silencieux, pour tester le site). Vous allez **remplacer** chacun de ces fichiers par votre enregistrement, **en gardant exactement le même nom**.

> ⚠️ Règle n°1 : gardez le nom de fichier exactement tel quel (majuscules, tirets, extension `.mp3`).
> ⚠️ Règle n°2 : remplacez le fichier, ne le renommez pas.

---

## 2. Correspondance fichier ↔ zone

Il y a **4 fichiers audio, un par situation de zone** (les 16 zones de la parcelle sont regroupées en 4 situations, donc 4 messages suffisent — chaque situation partage le même conseil) :

| Fichier à remplacer | Zone concernée | Couleur sur la carte |
|---|---|---|
| `zone-exces-eau.mp3` | Zones trop humides (excès d'eau probable) — 4 zones | Bleu |
| `zone-stress-hydrique.mp3` | Zones qui manquent d'eau (stress hydrique) — 2 zones | Jaune/orange |
| `zone-vigueur-moyenne.mp3` | Zones normales (vigueur moyenne) — 9 zones | Vert clair |
| `zone-vigueur-forte.mp3` | Zones en excellente santé (vigueur forte) — 1 zone | Vert foncé |

> 💡 Le bouton « 🎧 Écouter le conseil » apparaît sur la fiche de chaque zone. Il joue automatiquement le fichier du bon nom. Si un fichier manque, le site affiche « Message vocal à venir » — **il ne plante jamais**.

---

## 3. Les textes à enregistrer

Enregistrez **les scripts suivants**, tels quels ou en les adaptant librement au ton de votre voix (langage oral, phrases courtes). Durée conseillée : 30 à 90 secondes.

### 3.1 `zone-exces-eau.mp3` — Zones trop humides (bleu)

> « Bonjour ! Votre parcelle a été survolée par un drone le 13 août 2026. Sur la carte, cette zone est colorée en bleu : c'est une zone où l'eau s'accumule après les pluies. Ici, les racines de vos plantes manquent d'oxygène, et l'engrais peut partir avec l'eau.
>
> Pour le maïs : faites attention. Quand le maïs est jeune, un sol trop gorgé d'eau peut le faire mourir en quelques jours. Plus tard, un excès d'eau au moment de la floraison peut faire baisser la récolte. Creusez des rigoles pour évacuer l'eau, et n'apportez pas d'engrais juste avant de fortes pluies.
>
> Pour le manioc : c'est la culture la plus à risque dans cette zone. Les tubercules pourrissent dans un sol trop humide. Si possible, ne plantez pas de manioc ici, ou plantez-le sur des buttes surélevées.
>
> Si l'eau stagne chaque année, pensez au riz de bas-fond pour la prochaine saison : c'est une culture qui aime les sols humides.
>
> Rappelez-vous : la carte guide, le terrain décide. Vérifiez cette zone de vos propres yeux avant de décider. »

### 3.2 `zone-stress-hydrique.mp3` — Zones qui manquent d'eau (jaune)

> « Bonjour ! Cette zone est colorée en jaune sur la carte : c'est une zone qui manque d'eau. Elle est placée en hauteur : l'eau de pluie s'écoule vite et le sol sèche plus tôt qu'ailleurs.
>
> Pour le maïs : le maïs est très sensible au manque d'eau au moment de la floraison, quand les épis apparaissent. C'est à ce moment-là qu'il fixe son nombre de grains : un manque d'eau, même court, se paie sur la récolte. Arrosez ces zones en priorité à ce stade, et couvrez le sol avec de la paille ou des herbes pour garder l'humidité.
>
> Pour le manioc : bonne nouvelle, le manioc supporte bien la sécheresse. Il ralentit, perd des feuilles, mais repart dès le retour des pluies. Ce n'est pas la culture la plus à risque ici.
>
> Si le manque d'eau revient chaque année, vous pouvez remplacer le maïs par du sorgho, du mil ou du niébé, qui supportent mieux les sols qui sèchent vite.
>
> La carte guide, le terrain décide : allez vérifier ces zones par vous-même. »

### 3.3 `zone-vigueur-moyenne.mp3` — Zones normales (vert clair)

> « Bonjour ! Cette zone est colorée en vert clair sur la carte : c'est une zone normale. La végétation y est dans la moyenne de la parcelle : ni trop d'eau, ni manque d'eau, pas de signe de stress.
>
> Pour le maïs : appliquez la dose d'entretien habituelle. Rien à changer, continuez simplement à surveiller la météo et l'arrivée de la floraison.
>
> Pour le manioc : même chose, conduite normale, sans changement par rapport à votre habitude.
>
> Cette zone ne demande pas d'action particulière. Bonne suite de campagne ! »

### 3.4 `zone-vigueur-forte.mp3` — Zones en excellente santé (vert foncé)

> « Bonjour ! Cette zone est colorée en vert foncé sur la carte : c'est la zone en excellente santé. La végétation y est nettement plus vigoureuse qu'ailleurs : la culture trouve tout ce qu'il lui faut, de l'eau et des nutriments.
>
> Pour le maïs : la culture se débrouille seule. Vous pouvez réduire la dose d'engrais par rapport à votre dose normale : elle n'en manque pas. C'est ça, l'agriculture de précision : économiser là où ça va bien pour investir là où ça va mal.
>
> Pour le manioc : excellente zone. Belle croissance, bonne santé. Pas d'apport supplémentaire nécessaire.
>
> Profitez de cette zone, c'est elle qui produit le plus. Bonne récolte ! »

---

## 4. Format technique attendu

| Caractéristique | Valeur attendue |
|---|---|
| Format | **MP3** (extension `.mp3`) |
| Débit | 128 kbps (recommandé) — convient aussi : 64 à 192 kbps |
| Fréquence | 44,1 kHz ou 48 kHz |
| Canaux | Mono ou stéréo, peu importe |
| Poids | < 5 Mo par fichier (un message de 1 minute fait ~1 Mo) |
| Durée | 30 à 90 secondes conseillée |

**Comment produire un MP3 depuis un téléphone (sans ordinateur) :**
1. Enregistrez-vous avec l'application « Dictaphone » (iPhone) ou « Enregistreur » (Android), au calme, près du micro.
2. Les applications récentes exportent directement en MP3, M4A ou AAC. Si le fichier n'est pas en `.mp3`, convertissez-le gratuitement en ligne (ex. `cloudconvert.com`) ou demandez à un coéquipier.
3. Renommez le fichier exactement comme dans le tableau du §2, puis déposez-le dans `public/audio/` en remplaçant l'ancien.

> 🎙️ Conseil d'enregistrement : parlez lentement, avec un débit régulier. Enregistrez d'abord un essai de 20 secondes et vérifiez que le volume est bon.

---

## 5. Comment vérifier que ça fonctionne

1. Démarrez le site : dans un terminal, depuis `site-web/`, lancez `npm run dev` puis ouvrez `http://localhost:3000`.
2. Allez sur la page **Accueil** ou **Ma parcelle** (carte).
3. Chaque fiche de zone a un bouton **« Écouter le conseil »** :
   - le bouton est actif (plein) → le fichier est trouvé ;
   - le bouton affiche **« Message vocal à venir »** → le fichier est absent ou mal nommé (vérifiez le nom exact du §2) ;
   - au clic, le bouton affiche **« Arrêter l'écoute »** et votre voix doit se faire entendre.
4. Testez aussi sur un **téléphone** (le cas d'usage réel : QR code en plein champ), avec et sans casque.

> 💡 Après remplacement d'un fichier, videz le cache du navigateur (rechargement forcé : `Ctrl+Maj+R` sur ordinateur) pour être sûr de tester le nouveau fichier.

---

## 6. Rappel : où se trouve tout le reste ?

- Code du site : `site-web/`
- Fichiers audio : `site-web/public/audio/`
- Données géographiques de la carte (issues de QGIS, à ne pas modifier) : `site-web/public/data/` (`zones.geojson`, `parcelle.geojson`)
- Cartes sources (page « Pour le jury ») : `site-web/public/maps/`

Bonne prise de voix, et merci pour votre contribution à AgriÉclair ! ⚡