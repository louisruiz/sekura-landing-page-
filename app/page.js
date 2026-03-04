'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'

// ── TRANSLATIONS (toutes langues, tout le site) ───────────────────────────────
const T = {
  fr: {
    // Nav
    navFeatures: 'Fonctionnalités', navPricing: 'Tarifs', navFaq: 'FAQ',
    navCta: 'Rejoindre la whitelist',
    // Badge
    badge: '● BIENTÔT DISPONIBLE · EUROPE & AMÉRIQUE',
    // Hero
    heroTitle: ['Tu as le droit', 'de bouger', 'sans peur.'],
    heroEmphasis: 'sans peur.',
    heroSubtitle: 'Que tu rentres seule le soir à Paris, que tu voyages à Medellín ou que tu vis à São Paulo — Sekura te protège en temps réel. Heatmap IA des zones à risque, SOS discret, navigation sécurisée. Partout où tu vas.',
    heroPlaceholder: 'Ton adresse email',
    heroCta: 'Rejoindre la whitelist →',
    heroPrivacy: '🔒 Gratuit pour toujours · Aucun spam · Accès prioritaire à la beta',
    successTitle: 'Tu es sur la liste !',
    successDesc: 'On te contacte en avant-première au lancement. Welcome aboard.',
    // Metrics
    metricAdopters: 'EARLY ADOPTERS', metricMarket: 'MARCHÉ GLOBAL', metricBeta: 'BETA FERMÉE',
    // Sections tags
    tag01: '01 / Le Problème', tag02: '02 / Notre Réponse', tag03: '03 / Pour qui ?',
    tag04: '04 / Comment ça marche', tag05: '05 / Beta Testers', tag06: '06 / FAQ', tag07: '07 / Whitelist',
    // Problem
    problemTitle: "L'insécurité n'est pas un problème là-bas.",
    problemEmphasis: "C'est un problème partout.",
    problemSubtitle: "Rentrer seule la nuit à Paris. Voyager seul à Medellín. Vivre à São Paulo. Ce sont des millions de personnes qui modifient leurs trajets, évitent des rues, gardent leur téléphone dans la main. Sans outil à la hauteur.",
    // Solution
    solutionQuote: '"La première app qui donne à chacun — ou qu\'il soit — le même niveau de protection que ceux qui peuvent se payer',
    solutionEmphasis: 'un garde du corps."',
    // Use cases
    usecasesTitle: "Sekura s'adapte à ton profil.",
    usecasesSubtitle: 'Trois réalités très différentes, une seule app.',
    // How it works
    howTitle: 'Opérationnel(le) en 90 secondes.',
    howSubtitle: 'Onboarding conçu pour être ultra-rapide.',
    // Testimonials
    testimonialTitle: 'Ils testent Sekura en avant-première.',
    // Waitlist CTA
    waitlistBadge: '⚡ OFFRE EARLY BIRD · 500 PLACES',
    waitlistTitle: ['Sois parmi les premiers.', 'Rejoins la whitelist.'],
    waitlistEmphasis: 'Rejoins la whitelist.',
    waitlistSubtitle: 'Les 500 premiers inscrits obtiennent 3 mois de Smart Safety gratuit + accès beta fermée. Aucune carte bancaire.',
    waitlistCounter: (count) => `${count} personnes inscrites · Encore ${Math.max(0, 500 - count)} places en accès Early Bird`,
    // FAQ tag
    faqTitle: 'Les questions fréquentes.',
    faqs: [
      { q: 'Qu\'est-ce que la whitelist Sekura ?', a: 'La whitelist te donne un accès prioritaire à la beta fermée avant le lancement public. Les 500 premiers inscrits obtiennent 3 mois de plan Smart Safety gratuit. Aucune carte bancaire.' },
      { q: 'Dans quels pays Sekura sera disponible au lancement ?', a: 'Sekura sera disponible mondialement dès le lancement. Les données de heatmap couvriront d\'abord Medellín et CDMX, avec expansion rapide Brésil et toute la LATAM.' },
      { q: 'Comment fonctionne le mode offline ?', a: 'Sans connexion internet, le SOS se déclenche par SMS via Twilio. La dernière heatmap téléchargée reste accessible localement. L\'app occupe moins de 30MB pour appareils entrée de gamme.' },
      { q: 'Mes données de localisation sont-elles partagées ?', a: 'Non. Aucune donnée de localisation n\'est stockée sans consentement explicite. Les SOS sont chiffrés de bout en bout. Sekura est privacy-first par architecture.' },
      { q: 'La personne à alerter doit-elle avoir Sekura ?', a: 'Non. Tes contacts reçoivent un lien SMS accessible dans n\'importe quel navigateur, sans app.' },
      { q: 'Sekura remplace-t-elle les services d\'urgence officiels ?', a: 'Non. Sekura est un outil d\'aide complémentaire, pas un service de secours professionnel. Sekura agit en premier rideau — alerte tes proches — mais ne se substitue pas aux secours.' },
    ],
    // Footer
    footerTagline: 'La sécurité personnelle intelligente. Pour les femmes, les voyageurs, les familles — en Europe, en Amérique Latine, partout où tu vas.',
    footerProduct: 'Produit', footerMarkets: 'Marchés', footerLegal: 'Légal',
    footerBottom: "© 2025 Sekura. Tous droits réservés. · Sekura est un outil d'aide, pas un service de secours professionnel.",
    // Language modal
    langTitle: 'Choisir la langue',
    // Ticker items
    tickerItems: [
      { icon: '👩', num: '1 femme / 3', desc: '— a modifié son trajet par peur — en France, en 2024' },
      { icon: '🌎', num: '40 / 50', desc: '— villes les + dangereuses du monde situées en LATAM' },
      { icon: '✈️', num: '+12M', desc: '— touristes européens visitent l\'Amérique Latine chaque année' },
      { icon: '⏱', num: '30-60 min', desc: '— délai moyen d\'intervention policière en zone urbaine' },
      { icon: '📈', num: '$3.85Md', desc: '— marché Women Safety mondial · CAGR 14.5%' },
      { icon: '🔒', num: '< 3 sec', desc: '— pour déclencher un SOS discret sans regarder l\'écran' },
    ],
    // Problem cards
    problemCards: [
      { num: '1 / 3', title: 'Femmes ont modifié leur trajet par peur', desc: 'En France, au Royaume-Uni, en Espagne — pas seulement en LATAM. La peur de bouger seule la nuit est un problème mondial. Aucune app grand public n\'y répond sérieusement.', source: 'HAUT CONSEIL À L\'ÉGALITÉ · FRANCE 2024' },
      { num: '40 / 50', title: 'Villes les plus dangereuses sont en LATAM', desc: '12 millions de touristes européens visitent l\'Amérique Latine chaque année. Beaucoup ne connaissent pas la géographie des risques locaux — zones cartel, quartiers à éviter, arnaques aux expats.', source: 'WORLD POPULATION REVIEW 2025' },
      { num: '30-60', title: 'Minutes d\'attente pour la police en urgence', desc: 'En zone urbaine — Bogota, Mexico ou certaines banlieues européennes. En 30 minutes, tout peut être trop tard. Il faut alerter ses proches en secondes, pas en minutes.', source: 'ÉTUDE MARCHÉ SEKURA 2026' },
      { num: '0', title: 'App vraiment conçue pour ces réalités', desc: 'Life360, bSafe, Noonlight : pensées pour les États-Unis. Aucune ne propose de SOS activable sans regarder l\'écran, de détection de déviation d\'itinéraire, ni de mode hors-ligne robuste.', source: 'ANALYSE CONCURRENTIELLE SEKURA' },
    ],
    features: [
      { num: '01', cat: 'PROTECTION TEMPS RÉEL', icon: '🗺️', title: 'Heatmap IA des zones à risque', desc: 'Carte vivante mise à jour en continu. Analyse signalements communautaires + données d\'incidents + presse locale. Granularité de 50m x 50m. Zones colorées par niveau de risque.', chips: ['🇫🇷 Rentrer seule à Paris', '🇨🇴 Visiter Medellín', '🇧🇷 Se déplacer à São Paulo', '🌍 Toute ville du monde'], badge: { color: 'green', text: 'GRATUIT · CORE SAFETY' } },
      { num: '02', cat: 'URGENCE DISCRÈTE', icon: '🤫', title: 'SOS discret — sans regarder l\'écran', desc: 'Triple-clic sur le bouton volume = SOS silencieux instantané. 5 contacts alertés avec GPS exact par notification + SMS. Aucun visuel sur l\'écran. Personne autour ne le voit.', compare: { bad: 'Autres apps : SOS visible à l\'écran', good: 'Sekura : invisible, 3 clics volume' }, badge: { color: 'red', text: 'CRITIQUE · MODE DISCRET' } },
      { num: '03', cat: 'DÉPLACEMENT INTELLIGENT', icon: '🧭', title: 'Navigation sécurisée anti-crime', desc: 'Itinéraire évitant les zones à risque actives, mis à jour en temps réel. Pas juste le trafic — la sécurité. Tu arrives par le chemin le plus sûr, pas le plus court.', chips: ['🌙 Trajet de nuit', '🎒 Touriste dans une ville inconnue', '📦 Livreur / Moto-taxi'], badge: { color: 'sky', text: 'SMART SAFETY · $2.99/MOIS' } },
      { num: '04', cat: 'SÉCURITÉ AUTOMATIQUE', icon: '⏱', title: 'Timer de sécurité + check-in auto', desc: 'Programme ton arrivée prévue. Si tu ne confirmes pas : Sekura alerte automatiquement tes contacts, puis escalade si nécessaire. Aussi pour les enfants : check-in auto à l\'arrivée à l\'école.', chips: ['👧 Enfant qui rentre seul', '🏠 Retour domicile tardif', '👴 Parent âgé'], badge: { color: 'green', text: 'GRATUIT · CORE SAFETY' } },
      { num: '05', cat: 'PROTECTION AVANCÉE', icon: '🚨', title: 'Détection automatique de situation anormale', desc: 'La protection qui travaille même quand tu ne peux pas interagir avec l\'app. Sekura analyse ton comportement GPS en temps réel. Alerte automatique sans que tu aies à rien faire.', badge: { color: 'gold', text: 'PREMIUM PROTECTION' }, detectors: [{ icon: '📍', title: 'Déviation d\'itinéraire', desc: 'Tu t\'éloignes inexplicablement de ton trajet prévu' }, { icon: '🛑', title: 'Immobilisation suspecte', desc: 'Téléphone immobile 20 min dans une zone à risque' }, { icon: '⚡', title: 'Zone dangereuse à venir', desc: 'Alerte AVANT que tu n\'entres dans la zone' }] },
      { num: '06', cat: 'HORS LIGNE', icon: '📵', title: 'Mode offline total', desc: 'Sans connexion : SOS par SMS. Dernière heatmap accessible localement. Indispensable zones rurales, Amazonie, Andes. APK < 30MB appareils entrée de gamme.', badge: { color: 'green', text: 'GRATUIT · SMS FALLBACK' } },
      { num: '07', cat: 'EXTRACTION', icon: '📞', title: 'Faux appel d\'extraction', desc: 'Appel entrant simulé avec voix IA en espagnol, portugais ou français. Pour s\'extraire d\'une situation dangereuse sans attirer l\'attention. Personnalisable.', badge: { color: 'green', text: 'GRATUIT · DISCRET' } },
      { num: '08', cat: 'INTELLIGENCE', icon: '🤖', title: 'Assistant IA sécurité 24/7', desc: 'Powered by Claude (Anthropic). Répond aux questions de sécurité en contexte local : "Est-ce sûr d\'aller à Chapinero ce soir ?" / "Quel taxi appeler à CDMX ?"', badge: { color: 'gold', text: 'PREMIUM · $7.99/MOIS' } },
      { num: '09', cat: 'RÉSEAU PRIVÉ', icon: '👥', title: 'Réseau de confiance', desc: 'Alertes directes sans intermédiaire. Les contacts reçoivent ta position via un lien SMS — SANS AVOIR BESOIN D\'INSTALLER L\'APP.', chips: ['💬 Fonctionne via SMS', '🌐 Lien dans n\'importe quel navigateur', '📲 Jusqu\'à 5 contacts', '🔒 Chiffrement E2E'], badge: { color: 'green', text: 'GRATUIT · CORE SAFETY' } },
      { num: '10', cat: 'PROFIL VOYAGEUR', icon: '✈️', title: 'Rapport de risque personnalisé avant départ', desc: 'Rapport complet sur ta destination : zones à éviter, quartiers recommandés, alertes ambassade, risques spécifiques profil étranger. Tu arrives préparé, pas surpris.', chips: ['🇫🇷 Voyageur européen', '💼 Professionnel en mission', '🎒 Backpacker solo'], badge: { color: 'gold', text: 'PREMIUM · $7.99/MOIS' } },
    ],
    useCases: [
      { icon: '👩', num: '01', label: 'Femme · Partout dans le monde', pain: 'Tu rentres seule le soir. Tu évites certaines rues. Tu gardes ton téléphone dans la main. À Paris, à Londres, à Bogota — c\'est la même peur. Tu veux de la discrétion, pas paraître vulnérable.', features: ['SOS discret · triple-clic volume, sans regarder l\'écran', 'Alerte silencieuse vers tes 5 contacts de confiance', 'Alertes prédictives avant d\'entrer dans une zone à risque', 'Navigation sécurisée pour tes trajets du quotidien', 'Timer : si tu n\'arrives pas à l\'heure, tes proches sont alertés'] },
      { icon: '✈️', num: '02', label: 'Voyageur · Solo traveler · Expat', pain: 'Tu pars en Colombie, au Mexique, au Brésil. Tu ne connais pas la géographie des risques. Tu es une cible : touriste, téléphone visible, sans réseau local. Les guides de voyage ne te disent pas tout.', features: ['Heatmap IA dès l\'atterrissage · connais ta zone en 30 sec', 'Rapport de risque personnalisé avant ton départ', 'Navigation sécurisée · évite les zones dangereuses en temps réel', 'Assistant IA sécurité 24/7 · "Est-ce sûr d\'aller ici ce soir ?"', 'Alertes ambassade + zones à éviter pour profil étranger'] },
      { icon: '👨‍👩‍👧', num: '03', label: 'Familles · Proches · Étudiants', pain: 'Ton fils prend le métro seul. Ta fille rentre de soirée. Tes parents voyagent en LATAM. Tu veux être là sans être intrusif — juste savoir qu\'ils sont arrivés.', features: ['Suivi GPS temps réel de tous les membres', 'Geofencing · alerte si sortie d\'une zone définie', 'Check-in automatique à l\'arrivée (école, domicile, hôtel)', 'Timer partagé · si pas de confirmation → tu es alerté', 'Dashboard famille · tous tes proches sur un seul écran'] },
    ],
    howSteps: [
      { num: '1', icon: '📲', title: 'Télécharge Sekura', desc: 'Ton numéro de téléphone suffit. Pas de mot de passe. Connexion OTP 10 secondes.' },
      { num: '2', icon: '👥', title: 'Ajoute tes contacts', desc: '2 à 5 personnes de confiance. Reçoivent alertes SMS même sans l\'app.' },
      { num: '3', icon: '🗺️', title: 'Consulte la heatmap', desc: 'Avant chaque sortie. Vérifie les zones. Planifie ton trajet.' },
      { num: '4', icon: '🛡️', title: 'Voyage protégé(e)', desc: 'Sekura en arrière-plan. Triple-clic volume en cas de danger. Proches alertés instantanément.' },
    ],
  },
  en: {
    navFeatures: 'Features', navPricing: 'Pricing', navFaq: 'FAQ',
    navCta: 'Join the waitlist',
    badge: '● COMING SOON · EUROPE & AMERICAS',
    heroTitle: ['You deserve to', 'move without fear.', 'Everywhere.'],
    heroEmphasis: 'without fear.',
    heroSubtitle: 'Whether you walk home alone in London, travel to Medellín or live in São Paulo — Sekura protects you in real time. AI risk zone heatmap, silent SOS, safe navigation. Wherever you go.',
    heroPlaceholder: 'Your email address',
    heroCta: 'Join the waitlist →',
    heroPrivacy: '🔒 Free forever · No spam · Priority beta access',
    successTitle: "You're on the list!",
    successDesc: "We'll reach out before launch. Welcome aboard.",
    metricAdopters: 'EARLY ADOPTERS', metricMarket: 'GLOBAL MARKET', metricBeta: 'CLOSED BETA',
    tag01: '01 / The Problem', tag02: '02 / Our Solution', tag03: '03 / Who is it for?',
    tag04: '04 / How it works', tag05: '05 / Beta Testers', tag06: '06 / FAQ', tag07: '07 / Waitlist',
    problemTitle: "Insecurity isn't just a problem over there.",
    problemEmphasis: "It's a problem everywhere.",
    problemSubtitle: "Walking home at night in Paris. Traveling solo in Medellín. Living in São Paulo. Millions of people change their routes, avoid streets, keep their phone in hand. Without a proper tool.",
    solutionQuote: '"The first app that gives everyone — wherever they are — the same level of protection as those who can afford',
    solutionEmphasis: 'a bodyguard."',
    usecasesTitle: "Sekura adapts to your profile.",
    usecasesSubtitle: 'Three very different realities, one app.',
    howTitle: 'Up and running in 90 seconds.',
    howSubtitle: 'Onboarding designed to be ultra-fast.',
    testimonialTitle: 'They are testing Sekura first.',
    waitlistBadge: '⚡ EARLY BIRD OFFER · 500 SPOTS',
    waitlistTitle: ['Be among the first.', 'Join the waitlist.'],
    waitlistEmphasis: 'Join the waitlist.',
    waitlistSubtitle: 'The first 500 subscribers get 3 months of Smart Safety free + closed beta access. No credit card.',
    waitlistCounter: (count) => `${count} people signed up · Still ${Math.max(0, 500 - count)} Early Bird spots left`,
    faqTitle: 'Frequently asked questions.',
    faqs: [
      { q: 'What is the Sekura waitlist?', a: 'The waitlist gives you priority access to the closed beta before the public launch. The first 500 subscribers get 3 months of Smart Safety plan free. No credit card required.' },
      { q: 'In which countries will Sekura be available at launch?', a: 'Sekura will be available worldwide from launch. Heatmap data will first cover Medellín and CDMX, with rapid expansion to Brazil and all of LATAM.' },
      { q: 'How does offline mode work?', a: 'Without internet connection, SOS is triggered via SMS through Twilio. The last downloaded heatmap remains accessible locally. The app is less than 30MB for entry-level devices.' },
      { q: 'Is my location data shared?', a: 'No. No location data is stored without explicit consent. SOS messages are end-to-end encrypted. Sekura is privacy-first by design.' },
      { q: 'Does the person to alert need to have Sekura?', a: 'No. Your contacts receive an SMS link accessible in any browser, without the app.' },
      { q: 'Does Sekura replace official emergency services?', a: 'No. Sekura is a complementary support tool, not a professional emergency service. Sekura acts as a first line — alerting your loved ones — but does not replace emergency services.' },
    ],
    footerTagline: 'Intelligent personal safety. For women, travelers, families — in Europe, Latin America, everywhere you go.',
    footerProduct: 'Product', footerMarkets: 'Markets', footerLegal: 'Legal',
    footerBottom: '© 2025 Sekura. All rights reserved. · Sekura is a support tool, not a professional emergency service.',
    langTitle: 'Choose language',
    // Ticker items
    tickerItems: [
      { icon: '👩', num: '1 in 3', desc: '— women changed their route due to fear — in France, in 2024' },
      { icon: '🌎', num: '40 / 50', desc: '— most dangerous cities in the world are in LATAM' },
      { icon: '✈️', num: '+12M', desc: '— European tourists visit Latin America every year' },
      { icon: '⏱', num: '30-60 min', desc: '— average police response time in urban areas' },
      { icon: '📈', num: '$3.85Bn', desc: '— Women Safety global market · CAGR 14.5%' },
      { icon: '🔒', num: '< 3 sec', desc: '— to trigger a discreet SOS without looking at screen' },
    ],
    // Problem cards
    problemCards: [
      { num: '1 / 3', title: 'Women changed their route due to fear', desc: 'In France, UK, Spain — not just in LATAM. The fear of moving alone at night is a global problem. No mainstream app addresses it seriously.', source: 'HIGH COUNCIL FOR EQUALITY · FRANCE 2024' },
      { num: '40 / 50', title: 'Most dangerous cities are in LATAM', desc: '12 million European tourists visit Latin America every year. Many don\'t know the local risk geography — cartel zones, neighborhoods to avoid, expat scams.', source: 'WORLD POPULATION REVIEW 2025' },
      { num: '30-60', title: 'Minutes waiting for police in emergency', desc: 'In urban areas — Bogota, Mexico or some European suburbs. In 30 minutes, everything can be too late. You need to alert your loved ones in seconds, not minutes.', source: 'SEKURA MARKET STUDY 2026' },
      { num: '0', title: 'App truly designed for these realities', desc: 'Life360, bSafe, Noonlight: designed for the US. None offer SOS without looking at screen, route deviation detection, or robust offline mode.', source: 'SEKURA COMPETITIVE ANALYSIS' },
    ],
    features: [
      { num: '01', cat: 'REAL-TIME PROTECTION', icon: '🗺️', title: 'AI Risk Zone Heatmap', desc: 'Living map continuously updated. Analyzes community reports + incident data + local press. 50m x 50m granularity. Zones colored by risk level.', chips: ['🇬🇧 Walking home in London', '🇨🇴 Visiting Medellín', '🇧🇷 Moving in São Paulo', '🌍 Any city worldwide'], badge: { color: 'green', text: 'FREE · CORE SAFETY' } },
      { num: '02', cat: 'DISCREET EMERGENCY', icon: '🤫', title: 'Discreet SOS — without looking at screen', desc: 'Triple-click volume button = instant silent SOS. 5 contacts alerted with exact GPS via notification + SMS. No visual on screen. Nobody around sees it.', compare: { bad: 'Other apps: SOS visible on screen', good: 'Sekura: invisible, 3 volume clicks' }, badge: { color: 'red', text: 'CRITICAL · DISCREET MODE' } },
      { num: '03', cat: 'SMART MOVEMENT', icon: '🧭', title: 'Anti-crime safe navigation', desc: 'Route avoiding active risk zones, updated in real time. Not just traffic — safety. You arrive by the safest path, not the shortest.', chips: ['🌙 Night travel', '🎒 Tourist in unknown city', '📦 Delivery / Moto-taxi'], badge: { color: 'sky', text: 'SMART SAFETY · $2.99/MONTH' } },
      { num: '04', cat: 'AUTOMATIC SECURITY', icon: '⏱', title: 'Safety timer + auto check-in', desc: 'Set your expected arrival. If you don\'t confirm: Sekura automatically alerts your contacts, then escalates if needed. Also for kids: auto check-in upon arrival at school.', chips: ['👧 Child going home alone', '🏠 Late home return', '👴 Elderly parent'], badge: { color: 'green', text: 'FREE · CORE SAFETY' } },
      { num: '05', cat: 'ADVANCED PROTECTION', icon: '🚨', title: 'Automatic abnormal situation detection', desc: 'Protection that works even when you can\'t interact with the app. Sekura analyzes your GPS behavior in real time. Automatic alert without you having to do anything.', badge: { color: 'gold', text: 'PREMIUM PROTECTION' }, detectors: [{ icon: '📍', title: 'Route deviation', desc: 'You\'re inexplicably moving away from your planned route' }, { icon: '🛑', title: 'Suspicious immobilization', desc: 'Phone immobile 20 min in a risk zone' }, { icon: '⚡', title: 'Dangerous zone ahead', desc: 'Alert BEFORE you enter the zone' }] },
      { num: '06', cat: 'OFFLINE', icon: '📵', title: 'Total offline mode', desc: 'Without connection: SOS via SMS. Last heatmap accessible locally. Essential for rural areas, Amazon, Andes. APK < 30MB entry-level devices.', badge: { color: 'green', text: 'FREE · SMS FALLBACK' } },
      { num: '07', cat: 'EXTRACTION', icon: '📞', title: 'Fake extraction call', desc: 'Simulated incoming call with AI voice in Spanish, Portuguese or French. To extract yourself from a dangerous situation without drawing attention. Customizable.', badge: { color: 'green', text: 'FREE · DISCREET' } },
      { num: '08', cat: 'INTELLIGENCE', icon: '🤖', title: '24/7 AI security assistant', desc: 'Powered by Claude (Anthropic). Answers security questions in local context: "Is it safe to go to Chapinero tonight?" / "Which taxi to call in CDMX?"', badge: { color: 'gold', text: 'PREMIUM · $7.99/MONTH' } },
      { num: '09', cat: 'PRIVATE NETWORK', icon: '👥', title: 'Trust network', desc: 'Direct alerts without intermediary. Contacts receive your location via SMS link — WITHOUT NEEDING TO INSTALL THE APP.', chips: ['💬 Works via SMS', '🌐 Link in any browser', '📲 Up to 5 contacts', '🔒 E2E encryption'], badge: { color: 'green', text: 'FREE · CORE SAFETY' } },
      { num: '10', cat: 'TRAVELER PROFILE', icon: '✈️', title: 'Personalized risk report before departure', desc: 'Complete report on your destination: zones to avoid, recommended neighborhoods, embassy alerts, foreign profile specific risks. You arrive prepared, not surprised.', chips: ['🇬🇧 European traveler', '💼 Professional on mission', '🎒 Solo backpacker'], badge: { color: 'gold', text: 'PREMIUM · $7.99/MONTH' } },
    ],
    useCases: [
      { icon: '👩', num: '01', label: 'Woman · Worldwide', pain: 'You walk home alone at night. You avoid certain streets. You keep your phone in hand. In Paris, London, Bogota — it\'s the same fear. You want discretion, not to appear vulnerable.', features: ['Discreet SOS · triple-click volume, without looking at screen', 'Silent alert to your 5 trusted contacts', 'Predictive alerts before entering a risk zone', 'Safe navigation for your daily routes', 'Timer: if you don\'t arrive on time, your loved ones are alerted'] },
      { icon: '✈️', num: '02', label: 'Traveler · Solo traveler · Expat', pain: 'You go to Colombia, Mexico, Brazil. You don\'t know the risk geography. You\'re a target: tourist, visible phone, no local network. Travel guides don\'t tell you everything.', features: ['AI heatmap upon landing · know your area in 30 sec', 'Personalized risk report before departure', 'Safe navigation · avoid dangerous zones in real time', '24/7 AI security assistant · "Is it safe to go here tonight?"', 'Embassy alerts + zones to avoid for foreign profile'] },
      { icon: '👨‍👩‍👧', num: '03', label: 'Families · Relatives · Students', pain: 'Your son takes the subway alone. Your daughter comes home from a party. Your parents travel in LATAM. You want to be there without being intrusive — just know they arrived.', features: ['Real-time GPS tracking of all members', 'Geofencing · alert if leaving a defined zone', 'Automatic check-in upon arrival (school, home, hotel)', 'Shared timer · if no confirmation → you\'re alerted', 'Family dashboard · all your loved ones on one screen'] },
    ],
    howSteps: [
      { num: '1', icon: '📲', title: 'Download Sekura', desc: 'Your phone number is enough. No password. OTP connection 10 seconds.' },
      { num: '2', icon: '👥', title: 'Add your contacts', desc: '2 to 5 trusted people. Receive SMS alerts even without the app.' },
      { num: '3', icon: '🗺️', title: 'Check the heatmap', desc: 'Before each outing. Check the zones. Plan your route.' },
      { num: '4', icon: '🛡️', title: 'Travel protected', desc: 'Sekura in background. Triple-click volume in case of danger. Loved ones alerted instantly.' },
    ],
  },
  es: {
    navFeatures: 'Funcionalidades', navPricing: 'Precios', navFaq: 'FAQ',
    navCta: 'Unirse a la lista',
    badge: '● PRÓXIMAMENTE · EUROPA & AMÉRICAS',
    heroTitle: ['Tienes derecho a', 'moverte sin miedo.', 'En todas partes.'],
    heroEmphasis: 'sin miedo.',
    heroSubtitle: 'Ya sea que vuelvas sola en Madrid, viajes a Medellín o vivas en Ciudad de México — Sekura te protege en tiempo real. Mapa de calor IA de zonas de riesgo, SOS discreto, navegación segura. Donde vayas.',
    heroPlaceholder: 'Tu correo electrónico',
    heroCta: 'Unirse a la lista →',
    heroPrivacy: '🔒 Gratis para siempre · Sin spam · Acceso prioritario',
    successTitle: '¡Estás en la lista!',
    successDesc: 'Te contactamos antes del lanzamiento. Welcome aboard.',
    metricAdopters: 'EARLY ADOPTERS', metricMarket: 'MERCADO GLOBAL', metricBeta: 'BETA CERRADA',
    tag01: '01 / El Problema', tag02: '02 / Nuestra Respuesta', tag03: '03 / ¿Para quién?',
    tag04: '04 / Cómo funciona', tag05: '05 / Beta Testers', tag06: '06 / FAQ', tag07: '07 / Lista de espera',
    problemTitle: 'La inseguridad no es solo un problema allá.',
    problemEmphasis: 'Es un problema en todas partes.',
    problemSubtitle: 'Volver sola de noche en Madrid. Viajar solo a Medellín. Vivir en São Paulo. Son millones de personas que cambian sus rutas, evitan calles, guardan el teléfono en la mano. Sin herramienta adecuada.',
    solutionQuote: '"La primera app que da a todos — donde estén — el mismo nivel de protección que quienes pueden permitirse',
    solutionEmphasis: 'un guardaespaldas."',
    usecasesTitle: 'Sekura se adapta a tu perfil.',
    usecasesSubtitle: 'Tres realidades muy diferentes, una sola app.',
    howTitle: 'Operativo en 90 segundos.',
    howSubtitle: 'Onboarding diseñado para ser ultra-rápido.',
    testimonialTitle: 'Están probando Sekura en primicia.',
    waitlistBadge: '⚡ OFERTA EARLY BIRD · 500 PLAZAS',
    waitlistTitle: ['Sé de los primeros.', 'Únete a la lista.'],
    waitlistEmphasis: 'Únete a la lista.',
    waitlistSubtitle: 'Los primeros 500 inscritos obtienen 3 meses de Smart Safety gratis + acceso beta cerrada. Sin tarjeta de crédito.',
    waitlistCounter: (count) => `${count} personas inscritas · Quedan ${Math.max(0, 500 - count)} plazas Early Bird`,
    faqTitle: 'Preguntas frecuentes.',
    faqs: [
      { q: '¿Qué es la lista de espera de Sekura?', a: 'La lista te da acceso prioritario a la beta cerrada antes del lanzamiento público. Los primeros 500 inscritos obtienen 3 meses de Smart Safety gratis. Sin tarjeta de crédito.' },
      { q: '¿En qué países estará disponible Sekura en el lanzamiento?', a: 'Sekura estará disponible mundialmente desde el lanzamiento. Los datos del mapa de calor cubrirán primero Medellín y CDMX, con expansión rápida a Brasil y toda LATAM.' },
      { q: '¿Cómo funciona el modo offline?', a: 'Sin conexión a internet, el SOS se activa por SMS a través de Twilio. El último mapa de calor descargado sigue accesible localmente. La app ocupa menos de 30MB para dispositivos de gama básica.' },
      { q: '¿Se comparten mis datos de ubicación?', a: 'No. Ningún dato de ubicación se almacena sin consentimiento explícito. Los SOS están cifrados de extremo a extremo. Sekura es privacy-first por diseño.' },
      { q: '¿La persona a alertar necesita tener Sekura?', a: 'No. Tus contactos reciben un enlace SMS accesible desde cualquier navegador, sin app.' },
      { q: '¿Sekura reemplaza los servicios de emergencia oficiales?', a: 'No. Sekura es una herramienta de apoyo complementaria, no un servicio de emergencia profesional. Sekura actúa como primera línea — alertando a tus seres queridos — pero no sustituye a los servicios de emergencia.' },
    ],
    footerTagline: 'Seguridad personal inteligente. Para mujeres, viajeros, familias — en Europa, América Latina, donde vayas.',
    footerProduct: 'Producto', footerMarkets: 'Mercados', footerLegal: 'Legal',
    footerBottom: '© 2025 Sekura. Todos los derechos reservados. · Sekura es una herramienta de apoyo, no un servicio de emergencia profesional.',
    langTitle: 'Elegir idioma',
    // Ticker items
    tickerItems: [
      { icon: '👩', num: '1 de 3', desc: '— mujeres cambiaron su ruta por miedo — en Francia, en 2024' },
      { icon: '🌎', num: '40 / 50', desc: '— ciudades más peligrosas del mundo están en LATAM' },
      { icon: '✈️', num: '+12M', desc: '— turistas europeos visitan América Latina cada año' },
      { icon: '⏱', num: '30-60 min', desc: '— tiempo medio de respuesta policial en zonas urbanas' },
      { icon: '📈', num: '$3.85Md', desc: '— mercado global Women Safety · CAGR 14.5%' },
      { icon: '🔒', num: '< 3 seg', desc: '— para activar un SOS discreto sin mirar la pantalla' },
    ],
    // Problem cards
    problemCards: [
      { num: '1 / 3', title: 'Mujeres cambiaron su ruta por miedo', desc: 'En Francia, Reino Unido, España — no solo en LATAM. El miedo de moverse sola de noche es un problema mundial. Ninguna app popular lo aborda seriamente.', source: 'ALTO CONSEJO DE IGUALDAD · FRANCIA 2024' },
      { num: '40 / 50', title: 'Ciudades más peligrosas están en LATAM', desc: '12 millones de turistas europeos visitan América Latina cada año. Muchos no conocen la geografía de riesgos local — zonas cartel, barrios a evitar, estafas a expatriados.', source: 'WORLD POPULATION REVIEW 2025' },
      { num: '30-60', title: 'Minutos de espera por la policía en emergencia', desc: 'En zona urbana — Bogotá, México o algunos suburbios europeos. En 30 minutos, todo puede ser demasiado tarde. Hay que alertar a los seres queridos en segundos, no minutos.', source: 'ESTUDIO MERCADO SEKURA 2026' },
      { num: '0', title: 'App realmente diseñada para estas realidades', desc: 'Life360, bSafe, Noonlight: pensadas para EE.UU. Ninguna ofrece SOS sin mirar la pantalla, detección de desviación de ruta, ni modo offline robusto.', source: 'ANÁLISIS COMPETITIVO SEKURA' },
    ],
    features: [
      { num: '01', cat: 'PROTECCIÓN TIEMPO REAL', icon: '🗺️', title: 'Mapa de calor IA de zonas de riesgo', desc: 'Mapa vivo actualizado continuamente. Analiza reportes comunitarios + datos de incidentes + prensa local. Granularidad de 50m x 50m. Zonas coloreadas por nivel de riesgo.', chips: ['🇪🇸 Volver sola en Madrid', '🇨🇴 Visitar Medellín', '🇧🇷 Moverse en São Paulo', '🌍 Cualquier ciudad del mundo'], badge: { color: 'green', text: 'GRATIS · CORE SAFETY' } },
      { num: '02', cat: 'EMERGENCIA DISCRETA', icon: '🤫', title: 'SOS discreto — sin mirar la pantalla', desc: 'Triple clic en botón volumen = SOS silencioso instantáneo. 5 contactos alertados con GPS exacto por notificación + SMS. Sin visual en pantalla. Nadie alrededor lo ve.', compare: { bad: 'Otras apps: SOS visible en pantalla', good: 'Sekura: invisible, 3 clics volumen' }, badge: { color: 'red', text: 'CRÍTICO · MODO DISCRETO' } },
      { num: '03', cat: 'DESPLAZAMIENTO INTELIGENTE', icon: '🧭', title: 'Navegación segura anti-crimen', desc: 'Ruta evitando zonas de riesgo activas, actualizada en tiempo real. No solo tráfico — seguridad. Llegas por el camino más seguro, no el más corto.', chips: ['🌙 Viaje nocturno', '🎒 Turista en ciudad desconocida', '📦 Repartidor / Moto-taxi'], badge: { color: 'sky', text: 'SMART SAFETY · $2.99/MES' } },
      { num: '04', cat: 'SEGURIDAD AUTOMÁTICA', icon: '⏱', title: 'Temporizador de seguridad + check-in auto', desc: 'Programa tu llegada prevista. Si no confirmas: Sekura alerta automáticamente a tus contactos, luego escala si es necesario. También para niños: check-in auto al llegar a la escuela.', chips: ['👧 Niño que vuelve solo', '🏠 Regreso tardío a casa', '👴 Padre anciano'], badge: { color: 'green', text: 'GRATIS · CORE SAFETY' } },
      { num: '05', cat: 'PROTECCIÓN AVANZADA', icon: '🚨', title: 'Detección automática de situación anormal', desc: 'Protección que funciona incluso cuando no puedes interactuar con la app. Sekura analiza tu comportamiento GPS en tiempo real. Alerta automática sin que tengas que hacer nada.', badge: { color: 'gold', text: 'PREMIUM PROTECTION' }, detectors: [{ icon: '📍', title: 'Desviación de ruta', desc: 'Te alejas inexplicablemente de tu ruta prevista' }, { icon: '🛑', title: 'Inmovilización sospechosa', desc: 'Teléfono inmóvil 20 min en zona de riesgo' }, { icon: '⚡', title: 'Zona peligrosa próxima', desc: 'Alerta ANTES de entrar en la zona' }] },
      { num: '06', cat: 'FUERA DE LÍNEA', icon: '📵', title: 'Modo offline total', desc: 'Sin conexión: SOS por SMS. Último mapa de calor accesible localmente. Indispensable en zonas rurales, Amazonía, Andes. APK < 30MB dispositivos básicos.', badge: { color: 'green', text: 'GRATIS · SMS FALLBACK' } },
      { num: '07', cat: 'EXTRACCIÓN', icon: '📞', title: 'Llamada falsa de extracción', desc: 'Llamada entrante simulada con voz IA en español, portugués o francés. Para extraerte de una situación peligrosa sin llamar la atención. Personalizable.', badge: { color: 'green', text: 'GRATIS · DISCRETO' } },
      { num: '08', cat: 'INTELIGENCIA', icon: '🤖', title: 'Asistente IA seguridad 24/7', desc: 'Powered by Claude (Anthropic). Responde preguntas de seguridad en contexto local: "¿Es seguro ir a Chapinero esta noche?" / "¿Qué taxi llamar en CDMX?"', badge: { color: 'gold', text: 'PREMIUM · $7.99/MES' } },
      { num: '09', cat: 'RED PRIVADA', icon: '👥', title: 'Red de confianza', desc: 'Alertas directas sin intermediario. Los contactos reciben tu posición por enlace SMS — SIN NECESIDAD DE INSTALAR LA APP.', chips: ['💬 Funciona por SMS', '🌐 Enlace en cualquier navegador', '📲 Hasta 5 contactos', '🔒 Cifrado E2E'], badge: { color: 'green', text: 'GRATIS · CORE SAFETY' } },
      { num: '10', cat: 'PERFIL VIAJERO', icon: '✈️', title: 'Informe de riesgo personalizado antes de partir', desc: 'Informe completo sobre tu destino: zonas a evitar, barrios recomendados, alertas embajada, riesgos específicos perfil extranjero. Llegas preparado, no sorprendido.', chips: ['🇪🇸 Viajero europeo', '💼 Profesional en misión', '🎒 Mochilero solo'], badge: { color: 'gold', text: 'PREMIUM · $7.99/MES' } },
    ],
    useCases: [
      { icon: '👩', num: '01', label: 'Mujer · En todo el mundo', pain: 'Vuelves sola por la noche. Evitas ciertas calles. Mantienes tu teléfono en la mano. En Madrid, Londres, Bogotá — es el mismo miedo. Quieres discreción, no parecer vulnerable.', features: ['SOS discreto · triple clic volumen, sin mirar la pantalla', 'Alerta silenciosa a tus 5 contactos de confianza', 'Alertas predictivas antes de entrar en zona de riesgo', 'Navegación segura para tus trayectos diarios', 'Timer: si no llegas a tiempo, tus seres queridos son alertados'] },
      { icon: '✈️', num: '02', label: 'Viajero · Solo traveler · Expat', pain: 'Vas a Colombia, México, Brasil. No conoces la geografía de riesgos. Eres un objetivo: turista, teléfono visible, sin red local. Las guías de viaje no te lo cuentan todo.', features: ['Mapa de calor IA al aterrizar · conoce tu zona en 30 seg', 'Informe de riesgo personalizado antes de tu partida', 'Navegación segura · evita zonas peligrosas en tiempo real', 'Asistente IA seguridad 24/7 · "¿Es seguro ir aquí esta noche?"', 'Alertas embajada + zonas a evitar para perfil extranjero'] },
      { icon: '👨‍👩‍👧', num: '03', label: 'Familias · Allegados · Estudiantes', pain: 'Tu hijo toma el metro solo. Tu hija vuelve de fiesta. Tus padres viajan en LATAM. Quieres estar ahí sin ser intrusivo — solo saber que llegaron.', features: ['Seguimiento GPS tiempo real de todos los miembros', 'Geofencing · alerta si sale de una zona definida', 'Check-in automático a la llegada (escuela, casa, hotel)', 'Timer compartido · si no hay confirmación → eres alertado', 'Dashboard familia · todos tus seres queridos en una pantalla'] },
    ],
    howSteps: [
      { num: '1', icon: '📲', title: 'Descarga Sekura', desc: 'Tu número de teléfono es suficiente. Sin contraseña. Conexión OTP 10 segundos.' },
      { num: '2', icon: '👥', title: 'Añade tus contactos', desc: '2 a 5 personas de confianza. Reciben alertas SMS incluso sin la app.' },
      { num: '3', icon: '🗺️', title: 'Consulta el mapa de calor', desc: 'Antes de cada salida. Verifica las zonas. Planifica tu ruta.' },
      { num: '4', icon: '🛡️', title: 'Viaja protegido', desc: 'Sekura en segundo plano. Triple clic volumen en caso de peligro. Seres queridos alertados al instante.' },
    ],
  },
  pt: {
    navFeatures: 'Funcionalidades', navPricing: 'Preços', navFaq: 'FAQ',
    navCta: 'Entrar na lista',
    badge: '● EM BREVE · EUROPA & AMÉRICAS',
    heroTitle: ['Você tem o direito', 'de se mover sem medo.', 'Em todo lugar.'],
    heroEmphasis: 'sem medo.',
    heroSubtitle: 'Seja você voltando sozinha em Lisboa, viajando para Medellín ou morando em São Paulo — Sekura te protege em tempo real. Mapa de calor IA de zonas de risco, SOS discreto, navegação segura. Onde você for.',
    heroPlaceholder: 'Seu endereço de e-mail',
    heroCta: 'Entrar na lista →',
    heroPrivacy: '🔒 Gratuito para sempre · Sem spam · Acesso prioritário',
    successTitle: 'Você está na lista!',
    successDesc: 'Vamos entrar em contato antes do lançamento. Welcome aboard.',
    metricAdopters: 'EARLY ADOPTERS', metricMarket: 'MERCADO GLOBAL', metricBeta: 'BETA FECHADA',
    tag01: '01 / O Problema', tag02: '02 / Nossa Solução', tag03: '03 / Para quem?',
    tag04: '04 / Como funciona', tag05: '05 / Beta Testers', tag06: '06 / FAQ', tag07: '07 / Lista de espera',
    problemTitle: 'A insegurança não é só um problema lá.',
    problemEmphasis: 'É um problema em todo lugar.',
    problemSubtitle: 'Voltar sozinha à noite em Lisboa. Viajar sozinho a Medellín. Morar em São Paulo. São milhões de pessoas que mudam seus trajetos, evitam ruas, guardam o celular na mão. Sem ferramenta adequada.',
    solutionQuote: '"O primeiro app que dá a todos — onde quer que estejam — o mesmo nível de proteção que aqueles que podem pagar',
    solutionEmphasis: 'um guarda-costas."',
    usecasesTitle: 'Sekura se adapta ao seu perfil.',
    usecasesSubtitle: 'Três realidades muito diferentes, um só app.',
    howTitle: 'Operacional em 90 segundos.',
    howSubtitle: 'Onboarding projetado para ser ultra-rápido.',
    testimonialTitle: 'Eles testam o Sekura em primeira mão.',
    waitlistBadge: '⚡ OFERTA EARLY BIRD · 500 VAGAS',
    waitlistTitle: ['Seja dos primeiros.', 'Entre na lista de espera.'],
    waitlistEmphasis: 'Entre na lista de espera.',
    waitlistSubtitle: 'Os primeiros 500 inscritos ganham 3 meses de Smart Safety grátis + acesso beta fechada. Sem cartão de crédito.',
    waitlistCounter: (count) => `${count} pessoas inscritas · Ainda ${Math.max(0, 500 - count)} vagas Early Bird`,
    faqTitle: 'Perguntas frequentes.',
    faqs: [
      { q: 'O que é a lista de espera do Sekura?', a: 'A lista dá acesso prioritário ao beta fechado antes do lançamento público. Os primeiros 500 inscritos ganham 3 meses de Smart Safety grátis. Sem cartão de crédito.' },
      { q: 'Em quais países o Sekura estará disponível no lançamento?', a: 'O Sekura estará disponível mundialmente desde o lançamento. Os dados do mapa de calor cobrirão primeiro Medellín e CDMX, com expansão rápida para o Brasil e toda a LATAM.' },
      { q: 'Como funciona o modo offline?', a: 'Sem conexão à internet, o SOS é acionado por SMS através do Twilio. O último mapa de calor baixado permanece acessível localmente. O app ocupa menos de 30MB para dispositivos básicos.' },
      { q: 'Meus dados de localização são compartilhados?', a: 'Não. Nenhum dado de localização é armazenado sem consentimento explícito. Os SOS são criptografados de ponta a ponta. Sekura é privacy-first por design.' },
      { q: 'A pessoa a alertar precisa ter o Sekura?', a: 'Não. Seus contatos recebem um link SMS acessível em qualquer navegador, sem o app.' },
      { q: 'O Sekura substitui os serviços de emergência oficiais?', a: 'Não. Sekura é uma ferramenta de apoio complementar, não um serviço de emergência profissional. Sekura age como primeira linha — alertando seus entes queridos — mas não substitui os serviços de emergência.' },
    ],
    footerTagline: 'Segurança pessoal inteligente. Para mulheres, viajantes, famílias — na Europa, América Latina, onde você for.',
    footerProduct: 'Produto', footerMarkets: 'Mercados', footerLegal: 'Legal',
    footerBottom: '© 2025 Sekura. Todos os direitos reservados. · Sekura é uma ferramenta de apoio, não um serviço de emergência profissional.',
    langTitle: 'Escolher idioma',
    // Ticker items
    tickerItems: [
      { icon: '👩', num: '1 em 3', desc: '— mulheres mudaram sua rota por medo — na França, em 2024' },
      { icon: '🌎', num: '40 / 50', desc: '— cidades mais perigosas do mundo estão na LATAM' },
      { icon: '✈️', num: '+12M', desc: '— turistas europeus visitam a América Latina a cada ano' },
      { icon: '⏱', num: '30-60 min', desc: '— tempo médio de resposta policial em áreas urbanas' },
      { icon: '📈', num: '$3.85Bi', desc: '— mercado global Women Safety · CAGR 14.5%' },
      { icon: '🔒', num: '< 3 seg', desc: '— para acionar um SOS discreto sem olhar para a tela' },
    ],
    // Problem cards
    problemCards: [
      { num: '1 / 3', title: 'Mulheres mudaram sua rota por medo', desc: 'Na França, Reino Unido, Espanha — não apenas na LATAM. O medo de se mover sozinha à noite é um problema global. Nenhum app popular o aborda seriamente.', source: 'ALTO CONSELHO DE IGUALDADE · FRANÇA 2024' },
      { num: '40 / 50', title: 'Cidades mais perigosas estão na LATAM', desc: '12 milhões de turistas europeus visitam a América Latina a cada ano. Muitos não conhecem a geografia de riscos local — zonas cartel, bairros a evitar, golpes em expatriados.', source: 'WORLD POPULATION REVIEW 2025' },
      { num: '30-60', title: 'Minutos de espera pela polícia em emergência', desc: 'Em zona urbana — Bogotá, México ou alguns subúrbios europeus. Em 30 minutos, tudo pode ser tarde demais. É preciso alertar seus entes queridos em segundos, não minutos.', source: 'ESTUDO MERCADO SEKURA 2026' },
      { num: '0', title: 'App realmente projetado para essas realidades', desc: 'Life360, bSafe, Noonlight: pensados para os EUA. Nenhum oferece SOS sem olhar para a tela, detecção de desvio de rota, nem modo offline robusto.', source: 'ANÁLISE COMPETITIVA SEKURA' },
    ],
    features: [
      { num: '01', cat: 'PROTEÇÃO TEMPO REAL', icon: '🗺️', title: 'Mapa de calor IA de zonas de risco', desc: 'Mapa vivo atualizado continuamente. Analisa relatórios comunitários + dados de incidentes + imprensa local. Granularidade de 50m x 50m. Zonas coloridas por nível de risco.', chips: ['🇵🇹 Voltar sozinha em Lisboa', '🇨🇴 Visitar Medellín', '🇧🇷 Mover-se em São Paulo', '🌍 Qualquer cidade do mundo'], badge: { color: 'green', text: 'GRATUITO · CORE SAFETY' } },
      { num: '02', cat: 'EMERGÊNCIA DISCRETA', icon: '🤫', title: 'SOS discreto — sem olhar para a tela', desc: 'Triplo clique no botão volume = SOS silencioso instantâneo. 5 contatos alertados com GPS exato por notificação + SMS. Sem visual na tela. Ninguém ao redor vê.', compare: { bad: 'Outros apps: SOS visível na tela', good: 'Sekura: invisível, 3 cliques volume' }, badge: { color: 'red', text: 'CRÍTICO · MODO DISCRETO' } },
      { num: '03', cat: 'DESLOCAMENTO INTELIGENTE', icon: '🧭', title: 'Navegação segura anti-crime', desc: 'Rota evitando zonas de risco ativas, atualizada em tempo real. Não apenas tráfego — segurança. Você chega pelo caminho mais seguro, não o mais curto.', chips: ['🌙 Viagem noturna', '🎒 Turista em cidade desconhecida', '📦 Entregador / Moto-táxi'], badge: { color: 'sky', text: 'SMART SAFETY · $2.99/MÊS' } },
      { num: '04', cat: 'SEGURANÇA AUTOMÁTICA', icon: '⏱', title: 'Timer de segurança + check-in auto', desc: 'Programe sua chegada prevista. Se você não confirmar: Sekura alerta automaticamente seus contatos, depois escala se necessário. Também para crianças: check-in auto na chegada à escola.', chips: ['👧 Criança voltando sozinha', '🏠 Retorno tardio para casa', '👴 Pai idoso'], badge: { color: 'green', text: 'GRATUITO · CORE SAFETY' } },
      { num: '05', cat: 'PROTEÇÃO AVANÇADA', icon: '🚨', title: 'Detecção automática de situação anormal', desc: 'Proteção que funciona mesmo quando você não pode interagir com o app. Sekura analisa seu comportamento GPS em tempo real. Alerta automático sem você ter que fazer nada.', badge: { color: 'gold', text: 'PREMIUM PROTECTION' }, detectors: [{ icon: '📍', title: 'Desvio de rota', desc: 'Você se afasta inexplicavelmente de sua rota planejada' }, { icon: '🛑', title: 'Imobilização suspeita', desc: 'Telefone imóvel 20 min em zona de risco' }, { icon: '⚡', title: 'Zona perigosa próxima', desc: 'Alerta ANTES de você entrar na zona' }] },
      { num: '06', cat: 'OFFLINE', icon: '📵', title: 'Modo offline total', desc: 'Sem conexão: SOS por SMS. Último mapa de calor acessível localmente. Indispensável em zonas rurais, Amazônia, Andes. APK < 30MB dispositivos básicos.', badge: { color: 'green', text: 'GRATUITO · SMS FALLBACK' } },
      { num: '07', cat: 'EXTRAÇÃO', icon: '📞', title: 'Chamada falsa de extração', desc: 'Chamada recebida simulada com voz IA em espanhol, português ou francês. Para se extrair de uma situação perigosa sem chamar atenção. Personalizável.', badge: { color: 'green', text: 'GRATUITO · DISCRETO' } },
      { num: '08', cat: 'INTELIGÊNCIA', icon: '🤖', title: 'Assistente IA segurança 24/7', desc: 'Powered by Claude (Anthropic). Responde perguntas de segurança em contexto local: "É seguro ir a Chapinero esta noite?" / "Qual táxi chamar em CDMX?"', badge: { color: 'gold', text: 'PREMIUM · $7.99/MÊS' } },
      { num: '09', cat: 'REDE PRIVADA', icon: '👥', title: 'Rede de confiança', desc: 'Alertas diretos sem intermediário. Contatos recebem sua posição por link SMS — SEM PRECISAR INSTALAR O APP.', chips: ['💬 Funciona por SMS', '🌐 Link em qualquer navegador', '📲 Até 5 contatos', '🔒 Criptografia E2E'], badge: { color: 'green', text: 'GRATUITO · CORE SAFETY' } },
      { num: '10', cat: 'PERFIL VIAJANTE', icon: '✈️', title: 'Relatório de risco personalizado antes da partida', desc: 'Relatório completo sobre seu destino: zonas a evitar, bairros recomendados, alertas embaixada, riscos específicos perfil estrangeiro. Você chega preparado, não surpreso.', chips: ['🇵🇹 Viajante europeu', '💼 Profissional em missão', '🎒 Mochileiro solo'], badge: { color: 'gold', text: 'PREMIUM · $7.99/MÊS' } },
    ],
    useCases: [
      { icon: '👩', num: '01', label: 'Mulher · No mundo todo', pain: 'Você volta sozinha à noite. Evita certas ruas. Mantém seu telefone na mão. Em Lisboa, Londres, Bogotá — é o mesmo medo. Você quer discrição, não parecer vulnerável.', features: ['SOS discreto · triplo clique volume, sem olhar para a tela', 'Alerta silencioso para seus 5 contatos de confiança', 'Alertas preditivos antes de entrar em zona de risco', 'Navegação segura para seus trajetos diários', 'Timer: se você não chegar no horário, seus entes queridos são alertados'] },
      { icon: '✈️', num: '02', label: 'Viajante · Solo traveler · Expat', pain: 'Você vai para Colômbia, México, Brasil. Não conhece a geografia de riscos. É um alvo: turista, telefone visível, sem rede local. Os guias de viagem não contam tudo.', features: ['Mapa de calor IA ao pousar · conheça sua área em 30 seg', 'Relatório de risco personalizado antes da partida', 'Navegação segura · evita zonas perigosas em tempo real', 'Assistente IA segurança 24/7 · "É seguro ir aqui esta noite?"', 'Alertas embaixada + zonas a evitar para perfil estrangeiro'] },
      { icon: '👨‍👩‍👧', num: '03', label: 'Famílias · Parentes · Estudantes', pain: 'Seu filho pega o metrô sozinho. Sua filha volta da festa. Seus pais viajam na LATAM. Você quer estar lá sem ser intrusivo — só saber que chegaram.', features: ['Rastreamento GPS tempo real de todos os membros', 'Geofencing · alerta se sair de uma zona definida', 'Check-in automático na chegada (escola, casa, hotel)', 'Timer compartilhado · se não houver confirmação → você é alertado', 'Dashboard família · todos seus entes queridos em uma tela'] },
    ],
    howSteps: [
      { num: '1', icon: '📲', title: 'Baixe Sekura', desc: 'Seu número de telefone é suficiente. Sem senha. Conexão OTP 10 segundos.' },
      { num: '2', icon: '👥', title: 'Adicione seus contatos', desc: '2 a 5 pessoas de confiança. Recebem alertas SMS mesmo sem o app.' },
      { num: '3', icon: '🗺️', title: 'Consulte o mapa de calor', desc: 'Antes de cada saída. Verifique as zonas. Planeje sua rota.' },
      { num: '4', icon: '🛡️', title: 'Viaje protegido', desc: 'Sekura em segundo plano. Triplo clique volume em caso de perigo. Entes queridos alertados instantaneamente.' },
    ],
  }
}

