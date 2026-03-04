'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

function MerciContent() {
  const params = useSearchParams()
  const router = useRouter()
  const email = params.get('email') || ''
  const count = parseInt(params.get('count') || '1', 10)

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  const benefits = [
    '3 mois de Smart Safety gratuit au lancement',
    'Accès beta prioritaire — avant le grand public',
    'Tu es contacté(e) en avant-première',
    'Réductions exclusives réservées aux Early Birds',
  ]

  const nextSteps = [
    { icon: '𝕏', label: 'Suivre @SekuraApp sur X', href: 'https://twitter.com/SekuraApp', color: 'var(--text)' },
    { icon: '📸', label: 'Instagram @SekuraApp', href: 'https://instagram.com/SekuraApp', color: '#E1306C' },
    { icon: '📧', label: 'Vérifie ton email', href: `mailto:${email}`, color: 'var(--jade)' },
  ]

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
          Tu es sur la liste !<br />
          <em style={{ color: 'var(--jade)', fontStyle: 'italic' }}>Welcome aboard.</em>
        </motion.h1>

        {/* Position badge */}
        <motion.div variants={item} style={{ marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)', borderRadius: 100, padding: '8px 20px' }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: '#00E5A0', fontWeight: 700 }}>#{count}</span>
            <span style={{ color: 'var(--text-sec)', fontSize: 13 }}>sur la liste · {Math.max(0, 500 - count)} places restantes</span>
          </div>
        </motion.div>

        {/* Email confirmation info */}
        {email && (
          <motion.p variants={item} style={{ color: 'var(--text-sec)', fontSize: 15, marginBottom: 40, lineHeight: 1.6 }}>
            Un email de confirmation a été envoyé à{' '}
            <strong style={{ color: 'var(--text)' }}>{email}</strong>
          </motion.p>
        )}

        {/* Benefits box */}
        <motion.div variants={item}
          style={{ background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 20, padding: '28px 32px', marginBottom: 40, textAlign: 'left' }}
        >
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--jade)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 20px' }}>CE QUE TU OBTIENS :</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {benefits.map((b, i) => (
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
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>EN ATTENDANT :</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {nextSteps.map((s, i) => (
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
            ← Retour à l'accueil
          </motion.button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p variants={item} style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 48, lineHeight: 1.6 }}>
          Sekura est un outil d'aide, pas un service de secours professionnel.<br />
          © 2025 Sekura · <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>sekura.app</a>
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
