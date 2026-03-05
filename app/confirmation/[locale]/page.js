'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ── Contenu par langue ──
const content = {
  fr: {
    lang: 'fr',
    htmlLang: 'fr-FR',
    badge: 'WHITELIST CONFIRMÉE ✓',
    title: 'Tu es dedans.',
    titleAccent: 'Sekura arrive bientôt.',
    subtitle: 'Vérifie ton email — tu y trouveras ta confirmation et tous les détails sur ton accès beta prioritaire + les 3 mois Smart Safety offerts.',
    steps: [
      { num: '1', label: 'Vérifie ton email', desc: 'Un email de confirmation vient d\'être envoyé depuis hello@sekura.space' },
      { num: '2', label: 'Accès beta Q3 2025', desc: 'Tu reçois un accès prioritaire à la beta fermée iOS et Android' },
      { num: '3', label: '3 mois Smart Safety offerts', desc: 'Réservés aux 500 premiers — tu en fais partie' },
    ],
    back: '← Retour à l\'accueil',
    backHref: '/',
    metaTitle: 'Bienvenue dans Sekura ! Ta place est confirmée.',
    metaDesc: 'Tu es sur la whitelist Sekura. Vérifie ton email pour confirmer ta place et recevoir ton accès beta.',
  },
  en: {
    lang: 'en',
    htmlLang: 'en-GB',
    badge: 'WHITELIST CONFIRMED ✓',
    title: "You're in.",
    titleAccent: 'Sekura is coming soon.',
    subtitle: 'Check your email — you\'ll find your confirmation and all the details about your priority beta access + 3 months Smart Safety free.',
    steps: [
      { num: '1', label: 'Check your email', desc: 'A confirmation email was just sent from hello@sekura.space' },
      { num: '2', label: 'Beta access Q3 2025', desc: 'You get priority access to the closed iOS and Android beta' },
      { num: '3', label: '3 months Smart Safety free', desc: 'Reserved for the first 500 — you\'re one of them' },
    ],
    back: '← Back to home',
    backHref: '/en',
    metaTitle: 'Welcome to Sekura! Your spot is confirmed.',
    metaDesc: 'You\'re on the Sekura whitelist. Check your email to confirm your spot and receive your beta access.',
  },
  es: {
    lang: 'es',
    htmlLang: 'es-ES',
    badge: 'WHITELIST CONFIRMADA ✓',
    title: 'Ya estás dentro.',
    titleAccent: 'Sekura llega pronto.',
    subtitle: 'Revisa tu email — encontrarás tu confirmación y todos los detalles sobre tu acceso beta prioritario + 3 meses Smart Safety gratis.',
    steps: [
      { num: '1', label: 'Revisa tu email', desc: 'Se acaba de enviar un email de confirmación desde hello@sekura.space' },
      { num: '2', label: 'Acceso beta Q3 2025', desc: 'Obtienes acceso prioritario a la beta cerrada de iOS y Android' },
      { num: '3', label: '3 meses Smart Safety gratis', desc: 'Reservado para los primeros 500 — tú eres uno de ellos' },
    ],
    back: '← Volver al inicio',
    backHref: '/es',
    metaTitle: '¡Bienvenido a Sekura! Tu lugar está confirmado.',
    metaDesc: 'Estás en la whitelist de Sekura. Revisa tu email para confirmar tu lugar y recibir tu acceso beta.',
  },
  pt: {
    lang: 'pt',
    htmlLang: 'pt-BR',
    badge: 'WHITELIST CONFIRMADA ✓',
    title: 'Você está dentro.',
    titleAccent: 'Sekura está chegando.',
    subtitle: 'Verifique seu email — você encontrará sua confirmação e todos os detalhes sobre seu acesso beta prioritário + 3 meses Smart Safety grátis.',
    steps: [
      { num: '1', label: 'Verifique seu email', desc: 'Um email de confirmação acabou de ser enviado de hello@sekura.space' },
      { num: '2', label: 'Acesso beta Q3 2025', desc: 'Você recebe acesso prioritário à beta fechada no iOS e Android' },
      { num: '3', label: '3 meses Smart Safety grátis', desc: 'Reservado para os primeiros 500 — você é um deles' },
    ],
    back: '← Voltar ao início',
    backHref: '/pt',
    metaTitle: 'Bem-vindo ao Sekura! Seu lugar está confirmado.',
    metaDesc: 'Você está na whitelist do Sekura. Verifique seu email para confirmar seu lugar e receber seu acesso beta.',
  },
}

export default function ConfirmationPage() {
  const params = useParams()
  const locale = params?.locale || 'fr'
  const t = content[locale] || content.fr

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <style jsx global>{`
        :root {
          --ink-0: #060810;
          --ink-1: #0A0C14;
          --g1: #1A1D2E;
          --t1: #F0F2FF;
          --t2: #8892B0;
          --t3: #4A5568;
          --jade: #00E5A0;
          --jade-bg: rgba(0,229,160,0.06);
          --r12: 12px;
          --display: 'Clash Grotesk', -apple-system, sans-serif;
          --body: 'General Sans', -apple-system, sans-serif;
          --mono: 'JetBrains Mono', 'Courier New', monospace;
        }
        @keyframes pop-in {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        .confirm-step {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: var(--ink-1);
          border: 1px solid var(--g1);
          border-radius: var(--r12);
          padding: 14px 16px;
        }
        .confirm-step-num {
          width: 26px; height: 26px;
          background: var(--jade-bg);
          border: 1px solid rgba(0,229,160,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--jade);
          flex-shrink: 0;
        }
      `}</style>

      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ink-0)',
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5%, 48px)',
        textAlign: 'center'
      }}>
        {/* Icône checkmark animée */}
        <div style={{
          width: 72, height: 72,
          background: 'rgba(0,229,160,0.12)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          animation: 'pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1)'
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img" aria-label="Confirmation">
            <path d="M7 16L13 22L25 10" stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Badge */}
        <div style={{
          background: 'rgba(0,229,160,0.08)',
          border: '1px solid rgba(0,229,160,0.24)',
          borderRadius: '100px',
          padding: '5px 14px',
          fontFamily: 'var(--mono)',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: 'var(--jade)',
          textTransform: 'uppercase',
          marginBottom: 20
        }}>
          {t.badge}
        </div>

        {/* Titre principal */}
        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'var(--t1)',
          marginBottom: 16,
          lineHeight: 1.1
        }}>
          {t.title}<br/>
          <span style={{ color: 'var(--jade)' }}>{t.titleAccent}</span>
        </h1>

        {/* Sous-titre */}
        <p style={{
          fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
          color: 'var(--t2)',
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 36
        }}>
          {t.subtitle}
        </p>

        {/* 3 étapes à venir */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          maxWidth: 420,
          width: '100%',
          marginBottom: 40,
          textAlign: 'left'
        }}>
          {t.steps.map((step) => (
            <div key={step.num} className="confirm-step">
              <span className="confirm-step-num">{step.num}</span>
              <div>
                <strong style={{ color: 'var(--t1)', fontSize: '0.9rem' }}>{step.label}</strong>
                <p style={{ color: 'var(--t2)', fontSize: '0.82rem', margin: '2px 0 0' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA retour accueil */}
        <Link href={t.backHref} style={{
          fontFamily: 'var(--body)',
          fontSize: '0.85rem',
          color: 'var(--t3)',
          textDecoration: 'none',
          transition: 'color 0.2s'
        }}>
          {t.back}
        </Link>
      </main>
    </>
  )
}

export async function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'pt' },
  ]
}

export const metadata = {
  robots: { index: false, follow: false },
}
