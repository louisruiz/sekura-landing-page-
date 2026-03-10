"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { Plane, Users, Briefcase } from "lucide-react";
import Image from "next/image";

export default function PersonasSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotation (Personas #9)
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isInView]);

  const personas = [
    {
      id: 0,
      name: "Sofia",
      age: "28 ans",
      tag: "VOYAGEUSE SOLO",
      avatar: "/avatars/sofia.png",
      color: "#00E5A0",
      icon: <Plane className="w-3 h-3" />,
      desc: "Je voyage seule en Amérique du Sud pour mon boulot. Je rentre souvent tard de réunions.",
      fear: "La peur : rentrer à l'hôtel sans savoir si le quartier est sûr.",
      gain: "Avec Sekura : elle sait exactement où marcher. 3 clics si urgence."
    },
    {
      id: 1,
      name: "Lucas & Emma",
      age: "32 & 30 ans",
      tag: "COUPLE EXPATRIÉ",
      avatar: "/avatars/couple.png",
      color: "#3DD6F5",
      icon: <Users className="w-3 h-3" />,
      desc: "On s'est installés à Medellín. On adore la ville mais on ne maîtrise pas encore toutes les zones.",
      fear: "La peur : prendre la mauvaise rue par habitude.",
      gain: "Avec Sekura : routing automatique. La famille sait où ils sont."
    },
    {
      id: 2,
      name: "Inès",
      age: "45 ans",
      tag: "DIRIGEANTE EN DÉPLACEMENT",
      avatar: "/avatars/ines.png",
      color: "#FF4D6A",
      icon: <Briefcase className="w-3 h-3" />,
      desc: "Je voyage 10 jours/mois en Amérique Latine. Mon entreprise s'inquiète pour ma sécurité.",
      fear: "La peur : un incident qui bloque tout un voyage d'affaires.",
      gain: "Avec Sekura : les équipes RH voient sa position. Elle se concentre."
    }
  ];

  return (
    <section className="bg-[#070c09] py-32 relative overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">
      
      {/* Label de section */}
      <div className="absolute top-0 left-0 flex items-center w-full overflow-hidden">
        <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px] px-8 py-4 whitespace-nowrap">
          // 06 &middot; PROFILS
        </div>
        <div className="h-[1px] w-full max-w-2xl bg-gradient-to-r from-[#00E5A0]/40 to-transparent" />
      </div>

      <div 
        ref={ref as any} 
        className="max-w-7xl mx-auto px-6 lg:px-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
           // Small delay before unpausing on touch end
           setTimeout(() => setIsPaused(false), 3000);
        }}
      >
        
        {/* Titre */}
        <div className={`mb-20 text-center lg:text-left transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[clamp(28px,4vw,52px)] font-[900] leading-[1.1] uppercase tracking-tight mb-4">
            <span className="text-white block">Sekura, c&#39;est pour qui ?</span>
            <span className="text-[#00E5A0] block">Pour toi.</span>
          </h2>
        </div>

        {/* Connection line between cards */}
        <div className="hidden lg:block relative z-0 mb-[-36px]">
          <div className="absolute top-[50%] left-[16.7%] right-[16.7%] h-[1px] bg-gradient-to-r from-transparent via-[#00E5A0]/20 to-transparent" />
        </div>

        {/* Personas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {personas.map((p, idx) => {
            const isActive = activeCard === p.id;
            
            return (
              <PersonaCard
                key={p.id}
                persona={p}
                isActive={isActive}
                isInView={isInView}
                idx={idx}
                onClick={() => setActiveCard(p.id)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PersonaCard({ persona: p, isActive, isInView, idx, onClick }: {
  persona: any;
  isActive: boolean;
  isInView: boolean;
  idx: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [typewriterText, setTypewriterText] = useState("");

  // Typewriter effect (Personas #10)
  useEffect(() => {
    if (isActive) {
      setTypewriterText("");
      let i = 0;
      const interval = setInterval(() => {
        setTypewriterText(p.desc.substring(0, i + 1));
        i++;
        if (i >= p.desc.length) clearInterval(interval);
      }, 20); // typing speed
      return () => clearInterval(interval);
    } else {
      setTypewriterText(p.desc);
    }
  }, [isActive, p.desc]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-col rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-500 transform backdrop-blur-xl group ${
        isActive 
          ? '-translate-y-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20' 
          : 'hover:-translate-y-1 z-10'
      } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ 
        border: isActive ? `1px solid ${p.color}66` : `1px solid rgba(255,255,255,0.08)`,
        background: isActive 
          ? `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))`
          : `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
        backdropFilter: 'blur(12px)',
        transitionDelay: `${idx * 100}ms`,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isActive ? -8 : 0}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden"
          style={{ boxShadow: isActive ? `0 0 20px ${p.color}40` : '' }}
        >
          {/* Avatar image (Personas #2) */}
          <Image 
            src={p.avatar} 
            alt={p.name} 
            fill 
            className={`object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`} 
          />
        </div>
        <div>
          <div className="font-bold text-white text-[18px] group-hover:text-[#00E5A0] transition-colors">{p.name}</div>
          <div className="font-mono text-[10px] text-white/40 tracking-widest">{p.age}</div>
        </div>
      </div>

      {/* Tag with icon */}
      <div className="font-mono text-[9px] tracking-[2px] px-3 py-1 border border-white/20 rounded-full w-max text-white/70 mb-6 uppercase flex items-center gap-2" style={{ color: isActive ? p.color : '', borderColor: isActive ? `${p.color}40` : '' }}>
        <span style={{ color: isActive ? p.color : 'rgba(255,255,255,0.4)' }}>{p.icon}</span>
        {p.tag}
      </div>

      {/* Desc with animated quotes & Typewriter */}
      <p className="text-[14px] text-white/50 leading-[1.8] italic mb-8 flex-1 relative min-h-[80px]">
        <span className={`text-[20px] font-serif inline-block mr-1 transition-all duration-500`} style={{ color: p.color, opacity: isActive ? 1 : 0.4, transform: isActive ? 'scale(1)' : 'scale(0.7)' }}>&ldquo;</span>
        {isActive ? typewriterText : p.desc}
        {isActive && typewriterText.length < p.desc.length && (
          <span className="inline-block w-[3px] h-[14px] bg-[#00E5A0] ml-1 animate-pulse" />
        )}
        <span className={`text-[20px] font-serif inline-block ml-1 transition-all duration-500`} style={{ color: p.color, opacity: isActive ? 1 : 0.4, transform: isActive ? 'scale(1)' : 'scale(0.7)' }}>&rdquo;</span>
      </p>

      {/* Accordion Fear/Gain (Personas #7 mobile expansion) */}
      <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-[600ms] origin-top ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
         
         <div className="pl-4 py-1 text-[13px] text-white/60 leading-[1.6]" style={{ borderLeft: '2px solid rgba(255,77,106,0.6)' }}>
           <span className="font-bold text-[#FF4D6A] font-mono text-[10px] tracking-wide block mb-1">PROBLÈME :</span>
           {p.fear}
         </div>
         
         <div className="pl-4 py-1 text-[13px] text-white/90 leading-[1.6]" style={{ borderLeft: `2px solid ${p.color}` }}>
           <span className="font-bold font-mono text-[10px] tracking-wide block mb-1 uppercase" style={{ color: p.color }}>SOLUTION SEKURA :</span>
           {p.gain}
         </div>

      </div>

      {/* Mobile expand hint if not active */}
      {!isActive && (
         <div className="md:hidden text-center mt-2 font-mono text-[9px] text-white/20 tracking-widest animate-pulse">
           APPUYER POUR DÉCOUVRIR
         </div>
      )}
    </div>
  )
}
