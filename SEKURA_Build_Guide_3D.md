# 🛡️ SEKURA — BUILD GUIDE LANDING PAGE 3D
### AntiGravity × Spline · Adapté à Sekura · Objectif : ohzi.io level

| 5 Phases | 9 Sections | Spline Models |
|----------|------------|---------------|
| Du setup au déploiement | Chaque prompt détaillé | Sélection curated |

---

## VISION SEKURA — RAPPEL

| | |
|---|---|
| 🎯 | **Objectif final :** Un site niveau ohzi.io — immersif, 3D scroll-based, dark premium — où chaque section raconte l'histoire de Sekura avec des animations qui guident l'utilisateur vers l'inscription. |
| 🔑 | **Règle des 3 secondes :** Le visiteur comprend «Sekura = garde du corps numérique» avant même de scroller. Le visuel 3D fait le travail. |

---

## PHASE 1 — SETUP
### Préparer l'environnement · AntiGravity · Repo · Brand Guidelines · ~30 min

---

### Étape 1.1 — Créer la branche de travail

Ne jamais travailler directement sur `main`. Crée une branche dédiée pour ne pas risquer sekura.space pendant les tests.

```bash
git checkout -b feat/3d-landing
git push origin feat/3d-landing
```

> ✅ Vercel va automatiquement créer une URL de preview (ex: `sekura-git-feat-3d-landing.vercel.app`). Tu peux tester en conditions réelles sans toucher au live.

---

### Étape 1.2 — Ouvrir AntiGravity et connecter le repo

1. Va sur antigravity.ai — crée un nouvel agent
2. Connecte ton repo GitHub Sekura
3. Confirme la stack : **Next.js 14 App Router + Tailwind + TypeScript**

---

### Étape 1.3 — Générer les Brand Guidelines pour AntiGravity

Upload ton logo Sekura ou une capture de sekura.space dans AntiGravity et envoie ce prompt :

```
Analyse cette image et génère-moi un fichier brand-guidelines.md
structuré comme suit :
- Nom de la marque + tagline
- Palette de couleurs principale (hex codes)
- Typographie recommandée
- Ton & voix (3 adjectifs max)
- Style visuel (dark/light, minimaliste/maximaliste)
- Éléments visuels distinctifs

Ce fichier sera utilisé comme source de vérité pour un AI agent
qui va builder ma landing page. Sois précis et concis.
```

> 💡 Résultat attendu : Un fichier `brand-guidelines.md` qui dit noir sur blanc : fond `#0F172A`, accent `#6366F1`, style dark premium sécurité, ton rassurant mais moderne.

---

### Étape 1.4 — Installer le Spline Skill dans AntiGravity

Télécharge le Spline Skill (lien dans la description de la vidéo) et glisse-le dans AntiGravity. Puis demande à l'agent de l'installer :

```
J'ai ajouté un fichier spline-skill.zip dans le workspace.
Peux-tu l'installer pour que tu puisses travailler avec
des assets Spline 3D dans notre projet ?
```

AntiGravity va dézipper le skill et le placer dans `/agent/`. À partir de là, il sait exactement comment intégrer Spline en React, vanilla JS, et gérer les exports.

---

## PHASE 2 — CHOISIR & CONFIGURER LES ASSETS SPLINE
### spline.design/community · Sélection pour Sekura · ~45 min

C'est l'étape la plus importante pour atteindre le niveau ohzi.io. Le choix des assets 3D définit l'ambiance de toute la page. Voici la sélection recommandée pour Sekura.

> ⚠️ **Règle absolue :** Tous tes assets doivent avoir le background CACHÉ (transparent). Sekura = fond noir `#000000` pur. Toute couleur de fond dans Spline va casser l'ambiance.

---

### 🔷 Asset 1 — Floating Spheres / Particle Globe

**Recherche :** `spline.design/community` → search: `"particle sphere"` ou `"floating orb"`

**Pourquoi :** Une sphère de particules flottante qui réagit au scroll et à la souris. Effet protection/bouclier = parfait pour «garde du corps numérique». Rappelle les interfaces de sécurité avancées.

✅ **Match Sekura :** Section HERO — remplace avantageusement l'iPhone 3D en étant plus léger à charger, plus élégant, et universellement lisible. La sphère devient le symbole visuel de Sekura.

---

### 🔷 Asset 2 — Glowing Shield / 3D Geometry Dark

**Recherche :** `spline.design/community` → search: `"shield 3D"` ou `"geometric dark"`

**Pourquoi :** Une géométrie 3D sombre avec glow effect violet/cyan. Scroll-based interaction. Directement en lien avec la sécurité — le shield est le symbole universel de protection.

✅ **Match Sekura :** Section HERO — Option A si tu veux le symbole le plus explicite. Combine avec du texte overlay pour l'impact maximal.

