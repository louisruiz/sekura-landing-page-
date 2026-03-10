# SEKURA — PROMPTS ANTIGRAVITY
## Sections 02 à 09 · Hero déjà implémenté · Mars 2026

> ⚠️ **RÈGLE ABSOLUE** : Envoie les prompts UN PAR UN dans l'ordre.
> Attends que chaque section fonctionne avant de passer à la suivante.

---

## 📌 PROMPT #0 — CONTEXTE GLOBAL
### *(Envoie celui-ci EN PREMIER, avant tout)*

```
Tu vas construire les sections 02 à 09 de ma landing page Sekura.
Le Hero (Section 01) est déjà implémenté — robot 3D Spline, fond #070c09,
accent vert #00ff88, typographie monospace, coins brackets cyber. NE PAS Y TOUCHER.

REPO : [TON_REPO_GITHUB_URL]
LIVE : https://sekura.space
STACK : Next.js 14 (App Router), Tailwind CSS, TypeScript
DÉPLOIEMENT : Vercel

DESIGN SYSTEM ACTUEL (à respecter absolument) :
- Fond principal : #070c09 (noir profond légèrement vert)
- Fond secondaire : #0d1410
- Accent principal : #00ff88 (vert néon)
- Accent secondaire : #00cc6a
- Bordures/séparateurs : rgba(0,255,136,0.15)
- Texte principal : #FFFFFF
- Texte secondaire : rgba(255,255,255,0.5)
- Typo : font-family monospace pour labels/tags, system-ui pour corps
- Letterspacing labels : 2-4px, UPPERCASE
- Coins décoratifs : bracket-style ┌ ┐ └ ┘ en vert #00ff88
- Style visuel : cyberpunk-terminal, dark military, pas de bordures rondes agressives

CONTRAINTES ABSOLUES — NE PAS TOUCHER :
1. /app/api/* — toutes les routes API (waitlist, emails)
2. lib/supabase.ts et lib/resend.ts
3. Messages i18n dans /messages/* (FR, EN, ES, PT)
4. next.config.js et vercel.json
5. La logique formulaire waitlist existante
6. Le Hero Section 01 et sa Navbar

RÉFÉRENCE VISUELLE : https://ohzi.io
→ Dark, immersif, assets 3D qui respirent, transitions fluides,
  typographie grande, pas de fioritures inutiles.
→ Mais adapté à l'univers Sekura : vert #00ff88 et non violet, style
  surveillance/sécurité militaire et non startup SaaS générique.

Confirme que tu as bien lu les contraintes.
Dis-moi quel fichier tu vas créer en premier.
```

---

## 📌 PROMPT #1 — SECTIONS 02 & 03
### *(Social Proof + Le Problème)*

