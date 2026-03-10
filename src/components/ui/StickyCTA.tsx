"use client";

import { useState, useEffect } from "react";

export default function StickyCTA({ dict }: { dict: any }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;

      // Chercher la section finale
      const ctaFinal = document.getElementById("cta-final");
      let overFinal = false;
      if (ctaFinal) {
        const rect = ctaFinal.getBoundingClientRect();
        // Si le haut de la sec finale est visible à l'écran, on cache
        if (rect.top <= window.innerHeight) {
          overFinal = true;
        }
      }

      // Apparaît après 30% de scroll mais disparaît sur la CTA Final
      if (scrollPercent > 30 && !overFinal) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const ctaFinal = document.getElementById("cta-final");
    if (ctaFinal) {
      ctaFinal.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed z-[9999] transition-transform duration-700 pointer-events-none"
      style={{
        transform: show ? "translateY(0)" : "translateY(120px)",
        transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      <div className="hidden md:block fixed bottom-8 right-8 pointer-events-auto">
        <button
          onClick={handleClick}
          className="bg-[#00ff88] text-[#070c09] font-mono font-bold text-[14px] tracking-wide px-8 py-4 rounded-xl shadow-[0_0_40px_rgba(0,255,136,0.4)] hover:shadow-[0_0_60px_rgba(0,255,136,0.6)] hover:scale-105 transition-all flex items-center gap-3"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#070c09] animate-pulse" />
          {dict.cta.button_sticky}
        </button>
      </div>

      <div className="block md:hidden fixed bottom-0 left-0 right-0 pointer-events-auto w-full">
        <button
          onClick={handleClick}
          className="w-full bg-[#00ff88] text-[#070c09] font-mono font-bold text-[14px] tracking-wide py-5 shadow-[0_0_40px_rgba(0,255,136,0.4)] flex items-center justify-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-[#070c09] animate-pulse" />
          {dict.cta.button_sticky}
        </button>
      </div>
    </div>
  );
}