---

### 🔷 Asset 3 — Halo / Diffused Light Background

**Recherche :** `spline.design/community` → search: `"halo glow"` ou `"aurora dark"`

**Pourquoi :** Un halo lumineux diffus qui suit la souris (identique au site ohzi.io). Minimal, premium, non distrayant — le contenu texte reste lisible à 100%.

✅ **Match Sekura :** Sections PROBLÈME, FEATURES — Idéal pour les sections à fort contenu textuel. Donne de la profondeur sans voler l'attention.

---

### 🔷 Asset 4 — Glitch / Distortion Mesh

**Recherche :** `spline.design/community` → search: `"glitch"` ou `"mesh distortion"`

**Pourquoi :** Effet de distortion/glitch qui déforme le fond. Connotation «danger», «zone à risque» — parfaitement aligné avec la section Problème de Sekura.

✅ **Match Sekura :** Section LE PROBLÈME — L'effet glitch visualise l'insécurité. Quand les stats apparaissent, le mesh se stabilise progressivement.

---

### 🔷 Asset 5 — City/Map Particles

**Recherche :** `spline.design/community` → search: `"city particles"` ou `"map network"`

**Pourquoi :** Réseau de particules qui simule une carte de ville avec des connexions lumineuses. Directement lié à la heatmap et à la navigation urbaine de Sekura.

✅ **Match Sekura :** Section HEATMAP FEATURE — Iconique pour montrer la couverture géographique de l'app. Fort impact visuel.

---

### Configuration Spline — Étapes pour chaque asset

1. Clique sur l'asset choisi → **Remix** (gratuit jusqu'à 3 assets simultanément)
2. Dans l'éditeur : cache les éléments de branding tiers (logo Spline, textes placeholder)
3. Play Settings : ✓ **Hide Background Color** (OBLIGATOIRE pour fond transparent)
4. Vérifie que l'interaction souris est activée (**Mouse Track = ON**)
5. Code Export → sélectionne **«Vanilla JS»** (notre stack Next.js le gère nativement)
6. Copie l'URL `prod.spline.design/...` — c'est ton token d'intégration

> 💡 Pour vérifier ton asset avant intégration : colle l'URL `prod.spline` sur https://fetchsub.com — tu verras exactement le rendu final en preview.

---

## PHASE 3 — BUILD
### Les prompts AntiGravity section par section · 4 prompts séquentiels · ~2h

> ⚠️ **Règle critique :** Envoie les prompts **UN PAR UN**, dans l'ordre. Attends que chaque section fonctionne avant de passer à la suivante. Un prompt monolithique = résultats dégradés.

---

### Prompt #0 — Contexte global
#### *(Toujours envoyer en premier)*

```
Tu vas refondre l'interface de ma landing page Sekura pour créer
une expérience 3D dark premium, niveau ohzi.io.

REPO : [TON_REPO_GITHUB_URL]
LIVE : https://sekura.space
STACK : Next.js 14 (App Router), Tailwind CSS, TypeScript
DÉPLOIEMENT : Vercel

CONTRAINTES ABSOLUES — NE PAS TOUCHER :
1. /app/api/* — toutes les routes API (waitlist, emails)
2. lib/supabase.ts et lib/resend.ts
3. Messages i18n dans /messages/* (FR, EN, ES, PT)
4. next.config.js et vercel.json
5. La logique formulaire waitlist (email + insert Supabase)

CE QU'ON BUILD :
- Design system dark : fond #000000 pur, accent #6366F1
- Hero avec asset Spline 3D réactif à la souris + au scroll
- 9 sections dans l'ordre exact du brand document
- Micro-animations Intersection Observer sur toutes les sections
- CTA flottant sticky (apparaît à 30% scroll)
- Curseur custom : cercle violet qui suit la souris (desktop)

RÉFÉRENCE VISUELLE : https://ohzi.io
→ Dark, immersif, assets 3D qui respirent, typographie grande,
  transitions fluides entre sections, pas de fioritures inutiles.

Confirme que tu as bien compris les contraintes.
Dis-moi quelle est la première action que tu vas faire.
```

---

### Prompt #1 — Hero 3D + Navbar

