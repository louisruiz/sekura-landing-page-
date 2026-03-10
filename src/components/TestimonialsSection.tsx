"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote: "Je voyage seule en Amérique du Sud chaque mois. Sekura a changé mon niveau de confiance du tout au tout.",
    author: "Camille R.",
    role: "Consultante, Paris",
    rating: 5
  },
  {
    quote: "Le SOS en 3 clics, c'est ce qui m'a convaincu. Ma femme comprend le principe en 30 secondes.",
    author: "Marc D.",
    role: "Expatrié, Bogotá",
    rating: 5
  },
  {
    quote: "La heatmap IA est bluffante. Elle m'a évité une zone que même les locaux ne recommandaient pas.",
    author: "Sarah K.",
    role: "Journaliste, Mexico",
    rating: 5
  },
  {
    quote: "Enfin une app qui pense à la sécurité physique et pas juste à la cybersécurité. Le chaînon manquant.",
    author: "Thomas B.",
    role: "Directeur RH, Lyon",
    rating: 5
  },
  {
    quote: "Mon équipe RH a enfin arrêté de s'inquiéter quand je suis en déplacement. Ça n'a pas de prix.",
    author: "Isabelle M.",
    role: "Dirigeante, Bordeaux",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [smallCardIndices, setSmallCardIndices] = useState([1, 3]);
  const touchStart = useRef<number | null>(null);

  // Auto-rotation with pause
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      changeTestimonial((activeIndex + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  // Rotate small cards periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setSmallCardIndices(prev => {
        const available = testimonials
          .map((_, i) => i)
          .filter(i => i !== activeIndex && !prev.includes(i));
        if (available.length === 0) return prev;
        const randomIdx = Math.floor(Math.random() * available.length);
        const replaceIdx = Math.floor(Math.random() * prev.length);
        const next = [...prev];
        next[replaceIdx] = available[randomIdx];
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const changeTestimonial = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) changeTestimonial((activeIndex + 1) % testimonials.length);
      else changeTestimonial((activeIndex - 1 + testimonials.length) % testimonials.length);
    }
    touchStart.current = null;
  };

  const Stars = ({ count }: { count: number }) => (
    <div className="flex gap-1 mt-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-[14px] ${i < count ? 'text-[#00E5A0]' : 'text-white/10'}`}>★</span>
      ))}
    </div>
  );

  return (
    <section className="bg-[#0d1410] py-32 relative overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">
      
      {/* Label de section */}
      <div className="absolute top-0 right-0 flex items-center justify-end w-full overflow-hidden">
        <div className="h-[1px] w-full max-w-2xl bg-gradient-to-l from-[#00E5A0]/40 to-transparent" />
        <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px] px-8 py-4 whitespace-nowrap">
          TÉMOIGNAGES &middot; 07 //
        </div>
      </div>

      {/* Badge compteur */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/30 tracking-widest">
        ★ {testimonials.length} AVIS VÉRIFIÉS
      </div>

      <div ref={ref as any} className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Grande card featured (span 2) */}
          <div 
            className="lg:col-span-2 bg-[#070c09] border border-[#00E5A0]/15 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[380px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00E5A0] to-transparent" />
            
            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '64px 64px' }} />
            
            <div className="p-10 pt-14 flex-1 flex flex-col justify-center relative">
              {/* Guillemet décoratif animé */}
              <div className={`absolute top-6 left-8 text-[#00E5A0] text-[72px] font-serif leading-none select-none transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-75' : 'opacity-20 scale-100'}`}>&ldquo;</div>
              
              <p className={`text-[20px] md:text-[24px] font-medium text-white leading-[1.6] mb-8 relative z-10 min-h-[100px] transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                {testimonials[activeIndex].quote}
              </p>
              
              <div className={`flex items-center gap-4 transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {/* Avatar with jade ring */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#00E5A0]/20 border-2 border-[#00E5A0]/50 flex items-center justify-center text-[#00E5A0] font-bold text-sm"
                    style={{ boxShadow: '0 0 15px rgba(0,229,160,0.2)' }}
                  >
                    {testimonials[activeIndex].author.charAt(0)}
                  </div>
                  <div className="absolute -inset-[3px] rounded-full border-2 border-transparent animate-[avatarRing_3s_linear_infinite]" 
                    style={{ background: 'conic-gradient(from 0deg, #00E5A0, transparent, #00E5A0) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' as any, padding: '2px', borderRadius: '50%' }}
                  />
                </div>
                <div>
                  <div className="font-mono text-[#00E5A0] text-[13px] font-bold tracking-wide">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                    {testimonials[activeIndex].role}
                  </div>
                  <Stars count={testimonials[activeIndex].rating} />
                </div>
              </div>
            </div>

            {/* Navigation dots + CTA */}
            <div className="px-10 pb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => changeTestimonial(idx)}
                    className={`h-[3px] rounded-full transition-all duration-500 ${activeIndex === idx ? 'bg-[#00E5A0] w-7' : 'bg-white/20 w-2 hover:bg-white/40'}`}
                  />
                ))}
              </div>
              <a href="#cta-final" className="font-mono text-[9px] text-white/30 tracking-widest hover:text-[#00E5A0] transition-colors">
                PLUS DE TÉMOIGNAGES →
              </a>
            </div>
          </div>

          {/* Petites cards latérales */}
          <div className="flex flex-col gap-6">
            {smallCardIndices.map((tIdx) => (
              <div key={tIdx} className="bg-[#070c09] border border-[#00E5A0]/10 rounded-xl p-8 flex-1 flex flex-col justify-between min-h-[170px] hover:border-[#00E5A0]/25 transition-all duration-500 relative overflow-hidden">
                {/* Noise */}
                <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '64px 64px' }} />
                <p className="text-[14px] text-white/70 italic leading-[1.7] mb-6 relative z-10">
                  &ldquo;{testimonials[tIdx].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-[#00E5A0]/20 flex items-center justify-center text-white/50 font-mono text-[11px]">
                    {testimonials[tIdx].author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-mono text-white/70 text-[12px]">{testimonials[tIdx].author}</div>
                    <div className="font-mono text-[9px] text-white/30 tracking-widest uppercase">{testimonials[tIdx].role}</div>
                    <Stars count={testimonials[tIdx].rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