```
Construis les sections 02 et 03. Respecte strictement le design system
du contexte envoyé précédemment (fond #070c09, accent #00ff88, style cyber).

────────────────────────────────────────
SECTION 02 — SOCIAL PROOF STRIP
────────────────────────────────────────
Composant : SocialProofSection.tsx

- Fond : #0d1410, border-top et border-bottom : 1px solid rgba(0,255,136,0.15)
- Label de section en haut à gauche :
  fontFamily: monospace · fontSize: 11px · color: #00ff88
  letterSpacing: 3px · text: "// 02 · PREUVE SOCIALE"
  suivi d'une ligne horizontale en dégradé vert → transparent

- Phrase d'accroche centrée :
  "Ils en parlent. Et ce n'est que le début."
  monospace · uppercase · fontSize: 13px · color: rgba(255,255,255,0.4)
  letterSpacing: 2px

- Logos médias en marquee (défilement infini horizontal, 40s, loop) :
  TechCrunch · Forbes · Product Hunt · Le Monde · Wired · L'Express
  Style : font-serif · fontWeight: 700 · color: rgba(255,255,255,0.25)
  border: 1px solid rgba(255,255,255,0.08) · padding: 12px 24px

- Compteur animé count-up (0 → 247) déclenché par Intersection Observer :
  Chiffre "247" : fontSize: 80px · fontWeight: 900 · color: #00ff88
  Encadré avec 4 coins brackets en #00ff88 (┌ ┐ └ ┘, 16px chacun)
  Label au-dessus : "// personnes protégées" · monospace
  Lien en dessous : "Rejoignez-les →" · monospace · fontSize: 12px

────────────────────────────────────────
SECTION 03 — LE PROBLÈME
────────────────────────────────────────
Composant : ProblemSection.tsx

- Fond : #070c09 avec overlay scanlines très subtil :
  repeating-linear-gradient(0deg, transparent 3px, rgba(0,255,136,0.015) 4px)

- Intègre l'asset Spline "glitch/mesh distortion" en background :
  URL SPLINE : [COLLE_TON_URL_ASSET_GLITCH_ICI]
  Position : absolute, inset: 0, opacity: 0.15, pointer-events: none
  Si pas d'asset Spline disponible pour l'instant : background avec
  radial-gradient(ellipse at 30% 50%, rgba(0,255,136,0.04), transparent 60%)

- Titre principal :
  "Ce soir." (blanc) + saut de ligne
  "En rentrant." (color: #00ff88) + saut de ligne
  "Pas là-bas." (blanc)
  fontSize: clamp(40px, 6vw, 80px) · fontWeight: 900 · lineHeight: 1.1
  Animation : fade-in + translateY(30px→0) au scroll

- Sous-titre :
  "Sekura ne règle pas le problème de l'insécurité dans le monde. Il règle le tien."
  color: rgba(255,255,255,0.5) · fontSize: 16px · maxWidth: 480px · lineHeight: 1.7

- Grid 4 stats (2×2 sur mobile, 4×1 sur desktop) :
  Chaque stat : fond #0d1410 · borderLeft: 2px solid rgba(0,255,136,0.1)
  La 4e stat (highlight) : borderLeft: 2px solid #00ff88

  · Stat 1 : chiffre "1/3" · label "des voyageurs victimes d'incident sécurité en LATAM"
  · Stat 2 : chiffre "8 min" · label "délai moyen avant qu'une alerte soit traitée"
  · Stat 3 : chiffre "73%" · label "n'osent pas sortir seul·e le soir dans certaines zones"
  · Stat 4 : chiffre "0" · label "app de sécurité conçue pour la réalité terrain" · couleur #00ff88

  Chiffres : fontSize: 56px · fontWeight: 900 · blanc (ou #00ff88 pour stat 4)
  Chaque stat apparaît avec stagger 120ms via Intersection Observer (translateX -20px → 0)

- Texte de transition en bas :
  "Sekura ne règle pas le problème de l'insécurité dans le monde. Il règle le tien."
  Déjà dans le sous-titre — ne pas doubler. Ajouter juste une ligne séparatrice :
  gradient horizontal rgba(0,255,136,0.3) → transparent
```

---

## 📌 PROMPT #2 — SECTIONS 04 & 05
### *(Comment ça marche + Features)*