// ── MOTION VARIANTS ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
}

// ── SCROLL SECTION WRAPPER ────────────────────────────────────────────────────
function RevealSection({ children, className, style, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      style={{ ...style, transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── STAGGER GRID WRAPPER ──────────────────────────────────────────────────────
function StaggerGrid({ children, style, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── COUNTER HOOK ──────────────────────────────────────────────────────────────
function useCounter(target, duration = 1600) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView && !started.current) {
      started.current = true
      const start = performance.now()
      const tick = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  }, [isInView, target, duration])

  return { count, ref }
}

// ── WAITLIST FORM ─────────────────────────────────────────────────────────────
function WaitlistForm({ source = 'hero', lang = 'fr', onSuccess }) {
  const t = T[lang] || T.fr
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    if (!isValid) {
      setError('Adresse email invalide...')
      setTimeout(() => setError(''), 1800)
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang, source, honeypot })
      })
      const data = await res.json()
      if (data.success) {
        if (onSuccess) onSuccess(data.count)
        // Redirect to thank-you page with lang parameter
        router.push(`/merci?email=${encodeURIComponent(email)}&count=${data.count}&lang=${lang}`)
      } else {
        setError(data.error || 'Erreur. Réessaie.')
        setTimeout(() => setError(''), 3000)
      }
    } catch {
      setError('Erreur réseau. Réessaie.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }} data-event={`waitlist_${source}_submit`}>
      <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} style={{ display: 'none' }} suppressHydrationWarning tabIndex={-1} autoComplete="off" />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={error || t.heroPlaceholder}
          suppressHydrationWarning
          style={{
            flex: 1, minWidth: 220,
            background: 'var(--ink-soft)',
            border: `1px solid ${error ? '#FF4D6A' : 'var(--border)'}`,
            borderRadius: 12, padding: '14px 18px',
            color: error ? '#FF4D6A' : 'var(--text)',
            fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
            fontFamily: "'Outfit', sans-serif"
          }}
          onFocus={e => { if (!error) e.target.style.borderColor = 'var(--border-jade)' }}
          onBlur={e => { if (!error) e.target.style.borderColor = 'var(--border)' }}
        />
        <motion.button
          type="submit" disabled={loading}
          className="btn-jade"
          style={{ padding: '14px 24px', fontSize: 15, whiteSpace: 'nowrap', border: 'none', opacity: loading ? 0.7 : 1 }}
          whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,229,160,0.35)' }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? '...' : t.heroCta}
        </motion.button>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.heroPrivacy}</p>
    </form>
  )
}

