"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const logos = ["TechCrunch", "Forbes", "Product Hunt", "Le Monde", "Wired", "L'Express"];

export default function SocialProofSection({ dict }: { dict: any }) {
  const { ref, isInView } = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const end = 247;
      const duration = 2000;
      const startTime = performance.now();

      const animateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeProgress * end));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView]);

  return (
    <section className="bg-[#0d1410] border-y border-[#00E5A0]/15 relative overflow-hidden py-24 select-none">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full top-[10%] left-[20%] animate-[meshFloat_20s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.03), transparent 70%)' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full bottom-[10%] right-[30%] animate-[meshFloat_15s_ease-in-out_infinite_reverse]"
          style={{ background: 'radial-gradient(circle, rgba(61,214,245,0.02), transparent 70%)' }} />
      </div>

      {/* Label de section */}
      <div className="absolute top-0 left-0 flex items-center w-full max-w-[100vw] overflow-hidden">
        <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px] px-8 py-4 whitespace-nowrap">
          {dict.social_proof.label}
        </div>
        <div className="h-[1px] w-full max-w-2xl bg-gradient-to-r from-[#00E5A0]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col items-center">
        {/* Phrase d'accroche */}
        <h3 className="font-mono uppercase text-[13px] text-white/40 tracking-[2px] text-center mb-12">
          {dict.social_proof.title}
        </h3>

        {/* Row 1: Marquee left to right */}
        <div 
          className="w-full relative overflow-hidden mb-4 flex transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            clipPath: isInView ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
          }}
        >
          <div className="flex animate-marquee whitespace-nowrap items-center hover:[animation-play-state:paused] cursor-default">
             {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center space-x-8 pr-8">
                    {logos.map((logo) => (
                        <div key={`${i}-${logo}`} className="font-serif font-bold text-white/25 border border-white/10 px-8 py-4 text-3xl mx-4 transition-all duration-300 hover:font-[900] hover:text-white/70 hover:border-[#00E5A0]/40 hover:shadow-[0_0_20px_rgba(0,229,160,0.15)]">
                            {logo}
                        </div>
                    ))}
                </div>
             ))}
          </div>
        </div>

        {/* Row 2: Marquee right to left (reversed) */}
        <div 
          className="w-full relative overflow-hidden mb-28 flex transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-200" 
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            clipPath: isInView ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0%, 100% 0%, 100% 0%, 0 0%)'
          }}
        >
          <div className="flex animate-marquee-reverse whitespace-nowrap items-center hover:[animation-play-state:paused] cursor-default">
             {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center space-x-8 pr-8">
                    {[...logos].reverse().map((logo) => (
                        <div key={`r${i}-${logo}`} className="font-serif font-bold text-white/20 border border-white/8 px-8 py-4 text-2xl mx-4 transition-all duration-300 hover:font-[900] hover:text-white/60 hover:border-[#00E5A0]/30 hover:shadow-[0_0_15px_rgba(0,229,160,0.1)]">
                            {logo}
                        </div>
                    ))}
                </div>
             ))}
          </div>
        </div>

        {/* Compteur animé */}
        <div ref={ref as any} className="flex flex-col items-center">
          <div className="font-mono text-[12px] text-white/40 mb-4 tracking-widest uppercase">
            {dict.social_proof.count_label}
          </div>
          
          <div className="relative p-8">
            {/* 4 coins brackets (┌ ┐ └ ┘) with pulse */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-[3px] border-l-[3px] border-[#00E5A0] animate-[bracketPulse_2s_ease-in-out_infinite]" />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-[3px] border-r-[3px] border-[#00E5A0] animate-[bracketPulse_2s_ease-in-out_infinite_0.5s]" />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[3px] border-l-[3px] border-[#00E5A0] animate-[bracketPulse_2s_ease-in-out_infinite_1s]" />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[3px] border-r-[3px] border-[#00E5A0] animate-[bracketPulse_2s_ease-in-out_infinite_1.5s]" />
            
            <div className="text-[80px] font-black text-[#00E5A0] leading-none text-center min-w-[200px]">
              {count.toLocaleString()}
            </div>
          </div>

          <a href="#cta-final" className="group font-mono text-[12px] text-[#00E5A0] mt-8 tracking-widest hover:text-white transition-colors flex items-center gap-2 p-2 relative">
            <span className="relative">
              {dict.social_proof.cta}
              <span className="absolute bottom-0 left-0 h-[1px] bg-[#00E5A0] transition-all duration-500 w-0 group-hover:w-full" />
            </span>
            <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
