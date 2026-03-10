"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline").then(mod => ({ default: mod.default })), { ssr: false });

const SPLINE_URL = "https://prod.spline.design/2Qbo-zAjo5qfNMss/scene.splinecode";

export default function Hero() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const splineRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Glitch effect on "DU CORPS"
  const [glitching, setGlitching] = useState(false);

  // SOS Easter egg
  const sosBufferRef = useRef("");
  const [sosFlash, setSosFlash] = useState(false);

  // Count-up animation for badge
  useEffect(() => {
    const end = 247;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(animate); else setCount(end);
    };
    requestAnimationFrame(animate);
  }, []);

  // Scroll detection for sticky navbar + parallax
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // SOS Easter Egg listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === 'S' || key === 'O') {
        sosBufferRef.current = (sosBufferRef.current + key).slice(-3);
        if (sosBufferRef.current === 'SOS') {
          setSosFlash(true);
          setTimeout(() => setSosFlash(false), 400);
          sosBufferRef.current = '';
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Cursor logic & Spline focus
  useEffect(() => {
    if (splineRef.current) splineRef.current.focus();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Spline keyboard forwarding
    const canvas = document.querySelector("#spline-container canvas");
    const forwardKey = (e: KeyboardEvent) => {
      canvas?.dispatchEvent(new KeyboardEvent(e.type, e));
    };
    if (splineLoaded) {
      window.addEventListener("keydown", forwardKey);
      window.addEventListener("keyup", forwardKey);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", forwardKey);
      window.removeEventListener("keyup", forwardKey);
    };
  }, [splineLoaded]);

  // Lerp cursor loop
  useEffect(() => {
    let animationFrameId: number;
    const cursorEl = document.getElementById("custom-cursor");
    
    const renderCursor = () => {
      if (cursorEl) {
        cursorRef.current.x += (mousePos.x - cursorRef.current.x) * 0.12;
        cursorRef.current.y += (mousePos.y - cursorRef.current.y) * 0.12;
        cursorEl.style.transform = `translate3d(${cursorRef.current.x}px, ${cursorRef.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(renderCursor);
    };
    renderCursor();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Parallax factor
  const parallaxOffset = scrollY * 0.3;

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-[#0A0C14] font-sans text-[#F0F2FF] selection:bg-[#00E5A0] selection:text-[#0A0C14] md:cursor-none">
      
      {/* SOS FLASH EASTER EGG */}
      {sosFlash && (
        <div className="fixed inset-0 z-[200] pointer-events-none animate-[sosFlash_0.4s_ease-out]" 
          style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.4), transparent 70%)' }} 
        />
      )}

      {/* CUSTOM CURSOR */}
      <div 
        id="custom-cursor" 
        className="hidden md:flex pointer-events-none fixed top-0 left-0 z-[100] items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <div className={`w-3 h-3 bg-[#00E5A0] rounded-full transition-transform duration-300 ${isHovering ? 'scale-[0.2]' : 'scale-100'}`} />
        <div className={`absolute w-10 h-10 border border-[#00E5A0]/50 rounded-full transition-all duration-300 ${isHovering ? 'scale-150 border-white opacity-50' : 'scale-100'}`} />
      </div>

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 grid-bg opacity-30 pointer-events-none" />
      <div className="scanline pointer-events-none z-0" />
      
      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00E5A0] animate-[floatParticle_var(--dur)_ease-in-out_infinite]"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.15 + Math.random() * 0.25,
              ['--dur' as string]: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* GLOW RADIANT BREATHE */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[1000px] pointer-events-none animate-breathe z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,229,160,0.07) 0%, rgba(61,214,245,0.04) 30%, transparent 70%)",
        }}
      />

      {/* SPLINE 3D CANVAS */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: splineLoaded ? 1 : 0,
          transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "all",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          id="spline-container"
          className="focus:outline-none"
          ref={splineRef}
          tabIndex={0}
          onClick={() => document.getElementById("spline-container")?.focus()}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "all",
            transform: "translateX(15%)", 
            transformOrigin: "center center",
            outline: "none"
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Spline
            scene={SPLINE_URL}
            onLoad={() => setSplineLoaded(true)}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
      </div>

      {/* SPLINE LOADING SKELETON */}
      {!splineLoaded && (
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <div className="w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, rgba(0,229,160,0.02) 50%, transparent 70%)',
              transform: 'translateX(15%)',
            }}
          />
          <div className="absolute bottom-[30%] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* FOREGROUND UI */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* PREMIUM CORNERS */}
        <div className="absolute top-[20px] left-[20px] w-5 h-5 border-t-2 border-l-2 border-[#00E5A0]/35" />
        <div className="absolute top-[20px] right-[20px] w-5 h-5 border-t-2 border-r-2 border-[#00E5A0]/35" />
        <div className="absolute bottom-[20px] left-[20px] w-5 h-5 border-b-2 border-l-2 border-[#00E5A0]/35" />
        <div className="absolute bottom-[20px] right-[20px] w-5 h-5 border-b-2 border-r-2 border-[#00E5A0]/35" />

        {/* STATUS BAR (TOP CENTER) */}
        <div className="absolute top-[72px] left-1/2 -translate-x-1/2 animate-fadeDown pointer-events-auto" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-[#00E5A0]/20 bg-[#00E5A0]/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_8px_#00E5A0]" />
            <span className="font-mono text-[10px] text-[#00E5A0] leading-none mt-px">{count} personnes inscrites</span>
          </div>
        </div>

        {/* NAVBAR — sticky with blur on scroll */}
        <header className={`fixed top-0 left-0 w-full px-6 md:px-12 py-4 md:py-6 flex justify-between items-center animate-fadeDown pointer-events-auto z-[50] transition-all duration-500 ${scrolled ? 'bg-[#0A0C14]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,229,160,0.1)]' : 'bg-transparent'}`} style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_10px_#00E5A0]" />
            <span className="font-mono font-bold tracking-[0.14em] text-[13px]">SEKURA</span>
          </div>
          
          <nav className="hidden lg:flex justify-center flex-1 gap-12 font-mono text-[11px] tracking-[0.14em] text-[#8892B0]">
            <a href="#features" className="hover:text-[#F0F2FF] hover:border-b hover:border-[#00E5A0] pb-1 transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Features</a>
            <a href="#how-it-works" className="hover:text-[#F0F2FF] hover:border-b hover:border-[#00E5A0] pb-1 transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Comment ça marche</a>
            <a href="#comparatif" className="hover:text-[#F0F2FF] hover:border-b hover:border-[#00E5A0] pb-1 transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Comparatif</a>
            <a href="#faq" className="hover:text-[#F0F2FF] hover:border-b hover:border-[#00E5A0] pb-1 transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>FAQ</a>
          </nav>
          
          <a href="#cta-final" className="group font-mono text-[11px] tracking-[0.14em] text-[#00E5A0] flex items-center transition-all" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            // REJOINDRE <span className="ml-2 group-hover:ml-4 transition-all">&rarr;</span>
          </a>
        </header>

        {/* MAIN TYPOGRAPHY with parallax */}
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col justify-center items-start w-[90vw] md:w-[55vw] max-w-[55vw]"
          style={{ transform: `translateY(calc(-50% + ${parallaxOffset}px))` }}
        >
          <div className="text-[clamp(28px,4.5vw,72px)] leading-[0.9] font-[900] uppercase animate-slideInLeft block pl-6 md:pl-[48px]" style={{ animationDelay: '0.2s', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            Ton garde
          </div>
          <div 
            className="text-[clamp(42px,7vw,110px)] leading-[0.9] font-[900] uppercase animate-slideInLeft text-[#F0F2FF] block pl-6 md:pl-[48px]" 
            style={{ animationDelay: '0.4s' }}
          >
            DU <span 
              className={`text-gradient-corps inline-block cursor-default ${glitching ? 'glitch-active' : ''}`}
              onMouseEnter={() => { setGlitching(true); setIsHovering(true); }}
              onMouseLeave={() => { setGlitching(false); setIsHovering(false); }}
              style={{ pointerEvents: 'auto' }}
            >CORPS</span>
          </div>
          <div className="text-[clamp(28px,4.5vw,72px)] leading-[0.9] font-[900] uppercase animate-slideInLeft block pl-6 md:pl-[48px]" style={{ animationDelay: '0.6s', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            Numérique.
          </div>
        </div>

        {/* CTA ZONE (BOTTOM LEFT) */}
        <div className="absolute bottom-[48px] left-6 md:left-[48px] animate-fadeUp flex flex-col items-start gap-[12px] pointer-events-auto" style={{ animationDelay: '0.8s' }}>
          <div className="border border-[#00E5A0]/30 bg-[#00E5A0]/10 px-3 py-1 font-mono tracking-widest text-[#F0F2FF] text-[10px] uppercase">
            ● ACCÈS GRATUIT &middot; 3 MOIS OFFERTS
          </div>
          <div className="flex flex-col sm:flex-row gap-[12px]">
            <button className="cta-shimmer bg-[#00E5A0] text-[#0A0C14] px-[28px] py-[14px] rounded-[4px] font-bold font-mono tracking-widest shadow-[0_0_30px_rgba(0,229,160,0.25)] hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all text-[11px]" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              REJOINDRE GRATUITEMENT &rarr;
            </button>
            <button className="hidden sm:block border border-white/10 text-[#8892B0] px-[28px] py-[14px] rounded-[4px] font-mono tracking-widest hover:border-white/30 hover:text-white transition-colors text-[11px]" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              VOIR LA DÉMO &darr;
            </button>
          </div>
        </div>

        {/* MOBILE STICKY CTA */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] p-4 bg-gradient-to-t from-[#0A0C14] via-[#0A0C14]/95 to-transparent pointer-events-auto">
          <a href="#cta-final" className="cta-shimmer block w-full bg-[#00E5A0] text-[#0A0C14] text-center py-4 rounded-md font-mono font-bold text-[12px] tracking-widest shadow-[0_0_30px_rgba(0,229,160,0.3)]">
            REJOINDRE GRATUITEMENT →
          </a>
        </div>

        {/* INFO ZONE (BOTTOM RIGHT) */}
        <div className="hidden md:flex absolute bottom-[48px] right-[48px] flex-col animate-fadeUp text-right font-mono text-[10px] text-[#8892B0] leading-[1.8]" style={{ animationDelay: '1s' }}>
          <div><span className="text-[#00E5A0] mr-2">//</span> SOS EN 3 CLICS</div>
          <div><span className="text-[#00E5A0] mr-2">//</span> HEATMAP IA &middot; ZONES À RISQUE</div>
          <div><span className="text-[#00E5A0] mr-2">//</span> NAVIGATION SÛRE &middot; PARTOUT</div>
        </div>

        {/* SCROLL HINT — animated mouse */}
        <div className="hidden md:flex absolute bottom-[32px] left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-fadeUp" style={{ animationDelay: '1s' }}>
          <div className="w-[22px] h-[34px] rounded-full border-2 border-[#00E5A0]/40 flex justify-center pt-2">
            <div className="w-[3px] h-[8px] bg-[#00E5A0] rounded-full animate-[scrollBall_1.5s_ease-in-out_infinite]" />
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#8892B0]">SCROLL</span>
        </div>

      </div>
    </section>
  );
}