```
Construis les sections 04 et 05. Même design system.

────────────────────────────────────────
SECTION 04 — COMMENT ÇA MARCHE
────────────────────────────────────────
Composant : HowItWorksSection.tsx

- Fond : #0d1410
- Titre : "Trois étapes. Moins de 5 minutes."
  + ligne 2 en #00ff88 : "Une vie plus sereine."
  fontSize: clamp(28px, 4vw, 52px) · fontWeight: 900

- Layout : 2 colonnes (liste des steps à gauche | phone mockup à droite)

LISTE DES 3 STEPS (colonne gauche) :
Chaque step est cliquable. Step actif → background rgba(0,255,136,0.05),
borderLeft: 3px solid #00ff88. Step inactif → borderLeft: 3px solid rgba(0,255,136,0.1)

Step 01 — "Télécharge & configure" · "2 min"
  Desc : "Crée ton compte, définis tes contacts de confiance,
  paramètre ta zone de confort. Ton réseau de protection est prêt."

Step 02 — "Active ta protection" · "30 sec"
  Desc : "Lance une session sécurisée en un tap. L'IA heatmap s'active,
  tes contacts sont notifiés silencieusement."

Step 03 — "Voyage en sérénité" · "∞"
  Desc : "Alertes zones à risque en temps réel. En cas d'urgence :
  3 clics, SOS envoyé. Simple. Discret. Efficace."

Label de chaque step : "// 01" monospace · color: #00ff88 · letterSpacing: 3px
Timer : monospace · fontSize: 10px · color: rgba(255,255,255,0.3)
Titre step : fontSize: 20px · fontWeight: 700
Description : visible uniquement quand step actif (max-height transition)
Auto-rotation toutes les 3000ms via setInterval

PHONE MOCKUP (colonne droite) :
Mockup stylisé (pas d'image) : div avec border-radius: 32px
border: 2px solid #00ff88 · background: #0a100d
boxShadow: 0 0 40px rgba(0,255,136,0.2)
Dimensions : 220×440px

Contenu du mockup change selon le step actif :
- Step 1 : formulaire de configuration (champs nom, zone, contacts)
- Step 2 : mini-carte avec point GPS pulsant en #00ff88 (animation keyframe)
           + zones rouge/orange en overlay
- Step 3 : interface SOS 3 boutons, le 3e s'illumine en rouge après 2s

────────────────────────────────────────
SECTION 05 — FEATURES (4 onglets)
────────────────────────────────────────
Composant : FeaturesSection.tsx

- Fond : #070c09
- Titre : "Quatre outils." + ligne 2 en #00ff88 : "Une seule obsession."

NAVIGATION 4 ONGLETS (pleine largeur) :
Onglet actif → background: #00ff88 · color: #070c09 · fontWeight: 700
Onglet inactif → background: #0d1410 · color: rgba(255,255,255,0.4)
Style : monospace · fontSize: 10px · letterSpacing: 2px · UPPERCASE

◈ HEATMAP IA
◉ SOS DISCRET
◎ NAVIGATION ANTI-CRIME
◇ ASSISTANT IA

CONTENU DE CHAQUE ONGLET : 2 colonnes (texte gauche | mockup droite)
Texte : tag monospace vert · titre (fontSize: 28px · fontWeight: 800) ·
        description (fontSize: 14px · lineHeight: 1.8) ·
        "La peur éliminée :" encadré borderLeft: 2px solid #00ff88

MOCKUPS (div stylisés, AUCUNE image externe) :

Feature HEATMAP IA :
  Mini-carte avec grille CSS (background-image: linear-gradient) +
  3 zones colorées (rouge/orange/vert) + point utilisateur pulsant
  Labels : "ALTO" "MED" "BAJO" en monospace

Feature SOS DISCRET :
  3 boutons carrés côte à côte
  Animation : un compteur CSS remplit les boutons 1→2→3 en boucle (3s)
  Quand bouton 3 actif → fond rouge pulse + "🆘 SOS ENVOYÉ"
  Texte sous les boutons : "↑ Position GPS · Lucas · Emma notifiés"

Feature NAVIGATION ANTI-CRIME :
  SVG simple : 2 paths (route verte en pointillés = safe, route rouge = danger)
  Zone rouge en overlay semi-transparent
  Badge vert : "✓ +4 min · Aucune zone à risque"
  Badge rouge barré : "✗ Chemin direct · 2 zones rouges"

Feature ASSISTANT IA :
  Interface chat : 4 bulles alternées (user/AI)
  Questions sur la sécurité de quartiers
  Réponses de l'IA avec badge "◈ SEKURA AI" en vert
  Input en bas avec placeholder "Poser une question..."

Transition entre onglets : fade-in 300ms · pas de slide brutal
```

---

## 📌 PROMPT #3 — SECTIONS 06 & 07
### *(Comparatif + Personas)*

