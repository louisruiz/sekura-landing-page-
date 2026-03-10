"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function WaitlistForm({ 
  onSuccess 
}: { 
  onSuccess?: () => void 
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showValidation = email.length > 0;

  // Détection de la langue courante (comme sur l'ancien site)
  const currentLang = typeof window !== 'undefined' && window.location.pathname.startsWith('/en') ? 'en'
    : typeof window !== 'undefined' && window.location.pathname.startsWith('/es') ? 'es'
    : typeof window !== 'undefined' && window.location.pathname.startsWith('/pt') ? 'pt'
    : 'fr';

  const doSignup = async (email: string, source = 'cta') => {
    if (!email || !email.includes('@')) return false;
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang: currentLang, locale: currentLang, source, honeypot: '' })
      });
      const data = await res.json();
      return data.success;
    } catch {
      return true; // fail graceful
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && isValidEmail && !isLoading) {
      setIsLoading(true);
      const ok = await doSignup(email, 'cta');
      setIsLoading(false);
      
      if (ok) {
        setSubmitted(true);
        if (onSuccess) onSuccess();
        
        // Redirection après 1.8 seconde vers la page de confirmation unifiée (logique existante)
        const confirmationUrl = `/confirmation/${currentLang}`;
        setTimeout(() => {
          window.location.href = confirmationUrl;
        }, 1800);
      }
    }
  };

  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
              aria-label="Adresse email"
              disabled={isLoading}
              className={`w-full bg-white/5 border rounded-md px-5 py-4 text-white placeholder:text-white/30 font-mono text-[13px] tracking-wide outline-none transition-all ${
                showValidation 
                  ? isValidEmail 
                    ? 'border-[#00E5A0]/60 bg-[#00E5A0]/5 shadow-[0_0_15px_rgba(0,229,160,0.1)]' 
                    : 'border-red-500/50 bg-red-500/5'
                  : 'border-[#00E5A0]/20 focus:border-[#00E5A0]/60 focus:bg-[#00E5A0]/5 focus:shadow-[0_0_20px_rgba(0,229,160,0.15)]'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {showValidation && (
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[14px] ${isValidEmail ? 'text-[#00E5A0]' : 'text-red-500'}`}>
                {isValidEmail ? '✓' : '✗'}
              </span>
            )}
          </div>
          <button 
            type="submit"
            disabled={!isValidEmail || isLoading}
            className="bg-[#00E5A0] text-[#070c09] font-mono font-bold text-[12px] tracking-widest px-8 py-4 rounded-md hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all shadow-[0_0_30px_rgba(0,229,160,0.3)] whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed cta-shimmer"
          >
            {isLoading ? 'EN COURS...' : 'REJOINDRE →'}
          </button>
        </form>
      ) : (
        <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/30 rounded-md px-8 py-6 flex items-center justify-center gap-3 animate-[fadeUp_0.5s_ease-out] w-full">
          <div className="w-3 h-3 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_10px_#00E5A0]" />
          <span className="font-mono text-[13px] text-[#00E5A0] tracking-widest">
            BIENVENUE PARMI LES INSCRITS ✓
          </span>
        </div>
      )}
    </>
  );
}
