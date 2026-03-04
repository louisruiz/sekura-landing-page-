'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'

// Traductions pour la page merci
const T = {
  fr: {
    title: 'Tu es sur la liste !',
    subtitle: 'Welcome aboard.',
    position: (count) => `#${count} sur la liste · ${Math.max(0, 500 - count)} places restantes`,
    emailSent: 'Un email de confirmation a été envoyé à',
    benefitsTitle: 'CE QUE TU OBTIENS :',
    benefits: [
      '3 mois de Smart Safety gratuit au lancement',
      'Accès beta prioritaire — avant le grand public',
      'Tu es contacté(e) en avant-première',
      'Réductions exclusives réservées aux Early Birds',
    ],
    nextStepsTitle: 'EN ATTENDANT :',
    nextSteps: [
      { icon: '𝕏', label: 'Suivre @SekuraApp sur X', href: 'https://twitter.com/SekuraApp' },
      { icon: '📸', label: 'Instagram @SekuraApp', href: 'https://instagram.com/SekuraApp' },
    ],
    backHome: '← Retour à l\'accueil',
    footer: 'Sekura est un outil d\'aide, pas un service de secours professionnel.',
  },
  en: {
    title: 'You\'re on the list!',
    subtitle: 'Welcome aboard.',
    position: (count) => `#${count} on the list · ${Math.max(0, 500 - count)} spots remaining`,
    emailSent: 'A confirmation email has been sent to',
    benefitsTitle: 'WHAT YOU GET:',
    benefits: [
      '3 months of Smart Safety free at launch',
      'Priority beta access — before the general public',
      'You\'ll be contacted first',
      'Exclusive discounts for Early Birds',
    ],
    nextStepsTitle: 'IN THE MEANTIME:',
    nextSteps: [
      { icon: '𝕏', label: 'Follow @SekuraApp on X', href: 'https://twitter.com/SekuraApp' },
      { icon: '📸', label: 'Instagram @SekuraApp', href: 'https://instagram.com/SekuraApp' },
    ],
    backHome: '← Back to home',
    footer: 'Sekura is a support tool, not a professional emergency service.',
  },
  es: {
    title: '¡Estás en la lista!',
    subtitle: 'Welcome aboard.',
    position: (count) => `#${count} en la lista · ${Math.max(0, 500 - count)} plazas restantes`,
    emailSent: 'Un correo de confirmación ha sido enviado a',
    benefitsTitle: 'LO QUE OBTIENES:',
    benefits: [
      '3 meses de Smart Safety gratis en el lanzamiento',
      'Acceso beta prioritario — antes del público general',
      'Te contactaremos primero',
      'Descuentos exclusivos para Early Birds',
    ],
    nextStepsTitle: 'MIENTRAS TANTO:',
    nextSteps: [
      { icon: '𝕏', label: 'Seguir @SekuraApp en X', href: 'https://twitter.com/SekuraApp' },
      { icon: '📸', label: 'Instagram @SekuraApp', href: 'https://instagram.com/SekuraApp' },
    ],
    backHome: '← Volver al inicio',
    footer: 'Sekura es una herramienta de apoyo, no un servicio de emergencia profesional.',
  },
  pt: {
    title: 'Você está na lista!',
    subtitle: 'Welcome aboard.',
    position: (count) => `#${count} na lista · ${Math.max(0, 500 - count)} vagas restantes`,
    emailSent: 'Um email de confirmação foi enviado para',
    benefitsTitle: 'O QUE VOCÊ GANHA:',
    benefits: [
      '3 meses de Smart Safety grátis no lançamento',
      'Acesso beta prioritário — antes do público geral',
      'Você será contatado primeiro',
      'Descontos exclusivos para Early Birds',
    ],
    nextStepsTitle: 'ENQUANTO ISSO:',
    nextSteps: [
      { icon: '𝕏', label: 'Seguir @SekuraApp no X', href: 'https://twitter.com/SekuraApp' },
      { icon: '📸', label: 'Instagram @SekuraApp', href: 'https://instagram.com/SekuraApp' },
    ],
    backHome: '← Voltar ao início',
    footer: 'Sekura é uma ferramenta de apoio, não um serviço de emergência profissional.',
  },
}