```
Construis les sections 06 et 07. Même design system.

────────────────────────────────────────
SECTION 06 — COMPARATIF
────────────────────────────────────────
Composant : ComparatifSection.tsx

- Fond : #0d1410
- Titre : "Les autres apps protègent tes données."
  + ligne 2 en #00ff88 : "Sekura protège ta vie."
- Sous-titre : "Ce que personne d'autre ne fait — et pourquoi ça compte."
  monospace · fontSize: 13px · color: rgba(255,255,255,0.4)

TABLEAU (5 colonnes) :
Colonnes : Critère | Sekura | Google Maps | WhatsApp | Autres

Header colonne Sekura :
  color: #00ff88 · borderBottom: 2px solid #00ff88
  background: rgba(0,255,136,0.03)

Header autres colonnes :
  color: rgba(255,255,255,0.4) · borderBottom: 1px solid rgba(0,255,136,0.15)

Lignes du tableau (dans cet ordre) :
1. Heatmap zones criminelles IA        → ✓ Sekura · — reste
2. SOS 3 clics (sans déverrouiller)    → ✓ Sekura · — reste
3. Routing anti-crime temps réel       → ✓ Sekura · — reste
4. Conçu pour l'Amérique Latine        → ✓ Sekura · — reste
5. Assistant IA sécurité locale        → ✓ Sekura · — reste
6. Navigation GPS                      → ✓ Sekura · ✓ Google Maps · — reste
7. Partage de position                 → ✓ tous
8. Gratuit 3 mois                      → ✓ Sekura · ✓ Google · ✓ WhatsApp

✓ Sekura : color: #00ff88 · fontSize: 18px
✓ autres : color: rgba(255,255,255,0.4)
— : color: rgba(255,255,255,0.1)

Animation : ✓ et — apparaissent en stagger 80ms au scroll (Intersection Observer)
Lignes paires : background rgba(255,255,255,0.02)

Badge sous le tableau :
"◈ LE SEUL CONÇU POUR LES RÉALITÉS D'AMÉRIQUE LATINE"
background: rgba(0,255,136,0.08) · border: 1px solid rgba(0,255,136,0.27)
fontFamily: monospace · fontSize: 12px · color: #00ff88 · letterSpacing: 2px
padding: 12px 24px · display: inline-block

────────────────────────────────────────
SECTION 07 — PERSONAS
────────────────────────────────────────
Composant : PersonasSection.tsx

- Fond : #070c09
- Titre : "Sekura, c'est pour qui ?"
  + ligne 2 en #00ff88 : "Pour toi."

3 CARDS CLIQUABLES (grid 3 colonnes) :
Card inactive : border: 1px solid rgba(0,255,136,0.15) · background: transparent
Card active : border: 1px solid [couleur-persona]/40 · background: #0d1410
Transition hover : translateY(-4px) en 300ms

PERSONA 1 — SOFIA
  emoji: 👩 · couleur: #00ff88
  tag: "VOYAGEUSE SOLO" (monospace, uppercase)
  nom: "Sofia" · âge: "28 ans"
  desc: "Je voyage seule en Amérique du Sud pour mon boulot.
        Je rentre souvent tard de réunions."
  peur (visible au clic) : borderLeft: 2px solid rgba(255,80,80,0.6)
    "La peur : rentrer à l'hôtel sans savoir si le quartier est sûr."
  gain (visible au clic) : borderLeft: 2px solid #00ff88
    "Avec Sekura : elle sait exactement où marcher. 3 clics si urgence."

PERSONA 2 — LUCAS & EMMA
  emoji: 👫 · couleur: #00ccff
  tag: "COUPLE EXPATRIÉ"
  nom: "Lucas & Emma" · âge: "32 & 30 ans"
  desc: "On s'est installés à Medellín. On adore la ville mais on ne
        maîtrise pas encore toutes les zones."
  peur : "La peur : prendre la mauvaise rue par habitude."
  gain : "Avec Sekura : routing automatique. La famille sait où ils sont."

PERSONA 3 — INÈS
  emoji: 👩‍💼 · couleur: #ff88aa
  tag: "DIRIGEANTE EN DÉPLACEMENT"
  nom: "Inès" · âge: "45 ans"
  desc: "Je voyage 10 jours/mois en Amérique Latine. Mon entreprise
        s'inquiète pour ma sécurité."
  peur : "La peur : un incident qui bloque tout un voyage d'affaires."
  gain : "Avec Sekura : les équipes RH voient sa position. Elle se concentre."

COMPORTEMENT : cliquer une card → expand section peur + gain
Au chargement : 1ère card active par défaut
Animation entrée : stagger 100ms · fade-in + translateY(20px→0)
```

---

## 📌 PROMPT #4 — SECTIONS 08, 09 + MICRO-ANIMATIONS
### *(Témoignages + FAQ + CTA Final + Sticky CTA + Animations globales)*

