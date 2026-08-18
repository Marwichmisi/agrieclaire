# GUIDE — Déployer AgriÉclair sur Vercel

Ce guide explique comment mettre le site AgriÉclair en ligne gratuitement
avec **Vercel** (hébergement officiel de Next.js), en moins de 10 minutes.

> Le site ne nécessite **aucune configuration** : pas de base de données,
> pas de variable d'environnement, pas de clé API. Les polices sont
> auto-hébergées, les données géographiques et les images sont dans le
> dépôt. C'est un simple `npm run build` à déployer.

---

## 1. Prérequis

- Un compte GitHub (déjà fait : le code est poussé sur
  `https://github.com/Marwichmisi/agrieclaire`, branche `main`).
- Un compte Vercel : gratuit sur `https://vercel.com` (connectez-vous avec
  votre compte GitHub).

---

## 2. Option A — Déploiement depuis le site vercel.com (recommandé, sans installer quoi que ce soit)

1. Allez sur `https://vercel.com` et connectez-vous avec GitHub.
2. Cliquez **« Add New… » → « Project »**.
3. La liste de vos dépôts GitHub apparaît : choisissez **`agrieclaire`**.
   (Si le dépôt n'apparaît pas : « Adjust GitHub App Permissions » puis
   autorisez l'accès au dépôt `Marwichmisi/agrieclaire`.)
4. **Ne touchez à rien** dans les réglages : Vercel détecte automatiquement
   **Next.js** et utilise `npm run build` comme commande de construction.
   - Framework Preset : `Next.js` (auto)
   - Build Command : `npm run build` (auto)
   - Output Directory : laissé vide (auto)
5. Cliquez **« Deploy »**. La construction dure 1 à 2 minutes.
6. À la fin, Vercel affiche une URL du type
   `https://agrieclaire-xxxx.vercel.app` — **votre site est en ligne**.

---

## 3. Option B — Déploiement avec la ligne de commande (CLI)

1. Installez la CLI (une seule fois) :

   ```bash
   npm install -g vercel
   ```

2. Connectez votre compte :

   ```bash
   vercel login
   ```

3. Depuis le dossier `site-web/`, lancez le déploiement d'aperçu :

   ```bash
   vercel
   ```

   (Répondez aux questions ; `vercel` crée le projet et affiche une URL
   d'aperçu temporaire.)

4. Déployez en production :

   ```bash
   vercel --prod
   ```

---

## 4. Mises à jour automatiques

Chaque fois que vous poussez un changement sur GitHub :

```bash
git add -A
git commit -m "votre message"
git push origin main
```

Vercel **redéploie automatiquement** la branche `main` (précisément dans le
projet : Settings → Git → Production Branch = `main`). Vous n'avez rien à
faire.

**Important — les messages vocaux** : tant que les fichiers de
`public/audio/` sont les placeholders silencieux, les boutons audio jouent
un silence. Enregistrez vos messages (voir `GUIDE_AJOUT_AUDIOS.md`),
remplacez les fichiers, poussez → le nouveau déploiement les prendra en
compte.

---

## 5. Vérifications après déploiement

Ouvrez l'URL de production et contrôlez :

1. **Page d'accueil** (`/`) : le rendu s'affiche, les polices Sora/Inter se
   chargent (auto-hébergées, pas de blocage réseau).
2. **Page carte** (`/carte`) : la carte interactive s'affiche (l'ortho
   `orthomosaique.webp`, ~3,8 Mo, se charge), les 16 zones sont cliquables
   et la légende apparaît.
3. **Page jury** (`/pour-le-jury`) : les 4 cartes sources s'affichent.
4. **Audios** : un bouton « Message vocal à venir » = placeholder pas
   encore remplacé ; un bouton « Écouter le conseil » = fichier présent.
5. Sur **téléphone** (le cas d'usage réel) : la carte s'adapte, le clic sur
   une zone fait défiler le conseil.

---

## 6. (Optionnel) Domaine personnalisé

Settings → Domains → ajoutez un domaine (ex. `agrieclaire.fr`) et suivez
les instructions DNS de Vercel. Gratuit avec le plan Hobby pour un domaine
`.vercel.app` ; un nom de domaine acheté reste à votre charge.

---

## 7. Dépannage rapide

| Problème | Solution |
|---|---|
| Le build échoue | Vérifiez dans l'onglet Logs du déploiement. Cause classique : dépendances manquantes → vérifiez que `package-lock.json` est bien dans le dépôt (il y est). |
| La carte reste sur « Chargement de la carte… » | C'est le symptôme d'un navigateur qui bloque les scripts (extension de traduction type Trancy, VPN). Rechargez la page ou désactivez l'extension pour ce site. |
| L'image de fond de carte ne s'affiche pas | Vérifiez que `public/maps/orthomosaique.webp` est bien dans le dépôt (il y est). Vidangez le cache du navigateur. |
| Redéploiement manuel | Onglet **Deployments** → menu des trois points → **Redeploy**. |
| L'aperçu local ne ressemble pas à la prod | Les deux passent par `npm run build` : relancez `npm run build && npm run start` en local pour comparer. |

---

## 8. Rappel des commandes locales

```bash
cd site-web
npm install          # installer les dépendances
npm run dev          # serveur de développement (http://localhost:3000)
npm run build        # construire la version de production
npm run start        # servir la version construite
```

Bonne mise en ligne ! ⚡