function MerciContent() {
  const params = useSearchParams()
  const router = useRouter()
  const email = params.get('email') || ''
  const count = parseInt(params.get('count') || '1', 10)
  const langParam = params.get('lang') || 'fr'
  
  const [lang, setLang] = useState('fr')
  
  useEffect(() => {
    setLang(['fr', 'en', 'es', 'pt'].includes(langParam) ? langParam : 'fr')
  }, [langParam])
  
  const t = T[lang] || T.fr

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
      {/* Bg glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: -200, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(61,214,245,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div initial="hidden" animate="visible" variants={stagger}
        style={{ maxWidth: 600, width: '100%', position: 'relative', zIndex: 1, textAlign: 'center' }}
      >
        {/* Logo */}
        <motion.div variants={item} style={{ marginBottom: 40 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 28, color: 'var(--text)' }}>
              Sek<span style={{ color: 'var(--jade)' }}>ur</span>a
            </span>
          </a>
        </motion.div>

        {/* Big checkmark animation */}
        <motion.div variants={item} style={{ marginBottom: 32 }}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
            style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(0,229,160,0.12)', border: '2px solid rgba(0,229,160,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 0 40px rgba(0,229,160,0.2)' }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: 40 }}
            >🎉</motion.span>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={item}
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(32px,5vw,52px)', lineHeight: 1.1, color: 'var(--text)', margin: '0 0 16px', letterSpacing: -1 }}
        >
          {t.title}<br />
          <em style={{ color: 'var(--jade)', fontStyle: 'italic' }}>{t.subtitle}</em>
        </motion.h1>

        {/* Position badge */}
        <motion.div variants={item} style={{ marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)', borderRadius: 100, padding: '8px 20px' }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: '#00E5A0', fontWeight: 700 }}>{t.position(count).split(' · ')[0]}</span>
            <span style={{ color: 'var(--text-sec)', fontSize: 13 }}>{t.position(count).split(' · ')[1]}</span>
          </div>
        </motion.div>

        {/* Email confirmation info */}
        {email && (
          <motion.p variants={item} style={{ color: 'var(--text-sec)', fontSize: 15, marginBottom: 40, lineHeight: 1.6 }}>
            {t.emailSent}{' '}
            <strong style={{ color: 'var(--text)' }}>{email}</strong>
          </motion.p>
        )}

        {/* Benefits box */}
        <motion.div variants={item}
          style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 20, padding: '28px 32px', marginBottom: 40, textAlign: 'left' }}
        >
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 20px' }}>{t.benefitsTitle}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {t.benefits.map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
              >
                <span style={{ color: 'var(--jade)', fontWeight: 700, flexShrink: 0, fontSize: 16 }}>✓</span>
                <span style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.5 }}>{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next steps */}
        <motion.div variants={item} style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>{t.nextStepsTitle}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {t.nextSteps.map((s, i) => (
              <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,229,160,0.15)' }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--ink-soft)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 20px', textDecoration: 'none', color: 'var(--text)', fontSize: 14, fontWeight: 600, transition: 'border-color 0.2s' }}
              >
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span>{s.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Back to home */}
        <motion.div variants={item}>
          <motion.button onClick={() => router.push('/')}
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,229,160,0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{ background: 'var(--jade)', color: 'var(--ink)', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}
          >
            {t.backHome}
          </motion.button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p variants={item} style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 48, lineHeight: 1.6 }}>
          {t.footer}<br />
          © 2025 Sekura · <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>sekura.space</a>
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function MerciPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0A0C14' }} />}>
      <MerciContent />
    </Suspense>
  )
}