// ── PHONE MOCKUP ──────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.18) 0%, transparent 70%)', filter: 'blur(30px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)', width: 200, height: 20, background: 'rgba(0,229,160,0.15)', borderRadius: '50%', filter: 'blur(12px)', zIndex: 0 }} />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
        style={{
          position: 'relative', zIndex: 1, width: 280,
          borderRadius: 46, border: '1.5px solid rgba(255,255,255,0.09)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,160,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'hidden', background: '#0D1424'
        }}
      >
        <div style={{ height: 10, background: '#0D1424', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 16 }}>
          <div style={{ width: 80, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 10 }} />
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <p style={{ color: 'var(--text-sec)', fontSize: 11, margin: 0 }}>Bonsoir 👋</p>
            <p style={{ color: 'var(--text)', fontSize: 15, fontWeight: 700, margin: 0 }}>Sofia</p>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #00E5A0, #3DD6F5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0A0C14', fontSize: 14 }}>S</div>
        </div>
        <div style={{ background: 'rgba(255,77,106,0.08)', borderBottom: '1px solid rgba(255,77,106,0.15)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF4D6A', flexShrink: 0 }} />
          <p style={{ color: '#FF4D6A', fontSize: 10.5, margin: 0, lineHeight: 1.4 }}>⚠ Alerte zone — Incidents signalés · Zona Rosa · il y a 12 min</p>
        </div>
        <div style={{ margin: '10px', height: 155, borderRadius: 14, background: '#0A1628', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
          <div style={{ position: 'absolute', left: '15%', top: '20%', width: 60, height: 45, background: 'rgba(255,77,106,0.25)', borderRadius: '50%', filter: 'blur(12px)' }} />
          <div style={{ position: 'absolute', left: '45%', top: '10%', width: 50, height: 40, background: 'rgba(255,184,48,0.2)', borderRadius: '50%', filter: 'blur(10px)' }} />
          <div style={{ position: 'absolute', left: '60%', top: '50%', width: 55, height: 45, background: 'rgba(0,229,160,0.2)', borderRadius: '50%', filter: 'blur(10px)' }} />
          <div style={{ position: 'absolute', left: '10%', top: '55%', width: 45, height: 35, background: 'rgba(255,120,80,0.2)', borderRadius: '50%', filter: 'blur(10px)' }} />
          <div style={{ position: 'absolute', left: '50%', top: '45%', transform: 'translate(-50%, -50%)' }}>
            <motion.div animate={{ scale: [1, 2.8], opacity: [0.7, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,229,160,0.4)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00E5A0', border: '2px solid #fff', position: 'relative', zIndex: 1 }} />
          </div>
          <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,229,160,0.15)', border: '1px solid rgba(0,229,160,0.3)', borderRadius: 6, padding: '3px 8px' }}>
            <span style={{ color: '#00E5A0', fontSize: 9, fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>CDMX · LIVE</span>
          </div>
          <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '3px 8px' }}>
            <span style={{ color: '#00E5A0', fontSize: 11, fontWeight: 700 }}>7.2</span>
            <span style={{ color: 'var(--text-sec)', fontSize: 9, marginLeft: 2 }}>/10</span>
          </div>
        </div>
        <div style={{ margin: '0 10px 10px', background: 'rgba(255,77,106,0.07)', border: '1px solid rgba(255,77,106,0.2)', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.button
            animate={{ boxShadow: ['0 0 0 0 rgba(255,77,106,0.5)', '0 0 0 20px rgba(255,77,106,0)', '0 0 0 0 rgba(255,77,106,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 44, height: 44, borderRadius: '50%', background: '#FF4D6A', border: 'none', fontSize: 18, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >🆘</motion.button>
          <div>
            <p style={{ color: '#FF4D6A', fontSize: 11, fontWeight: 700, margin: '0 0 2px' }}>Bouton SOS</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 9.5, margin: 0 }}>Maintenir 3 sec · 5 contacts alertés</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '0 10px 16px', flexWrap: 'wrap' }}>
          {[{ name: 'Marie', color: '#00E5A0', status: 'LIVE' }, { name: 'Jules', color: '#3DD6F5', status: 'LIVE' }, { name: 'Ana', color: '#FFB830', status: 'OFF' }].map(c => (
            <div key={c.name} style={{ background: 'var(--ink-mid)', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.status === 'LIVE' ? c.color : 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-sec)', fontSize: 10 }}>{c.name}</span>
              <span style={{ color: c.status === 'LIVE' ? c.color : 'var(--text-muted)', fontSize: 9, fontFamily: "'Space Mono',monospace" }}>● {c.status}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ lang, onLangOpen }) {
  const t = T[lang] || T.fr
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(10,12,20,0.97)' : 'rgba(10,12,20,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.3s', padding: '0 24px'
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 24, color: 'var(--text)', letterSpacing: -0.5 }}>
            Sek<span style={{ color: 'var(--jade)' }}>ur</span>a
          </span>
        </a>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hide-mobile">
          {[[t.navFeatures, '#fonctionnalites'], [t.navFaq, '#faq']].map(([label, href]) => (
            <motion.a key={label} href={href} style={{ color: 'var(--text-sec)', textDecoration: 'none', fontSize: 15, fontWeight: 500 }}
              whileHover={{ color: 'var(--text)' }}
            >{label}</motion.a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.button onClick={onLangOpen} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{ background: 'var(--ink-mid)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 12px', color: 'var(--text-sec)', fontSize: 14, cursor: 'pointer' }}
          >🌐 {lang.toUpperCase()}</motion.button>
          <a href="#waitlist">
            <motion.button className="btn-jade-pill" style={{ padding: '10px 20px', fontSize: 14, border: 'none' }}
              whileHover={{ y: -2, boxShadow: '0 6px 24px rgba(0,229,160,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >{t.navCta}</motion.button>
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

// ── HERO SECTION ──────────────────────────────────────────────────────────────
function HeroSection({ lang, onCountUpdate, liveCount }) {
  const t = T[lang] || T.fr
  const { count: adoptCount, ref: adoptRef } = useCounter(liveCount || 247, 1600)
  const [titleLines, setTitleLines] = useState(t.heroTitle)

  useEffect(() => { setTitleLines(t.heroTitle) }, [lang])

  return (
    <section style={{ minHeight: '100vh', paddingTop: 130, paddingBottom: 80, background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
      <div className="hero-grid-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div style={{ position: 'absolute', top: -100, left: -150, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,106,0.07) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,229,160,0.08)', border: '1px solid var(--border-jade)', borderRadius: 100, padding: '8px 18px', width: 'fit-content' }}>
              <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5A0', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: '#00E5A0', letterSpacing: 3, textTransform: 'uppercase' }}>
                <AnimatePresence mode="wait">
                  <motion.span key={lang + '-badge'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    {t.badge}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            {/* H1 */}
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(42px, 5.5vw, 68px)', lineHeight: 1.08, letterSpacing: -1.5, color: 'var(--text)', margin: 0 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={lang + '-title'} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} style={{ display: 'block' }}>
                  {titleLines[0]}<br />
                  {titleLines.length > 2 ? (
                    <>{titleLines[1]}<br /><em style={{ color: 'var(--jade)', fontStyle: 'italic' }}>{titleLines[2]}</em></>
                  ) : (
                    <>{titleLines[1].replace(t.heroEmphasis, '')}<em style={{ color: 'var(--jade)', fontStyle: 'italic' }}>{t.heroEmphasis}</em></>
                  )}
                </motion.span>
              </AnimatePresence>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: 17, color: 'var(--text-sec)', lineHeight: 1.7, maxWidth: 520 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={lang + '-sub'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ display: 'block' }}>
                  {t.heroSubtitle}
                </motion.span>
              </AnimatePresence>
            </p>

            {/* Form */}
            <div>
              <WaitlistForm source="hero" lang={lang} onSuccess={onCountUpdate} />
            </div>

            {/* Metrics */}
            <div ref={adoptRef} style={{ display: 'flex', gap: 32, flexWrap: 'wrap', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
              {[
                { value: adoptCount, label: t.metricAdopters },
                { value: '$2.8Md', label: t.metricMarket },
                { value: 'Q1 2026', label: t.metricBeta },
              ].map((m, i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: 26, color: 'var(--text)', margin: '0 0 2px' }}>
                    <AnimatePresence mode="wait">
                      <motion.span key={lang + '-m' + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {i === 0 ? adoptCount : m.value}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                  <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>
                    <AnimatePresence mode="wait">
                      <motion.span key={lang + '-ml' + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {m.label}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── TICKER STRIP ──────────────────────────────────────────────────────────────
function TickerStrip({ lang }) {
  const t = T[lang] || T.fr
  const items = t.tickerItems || []
  const renderItems = () => items.map((item, i) => (
    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 40px', whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: 18 }}>{item.icon}</span>
      <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: 'var(--jade)' }}>{item.num}</span>
      <span style={{ color: 'var(--text-sec)', fontSize: 14 }}>{item.desc}</span>
    </div>
  ))
  return (
    <div style={{ background: 'var(--ink-soft)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden', position: 'relative', padding: '18px 0' }}>
      <div className="ticker-fade-left" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, zIndex: 1 }} />
      <div className="ticker-fade-right" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, zIndex: 1 }} />
      <div className="animate-marquee" style={{ display: 'flex', width: 'max-content' }}>
        {renderItems()}{renderItems()}
      </div>
    </div>
  )
}

// ── PROBLEM SECTION ───────────────────────────────────────────────────────────
function ProblemSection({ lang }) {
  const t = T[lang] || T.fr
  const cards = t.problemCards || []
  return (
    <section id="probleme" style={{ background: 'var(--ink-soft)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <RevealSection style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>{t.tag01}</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.15, color: 'var(--text)', maxWidth: 700, margin: '0 0 20px' }}>
            {t.problemTitle}<br />
            <em style={{ color: 'var(--jade)', fontStyle: 'italic' }}>{t.problemEmphasis}</em>
          </h2>
          <p style={{ color: 'var(--text-sec)', fontSize: 17, maxWidth: 680, lineHeight: 1.7 }}>{t.problemSubtitle}</p>
        </RevealSection>
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {cards.map((c, i) => (
            <motion.div key={i} variants={staggerItem} whileHover={{ y: -4, borderColor: 'var(--border-jade)' }}
              style={{ background: 'var(--ink)', border: '1px solid var(--border)', borderTop: '2px solid #FF4D6A', borderRadius: 16, padding: '28px 24px', transition: 'border-color 0.3s' }}
            >
              <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: 48, color: '#FF4D6A', lineHeight: 1, margin: '0 0 12px' }}>{c.num}</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 12px' }}>{c.title}</p>
              <p style={{ color: 'var(--text-sec)', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>{c.desc}</p>
              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>SOURCE · {c.source}</p>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}

// ── PLAN BADGE ────────────────────────────────────────────────────────────────
function PlanBadge({ color, text }) {
  const colors = {
    green: { bg: 'rgba(0,229,160,0.1)', border: 'rgba(0,229,160,0.25)', text: '#00E5A0' },
    sky: { bg: 'rgba(61,214,245,0.1)', border: 'rgba(61,214,245,0.25)', text: '#3DD6F5' },
    gold: { bg: 'rgba(255,184,48,0.1)', border: 'rgba(255,184,48,0.25)', text: '#FFB830' },
    red: { bg: 'rgba(255,77,106,0.1)', border: 'rgba(255,77,106,0.25)', text: '#FF4D6A' },
  }
  const c = colors[color] || colors.green
  return <span style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, borderRadius: 100, padding: '3px 10px', fontSize: 10, fontFamily: "'Space Mono',monospace", letterSpacing: 1 }}>{text}</span>
}

// ── FEATURE CARD ──────────────────────────────────────────────────────────────
function FeatureCard({ feature: f, small }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, borderColor: 'rgba(0,229,160,0.3)' }}
      style={{ borderRadius: 16, padding: small ? '24px 20px' : '28px 24px', background: 'var(--ink)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s' }}
    >
      <motion.div initial={{ scaleY: 0 }} whileHover={{ scaleY: 1 }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--jade)', transformOrigin: 'top', borderRadius: '3px 0 0 3px' }} />
      <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'var(--jade)', letterSpacing: 2, textTransform: 'uppercase' }}>FEATURE {f.num} · {f.cat}</span>
      </div>
      <span style={{ fontSize: small ? 28 : 36, display: 'block', marginBottom: 12 }}>{f.icon}</span>
      <h3 style={{ fontSize: small ? 18 : 20, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{f.title}</h3>
      <p style={{ color: 'var(--text-sec)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{f.desc}</p>
      {f.compare && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,77,106,0.06)', border: '1px solid rgba(255,77,106,0.2)', borderRadius: 8, padding: '8px 12px' }}>
            <span style={{ fontSize: 12 }}>❌</span><span style={{ color: 'var(--text-sec)', fontSize: 13 }}>{f.compare.bad}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 8, padding: '8px 12px' }}>
            <span style={{ fontSize: 12 }}>✅</span><span style={{ color: 'var(--text)', fontSize: 13 }}>{f.compare.good}</span>
          </div>
        </div>
      )}
      {f.chips && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {f.chips.map((chip, i) => <span key={i} style={{ background: 'var(--ink-mid)', border: '1px solid var(--border)', borderRadius: 100, padding: '4px 10px', fontSize: 12, color: 'var(--text-sec)' }}>{chip}</span>)}
        </div>
      )}
      <PlanBadge color={f.badge.color} text={f.badge.text} />
    </motion.div>
  )
}

// ── FEATURES SECTION ──────────────────────────────────────────────────────────
function FeaturesSection({ lang }) {
  const t = T[lang] || T.fr
  const features = t.features || []

  return (
    <section id="fonctionnalites" style={{ background: 'var(--ink-soft)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <RevealSection style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>{t.tag02}</p>
          <blockquote style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(22px,3vw,36px)', color: 'var(--text)', lineHeight: 1.4, maxWidth: 860, margin: 0, border: 'none', padding: 0 }}>
            {t.solutionQuote}{' '}<em style={{ color: 'var(--jade)', fontStyle: 'italic' }}>{t.solutionEmphasis}</em>
          </blockquote>
        </RevealSection>

        {/* Row 01-02 */}
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 24 }}>
          {features.slice(0, 2).map((f, i) => <FeatureCard key={i} feature={f} />)}
        </StaggerGrid>

        {/* Row 03-04 */}
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 24 }}>
          {features.slice(2, 4).map((f, i) => <FeatureCard key={i} feature={f} />)}
        </StaggerGrid>

        {/* Feature 05 - LARGE */}
        <RevealSection style={{ marginBottom: 24 }}>
          <motion.div whileHover={{ borderColor: 'rgba(0,229,160,0.3)' }}
            style={{ borderRadius: 16, padding: 32, background: 'var(--ink)', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s' }}
          >
            <motion.div initial={{ scaleY: 0 }} whileHover={{ scaleY: 1 }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--jade)', transformOrigin: 'top' }} />
            <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 2, textTransform: 'uppercase' }}>FEATURE {features[4]?.num} · {features[4]?.cat}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'start' }}>
              <div>
                <span style={{ fontSize: 36, display: 'block', marginBottom: 16 }}>{features[4]?.icon}</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{features[4]?.title}</h3>
                <p style={{ color: 'var(--text-sec)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{features[4]?.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <PlanBadge color="sky" text="SMART SAFETY" />
                  <PlanBadge color={features[4]?.badge?.color} text={features[4]?.badge?.text} />
                </div>
              </div>
              <StaggerGrid style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(features[4]?.detectors || []).map((d, i) => (
                  <motion.div key={i} variants={staggerItem} style={{ background: 'rgba(0,229,160,0.04)', border: '1px solid var(--border-jade)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{d.icon}</span>
                    <div><p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, margin: '0 0 4px' }}>{d.title}</p><p style={{ color: 'var(--text-sec)', fontSize: 13, margin: 0 }}>{d.desc}</p></div>
                  </motion.div>
                ))}
              </StaggerGrid>
            </div>
          </motion.div>
        </RevealSection>

        {/* Row 06-07-08 */}
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 24 }}>
          {features.slice(5, 8).map((f, i) => <FeatureCard key={i} feature={f} small />)}
        </StaggerGrid>

        {/* Row 09-10 */}
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {features.slice(8, 10).map((f, i) => <FeatureCard key={i} feature={f} />)}
        </StaggerGrid>
      </div>
    </section>
  )
}

// ── USE CASES ─────────────────────────────────────────────────────────────────
function UseCasesSection({ lang }) {
  const t = T[lang] || T.fr
  const profiles = t.useCases || []
  return (
    <section id="usecases" style={{ background: 'var(--ink)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <RevealSection style={{ marginBottom: 64, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>{t.tag03}</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,4vw,48px)', color: 'var(--text)', margin: '0 0 16px' }}>{t.usecasesTitle}</h2>
          <p style={{ color: 'var(--text-sec)', fontSize: 17 }}>{t.usecasesSubtitle}</p>
        </RevealSection>
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {profiles.map((p, i) => (
            <motion.div key={i} variants={staggerItem} whileHover={{ y: -4, borderColor: 'var(--border-jade)' }}
              style={{ borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : 0, padding: '36px 28px', background: 'var(--ink-soft)', border: '1px solid var(--border)', transition: 'border-color 0.3s' }}
            >
              <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>{p.icon}</span>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'var(--jade)', letterSpacing: 2, textTransform: 'uppercase' }}>PROFIL {p.num}</span>
              <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: 'var(--text)', margin: '8px 0 16px', lineHeight: 1.3 }}>{p.label}</h3>
              <p style={{ color: 'var(--text-sec)', fontSize: 14, lineHeight: 1.7, fontStyle: 'italic', borderLeft: '3px solid var(--border-jade)', paddingLeft: 16, marginBottom: 20 }}>{p.pain}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--jade)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span style={{ color: 'var(--text-sec)', fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}

// ── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorksSection({ lang }) {
  const t = T[lang] || T.fr
  const steps = t.howSteps || []
  return (
    <section id="comment" style={{ background: 'var(--ink)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <RevealSection style={{ marginBottom: 64, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>{t.tag04}</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,4vw,48px)', color: 'var(--text)', margin: '0 0 16px' }}>{t.howTitle}</h2>
          <p style={{ color: 'var(--text-sec)', fontSize: 17 }}>{t.howSubtitle}</p>
        </RevealSection>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 40, left: '12%', right: '12%', height: 1, background: 'linear-gradient(to right, transparent, var(--border-jade), transparent)', zIndex: 0 }} className="hide-mobile" />
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {steps.map((s, i) => (
              <motion.div key={i} variants={staggerItem} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <motion.div whileHover={{ boxShadow: '0 0 30px rgba(0,229,160,0.3)' }}
                  style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid var(--jade)', boxShadow: '0 0 20px rgba(0,229,160,0.2)', background: 'var(--ink)', margin: '0 auto 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: 'var(--jade)', lineHeight: 1 }}>{s.num}</span>
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                </motion.div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-sec)', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function TestimonialsSection({ lang }) {
  const t = T[lang] || T.fr
  const testimonials = [
    { stars: 5, name: 'Valentina R.', location: 'Medellín Colombie · Beta tester #12', text: 'Enfin une app qui comprend vraiment les risques à Medellín. La heatmap est précise au niveau des rues — elle connaît El Centro mieux que moi après 3 ans ici.', color: '#00E5A0' },
    { stars: 5, name: 'Emma T.', location: 'London UK · Solo traveler LATAM 6 months', text: "As a solo female traveler, this is the app I've been waiting for for years. The discrete SOS mode is genius. I used it once and it worked perfectly.", color: '#3DD6F5' },
    { stars: 5, name: 'Camila M.', location: 'Ciudad de México · Estudiante 23 años', text: 'Mis padres ya no se preocupan cuando salgo de noche. Ven mi ubicación en tiempo real y el timer de seguridad les da tranquilidad. Eso cambia todo.', color: '#FFB830' },
    { stars: 5, name: 'Pierre D.', location: 'Paris France · Directeur ONG internationale', text: "J'envoie des équipes en Colombie et au Mexique. Sekura va devenir un standard pour mes collaborateurs terrain dès le lancement public.", color: '#FF4D6A' },
    { stars: 5, name: 'Lucas F.', location: 'São Paulo Brésil · Beta tester #7', text: 'A heatmap atualizada em tempo real de São Paulo é exatamente o que eu precisava. O modo offline funcionou perfeitamente no interior do estado.', color: '#00E5A0' },
    { stars: 5, name: 'Sarah K.', location: 'Sydney Australia · Digital nomad CDMX', text: 'The route planning feature that avoids dangerous zones changed how I move around CDMX. My family in Australia can see me moving safely. Game changer.', color: '#3DD6F5' },
  ]
  const TestimonialCard = ({ t: testimonial }) => (
    <div style={{ width: 300, flexShrink: 0, background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginRight: 16 }}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>{'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#FFB830', fontSize: 14 }}>{s}</span>)}</div>
      <p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>"{testimonial.text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: testimonial.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0A0C14', fontSize: 14, flexShrink: 0 }}>{testimonial.name.charAt(0)}</div>
        <div><p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, margin: 0 }}>{testimonial.name}</p><p style={{ color: 'var(--text-muted)', fontSize: 11, margin: 0 }}>{testimonial.location}</p></div>
      </div>
    </div>
  )
  return (
    <section id="avis" style={{ background: 'var(--ink-soft)', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', marginBottom: 48 }}>
        <RevealSection style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>{t.tag05}</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,4vw,48px)', color: 'var(--text)', margin: '0 0 16px' }}>{t.testimonialTitle}</h2>
        </RevealSection>
      </div>
      <div style={{ overflow: 'hidden', marginBottom: 20, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, var(--ink-soft), transparent)', zIndex: 1 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, var(--ink-soft), transparent)', zIndex: 1 }} />
        <div className="animate-marquee" style={{ display: 'flex', padding: '8px 0', width: 'max-content' }}>
          {[...testimonials, ...testimonials].map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, var(--ink-soft), transparent)', zIndex: 1 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, var(--ink-soft), transparent)', zIndex: 1 }} />
        <div className="animate-marquee-reverse" style={{ display: 'flex', padding: '8px 0', width: 'max-content' }}>
          {[...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)].map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQSection({ lang }) {
  const t = T[lang] || T.fr
  const [openIndex, setOpenIndex] = useState(null)
  const faqs = t.faqs || []
  return (
    <section id="faq" style={{ background: 'var(--ink-soft)', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <RevealSection style={{ marginBottom: 64, textAlign: 'center' }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>{t.tag06}</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,4vw,48px)', color: 'var(--text)', margin: 0 }}>{t.faqTitle}</h2>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 8 }}>
          {faqs.map((faq, i) => (
            <RevealSection key={i} delay={i * 0.05}>
              <motion.div animate={{ borderColor: openIndex === i ? 'rgba(0,229,160,0.3)' : 'rgba(255,255,255,0.07)' }}
                style={{ border: '1px solid', borderRadius: 12, overflow: 'hidden', background: openIndex === i ? 'rgba(0,229,160,0.02)' : 'transparent' }}
              >
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{faq.q}</span>
                  <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} style={{ color: 'var(--jade)', fontSize: 20, fontWeight: 300, flexShrink: 0, lineHeight: 1, display: 'inline-block' }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p style={{ color: 'var(--text-sec)', fontSize: 15, lineHeight: 1.7, padding: '0 24px 20px', margin: 0 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FINAL WAITLIST ────────────────────────────────────────────────────────────
function WaitlistSection({ count, onCountUpdate, lang }) {
  const t = T[lang] || T.fr
  return (
    <section id="waitlist" style={{ background: 'var(--ink)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <RevealSection>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,184,48,0.1)', border: '1px solid rgba(255,184,48,0.3)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}
          >
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: '#FFB830', letterSpacing: 2 }}>{t.waitlistBadge}</span>
          </motion.div>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>{t.tag07}</p>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(30px,4vw,52px)', color: 'var(--text)', lineHeight: 1.15, margin: '0 0 20px' }}>
            {t.waitlistTitle[0]}<br />
            <em style={{ color: 'var(--jade)', fontStyle: 'italic' }}>{t.waitlistTitle[1]}</em>
          </h2>
          <p style={{ color: 'var(--text-sec)', fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>{t.waitlistSubtitle}</p>
          
          {/* Progress bar */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ width: '100%', height: 10, background: 'var(--ink-mid)', borderRadius: 100, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min((count / 500) * 100, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--jade), var(--sky))', borderRadius: 100 }} 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ color: 'var(--jade)', fontSize: 12, fontFamily: "'Space Mono',monospace", fontWeight: 700 }}>{count} / 500</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{Math.round((count / 500) * 100)}% rempli</span>
            </div>
          </div>
          
          <WaitlistForm source="cta" lang={lang} onSuccess={onCountUpdate} />
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5A0', display: 'inline-block' }} />
            <span style={{ color: 'var(--text-sec)', fontSize: 14 }}>
              <strong style={{ color: 'var(--jade)' }}>{count}</strong> personnes inscrites · Encore <strong style={{ color: 'var(--jade)' }}>{Math.max(0, 500 - count)}</strong> places en accès Early Bird
            </span>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ lang }) {
  const t = T[lang] || T.fr
  return (
    <footer style={{ background: 'var(--ink-soft)', borderTop: '1px solid var(--border)', padding: '72px 24px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 64 }}>
          <div>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 26, color: 'var(--text)', margin: '0 0 12px' }}>Sek<span style={{ color: 'var(--jade)' }}>ur</span>a</p>
            <p style={{ color: 'var(--text-sec)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{t.footerTagline}</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['𝕏', '📸', 'in', '♪'].map((icon, i) => (
                <motion.button key={i} whileHover={{ scale: 1.1, borderColor: 'var(--border-jade)' }} style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--ink-mid)', border: '1px solid var(--border)', color: 'var(--text-sec)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</motion.button>
              ))}
            </div>
          </div>
          {[[t.footerProduct, ['Fonctionnalités', 'Comment ça marche', 'FAQ']], [t.footerMarkets, ['Mexique · CDMX', 'Colombie · Medellín', 'Brésil · São Paulo', 'Europe · Voyageurs']], [t.footerLegal, ['Politique de confidentialité', 'CGU', 'Dossier de presse', 'Contact', 'B2B Entreprises']]].map(([title, links]) => (
            <div key={title}>
              <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 16px' }}>{title}</p>
              {links.map(link => (
                <motion.a key={link} href="#" style={{ display: 'block', color: 'var(--text-sec)', textDecoration: 'none', fontSize: 14, marginBottom: 10 }} whileHover={{ color: 'var(--jade)', x: 3 }}>{link}</motion.a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{t.footerBottom}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {['🇲🇽', '🇨🇴', '🇧🇷', '🇵🇪', '🇫🇷', '🇬🇧', '🇺🇸', '🇦🇺'].map((flag, i) => <span key={i} style={{ fontSize: 18 }}>{flag}</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── LANGUAGE MODAL ────────────────────────────────────────────────────────────
function LanguageModal({ onClose, onSelect, current }) {
  const langs = [
    { code: 'fr', flag: '🇫🇷', label: 'Français', desc: 'Pour les voyageurs francophones' },
    { code: 'en', flag: '🇬🇧', label: 'English', desc: 'For English-speaking travelers' },
    { code: 'es', flag: '🇪🇸', label: 'Español', desc: 'Para residentes y viajeros en LATAM' },
    { code: 'pt', flag: '🇧🇷', label: 'Português', desc: 'Para brasileiros e viajantes' },
  ]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,12,20,0.8)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}
    >
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} transition={{ duration: 0.3 }}
        style={{ background: 'var(--ink-soft)', border: '1px solid var(--border)', borderRadius: 20, padding: '32px 28px', width: '100%', maxWidth: 400 }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 22, color: 'var(--text)', margin: '0 0 24px' }}>{T[current]?.langTitle || 'Choisir la langue'}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {langs.map(l => (
            <motion.button key={l.code} onClick={() => { onSelect(l.code); onClose() }}
              whileHover={{ scale: 1.02, borderColor: 'var(--border-jade)' }}
              style={{ background: current === l.code ? 'rgba(0,229,160,0.08)' : 'transparent', border: `1px solid ${current === l.code ? 'rgba(0,229,160,0.3)' : 'var(--border)'}`, borderRadius: 12, padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}
            >
              <span style={{ fontSize: 24 }}>{l.flag}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15, margin: 0 }}>{l.label}</p>
                <p style={{ color: 'var(--text-sec)', fontSize: 13, margin: 0 }}>{l.desc}</p>
              </div>
              {current === l.code && <span style={{ color: 'var(--jade)', fontSize: 16 }}>✓</span>}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── STICKY CTA (MOBILE) ───────────────────────────────────────────────────────
function StickyCTA({ lang, show }) {
  const t = T[lang] || T.fr
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="show-mobile"
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, background: 'rgba(10,12,20,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)', padding: '12px 16px', boxShadow: '0 -4px 20px rgba(0,0,0,0.3)' }}
        >
          <a href="#waitlist" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="btn-jade"
              style={{ width: '100%', padding: '14px 24px', fontSize: 15, border: 'none', fontFamily: "'Outfit', sans-serif" }}
            >
              {t.navCta}
            </motion.button>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('fr')
  const [showLangModal, setShowLangModal] = useState(false)
  const [waitlistCount, setWaitlistCount] = useState(247)
  const [showStickyCTA, setShowStickyCTA] = useState(false)

  useEffect(() => {
    fetch('/api/waitlist/count').then(r => r.json()).then(data => { if (data.count) setWaitlistCount(data.count) }).catch(() => {})
    
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 800)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 768px) { .hide-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
      <Navbar lang={lang} onLangOpen={() => setShowLangModal(true)} />
      <main>
        <HeroSection lang={lang} onCountUpdate={(c) => setWaitlistCount(c)} liveCount={waitlistCount} />
        <TickerStrip lang={lang} />
        <ProblemSection lang={lang} />
        <FeaturesSection lang={lang} />
        <UseCasesSection lang={lang} />
        <HowItWorksSection lang={lang} />
        <FAQSection lang={lang} />
        <WaitlistSection count={waitlistCount} onCountUpdate={(c) => setWaitlistCount(c)} lang={lang} />
      </main>
      <Footer lang={lang} />

      <AnimatePresence>
        {showLangModal && (
          <LanguageModal current={lang} onSelect={setLang} onClose={() => setShowLangModal(false)} />
        )}
      </AnimatePresence>
      
      <StickyCTA lang={lang} show={showStickyCTA} />
    </>
  )
}
