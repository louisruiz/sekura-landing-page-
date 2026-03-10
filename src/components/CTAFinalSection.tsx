"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import WaitlistForm from "./WaitlistForm";

// Simple confetti particle system
function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; rotation: number; rotSpeed: number;
      life: number; opacity: number;
    }> = [];

    const colors = ['#00E5A0', '#00cc6a', '#3DD6F5', '#F0F2FF', '#00E5A0'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * -14 - 4,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        life: 1,
        opacity: 1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // gravity
        p.rotation += p.rotSpeed;
        p.life -= 0.012;
        p.opacity = Math.max(0, p.life);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      if (alive) animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}

export default function CTAFinalSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const [barWidth, setBarWidth] = useState(0);
  const [barPulsed, setBarPulsed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [typingIdx, setTypingIdx] = useState(0);
  const [places, setPlaces] = useState(253);
  
  const etToiText = "Et toi ?";

  // Bar animation with pulse
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setBarWidth(49.4), 200);
      const pulseTimer = setTimeout(() => {
        setBarPulsed(true);
        setTimeout(() => setBarPulsed(false), 800);
      }, 1800);
      return () => { clearTimeout(timer); clearTimeout(pulseTimer); };
    }
  }, [isInView]);

  // Typing "Et toi ?" effect
  useEffect(() => {
    if (!isInView) return;
    if (typingIdx < etToiText.length) {
      const timer = setTimeout(() => setTypingIdx(prev => prev + 1), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, typingIdx]);

  // Typing "Et toi ?" effect
  useEffect(() => {
    if (!isInView) return;
    if (typingIdx < etToiText.length) {
      const timer = setTimeout(() => setTypingIdx(prev => prev + 1), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, typingIdx]);

  return (
    <section id="cta-final" className="bg-[#0d1410] py-32 lg:py-40 relative overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">
      
      {/* Confetti */}
      {showConfetti && <ConfettiCanvas />}

      {/* Radial gradient background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,160,0.06) 0%, transparent 60%)' }} />

      {/* Simulated Spline Interactive Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden [perspective:1000px] z-0">
        <div className="w-[200vw] h-[200vh] border border-[#00E5A0] rounded-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] animate-[avatarRing_40s_linear_infinite]" 
             style={{ backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(0,229,160,0.5) 10deg 20deg)', transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%) rotateX(70deg)' }} />
        <div className="w-[150vw] h-[150vh] border border-[#3DD6F5] rounded-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] animate-[avatarRing_30s_linear_infinite_reverse]" 
             style={{ backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg 20deg, rgba(61,214,245,0.5) 20deg 40deg)', transformStyle: 'preserve-3d', transform: 'translate(-50%, -50%) rotateX(60deg)' }} />
      </div>
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
        
        {/* Titre principal with typing effect */}
        <h2 className="text-[clamp(36px,6vw,72px)] font-[900] leading-[1.05] uppercase tracking-tight mb-16">
          <span className="text-white block">247 personnes</span>
          <span className="text-[#00E5A0] block">dorment mieux.</span>
          <span className="text-white/50 block italic text-[0.7em] mt-2 font-normal normal-case">
            {etToiText.substring(0, typingIdx)}
            <span className="animate-[blink_1s_step-end_infinite] text-[#00E5A0] font-light">|</span>
          </span>
        </h2>

        {/* Barre de progression */}
        <div className="mb-16 max-w-lg mx-auto">
          <div className="flex justify-between font-mono text-[11px] text-white/40 tracking-widest uppercase mb-3">
            <span>247 protégées</span>
            <span>{places} places restantes</span>
          </div>
          <div className="w-full h-[4px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-[1500ms] ease-out ${barPulsed ? 'animate-[barPulse_0.8s_ease-out]' : ''}`}
              style={{ 
                width: `${barWidth}%`, 
                background: 'linear-gradient(to right, #00cc6a, #00E5A0)' 
              }} 
            />
          </div>
          <div className="font-mono text-[10px] text-[#00E5A0]/60 mt-2 tracking-widest">
            ACCÈS GRATUIT &middot; 3 MOIS OFFERTS
          </div>
        </div>

        {/* Formulaire email */}
        <div className="max-w-[480px] mx-auto mb-8">
          <WaitlistForm onSuccess={() => {
            setShowConfetti(true);
            setPlaces(prev => prev - 1);
            setTimeout(() => setShowConfetti(false), 2500);
          }} />
        </div>

        {/* Réassurance */}
        <p className="font-mono text-[11px] text-white/25 tracking-[1px]">
          Aucune carte bancaire. Aucun engagement. Juste ton email.
        </p>

      </div>

      {/* Footer minimaliste */}
      <div className="max-w-7xl mx-auto px-6 mt-32 pt-12 border-t border-[#00E5A0]/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_10px_#00E5A0]" />
          <span className="font-mono font-bold tracking-[0.14em] text-[13px]">SEKURA</span>
        </div>
        <div className="font-mono text-[10px] text-white/30 tracking-widest">
          © 2026 SEKURA &middot; BUILT DIFFERENT
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
