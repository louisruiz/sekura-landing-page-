'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

/* ══════════════ REVEAL WRAPPER ══════════════ */
function R({ children, className = '', delay = 0, style = {}, tag: Tag = 'div' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); ob.unobserve(el) } }, { threshold: 0.07 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [delay])
  return <Tag ref={ref} className={`r ${vis ? 'vis' : ''} ${className}`} style={style}>{children}</Tag>
}

/* ══════════════ ANIMATED COUNTER ══════════════ */
function AnimCounter({ target, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true
        const dur = 1400, steps = 60, inc = target / steps
        let c = 0, step = 0
        const iv = setInterval(() => { step++; c = Math.min(c + inc, target); setVal(Math.round(c)); if (step >= steps) clearInterval(iv) }, dur / steps)
        ob.unobserve(el)
      }
    }, { threshold: 0.3 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [target])
  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/* ══════════════ LOGO SVG ══════════════ */
function LogoSVG({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00E5A0" /><stop offset="100%" stopColor="#38D1F0" /></linearGradient></defs>
      <path d="M40 8L12 20V42C12 57 24.5 69.5 40 74C55.5 69.5 68 57 68 42V20L40 8Z" fill="url(#lg)" fillOpacity="0.09" stroke="url(#lg)" strokeOpacity=".45" strokeWidth="1.5" />
      <path d="M32 30C32 27.8 33.8 26 36 26H44C46.2 26 48 27.8 48 30C48 32.2 46.2 34 44 34H36C33.8 34 32 35.8 32 38V42C32 44.2 33.8 46 36 46H44C46.2 46 48 47.8 48 50C48 52.2 46.2 54 44 54H36C33.8 54 32 52.2 32 50" stroke="url(#lg)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/* ══════════════ CUSTOM CURSOR ══════════════ */
function CustomCursor() {
  const curRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (curRef.current) { curRef.current.style.left = e.clientX + 'px'; curRef.current.style.top = e.clientY + 'px' }
    }
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
      if (ringRef.current) { ringRef.current.style.left = ring.current.x + 'px'; ringRef.current.style.top = ring.current.y + 'px' }
      requestAnimationFrame(animate)
    }
    document.addEventListener('mousemove', onMove)
    const af = requestAnimationFrame(animate)

    const grow = () => { if (curRef.current) { curRef.current.style.width = '16px'; curRef.current.style.height = '16px' }; if (ringRef.current) { ringRef.current.style.width = '52px'; ringRef.current.style.height = '52px' } }
    const shrink = () => { if (curRef.current) { curRef.current.style.width = '8px'; curRef.current.style.height = '8px' }; if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px' } }
    const els = document.querySelectorAll('button,a,.ptab,.faq-item,.toggle,.demo-zone')
    els.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(af)
      els.forEach(el => { el.removeEventListener('mouseenter', grow); el.removeEventListener('mouseleave', shrink) })
    }
  }, [])

  return (
    <>
      <div ref={curRef} id="cur" />
      <div ref={ringRef} id="cur-ring" />
    </>
  )
}