```
Construis la HeroSection avec l'asset Spline 3D.

SPLINE ASSET URL : [COLLE_TON_URL_PROD_SPLINE_ICI]

SPÉCIFICATIONS :
- Le canvas Spline prend 100vh, position fixed/sticky en fond
- Fond : #000000 pur — AUCUNE autre couleur de fond
- L'asset réagit au mouvement de la souris
- Interaction scroll : l'asset scale down de 100% à 80% au scroll

OVERLAY (par-dessus le canvas) :
- Badge : "247 personnes inscrites" + dot vert animé (pulse)
- Headline : "Ton garde du corps numérique."
  Font-size : clamp(48px, 7vw, 96px) — GRAND, dominant
  Font-weight : 800, couleur #FFFFFF
- Sous-titre : "SOS en 3 clics · Heatmap IA · Navigation sûre"
  Font-size : clamp(16px, 2vw, 22px), couleur #94A3B8
- CTA primaire : "Rejoindre gratuitement →"
  Background : #6366F1, hover : #818CF8, border-radius : 12px
- CTA secondaire : "Voir la démo ↓"
  Style ghost, border : 1px solid rgba(255,255,255,0.2)
- Le texte overlay apparaît en fade-in + translateY(-20px → 0)
  avec stagger de 150ms entre chaque élément

NAVBAR :
- Logo Sekura à gauche
- Nav links : Comment ça marche · Features · Tarifs
- CTA "Rejoindre" à droite, fond violet
- Fond navbar : transparent → backdrop-blur(20px) after 100px scroll
- Ne pas recréer la logique i18n — garde le composant existant

IMPORTANT : Conserve le WaitlistForm existant, wrap-le seulement.
```

---

### Prompt #2 — Sections 02 à 05

```
Construis les sections 02 à 05 dans l'ordre exact.
Cohérence visuelle avec le Hero : fond sombre, violet #6366F1.

SECTION 02 — SOCIAL PROOF STRIP :
- Bande pleine largeur, fond #0F172A
- Logos médias en marquee (défilement horizontal infini, 30s)
  Logos : TechCrunch · Forbes · Product Hunt · Le Monde · Wired
- Compteur animé "247 personnes déjà inscrites"
  Chiffre en vert #10B981, animation count-up au viewport

SECTION 03 — LE PROBLÈME :
- Intègre l'asset Spline "halo/glitch" en background (URL: [URL_ASSET_2])
  L'effet glitch = 100% opacity, se stabilise progressivement au scroll
- Titre : "L'insécurité n'est pas un problème là-bas. C'est ici."
  Font-size énorme, blanc, weight 800
- 4 stats en grid 2×2, compteurs qui animent 0 → valeur finale :
  · "1 femme sur 2" modifie son trajet par peur
  · "50" des villes les + dangereuses en LATAM
  · "30 min" délai moyen intervention policière
  · "0" app vraiment conçue pour ces réalités
- Chaque stat : chiffre en #6366F1 géant + label en gris

SECTION 04 — COMMENT ÇA MARCHE :
- 3 steps en ligne horizontale avec connecteur animé
- Chaque step : numéro cerclé violet + icône Lucide + titre + texte
  · Étape 1 : Télécharge & configure (icon: Download)
  · Étape 2 : Consulte la heatmap (icon: Map)
  · Étape 3 : Voyage en confiance (icon: Shield)
- Animation : stagger 250ms, fade-in + scale(0.9→1)
- Le connecteur entre les steps se "dessine" au scroll (stroke animation)

SECTION 05 — FEATURES (scrollytelling) :
- 4 features en alternance gauche/droite (text | mock UI)
- Chaque feature : badge "CRITIQUE" ou "ESSENTIEL" + titre + desc
  · Heatmap IA — badge CRITIQUE — mock: div avec gradient zones
  · SOS Discret — badge CRITIQUE — mock: bouton rouge pulsant
  · Navigation Anti-Crime — badge ESSENTIEL — mock: carte SVG animée
  · Assistant IA — badge ESSENTIEL — mock: chat bubbles animées
- Le mock UI est en SVG/div stylé — pas d'images externes
- Apparition au scroll : le texte glisse depuis la gauche, le mock depuis la droite
```

---

### Prompt #3 — Sections 06 à 09 + Micro-animations globales

