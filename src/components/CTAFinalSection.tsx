"use client";

import { useInView } from "@/hooks/useInView";

import CityNetwork from "./CityNetwork";

export default function CTAFinalSection({ dict }: { dict: any }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  return (
    <section id="cta-final" className="py-32 lg:py-40 relative overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">

      <CityNetwork id="cta-city-network" className="opacity-20" />

      {/* Radial gradient background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,160,0.06) 0%, transparent 60%)' }} />

      {/* Rising particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00E5A0] animate-[riseParticle_var(--dur)_linear_infinite]"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-10px',
              opacity: 0.1 + Math.random() * 0.15,
              ['--dur' as string]: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div ref={ref as any} className={`max-w-3xl mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Titre principal */}
        <h2 className="text-[clamp(36px,6vw,72px)] font-[900] leading-[1.05] uppercase tracking-tight mb-8">
          <span className="text-white block">{dict.cta.title_1}</span>
          <span className="text-[#00E5A0] block">{dict.cta.title_2}</span>
        </h2>

        {/* Coming soon badge */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_10px_#00E5A0]" />
          <span className="font-mono text-[13px] text-[#00E5A0] tracking-[3px] uppercase">
            {dict.cta.label.replace('// 09 · ', '')}
          </span>
          <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_10px_#00E5A0]" />
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-xl mx-auto">
          <div className="border border-[#00E5A0]/15 rounded-xl p-4 bg-white/[0.02] backdrop-blur-sm">
            <div className="text-[20px] mb-2">🛡️</div>
            <div className="font-mono text-[10px] text-white/50 tracking-widest uppercase">SOS · 3 CLICS</div>
          </div>
          <div className="border border-[#3DD6F5]/15 rounded-xl p-4 bg-white/[0.02] backdrop-blur-sm">
            <div className="text-[20px] mb-2">🗺️</div>
            <div className="font-mono text-[10px] text-white/50 tracking-widest uppercase">HEATMAP IA</div>
          </div>
          <div className="border border-[#FF4D6A]/15 rounded-xl p-4 bg-white/[0.02] backdrop-blur-sm">
            <div className="text-[20px] mb-2">🤖</div>
            <div className="font-mono text-[10px] text-white/50 tracking-widest uppercase">AI ASSISTANT</div>
          </div>
        </div>

        {/* Réassurance */}
        <p className="font-mono text-[12px] text-white/30 tracking-[1px] max-w-md mx-auto mb-8">
          {dict.cta.disclaimer}
        </p>

        {/* Action Button */}
        <a 
          href="https://x.com/SekuraApp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-[#00E5A0] text-[#070c09] font-mono font-bold text-[12px] tracking-widest px-8 py-4 rounded-md hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all shadow-[0_0_30px_rgba(0,229,160,0.3)] whitespace-nowrap cta-shimmer"
        >
          {dict.cta.button}
        </a>

      </div>

      {/* Footer minimaliste */}
      <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-[#00E5A0]/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_10px_#00E5A0]" />
          <span className="font-mono font-bold tracking-[0.14em] text-[13px]">SEKURA</span>
        </div>
        <div className="font-mono text-[10px] text-white/30 tracking-widest">
          {dict.footer.copy}
        </div>
        <div className="font-mono text-[10px] text-white/30 tracking-widest">
          {dict.footer.tagline}
        </div>
        <div className="flex gap-8 font-mono text-[10px] text-white/40 tracking-widest">
          <a href="#" className="hover:text-[#00E5A0] transition-colors relative group">
            PRIVACY
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00E5A0] group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#" className="hover:text-[#00E5A0] transition-colors relative group">
            TERMS
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00E5A0] group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#" className="hover:text-[#00E5A0] transition-colors relative group">
            CONTACT
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00E5A0] group-hover:w-full transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
