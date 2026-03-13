"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import CityNetwork from "./CityNetwork";

function AnimatedNumber({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 1500;
      const start = performance.now();
      const animate = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.floor(ease * value));
        if (p < 1) requestAnimationFrame(animate); else setDisplay(value);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  return <>{display}{suffix}</>;
}

export default function ProblemSection({ dict }: { dict: any }) {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: statsRef, isInView: statsInView } = useInView({ threshold: 0.2 });
  const [zeroFlashed, setZeroFlashed] = useState(false);
  const [typingIdx, setTypingIdx] = useState(0);

  const titleLines = [dict.problem.title_1, dict.problem.title_2, dict.problem.title_3];
  const fullTitle = titleLines.join("\n");

  // Typewriter effect (Le Problème #6)
  useEffect(() => {
    if (titleInView && typingIdx < fullTitle.length) {
      const t = setTimeout(() => {
        setTypingIdx(prev => prev + 1);
      }, 40); // typing speed
      return () => clearTimeout(t);
    }
  }, [titleInView, typingIdx, fullTitle.length]);

  useEffect(() => {
    if (statsInView && !zeroFlashed) {
      const t = setTimeout(() => setZeroFlashed(true), 800);
      return () => clearTimeout(t);
    }
  }, [statsInView, zeroFlashed]);

  const typedLines = fullTitle.substring(0, typingIdx).split("\n");

  return (
    <section className="relative pt-32 pb-48 overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">
      <CityNetwork id="problem-city-network" className="opacity-12" />
      {/* Simulation Glitch Mesh (Le Problème #1) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-20 hidden lg:block mix-blend-screen overflow-hidden">
         {/* Noise overlay specific to glitch */}
         <div className="absolute inset-0 bg-[#00E5A0]/5 mix-blend-overlay noise-overlay" />
         {/* Simulated 3D glitch wave using CSS since we lack the specific Spline asset */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#FF4D6A]/10 to-transparent blur-[50px] animate-[pulse_4s_infinite]" />
         <svg className="w-full h-full opacity-30 animate-pulse" viewBox="0 0 100 100">
           <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="#00E5A0" strokeWidth="0.5" className="animate-[drawPath_3s_infinite]" />
           <path d="M10,60 Q30,20 50,60 T90,60" fill="none" stroke="#3DD6F5" strokeWidth="0.5" className="animate-[drawPath_2.5s_infinite_reverse]" />
           <path d="M10,40 Q30,0 50,40 T90,40" fill="none" stroke="#FF4D6A" strokeWidth="0.5" className="animate-[drawPath_3.5s_infinite]" />
         </svg>
      </div>

      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 3px, rgba(0,229,160,0.015) 4px)' }}
      />
      
      {/* Subtle red danger hue at top */}
      <div 
        className="absolute top-0 left-0 w-full h-[400px] pointer-events-none z-0"
        style={{ background: 'linear-gradient(180deg, rgba(255,77,106,0.03), transparent)' }}
      />

      {/* Radial green glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,229,160,0.05), transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 flex flex-col lg:flex-row gap-20">
        
        {/* Titre Principal — Sticky (Le Problème #10) */}
        <div ref={titleRef as any} className="lg:w-1/3 lg:sticky lg:top-32 self-start">
          <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px] mb-8 uppercase">
            {dict.problem.label}
          </div>

          <h2 className="text-[clamp(40px,5vw,72px)] font-[900] leading-[1.05] mb-10 uppercase tracking-tight min-h-[160px]">
            <span className="text-white block">{typedLines[0]}</span>
            <span className="text-[#00E5A0] block">{typedLines[1] || ""}</span>
            <span className="text-white block">
              {typedLines[2] || ""}
              {typingIdx < fullTitle.length && <span className="inline-block w-[6px] h-[40px] bg-[#00E5A0] ml-2 animate-pulse" />}
            </span>
          </h2>

          <p className="text-white/50 text-[16px] md:text-[18px] leading-[1.6] mb-12">
            {dict.problem.desc_1} <span className="text-white font-medium">{dict.problem.desc_2}</span>.
          </p>

          {/* Animated separator line */}
          <div className={`h-[1px] bg-gradient-to-r from-[#00E5A0]/40 to-transparent transition-all duration-1000 ease-out ${titleInView ? 'w-full' : 'w-0'}`} />
        </div>

        {/* Grid Stats — Mobile Carousel (Le Problème #9) */}
        <div ref={statsRef as any} className="lg:w-2/3 flex flex-col pt-[10vh]">
          {/* Mobile wrapper for horizontal scroll snap */}
          <div className="flex sm:grid sm:grid-cols-2 gap-x-6 gap-y-10 overflow-x-auto sm:overflow-visible pb-8 snap-x snap-mandatory hide-scrollbars">
            
            <div className={`min-w-[85vw] sm:min-w-0 snap-center bg-white/[0.02] backdrop-blur-sm border border-white/5 border-l-2 border-l-[#00E5A0]/10 pl-6 lg:pl-8 py-8 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] hover:bg-white/[0.04] ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '0ms' }}>
              <div className="text-[52px] xl:text-[64px] font-[900] text-white leading-none mb-3">
                1/<AnimatedNumber value={3} inView={statsInView} />
              </div>
              <div className="font-mono text-[11px] xl:text-[12px] text-white/40 uppercase tracking-[2px] leading-[1.6] pr-4">
                {dict.problem.stat1_label}
              </div>
            </div>

            <div className={`min-w-[85vw] sm:min-w-0 snap-center bg-white/[0.02] backdrop-blur-sm border border-white/5 border-l-2 border-l-[#00E5A0]/10 pl-6 lg:pl-8 py-8 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] hover:bg-white/[0.04] ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '100ms' }}>
              <div className="text-[52px] xl:text-[64px] font-[900] text-white leading-none mb-3">
                <AnimatedNumber value={8} inView={statsInView} /> min
              </div>
              <div className="font-mono text-[11px] xl:text-[12px] text-white/40 uppercase tracking-[2px] leading-[1.6] pr-4">
                {dict.problem.stat2_label}
              </div>
            </div>

            <div className={`min-w-[85vw] sm:min-w-0 snap-center bg-white/[0.02] backdrop-blur-sm border border-white/5 border-l-2 border-l-[#00E5A0]/10 pl-6 lg:pl-8 py-8 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] hover:bg-white/[0.04] ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
              <div className="text-[52px] xl:text-[64px] font-[900] text-white leading-none mb-3">
                <AnimatedNumber value={73} inView={statsInView} suffix="%" />
              </div>
              <div className="font-mono text-[11px] xl:text-[12px] text-white/40 uppercase tracking-[2px] leading-[1.6] pr-4">
                {dict.problem.stat3_label}
              </div>
            </div>

            <div className={`min-w-[85vw] sm:min-w-0 snap-center bg-[#00E5A0]/[0.05] backdrop-blur-sm border border-[#00E5A0]/10 border-l-[3px] border-l-[#00E5A0] pl-6 lg:pl-8 py-8 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_40px_rgba(0,229,160,0.1)] relative overflow-hidden group hover:scale-[1.05] z-10 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '300ms', animation: zeroFlashed ? 'statFlash 0.8s ease-out' : 'none' }}>
              {/* Glow inside highlighted stat */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5A0]/10 to-transparent pointer-events-none group-hover:from-[#00E5A0]/20 transition-colors duration-500" />
              <div className="text-[52px] xl:text-[64px] font-[900] text-[#00E5A0] leading-none mb-3 relative z-10 drop-shadow-[0_0_15px_rgba(0,229,160,0.4)]">0</div>
              <div className="font-mono text-[11px] xl:text-[12px] text-[#00E5A0] uppercase tracking-[2px] leading-[1.6] pr-4 relative z-10 font-bold">
                {dict.problem.stat4_label}
              </div>
            </div>

          </div>
          
          {/* Indicateur scroll mobile */}
          <div className="sm:hidden flex gap-2 justify-center mt-2 opacity-50">
            <div className="w-2 h-2 rounded-full bg-[#00E5A0]"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
            <div className="w-2 h-2 rounded-full bg-white/20"></div>
          </div>

          {/* Sources stats (Le Problème #8) */}
          <div className={`mt-8 font-mono text-[9px] text-white/20 uppercase tracking-widest text-center sm:text-right transition-opacity duration-1000 delay-500 ${statsInView ? 'opacity-100' : 'opacity-0'}`}>
            {dict.problem.source}
          </div>
        </div>

      </div>
    </section>
  )
}