```
Construis les sections finales et les micro-animations globales.

SECTION 06 — COMPARATIF :
- Titre : "Sekura vs les autres"
- Tableau 5 colonnes : Critère | Sekura | Life360 | bSafe | Noonlight
- Critères : Heatmap IA · SOS discret · Multi-langue · Navigation ·
             Fonctionnement offline · Prix · Zones LATAM
- Colonne Sekura : background #6366F1/20, border top violet 3px
- Badge "Le seul" en tooltip au hover sur les cases exclusives à Sekura
- ✓ et ✕ apparaissent en séquence (stagger 100ms) au viewport

SECTION 07 — PROFILS (personas) :
- 3 cards côte à côte, hover-3D effect (perspective + rotateX/Y au mousemove)
  · Sofia, 28 ans — "Je rentre souvent seule le soir"
  · Lucas & Emma — "On voyage en famille 3 fois par an"
  · Inès, 34 ans — "Consultante, je suis en déplacement constant"
- Chaque card : avatar placeholder + citation + tag de profil
- Fond card : glassmorphism (backdrop-blur + border rgba blanc)

SECTION 08 — FAQ :
- Accordion smooth (max-height transition)
- Récupère les Q&R exactes de la version actuelle de la page
- Séparateur : ligne violet en gradient, pas de bord gris
- Icon : + qui rotate 45° en → ✕ à l'ouverture

SECTION 09 — CTA FINAL :
- Barre de progression "247 / 500 places" animée en vert
- Titre : "Sois parmi les premiers. Rejoins la whitelist."
  Style identique au Hero headline (même font-size, même weight)
- WaitlistForm existant centré — ne pas le retoucher
- Background : dégradé radial violet subtil centré

FLOATING CTA :
- Bouton "Rejoindre →" sticky bottom-right, z-index 9999
- Apparaît après 30% scroll avec fade-in + slide-up
- Disparaît quand la Section 09 est dans le viewport
- Mobile : full-width sticky bottom

MICRO-ANIMATIONS GLOBALES :
- Toutes les sections : data-animate="fade-up"
  translateY(30px→0) + opacity(0→1) via Intersection Observer
  threshold: 0.15, duration: 600ms, easing: cubic-bezier(.16,1,.3,1)
- Curseur custom : div cercle #6366F1/40, 40px, pointer-events:none
  Suit la souris avec lerp (smoothing), scale(1.5) sur les liens/boutons
  Desktop uniquement (media query hover:hover)
- Transitions de page : opacity fade 300ms au chargement initial
```

---

## PHASE 4 — PERFORMANCE & MOBILE
### Optimisation obligatoire avant déploiement · ~30 min

### Installation des dépendances

```bash
npm install @splinetool/react-spline @splinetool/runtime
npm install sharp
npm install --save-dev @types/three
```

---

### Optimisation mobile — Prompt AntiGravity

```
Sur mobile (max-width: 768px), l'asset Spline 3D doit être
désactivé pour des raisons de performance. À la place :
- Affiche une image statique PNG de l'asset (capture du meilleur frame)
- Remplace l'animation scroll par un parallax CSS léger (-20px)
- Le curseur custom est désactivé (pointer device n'a pas de hover)
- Les animations d'entrée sont réduites à opacity uniquement (pas de translateY)

Utilise: const isMobile = useMediaQuery('(max-width: 768px)')
```

---

### Config next.config.js — Ajouter l'optimisation images

```js
// next.config.js
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
},
```

---

### Checklist performance avant merge

| Critère | Objectif |
|---------|----------|
| **Lighthouse** | > 85 mobile sur l'URL Vercel preview |
| **LCP** | < 2.5s — l'asset Spline doit être lazy-loaded |
| **Formulaire** | Tester inscription → vérifier Supabase + email Resend |
| **i18n** | Tester `/en/` `/es/` `/pt/` — textes corrects dans toutes les langues |
| **Mobile** | Animation Spline désactivée, image statique à la place |
| **OG Tags** | `<head>` inchangé — vérifier preview Twitter/LinkedIn |
| **Spline URL** | Tester que l'URL `prod.spline.design` répond correctement |

---

## PHASE 5 — DÉPLOIEMENT
### Git → Vercel Preview → Merge sur main · ~15 min

### Commandes de déploiement

```bash
git add .
git commit -m "feat: 3D landing page Spline + dark premium UI"
git push origin feat/3d-landing
# → Vercel génère automatiquement:
# https://sekura-git-feat-3d-landing-[team].vercel.app
```

### Validation sur l'URL preview (avant merge)

- [ ] Scroll complet de haut en bas — vérifier chaque animation
- [ ] Cliquer chaque CTA — vérifier que le formulaire soumet
- [ ] Tester en navigation privée (no cache)
- [ ] Vérifier sur iPhone Safari (le plus exigeant)
- [ ] Inspecter la console — zéro erreur JS

### Merge et mise en production

```bash
# Seulement si TOUT est validé sur la preview :
git checkout main
git merge feat/3d-landing
git push origin main
# → Vercel déploie sur sekura.space
```

---

## BONUS — Prompt de correction d'urgence
### À utiliser si AntiGravity dérape ou si le backend est cassé

```
Le code généré a cassé [DÉCRIS LE PROBLÈME].

Contraintes absolues qui n'ont pas été respectées :
- Ne pas toucher /app/api/* ni lib/supabase.ts / lib/resend.ts
- Le WaitlistForm existant reste intact
- L'i18n (useTranslations) doit rester fonctionnel

Corrige UNIQUEMENT le composant [NOM_COMPOSANT].
Montre-moi le diff exact avant/après.
Ne touche à rien d'autre.
```

---

*🛡️ SEKURA — Built different. · Build Guide Landing Page 3D · AntiGravity × Spline · Mars 2026*