```
Construis les sections finales et toutes les micro-animations globales.
Même design system.

────────────────────────────────────────
SECTION 08 — TÉMOIGNAGES
────────────────────────────────────────
Composant : TestimonialsSection.tsx

- Fond : #0d1410
- Layout : 1 grande card à gauche (span 2 rows) + 2 petites cards à droite

GRANDE CARD (featured) :
  fond: #070c09 · border: 1px solid rgba(0,255,136,0.13)
  Barre top : 3px · linear-gradient(to right, #00ff88, transparent)
  Guillemet décoratif : " · fontSize: 48px · color: #00ff88 · opacity: 0.3
  Citation : fontSize: 22px · fontWeight: 500 · color: white · lineHeight: 1.6
  Auteur : monospace · color: #00ff88
  Rôle : monospace · fontSize: 10px · color: rgba(255,255,255,0.3)
  Dots de navigation : 5 dots · actif = width: 24px vert, inactif = 6px gris
  Auto-rotation : toutes les 4000ms

PETITES CARDS :
  fond: #070c09 · border: 1px solid rgba(0,255,136,0.1)
  Citation en italique · auteur + rôle en monospace

5 TÉMOIGNAGES :
1. "Je voyage seule en Amérique du Sud chaque mois. Sekura a changé
   mon niveau de confiance du tout au tout."
   — Camille R. · Consultante, Paris

2. "Le SOS en 3 clics, c'est ce qui m'a convaincu. Ma femme comprend
   le principe en 30 secondes."
   — Marc D. · Expatrié, Bogotá

3. "La heatmap IA est bluffante. Elle m'a évité une zone que même
   les locaux ne recommandaient pas."
   — Sarah K. · Journaliste, Mexico

4. "Enfin une app qui pense à la sécurité physique et pas juste
   à la cybersécurité. Le chaînon manquant."
   — Thomas B. · Directeur RH, Lyon

5. "Mon équipe RH a enfin arrêté de s'inquiéter quand je suis
   en déplacement. Ça n'a pas de prix."
   — Isabelle M. · Dirigeante, Bordeaux

────────────────────────────────────────
SECTION 09 — FAQ
────────────────────────────────────────
Composant : FAQSection.tsx

- Fond : #070c09 · maxWidth: 800px · centré
- Titre : "Les vraies questions." + ligne 2 en #00ff88 : "Les vraies réponses."

ACCORDION : 6 questions
border: 1px solid rgba(0,255,136,0.15) → passe à rgba(0,255,136,0.27) si ouvert
Icône : "+" qui rotate(0→45deg) à l'ouverture
max-height transition: 0 → 200px · duration: 400ms · easing: ease

Q1 : "Sekura fonctionne sans connexion internet ?"
A1 : "Les heatmaps sont mises en cache localement. L'essentiel fonctionne
     offline — y compris le SOS qui passe par SMS si le data est indisponible."

Q2 : "Mes données de position sont-elles partagées ?"
A2 : "Ta position n'est JAMAIS vendue ni partagée avec des tiers. Elle est
     transmise uniquement à tes contacts de confiance, quand tu le décides."

Q3 : "L'app consomme beaucoup de batterie ?"
A3 : "Mode optimisé par défaut : moins de 3% de batterie par heure.
     Le tracking GPS s'adapte à ta vitesse de déplacement."

Q4 : "Disponible dans quels pays ?"
A4 : "Mexique, Colombie, Brésil, Argentine, Pérou, Chili et 12 autres pays
     au lancement. Europe dès Q2 2025."

Q5 : "Que se passe-t-il après les 3 mois gratuits ?"
A5 : "Tu choisis de continuer (membres fondateurs = tarif préférentiel à vie)
     ou tu arrêtes. Sans friction. Aucun engagement."

Q6 : "La heatmap est mise à jour à quelle fréquence ?"
A6 : "Données rafraîchies toutes les 6h depuis sources officielles +
     signalements communauté vérifiés. Toujours plus précis qu'hier."

────────────────────────────────────────
SECTION 10 — CTA FINAL
────────────────────────────────────────
Composant : CTAFinalSection.tsx

- Fond : #0d1410 · padding: 120px vertical
- Background effect : radial-gradient centré rgba(0,255,136,0.05)

- Titre principal (style identique Hero) :
  "247 personnes" (blanc) + saut de ligne
  "dorment mieux." (color: #00ff88) + saut de ligne
  "Et toi ?" (italic · 0.75em · color: rgba(255,255,255,0.5))
  fontSize: clamp(36px, 6vw, 72px) · fontWeight: 900

- Barre de progression :
  Labels : "247 personnes protégées" à gauche · "253 places restantes" à droite
  monospace · fontSize: 11px · color: rgba(255,255,255,0.4)
  Barre : height: 4px · background rgba(255,255,255,0.08) · borderRadius: 2px
  Fill animé : width: 49.4% · linear-gradient(#00cc6a, #00ff88)
  Animation width: 0 → 49.4% au scroll · duration: 1500ms · ease

- WaitlistForm existant centré — NE PAS RETOUCHER LA LOGIQUE
  Wrapper uniquement : max-width: 480px · margin: 0 auto

- Texte de réassurance sous le form :
  "Aucune carte bancaire. Aucun engagement. Juste ton email."
  monospace · fontSize: 11px · color: rgba(255,255,255,0.25) · letterSpacing: 1px

────────────────────────────────────────
FLOATING STICKY CTA
────────────────────────────────────────

- Bouton fixed bottom-right, zIndex: 9999
- Apparaît après 30% de scroll avec transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1)
  Caché : translateY(120px) / Visible : translateY(0)
- Disparaît quand CTAFinalSection est dans le viewport
- Background: #00ff88 · color: #070c09 · fontFamily: monospace
- Texte : "● Rejoindre · 3 mois offerts →"  (● en animation pulse)
- boxShadow: 0 0 40px rgba(0,255,136,0.4)
- Mobile : full-width · fixed bottom: 0 · border-radius: 0

────────────────────────────────────────
MICRO-ANIMATIONS GLOBALES
────────────────────────────────────────

Crée un hook useInView.ts réutilisable :
  Intersection Observer · threshold: 0.15
  Applique à tous les éléments data-animate="fade-up"
  Animation : translateY(30px→0) + opacity(0→1)
  duration: 600ms · easing: cubic-bezier(0.16, 1, 0.3, 1)
  Stagger entre éléments enfants : 80ms via CSS animation-delay

CURSEUR CUSTOM (desktop uniquement — media: hover:hover) :
  div cercle #00ff88/30 · width/height: 40px · border-radius: 50%
  border: 1px solid #00ff88
  position: fixed · pointer-events: none · zIndex: 9998
  Suivi souris avec lerp (smoothing factor 0.12) via requestAnimationFrame
  Sur hover d'un <a> ou <button> : scale(1.8) + opacity(0.6) · transition: 300ms
  Désactivé sur mobile et tactile

SCROLL PROGRESS BAR :
  Barre horizontale fixed top: 0 · height: 2px · zIndex: 9999
  background: linear-gradient(to right, #00cc6a, #00ff88)
  width synchronisée au scroll (0% → 100%)

TRANSITIONS DE PAGE :
  opacity: 0 → 1 · duration: 400ms au chargement initial
```