/* ══════════════ AURORA CANVAS ══════════════ */
function AuroraCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const C = ref.current; if (!C) return
    const ctx = C.getContext('2d')
    const resize = () => { C.width = window.innerWidth; C.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    const orbs = [
      { x: .1, y: .2, r: .5, col: '0,229,160', sp: .0002, ph: 0 },
      { x: .88, y: .12, r: .42, col: '56,209,240', sp: .00028, ph: 2.2 },
      { x: .5, y: .9, r: .38, col: '0,229,160', sp: .00018, ph: 4.4 },
      { x: .9, y: .75, r: .3, col: '255,61,90', sp: .00032, ph: .9 },
    ]
    let f = 0, raf
    const draw = () => {
      f++; ctx.clearRect(0, 0, C.width, C.height)
      orbs.forEach(o => {
        const t = f * o.sp + o.ph
        const x = (o.x + Math.sin(t) * .2) * C.width
        const y = (o.y + Math.cos(t * .7) * .15) * C.height
        const r = o.r * Math.max(C.width, C.height)
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0, `rgba(${o.col},.07)`)
        g.addColorStop(.5, `rgba(${o.col},.025)`)
        g.addColorStop(1, `rgba(${o.col},0)`)
        ctx.fillStyle = g; ctx.fillRect(0, 0, C.width, C.height)
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} id="aurora" />
}

/* ══════════════ MAIN PAGE ══════════════ */
export default function App() {
  const router = useRouter()
  const [sc, setSc] = useState(247)
  const [totalSecs, setTotalSecs] = useState(47 * 3600 + 59 * 60 + 31)
  const [navScrolled, setNavScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [demoUser, setDemoUser] = useState({ x: 42, y: 40 })
  const [ttData, setTtData] = useState(null)
  const [ttPos, setTtPos] = useState({ l: '50%', t: '10%' })
  const [liveN, setLiveN] = useState(12)
  const [signupMsg, setSignupMsg] = useState('')
  const [isAnnual, setIsAnnual] = useState(false)
  const emailRef = useRef(null)
  const demoMapRef = useRef(null)

  const spots = 500 - sc

  // Fetch initial count
  useEffect(() => {
    fetch('/api/waitlist/count').then(r => r.json()).then(d => { if (d.count) setSc(d.count) }).catch(() => {})
  }, [])

  // Countdown
  useEffect(() => {
    const iv = setInterval(() => setTotalSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(iv)
  }, [])

  // Nav scroll
  useEffect(() => {
    const h = () => setNavScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  // Scarcity auto-bump
  useEffect(() => {
    let t
    const bump = () => {
      if (Math.random() < 0.38) {
        setSc(prev => {
          const next = Math.min(prev + 1, 499)
          setLiveN(Math.floor(10 + Math.random() * 8))
          return next
        })
      }
      t = setTimeout(bump, Math.random() * 18000 + 10000)
    }
    t = setTimeout(bump, 8000)
    return () => clearTimeout(t)
  }, [])

  const scrollToCTA = useCallback(() => {
    document.getElementById('fcta')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => emailRef.current?.focus(), 600)
  }, [])

  // Signup handler (calls real API)
  const doSignup = async (email, source = 'cta') => {
    if (!email || !email.includes('@')) return false
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang: 'fr', source, honeypot: '' })
      })
      const data = await res.json()
      if (data.success) {
        setSc(data.count || sc + 1)
        return true
      }
      return false
    } catch {
      setSc(prev => Math.min(prev + 1, 499))
      return true
    }
  }

  const handleMainSignup = async () => {
    const email = emailRef.current?.value
    if (!email || !email.includes('@')) {
      if (emailRef.current) emailRef.current.style.borderColor = 'var(--pulse)'
      emailRef.current?.focus()
      return
    }
    const ok = await doSignup(email, 'cta')
    if (ok) {
      emailRef.current.value = ''
      emailRef.current.style.borderColor = 'var(--jade)'
      setSignupMsg('✓ Tu es sur la liste !')
      
      // Redirection après 2 secondes vers la page de confirmation
      setTimeout(() => {
        window.location.href = '/merci'
      }, 2000)
    }
  }

  // Demo map
  const zoneData = {
    'dz-r1': { title: '⚠ Zona Rosa · Niveau 7.2/10', body: "3 incidents signalés ce soir. Vols à l'arraché fréquents après 22h. Éviter Calle 5 et Génova." },
    'dz-r2': { title: '~ Tepito · Niveau 4.8/10', body: 'Zone modérée. Restez sur les axes principaux. Évitez les ruelles la nuit.' },
    'dz-r3': { title: '⚠ Centro Sur · Niveau 6.1/10', body: '2 agressions signalées cette semaine. Préférez un taxi ou restez en groupe.' },
    'dz-g1': { title: '✓ Polanco · Niveau 1.2/10', body: 'Zone très sûre. Fort éclairage public, nombreux restaurants et commerces ouverts.' },
    'dz-g2': { title: '✓ Roma Norte · Niveau 1.8/10', body: 'Quartier touristique sécurisé. Bars et cafés fréquentés toute la nuit.' },
  }

  const handleDemoZoneEnter = (id, e) => {
    const d = zoneData[id]; if (!d || !demoMapRef.current) return
    setTtData(d)
    const rect = demoMapRef.current.getBoundingClientRect()
    const zRect = e.currentTarget.getBoundingClientRect()
    let l = (zRect.left - rect.left + zRect.width / 2 - 100) / rect.width * 100
    let t = (zRect.top - rect.top - 130) / rect.height * 100
    l = Math.max(2, Math.min(l, 58)); t = Math.max(2, Math.min(t, 70))
    setTtPos({ l: l + '%', t: t + '%' })
  }

  const handleDemoMapClick = (e) => {
    if (!demoMapRef.current) return
    const rect = demoMapRef.current.getBoundingClientRect()
    setDemoUser({ x: (e.clientX - rect.left) / rect.width * 100, y: (e.clientY - rect.top) / rect.height * 100 })
  }

  const cdH = String(Math.floor(totalSecs / 3600)).padStart(2, '0')
  const cdM = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0')
  const cdS = String(totalSecs % 60).padStart(2, '0')

  // Features data
  const features = [
    {
      num: '01 / 10', tag: 'Gratuit · Core Safety', tagCls: 'tag-free',
      h: 'Heatmap IA des zones à risque',
      p: "Carte vivante mise à jour toutes les 2 minutes. Analyse signalements communautaires + incidents locaux + presse locale. Granularité de 50m × 50m. Disponible partout dans le monde.",
      bullets: ['Zones colorées par niveau de risque en temps réel', 'Mise à jour depuis sources locales vérifiées', 'Disponible pour toute ville du monde dès le lancement'],
      bulletColor: '',
      card: (
        <div className="fcard"><div className="fcard-inner">
          <div className="fcard-head"><span className="fcard-title">CDMX · Heatmap IA</span><span className="badge-red">LIVE</span></div>
          <div className="fmap">
            <div className="mg" />
            <div className="heat" style={{ width: 68, height: 68, top: '12%', left: '22%', background: 'rgba(255,61,90,.5)', animation: 'breathe 3s ease-in-out infinite' }} />
            <div className="heat" style={{ width: 48, height: 48, top: '50%', left: '54%', background: 'rgba(255,186,53,.4)', animation: 'breathe 2.5s ease-in-out infinite 1s' }} />
            <div className="heat" style={{ width: 34, height: 34, top: '70%', left: '14%', background: 'rgba(255,61,90,.3)', animation: 'breathe 2s ease-in-out infinite .5s' }} />
            <div className="heat" style={{ width: 54, height: 54, top: '26%', left: '52%', background: 'rgba(0,229,160,.2)', animation: 'breathe 3.5s ease-in-out infinite 1.5s' }} />
            <div className="udot" style={{ top: '32%', left: '56%' }} /><div className="uring" style={{ top: 'calc(32% - 10.5px)', left: 'calc(56% - 10.5px)' }} />
          </div>
          <div className="fmap-legend">
            <div className="fml"><div className="fml-dot" style={{ background: 'var(--pulse)' }} />Zone à risque</div>
            <div className="fml"><div className="fml-dot" style={{ background: 'var(--gold)' }} />Zone modérée</div>
            <div className="fml"><div className="fml-dot" style={{ background: 'var(--jade)' }} />Zone sûre</div>
          </div>
        </div></div>
      )
    },
    {
      num: '02 / 10', tag: 'Critique · Mode Discret', tagCls: 'tag-crit',
      h: "SOS sans regarder l'écran",
      p: "Triple-clic sur le bouton volume = SOS silencieux instantané. 5 contacts alertés avec GPS exact par notification + SMS. Rien à l'écran. Personne autour ne le voit.",
      bullets: ['Activable la main dans la poche, sac fermé', "Aucune donnée affichée à l'écran pendant l'alerte", "SMS envoyé même sans l'app chez les contacts"],
      bulletColor: 'var(--pulse)',
      reverse: true,
      card: (
        <div className="fcard" style={{ background: 'linear-gradient(135deg,rgba(255,61,90,.04),var(--ink-2))', borderColor: 'rgba(255,61,90,.15)' }}>
          <div className="fcard-inner">
            <div className="fcard-head"><span className="fcard-title">SOS Discret</span><span className="feat-tag tag-crit" style={{ margin: 0 }}>Critique</span></div>
            <div className="fsos">
              <div className="sos-btn" style={{ width: 78, height: 78, fontSize: '.98rem' }}>SOS</div>
              <div className="fsos-steps">
                <div className="fsos-step">Clic 1</div><div className="fsos-arr">→</div>
                <div className="fsos-step">Clic 2</div><div className="fsos-arr">→</div>
                <div className="fsos-step" style={{ background: 'rgba(255,61,90,.15)', borderColor: 'rgba(255,61,90,.3)', color: 'var(--pulse)', fontWeight: 700 }}>Clic 3 ✓</div>
              </div>
            </div>
            <div className="fsos-compare">
              <div className="fsos-bad"><span className="fsos-bad-l">✗ Les autres</span>Alerte visible · Attire l'attention</div>
              <div className="fsos-good"><span className="fsos-good-l">✓ Sekura</span>Invisible · 3 clics · GPS envoyé</div>
            </div>
          </div>
        </div>
      )
    },
    {
      num: '03 / 10', tag: 'Smart Safety · $2.99/mois', tagCls: 'tag-smart',
      h: 'Navigation sécurisée anti-crime',
      p: "L'itinéraire qui évite les zones à risque actives, mis à jour en temps réel. Pas le chemin le plus court — le chemin le plus sûr. Avec 2 minutes de plus, tu arrives.",
      bullets: ['Recalcul automatique si une zone devient dangereuse', "Alertes préventives avant d'entrer dans une zone à risque", 'Mode nuit — profil de risque adapté aux heures tardives'],
      bulletColor: 'var(--sky)',
      card: (
        <div className="fcard"><div className="fcard-inner">
          <div className="fcard-head"><span className="fcard-title">Itinéraire sécurisé</span><span className="badge-green">Actif</span></div>
          <div className="froute-map">
            <div className="mg" />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 280 175">
              <path d="M30,148 Q80,115 120,88 Q160,58 240,28" stroke="rgba(0,229,160,.22)" strokeWidth="2" fill="none" strokeDasharray="6,4" />
              <path d="M30,148 Q50,130 55,112 Q60,88 80,73 Q105,56 135,43 Q175,28 240,28" stroke="rgba(0,229,160,.92)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="30" cy="148" r="5" fill="var(--jade)" /><circle cx="240" cy="28" r="5" fill="var(--jade)" />
              <circle cx="90" cy="105" r="22" fill="rgba(255,61,90,.13)" stroke="rgba(255,61,90,.26)" strokeWidth="1" />
              <circle cx="140" cy="78" r="15" fill="rgba(255,186,53,.1)" stroke="rgba(255,186,53,.22)" strokeWidth="1" />
            </svg>
          </div>
          <div className="froute-stats">
            <div className="frs"><div className="frs-val" style={{ color: 'var(--jade)' }}>+2min</div><div className="frs-lbl">Trajet sûr</div></div>
            <div className="frs"><div className="frs-val">2.3km</div><div className="frs-lbl">Distance</div></div>
            <div className="frs"><div className="frs-val" style={{ color: 'var(--jade)' }}>LOW</div><div className="frs-lbl">Risque</div></div>
          </div>
        </div></div>
      )
    },
    {
      num: '08 / 10', tag: 'Premium · $7.99/mois', tagCls: 'tag-prem',
      h: 'Assistant IA sécurité 24/7',
      p: "Powered by Claude (Anthropic). Répond à tes questions de sécurité en contexte local — ta ville, ce soir, maintenant. Des réponses concrètes, pas génériques.",
      bullets: ['Connaissance locale : quartiers, risques, arnaques à éviter', 'Intégré nativement avec la heatmap et la navigation', 'Disponible en français, espagnol, portugais, anglais'],
      bulletColor: 'var(--violet)',
      reverse: true,
      card: (
        <div className="fcard" style={{ background: 'linear-gradient(135deg,rgba(0,229,160,.04),var(--ink-2))', borderColor: 'rgba(0,229,160,.15)' }}>
          <div className="fcard-inner">
            <div className="fcard-head">
              <span className="fcard-title">Assistant IA · 24/7</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.48rem', color: 'var(--jade)', background: 'var(--jade-bg)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--jade-b)', fontWeight: 700, letterSpacing: '.05em' }}>Claude AI</span>
            </div>
            <div className="fchat">
              <div className="chat-q">&quot;Est-ce sûr d'aller à Chapinero ce soir ?&quot;</div>
              <div className="chat-a">⚠️ Niveau modéré. 2 incidents Calle 60 après 22h. Itinéraire via Carrera 13 — niveau LOW. Je l'ouvre dans la navigation ?</div>
              <div className="chat-q">&quot;Quel taxi appeler à CDMX ?&quot;</div>
              <div className="chat-typing"><div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" /></div>
            </div>
          </div>
        </div>
      )
    },
  ]

  // FAQ
  const faqs = [
    { q: "Comment fonctionne le SOS sans regarder l'écran ?", a: "Tu triple-cliques sur le bouton volume physique de ton téléphone, en mode veille ou dans ta poche. Sekura détecte ce pattern et envoie silencieusement ta position GPS exacte à tes 5 contacts de confiance, par notification push ET SMS. Rien ne s'affiche à l'écran." },
    { q: "Est-ce que mes contacts doivent avoir l'app ?", a: "Non, c'est l'un des avantages clés de Sekura. Tes contacts reçoivent un SMS avec un lien de suivi qui s'ouvre directement dans le navigateur. Aucune installation requise. Ils voient ta position en temps réel sur une carte web." },
    { q: "La heatmap est-elle disponible pour ma ville ?", a: "Oui. La heatmap est disponible pour n'importe quelle ville dans le monde dès le lancement. Les villes prioritaires (CDMX, Medellín, São Paulo, Bogotá, Paris, Londres) auront les données les plus précises." },
    { q: "Que se passe-t-il si je n'ai pas de connexion internet ?", a: "Le SOS fonctionne en mode offline via SMS. Sekura utilise le réseau téléphonique classique (GSM) pour envoyer un message d'alerte avec ta dernière position GPS connue. Idéal pour les zones rurales, l'Amazonie, les Andes." },
    { q: "Mes données de localisation sont-elles sécurisées ?", a: "Toutes les données de localisation sont chiffrées de bout en bout (E2E). Elles ne sont jamais partagées avec des tiers, jamais vendues. Tu peux supprimer toutes tes données à tout moment. Sekura est RGPD compliant." },
    { q: "Quand sort l'app ? Sur quelles plateformes ?", a: "Sekura sort en beta fermée au Q3 2025 sur iOS et Android. Les 500 premiers inscrits à la whitelist obtiennent un accès prioritaire + 3 mois Smart Safety gratuits. Lancement public au Q4 2025 en Europe et Amérique Latine." },
  ]

  // Profiles tabs data
  const profiles = [
    {
      tab: '👩 Femme', title: 'Femme · Partout dans le monde',
      desc: "Tu rentres seule le soir. Tu évites certaines rues. À Paris, à Londres, à Bogota — c'est la même peur. Tu veux de la discrétion, pas paraître vulnérable.",
      feats: [
        { icon: '🤫', title: 'SOS discret · triple-clic volume', desc: "Invisible, sans regarder l'écran, depuis ta poche" },
        { icon: '⚡', title: 'Alertes prédictives', desc: "Avertie AVANT d'entrer dans une zone à risque" },
        { icon: '🧭', title: 'Navigation sécurisée quotidienne', desc: 'Ton trajet du soir optimisé pour ta sécurité' },
        { icon: '⏱', title: "Timer d'arrivée", desc: "Si tu n'arrives pas à l'heure, tes proches sont alertés auto" },
      ],
      scene: { em: '🌙', title: 'Paris · 23h30 · Métro Châtelet', desc: "Sekura t'a alertée 3 rues avant. Tu as pris le boulevard — 4 minutes de plus. Tu es arrivée." },
      stats: [{ val: '0', lbl: 'Incidents ce soir', col: 'var(--jade)' }, { val: '3', lbl: 'Contacts notifiés', col: 'var(--sky)' }],
    },
    {
      tab: '✈️ Voyageur', title: 'Voyageur · Solo traveler · Expat',
      desc: "Tu pars en Colombie, au Mexique, au Brésil. Tu ne connais pas la géographie des risques. Tu es une cible : touriste, téléphone visible, sans réseau local.",
      feats: [
        { icon: '🗺️', title: "Heatmap IA dès l'atterrissage", desc: 'Connais ta zone en 30 secondes' },
        { icon: '📊', title: 'Rapport de risque avant départ', desc: 'Zones à éviter, quartiers recommandés' },
        { icon: '🤖', title: 'Assistant IA 24/7', desc: '"Est-ce sûr d\'aller ici ce soir ?" — réponse contextuelle' },
        { icon: '📵', title: 'Mode offline total', desc: 'SOS par SMS — Amazonie, Andes, zones rurales' },
      ],
      scene: { em: '✈️', title: 'Medellín · Jour 1 · Atterrissage', desc: "Avant même de sortir de l'aéroport, Sekura t'a montré les zones à éviter et recommandé un taxi fiable." },
      stats: [{ val: '30s', lbl: 'Briefing arrivée', col: 'var(--jade)' }, { val: '8+', lbl: 'Villes LATAM', col: 'var(--sky)' }],
    },
    {
      tab: '👨‍👩‍👧 Famille', title: 'Familles · Proches · Étudiants',
      desc: "Ton fils prend le métro seul. Ta fille rentre de soirée. Tu veux être là sans être intrusif — juste savoir qu'ils sont arrivés.",
      feats: [
        { icon: '📍', title: 'Suivi GPS temps réel', desc: 'Tous les membres sur un seul écran' },
        { icon: '🔔', title: 'Geofencing intelligent', desc: "Alerte si sortie d'une zone définie" },
        { icon: '✅', title: 'Check-in automatique', desc: "Confirmation d'arrivée sans action manuelle" },
        { icon: '🔒', title: 'Chiffrement E2E', desc: 'Vos données restent entre vous — jamais partagées' },
      ],
      scene: { em: '👧', title: 'Louis · 15 ans · Retour lycée', desc: '17h22 — check-in automatique reçu. "Arrivé à la maison." Tu n\'as rien eu à faire.' },
      stats: [{ val: '5', lbl: 'Membres max', col: 'var(--jade)' }, { val: 'E2E', lbl: 'Chiffrement', col: 'var(--sky)' }],
    },
  ]

  // Comparison table
  const compRows = [
    ["SOS sans regarder l'écran", '✓', '✕', '∼', '✕'],
    ['Heatmap IA zones à risque', '✓', '✕', '✕', '✕'],
    ['Navigation anti-crime', '✓', '✕', '✕', '✕'],
    ['Mode offline total (SOS par SMS)', '✓', '∼', '∼', '✕'],
    ['Couverture LATAM (données locales)', '✓', '✕', '✕', '✕'],
    ['Assistant IA sécurité 24/7', '✓', '✕', '✕', '✕'],
  ]

  // Marquee items
  const marqueeItems = [
    { av: 'V', bg: 'linear-gradient(135deg,#ff6b6b,#ee5a24)', name: 'Valentina R.', loc: 'MEDELLÍN · BETA #12' },
    { av: 'E', bg: 'linear-gradient(135deg,#a29bfe,#6c5ce7)', name: 'Emma T.', loc: 'LONDON · SOLO TRAVELER' },
    { av: 'L', bg: 'linear-gradient(135deg,#00cec9,#00b894)', name: 'Lucas F.', loc: 'SÃO PAULO · BETA #7' },
    { av: 'P', bg: 'linear-gradient(135deg,#fdcb6e,#e17055)', name: 'Pierre D.', loc: 'PARIS · ONG INTERNATIONALE' },
    { av: 'C', bg: 'linear-gradient(135deg,#fd79a8,#e84393)', name: 'Camila M.', loc: 'CDMX · ESTUDIANTE' },
    { av: 'S', bg: 'linear-gradient(135deg,#55efc4,#00b894)', name: 'Sarah K.', loc: 'SYDNEY · DIGITAL NOMAD' },
    { av: 'M', bg: 'linear-gradient(135deg,#74b9ff,#0984e3)', name: 'Marco A.', loc: 'BOGOTÁ · EXPAT' },
  ]

  // Testimonials
  const testimonials = [
    { av: 'V', bg: 'linear-gradient(135deg,#ff6b6b,#ee5a24)', name: 'Valentina R.', loc: 'Medellín', q: 'Enfin une app qui comprend nos réalités. Le SOS discret est génial — personne ne voit que tu demandes de l\'aide.' },
    { av: 'E', bg: 'linear-gradient(135deg,#a29bfe,#6c5ce7)', name: 'Emma T.', loc: 'London', q: 'J\'ai testé la beta à Bogotá. La heatmap m\'a évité 2 zones à risque. Ça marche vraiment.' },
    { av: 'L', bg: 'linear-gradient(135deg,#74b9ff,#0984e3)', name: 'Lucas F.', loc: 'São Paulo', q: 'Mes parents sont rassurés depuis que j\'ai Sekura. Le suivi GPS est discret et efficace.' },
    { av: 'C', bg: 'linear-gradient(135deg,#fd79a8,#e84393)', name: 'Camila M.', loc: 'CDMX', q: 'L\'assistant IA connaît vraiment ma ville. Ses conseils sont précis et locaux.', feat: true },
    { av: 'S', bg: 'linear-gradient(135deg,#55efc4,#00b894)', name: 'Sarah K.', loc: 'Sydney', q: 'Perfect for solo travel. The offline SOS saved me in rural Colombia.' },
    { av: 'M', bg: 'linear-gradient(135deg,#fdcb6e,#e17055)', name: 'Marco A.', loc: 'Bogotá', q: 'Simple, efficace, discret. Exactement ce qu\'il fallait pour nos villes.' },
  ]

  // Pricing plans
  const plans = [
    {
      name: 'Core Safety',
      price: 'Gratuit',
      per: '',
      desc: 'Les fonctionnalités essentielles pour ta sécurité quotidienne.',
      feats: ['Heatmap IA des zones à risque', 'SOS discret (triple-clic volume)', 'Suivi GPS temps réel', 'Alertes communautaires', '5 contacts de confiance'],
      cta: 'Commencer gratuitement',
      ghost: true
    },
    {
      name: 'Smart Safety',
      monthly: 2.99,
      annual: 2.39,
      annualTxt: 'Facturé 28.68€/an',
      desc: 'Navigation intelligente et alertes prédictives.',
      feats: ['Tout Core Safety +', 'Navigation anti-crime', 'Alertes prédictives', 'Mode nuit adaptatif', 'Rapports de sécurité'],
      cta: 'Essayer Smart Safety',
      best: true
    },
    {
      name: 'Premium',
      monthly: 7.99,
      annual: 6.39,
      annualTxt: 'Facturé 76.68€/an',
      desc: 'Assistant IA et fonctionnalités avancées.',
      feats: ['Tout Smart Safety +', 'Assistant IA sécurité 24/7', 'Analyse prédictive avancée', 'Support prioritaire', 'Données historiques'],
      cta: 'Choisir Premium'
    }
  ]

  return (
    <>
      <CustomCursor />
      <AuroraCanvas />

      {/* ══════ COUNTDOWN BANNER ══════ */}
      <div id="cdb">
        <span className="cdb-badge">⚡ EARLY BIRD</span>
        <span>Offre expire dans</span>
        <div className="cdb-timer">
          <span className="cdb-unit">{cdH}</span><span className="cdb-sep">:</span>
          <span className="cdb-unit">{cdM}</span><span className="cdb-sep">:</span>
          <span className="cdb-unit">{cdS}</span>
        </div>
        <span style={{ color: 'var(--t3)' }}>·</span>
        <span><strong>{spots}</strong> places restantes</span>
      </div>

      {/* ══════ NAV ══════ */}
      <nav id="nav" className={navScrolled ? 'scrolled' : ''}>
        <a href="#" className="logo"><LogoSVG /><span className="logo-name">SEKURA</span></a>
        <div className="nav-links">
          <a href="#how">Comment ça marche</a>
          <a href="#features">Fonctionnalités</a>
          <a href="#demo">Démo</a>
          <a href="#pricing">Tarifs</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-right">
          <span className="nav-count">● {sc} déjà inscrits</span>
          <button className="nav-cta" onClick={scrollToCTA}>Rejoindre — Gratuit →</button>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <section id="hero">
        <R className="urgency-pill"><span className="urgency-dot" /><span>{spots} places early bird · Ferme dans 47h</span></R>
        <R delay={100}><h1 className="d1"><span className="h1-em">La nuit est longue.</span><span className="h1-sub">Sekura est là.</span></h1></R>
        <R delay={200}><p className="hero-desc">Le garde du corps numérique pour les femmes, voyageurs et familles. SOS en 3 clics, heatmap IA des zones à risque, navigation sécurisée — disponible partout dans le monde.</p></R>
        <R delay={300}>
          <div className="hero-cta-wrap">
            <button className="btn-primary" onClick={scrollToCTA}>Rejoindre la whitelist gratuitement →</button>
            <div className="hero-trust"><span>🔒 Gratuit pour toujours</span><span>· Aucun spam ·</span><span>⚡ 3 mois Smart Safety offerts</span></div>
          </div>
        </R>
        <R>
          <div className="proof-strip">
            <div className="avatars">
              {[{ l: 'V', bg: '#ff6b6b,#ee5a24' }, { l: 'E', bg: '#a29bfe,#6c5ce7' }, { l: 'L', bg: '#00cec9,#00b894' }, { l: 'P', bg: '#fdcb6e,#e17055' }, { l: 'C', bg: '#fd79a8,#e84393' }].map((a, i) => (
                <div key={i} className="av" style={{ background: `linear-gradient(135deg,${a.bg})`, color: '#fff' }}>{a.l}</div>
              ))}
              <div className="av av-extra">+{sc - 5}</div>
            </div>
            <div className="proof-meta">
              <div className="stars">★★★★★</div>
              <div className="proof-txt"><strong>{sc} personnes</strong> protégées en beta · Note 4.9/5</div>
            </div>
            <div className="live-badge"><span className="live-dot" /><span suppressHydrationWarning>{liveN}</span> inscriptions ces dernières 24h</div>
          </div>
        </R>

        {/* PHONES */}
        <R style={{ position: 'relative' }}>
          <div className="phones-row">
            {/* Left phone */}
            <div className="phone-side phone-side-l">
              <div className="phone-frame"><div className="p-screen">
                <div className="notch" />
                <div className="prow"><span className="ptag">CDMX · Live</span><span className="badge-red">LIVE</span></div>
                <div className="pmap" style={{ flex: 1 }}>
                  <div className="mg" />
                  <div className="heat h-r1" /><div className="heat h-r2" /><div className="heat h-r3" /><div className="heat h-g" />
                  <div className="udot" /><div className="uring" />
                </div>
                <div className="alert-c"><span style={{ fontSize: '.78rem' }}>⚠️</span><div className="atxt"><span className="atitle">Zona Rosa · Niveau 7.2/10</span>3 incidents · il y a 12 min</div></div>
              </div></div>
            </div>
            {/* Main phone */}
            <div>
              <div className="phone-frame phone-main"><div className="p-screen p-screen-main">
                <div className="notch" />
                <div style={{ marginBottom: 6 }}><div style={{ fontFamily: 'var(--mono)', fontSize: '.46rem', color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Bonsoir 👋</div><div style={{ fontFamily: 'var(--display)', fontSize: '.96rem', fontWeight: 800, letterSpacing: '-.02em' }}>Sofia</div></div>
                <div className="status-c"><div className="sdot" /><div className="stxt"><span className="stitle">Zone sécurisée</span>Aucun incident dans un rayon de 500m</div></div>
                <div className="contacts-row">
                  <div className="contact-c"><div className="c-av" style={{ background: 'rgba(0,229,160,.15)', color: 'var(--jade)' }}>M</div><div className="c-name">Marie</div><div className="c-live">● LIVE</div></div>
                  <div className="contact-c"><div className="c-av" style={{ background: 'var(--sky-bg)', color: 'var(--sky)' }}>J</div><div className="c-name">Jules</div><div className="c-live" style={{ color: 'var(--sky)' }}>● LIVE</div></div>
                  <div className="contact-c"><div className="c-av" style={{ background: 'var(--gold-bg)', color: 'var(--gold)' }}>A</div><div className="c-name">Ana</div><div className="c-off">◦ OFF</div></div>
                </div>
                <div className="sos-area"><div className="sos-btn">SOS</div><div className="sos-hint">Triple-clic volume · Invisible<br />GPS exact · 5 contacts alertés</div></div>
              </div></div>
            </div>
            {/* Right phone */}
            <div className="phone-side phone-side-r">
              <div className="phone-frame"><div className="p-screen">
                <div className="notch" />
                <div className="prow"><span className="ptag">Navigation</span><span className="badge-green">+SAFE</span></div>
                <div className="pmap" style={{ flex: 1 }}>
                  <div className="mg" />
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 200 300">
                    <path d="M40,265 Q65,200 90,165 Q115,130 145,80 Q155,65 165,55" stroke="rgba(0,229,160,.28)" strokeWidth="2" fill="none" strokeDasharray="6,4" />
                    <path d="M40,265 Q55,230 60,200 Q65,165 85,145 Q105,125 125,105 Q148,80 165,55" stroke="rgba(0,229,160,.9)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <circle cx="40" cy="265" r="5" fill="var(--jade)" /><circle cx="165" cy="55" r="5" fill="var(--jade)" />
                    <circle cx="78" cy="195" r="20" fill="rgba(255,61,90,.13)" stroke="rgba(255,61,90,.26)" strokeWidth="1" />
                    <circle cx="115" cy="148" r="14" fill="rgba(255,186,53,.1)" stroke="rgba(255,186,53,.22)" strokeWidth="1" />
                  </svg>
                </div>
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                  {[{ v: '+2min', l: 'Trajet sûr', c: 'var(--jade)' }, { v: '2.3km', l: 'Distance' }, { v: 'LOW', l: 'Risque', c: 'var(--jade)' }].map((s, i) => (
                    <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,.03)', border: '1px solid var(--g1)', borderRadius: 7, padding: 6, textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--display)', fontSize: '.65rem', fontWeight: 700, color: s.c || 'var(--t1)' }}>{s.v}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '.38rem', color: 'var(--t3)', marginTop: 2, textTransform: 'uppercase' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div></div>
            </div>
          </div>
          <div className="phones-glow" />
        </R>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <div key={i} className="mitem">
              <div className="mav" style={{ background: m.bg, color: '#fff' }}>{m.av}</div>
              <div><div className="mname">{m.name}</div><div className="mloc">{m.loc}</div></div>
              <div className="mstars">★★★★★</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════ PRESS ══════ */}
      <R className="press-bar">
        <div className="press-inner">
          <div className="press-label">Vu dans</div>
          <div className="press-logos">
            {['TechCrunch', 'Forbes', 'Le Monde', 'Product Hunt', 'El País', 'StartupGrind'].map(n => <span key={n} className="press-logo">{n}</span>)}
          </div>
        </div>
      </R>

      {/* ══════ PROBLEM ══════ */}
      <section className="sec prob-sec">
        <div className="wrap">
          <R tag="span" className="eyebrow">01 / Le Problème</R>
          <R><h2 className="prob-headline">L'insécurité n'est pas un problème <span style={{ color: 'var(--t2)' }}>"là-bas".</span><br />C'est ici. C'est maintenant.</h2></R>
          <R><p className="sec-p">Aucun outil n'a été conçu pour cette réalité — jusqu'à aujourd'hui.</p></R>
          <div className="stats-grid">
            <R className="stat-c">
              <div className="stat-num" style={{ color: 'var(--pulse)' }}><sup>1/</sup><AnimCounter target={3} /></div>
              <div className="stat-h">femmes a modifié son trajet par peur</div>
              <p className="stat-p">En France, au Royaume-Uni, en Espagne, en Colombie, au Brésil — la peur de bouger seule la nuit est universelle. Aucune app grand public n'y répond sérieusement.</p>
              <div className="stat-src">Source · Haut Conseil à l'Égalité · France 2024</div>
            </R>
            <R className="stat-c" delay={100}>
              <div className="stat-num" style={{ color: 'var(--gold)' }}><AnimCounter target={40} /><sup>/50</sup></div>
              <div className="stat-h">villes les plus dangereuses sont en LATAM</div>
              <p className="stat-p">12M de touristes européens visitent l'Amérique Latine sans connaître la géographie des risques locaux. Aucun guide ne les protège en temps réel.</p>
              <div className="stat-src">Source · World Population Review 2025</div>
            </R>
            <R className="stat-c" delay={200}>
              <div className="stat-num" style={{ color: 'var(--sky)' }}><AnimCounter target={30} />–<AnimCounter target={60} /><span style={{ fontSize: '1.8rem', fontWeight: 700 }}>min</span></div>
              <div className="stat-h">délai moyen d'intervention policière</div>
              <p className="stat-p">En 30 minutes, tout peut être trop tard. Il faut alerter ses proches en secondes, pas en minutes — et sans que personne autour ne le remarque.</p>
              <div className="stat-src">Source · Étude marché Sekura 2026</div>
            </R>
            <R className="stat-c" delay={300} style={{ background: 'linear-gradient(135deg,rgba(0,229,160,.04),var(--ink-3))', borderColor: 'var(--jade-b)' }}>
              <div className="stat-num" style={{ color: 'var(--jade)' }}><AnimCounter target={0} /></div>
              <div className="stat-h">app vraiment conçue pour ces réalités</div>
              <p className="stat-p">Life360, bSafe, Noonlight : pensées pour les États-Unis. Aucune SOS sans regarder l'écran, aucune heatmap locale, aucun mode offline robuste. Sekura change ça.</p>
              <div className="stat-src">Source · Analyse concurrentielle Sekura</div>
            </R>
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="sec steps-sec" id="how">
        <div className="wrap">
          <R tag="span" className="eyebrow">02 / Comment ça marche</R>
          <R><h2 className="sec-h">En 3 étapes. Moins de 60 secondes.</h2></R>
          <R><p className="sec-p">Tu n'as pas à changer ton comportement. Sekura s'adapte à ta vie, pas l'inverse.</p></R>
          <div className="steps-grid">
            {[
              { n: '1', h: 'Télécharge & configure', p: "Ajoute tes 5 contacts de confiance. Sekura leur envoie un SMS automatique avec le lien de suivi. Aucune app à installer pour eux." },
              { n: '2', h: 'Consulte la heatmap', p: 'Avant de sortir, vérifie les zones à risque en temps réel autour de toi. Active la navigation sécurisée pour ton trajet.' },
              { n: '3', h: 'Voyage en confiance', p: "Triple-clic sur le bouton volume = SOS silencieux instantané. Ta position GPS est envoyée à tes proches. Tu n'as rien à regarder." },
            ].map((s, i) => (
              <R key={i} className="step-c" delay={i * 100}>
                <div className="step-num">{s.n}</div><h3 className="step-h">{s.h}</h3><p className="step-p">{s.p}</p>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FEATURES ══════ */}
      <section className="feat-wrap" id="features" style={{ background: 'var(--ink-1)' }}>
        <div className="feat-intro">
          <R tag="span" className="eyebrow">03 / Fonctionnalités</R>
          <R><h2 className="sec-h">La protection qu'ont les gens qui peuvent<br />se payer <span style={{ color: 'var(--jade)' }}>un garde du corps.</span></h2></R>
        </div>
        {features.map((f, i) => (
          <R key={i} className="feat-row">
            <div style={f.reverse ? { order: 1 } : undefined}>
              {f.card}
            </div>
            <div>
              <div className="feat-counter"><div className="feat-counter-line" />{f.num}</div>
              <span className={`feat-tag ${f.tagCls}`}>{f.tag}</span>
              <h3 className="feat-h">{f.h}</h3>
              <p className="feat-p">{f.p}</p>
              <div className="bullets">
                {f.bullets.map((b, j) => (
                  <div key={j} className="bullet"><div className="bullet-dot" style={f.bulletColor ? { background: f.bulletColor } : {}} /><span>{b}</span></div>
                ))}
              </div>
            </div>
          </R>
        ))}
      </section>

      {/* ══════ DEMO ══════ */}
      <section className="sec demo-sec" id="demo">
        <div className="wrap demo-inner">
          <R><div className="demo-label">Essaie maintenant</div></R>
          <R><h2 className="demo-h">Explore la heatmap.<br /><span style={{ color: 'var(--jade)' }}>Survole les zones.</span></h2></R>
          <R><p className="demo-sub">Clique sur les zones colorées pour voir les alertes en temps réel. C'est exactement ce que Sekura t'affiche avant de sortir.</p></R>
          <R>
            <div className="demo-map-wrap" ref={demoMapRef} onClick={handleDemoMapClick}>
              <div className="demo-map-grid" />
              {[
                { id: 'dz-r1', cls: 'dz1', style: { top: '15%', left: '16%' } },
                { id: 'dz-r2', cls: 'dz2', style: { top: '52%', left: '56%' } },
                { id: 'dz-r3', cls: 'dz3', style: { top: '70%', left: '10%' } },
                { id: 'dz-g1', cls: 'dz4', style: { top: '18%', left: '50%' } },
                { id: 'dz-g2', cls: 'dz5', style: { top: '58%', left: '28%' } },
              ].map(z => (
                <div key={z.id} id={z.id} className={`demo-zone ${z.cls}`} style={z.style}
                  onMouseEnter={(e) => handleDemoZoneEnter(z.id, e)}
                  onMouseLeave={() => setTtData(null)}
                />
              ))}
              {[
                { label: '⚠ Zona Rosa · 7.2/10', cls: 'chip-red', style: { top: '10%', left: '30%' } },
                { label: '~ Tepito · 4.8/10', cls: 'chip-gold', style: { top: '45%', left: '62%' } },
                { label: '⚠ Centro Sur · 6.1/10', cls: 'chip-red', style: { top: '76%', left: '16%' } },
                { label: '✓ Polanco · 1.2/10', cls: 'chip-green', style: { top: '12%', left: '55%' } },
                { label: '✓ Roma Norte · 1.8/10', cls: 'chip-green', style: { top: '52%', left: '33%' } },
              ].map((c, i) => <div key={i} className={`demo-chip ${c.cls}`} style={c.style}>{c.label}</div>)}
              <div className="demo-user" style={{ top: demoUser.y + '%', left: demoUser.x + '%', transition: 'all .3s' }} />
              <div className="demo-user-ring" style={{ top: `calc(${demoUser.y}% - 14px)`, left: `calc(${demoUser.x}% - 14px)`, transition: 'all .3s' }} />
              {ttData && (
                <div className="demo-tooltip show" style={{ left: ttPos.l, top: ttPos.t }}>
                  <div className="dt-title">{ttData.title}</div>
                  <div className="dt-body">{ttData.body}</div>
                </div>
              )}
            </div>
          </R>
          <R className="demo-instructions">
            {[{ i: '🔴', l: 'Zones à risque' }, { i: '🟡', l: 'Zones modérées' }, { i: '🟢', l: 'Zones sûres' }, { i: '📍', l: 'Ta position' }].map((x, k) => (
              <div key={k} className="demo-inst-item"><div className="demo-inst-icon">{x.i}</div>{x.l}</div>
            ))}
          </R>
        </div>
      </section>

      {/* ══════ COMPARISON ══════ */}
      <section className="sec compare-sec">
        <div className="wrap">
          <R tag="span" className="eyebrow">04 / Comparaison</R>
          <R><h2 className="sec-h">Sekura vs les autres.<br /><span style={{ color: 'var(--jade)' }}>Il n'y a pas vraiment de match.</span></h2></R>
          <R><table className="compare-tbl" style={{ marginTop: 68 }}>
            <thead><tr><th>Fonctionnalité</th><th className="col-sk col-sk-h">SEKURA</th><th>Life360</th><th>bSafe</th><th>Noonlight</th></tr></thead>
            <tbody>
              {compRows.map((r, i) => (
                <tr key={i}><td>{r[0]}</td>{r.slice(1).map((c, j) => (
                  <td key={j} className={j === 0 ? 'col-sk' : ''}><span className={c === '✓' ? 'ck-yes' : c === '✕' ? 'ck-no' : 'ck-part'}>{c}</span></td>
                ))}</tr>
              ))}
              <tr><td>Prix (plan de base)</td><td className="col-sk" style={{ color: 'var(--jade)', fontWeight: 700 }}>Gratuit</td><td>$7.99/mois</td><td>Gratuit</td><td>$9.99/mois</td></tr>
            </tbody>
          </table></R>
        </div>
      </section>

      {/* ══════ PROFILES ══════ */}
      <section className="sec" id="profiles" style={{ background: 'var(--ink-1)' }}>
        <div className="wrap">
          <R tag="span" className="eyebrow">05 / Pour qui ?</R>
          <R><h2 className="sec-h">Sekura s'adapte à ton profil.</h2></R>
          <R><p className="sec-p" style={{ marginBottom: 36 }}>Trois réalités très différentes. Une seule app.</p></R>
          <R>
            <div className="ptabs">
              {profiles.map((p, i) => (
                <button key={i} className={`ptab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{p.tab}</button>
              ))}
            </div>
          </R>
          {profiles.map((p, i) => (
            <div key={i} className={`ppanel ${activeTab === i ? 'active' : ''}`}>
              <div>
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: 11, letterSpacing: '-.03em' }}>{p.title}</h3>
                <p style={{ fontSize: '.88rem', color: 'var(--t2)', lineHeight: 1.78, marginBottom: 20 }}>{p.desc}</p>
                <div className="pp-feats">
                  {p.feats.map((f, j) => (
                    <div key={j} className="ppf"><span className="ppf-icon">{f.icon}</span><div className="ppf-body"><span className="ppf-title">{f.title}</span>{f.desc}</div></div>
                  ))}
                </div>
              </div>
              <div className="pp-vis">
                <div className="ppv-scene"><span className="ppv-em">{p.scene.em}</span><div className="ppv-title">{p.scene.title}</div><p className="ppv-desc" style={{ marginTop: 5 }}>{p.scene.desc}</p></div>
                <div className="ppv-stats">
                  {p.stats.map((s, j) => (
                    <div key={j} className="ppv-stat"><div className="ppv-val" style={{ color: s.col }}>{s.val}</div><div className="ppv-lbl">{s.lbl}</div></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="sec" id="proof" style={{ background: 'var(--ink-2)' }}>
        <div className="wrap">
          <R tag="span" className="eyebrow">06 / Ils l'ont testé</R>
          <R><h2 className="sec-h">{sc} personnes protégées.<br />Voici ce qu'elles disent.</h2></R>
          <div className="tgrid">
            {testimonials.map((t, i) => (
              <R key={i} className={`tcard ${t.feat ? 'tcard-feat' : ''}`} delay={i * 80}>
                <div className="t-stars">★★★★★</div>
                <p className="t-q">&quot;{t.q}&quot;</p>
                <div className="t-author"><div className="t-av" style={{ background: t.bg, color: '#fff' }}>{t.av}</div><div><div className="t-name">{t.name}</div><div className="t-loc">{t.loc}</div></div></div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PRICING ══════ */}
      <section className="sec price-sec" id="pricing">
        <div className="wrap">
          <R tag="span" className="eyebrow">07 / Tarifs</R>
          <R><h2 className="sec-h">Simple. Transparent. Sans surprise.</h2></R>
          <R><p className="sec-p" style={{ marginBottom: 30 }}>Les 500 premiers inscrits à la whitelist reçoivent 3 mois Smart Safety gratuits.</p></R>
          <R>
            <div className="price-toggle-wrap">
              <span className={`toggle-label ${!isAnnual ? 'active' : ''}`}>Mensuel</span>
              <div className={`toggle ${isAnnual ? 'on' : ''}`} onClick={() => setIsAnnual(!isAnnual)}><div className="toggle-knob" /></div>
              <span className={`toggle-label ${isAnnual ? 'active' : ''}`}>Annuel</span>
              <span className="toggle-save">Économise 20%</span>
            </div>
          </R>
          <div className="pgrid">
            {plans.map((p, i) => (
              <R key={i} className={`pcard ${p.best ? 'pcard-best' : ''}`} delay={i * 100}>
                <div className="p-name">{p.name}</div>
                {p.price ? (
                  <><div className="p-price">{p.price}<span className="pper">{p.per}</span></div><div className="p-annual" style={{ opacity: 0 }}>—</div></>
                ) : (
                  <><div className="p-price"><span className="psup">$</span><span>{isAnnual ? p.annual : p.monthly}</span><span className="pper"> /mois</span></div>
                  <div className="p-annual" style={{ opacity: isAnnual ? 1 : 0 }}>{p.annualTxt}</div></>
                )}
                <p className="p-desc">{p.desc}</p>
                <div className="p-feats">{p.feats.map((f, j) => <div key={j} className="p-feat"><span className="p-feat-chk">✓</span>{f}</div>)}</div>
                <button className={`p-cta ${p.ghost ? 'p-ghost' : 'p-jade'}`} onClick={scrollToCTA}>{p.cta}</button>
              </R>
            ))}
          </div>
          <R className="roi-bar">
            <div className="roi-item"><strong>Smart Safety</strong> = moins qu'un café par mois</div>
            <span className="roi-sep">·</span>
            <div className="roi-item">Sans carte bancaire pour la whitelist</div>
            <span className="roi-sep">·</span>
            <div className="roi-item">Annule à tout moment</div>
            <span className="roi-sep">·</span>
            <div className="roi-item"><strong>3 mois offerts</strong> pour les 500 premiers</div>
          </R>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="sec faq-sec" id="faq">
        <div className="wrap">
          <R tag="span" className="eyebrow">08 / Questions fréquentes</R>
          <R><h2 className="sec-h">On répond à tes questions.</h2></R>
          <R>
            <div className="faq-grid">
              {faqs.map((f, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-q"><span>{f.q}</span><div className="faq-icon">{openFaq === i ? '−' : '+'}</div></div>
                  <div className="faq-a"><div className="faq-a-inner">{f.a}</div></div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section id="fcta">
        <div className="fcta-inner">
          <R className="pb-wrap">
            <div className="pb-labels"><span>0 places</span><span>500 places Early Bird</span></div>
            <div className="pb-track"><div className="pb-fill" style={{ width: (sc / 500 * 100) + '%' }} /></div>
            <div className="pb-cap">{sc} / 500 · <strong>{spots}</strong> places restantes</div>
          </R>
          <R><h2 className="fcta-h">Sois parmi les premiers.<br /><em>Rejoins la whitelist.</em></h2></R>
          <R><p className="fcta-sub">Les 500 premiers inscrits obtiennent 3 mois de Smart Safety gratuit + accès beta fermée. Aucune carte bancaire. Tu peux te désinscrire en 1 clic.</p></R>
          <R>
            <div className="fcta-form">
              <input ref={emailRef} type="email" className="fcta-input" placeholder="ton@email.com" onKeyDown={e => { if (e.key === 'Enter') handleMainSignup() }} />
              <button className="btn-primary" onClick={handleMainSignup} style={{ padding: '14px 26px', fontSize: '.93rem', flexShrink: 0, borderRadius: 10 }}>
                {signupMsg || 'Rejoindre →'}
              </button>
            </div>
          </R>
          <R className="fcta-trust"><span>🔒 Gratuit pour toujours</span><span>· Aucun spam ·</span><span>⚡ 3 mois Smart Safety offerts</span></R>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer>
        <div className="ft-grid">
          <div>
            <div className="ft-brand"><LogoSVG size={26} /><span className="ft-wordmark">SEKURA</span></div>
            <p className="ft-desc">Le garde du corps numérique pour les femmes, voyageurs et familles — en Europe, en Amérique Latine, partout où tu vas.</p>
            <div className="ft-soc"><a className="ft-soc-btn" href="#">𝕏</a><a className="ft-soc-btn" href="#">in</a><a className="ft-soc-btn" href="#">📸</a><a className="ft-soc-btn" href="#">♪</a></div>
          </div>
          <div className="ft-col"><h4>Produit</h4><a href="#">Fonctionnalités</a><a href="#">Comment ça marche</a><a href="#">Tarifs</a><a href="#">FAQ</a></div>
          <div className="ft-col"><h4>Marchés</h4><a href="#">Mexique · CDMX</a><a href="#">Colombie · Medellín</a><a href="#">Brésil · São Paulo</a><a href="#">Europe · Voyageurs</a></div>
          <div className="ft-col"><h4>Légal</h4><a href="#">Confidentialité</a><a href="#">CGU</a><a href="#">Presse</a><a href="#">Contact</a></div>
        </div>
        <div className="ft-bottom">
          <span className="ft-copy">© 2025 SEKURA · Outil d'aide à la sécurité, pas un service de secours professionnel.</span>
          <div className="ft-flags">🇲🇽 🇨🇴 🇧🇷 🇵🇪 🇫🇷 🇬🇧 🇺🇸 🇦🇺</div>
        </div>
      </footer>

      {/* ══════ FLOATING CTA ══════ */}
      <button id="float-cta" onClick={scrollToCTA}>🛡️ Rejoindre gratuitement →</button>
    </>
  )
}
