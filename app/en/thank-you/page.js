'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ThankYouPage() {
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
        {/* Checkmark icon animated */}
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
          WHITELIST CONFIRMED ✓
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'var(--t1)',
          marginBottom: 16,
          lineHeight: 1.1
        }}>
          You're in.<br/>
          <span style={{ color: 'var(--jade)' }}>Sekura is coming soon.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
          color: 'var(--t2)',
          maxWidth: 520,
          lineHeight: 1.7,
          marginBottom: 36
        }}>
          Check your email — you'll find your confirmation and all the details
          about your priority beta access + 3 months Smart Safety free.
        </p>

        {/* 3 steps ahead */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          maxWidth: 420,
          width: '100%',
          marginBottom: 40,
          textAlign: 'left'
        }}>
          <div className="confirm-step">
            <span className="confirm-step-num">1</span>
            <div>
              <strong style={{ color: 'var(--t1)', fontSize: '0.9rem' }}>Check your email</strong>
              <p style={{ color: 'var(--t2)', fontSize: '0.82rem', margin: '2px 0 0' }}>
                A confirmation email was just sent from hello@sekura.space
              </p>
            </div>
          </div>
          <div className="confirm-step">
            <span className="confirm-step-num">2</span>
            <div>
              <strong style={{ color: 'var(--t1)', fontSize: '0.9rem' }}>Beta access Q3 2025</strong>
              <p style={{ color: 'var(--t2)', fontSize: '0.82rem', margin: '2px 0 0' }}>
                You get priority access to the closed iOS and Android beta
              </p>
            </div>
          </div>
          <div className="confirm-step">
            <span className="confirm-step-num">3</span>
            <div>
              <strong style={{ color: 'var(--t1)', fontSize: '0.9rem' }}>3 months Smart Safety free</strong>
              <p style={{ color: 'var(--t2)', fontSize: '0.82rem', margin: '2px 0 0' }}>
                Reserved for the first 500 — you're one of them
              </p>
            </div>
          </div>
        </div>

        {/* CTA back home */}
        <Link href="/en" style={{
          fontFamily: 'var(--body)',
          fontSize: '0.85rem',
          color: 'var(--t3)',
          textDecoration: 'none',
          transition: 'color 0.2s'
        }}>
          ← Back to home
        </Link>
      </main>
    </>
  )
}