---

## 📌 PROMPT #5 — OPTIMISATION MOBILE & PERFORMANCE
### *(Envoie après validation visuelle sur desktop)*

```
Optimise le site pour mobile et les performances.

MOBILE (max-width: 768px) :
- Assets Spline désactivés → remplacer par image statique PNG
  (capture du meilleur frame de chaque asset)
- Animations réduites : opacity uniquement, pas de translateY
- Curseur custom désactivé
- Grid comparatif → table avec overflow-x: scroll
- 3 personas → carousel swipeable (1 card visible à la fois)
- Phone mockups : centrer, width: 180px
- Sticky CTA : full-width fixed bottom

Utilise : const isMobile = useMediaQuery('(max-width: 768px)')

PERFORMANCE :
- Assets Spline : lazy-loaded avec dynamic import + Suspense
- Intersection Observer : ne charge les mockups animés qu'au viewport
- Purge Tailwind classes inutilisées
- Vérifie : LCP < 2.5s · Lighthouse mobile > 85

NEXT.CONFIG.JS — ajouter si pas déjà présent :
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}
```

---

## 🛡️ PROMPT DE CORRECTION D'URGENCE
### *(Utilise si quelque chose casse)*

```
Le code généré a cassé [DÉCRIS LE PROBLÈME EXACT].

Contraintes absolues non respectées :
- Ne pas toucher /app/api/* ni lib/supabase.ts / lib/resend.ts
- Le WaitlistForm existant reste intact et fonctionnel
- L'i18n (useTranslations) doit rester opérationnel
- Le design system Sekura : fond #070c09, accent #00ff88

Corrige UNIQUEMENT le composant [NOM_DU_COMPOSANT].
Montre-moi le diff exact avant/après.
Ne touche à rien d'autre.
```

---

*SEKURA — Built different. · AntiGravity × Spline · Mars 2026*
