"use client";

import { useEffect, useState } from "react";

export default function GlobalEnhancements() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preloader
  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setLoadingProgress(Math.floor(p * 100));
      if (p < 1) requestAnimationFrame(animate);
      else setTimeout(() => setLoading(false), 300);
    };
    requestAnimationFrame(animate);
  }, []);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const triggerPoint = docHeight * 0.3;
      const ctaSection = document.getElementById("cta-final");
      const ctaInView = ctaSection ? ctaSection.getBoundingClientRect().top < window.innerHeight : false;
      setShowFloatingCTA(scrollTop > triggerPoint && !ctaInView);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dynamic Favicon — badge notification when tab not active
  useEffect(() => {
    const originalTitle = document.title;
    let interval: NodeJS.Timeout;

    const handleVisibility = () => {
      if (document.hidden) {
        let toggle = false;
        interval = setInterval(() => {
          toggle = !toggle;
          document.title = toggle ? "🛡️ Sekura t'attend..." : originalTitle;
        }, 2000);
      } else {
        clearInterval(interval);
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(interval);
      document.title = originalTitle;
    };
  }, []);

  return (
    <>
      {/* PRELOADER */}
      {loading && (
        <div className="fixed inset-0 z-[99999] bg-[#0A0C14] flex flex-col items-center justify-center transition-opacity duration-500"
          style={{ opacity: loadingProgress >= 100 ? 0 : 1 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_15px_#00E5A0]" />
            <span className="font-mono font-bold tracking-[0.2em] text-[18px] text-white">SEKURA</span>
          </div>
          <div className="w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${loadingProgress}%`,
                background: "linear-gradient(to right, #00cc6a, #00E5A0)",
              }}
            />
          </div>
          <span className="font-mono text-[10px] text-white/30 tracking-widest">
            {loadingProgress}%
          </span>
        </div>
      )}

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none">
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(to right, #00cc6a, #00E5A0)",
          }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Floating Sticky CTA */}
      <a
        href="#cta-final"
        aria-label="Rejoindre Sekura — 3 mois offerts"
        className={`fixed z-[9998] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          showFloatingCTA
            ? "translate-y-0 opacity-100"
            : "translate-y-[120px] opacity-0 pointer-events-none"
        }
        bottom-6 right-6 md:bottom-8 md:right-8
        sm:w-auto w-[calc(100%-48px)] sm:left-auto left-6
        `}
      >
        <div className="cta-shimmer bg-[#00E5A0] text-[#070c09] font-mono font-bold text-[11px] tracking-widest px-6 py-4 rounded-md shadow-[0_0_40px_rgba(0,229,160,0.4)] hover:bg-white hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-3 cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-[#070c09] animate-pulse" />
          REJOINDRE &middot; 3 MOIS OFFERTS →
        </div>
      </a>
    </>
  );
}
