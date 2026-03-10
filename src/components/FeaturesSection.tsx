"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

export default function FeaturesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showFear, setShowFear] = useState(false);
  const [typingDots, setTypingDots] = useState(false);

  const features = [
    {
      id: "HEATMAP IA",
      badge: "CRITIQUE",
      title: "Tu vois les zones dangereuses. Avant d'y entrer.",
      desc: "Notre IA analyse en temps réel les incidents déclarés, les données de criminalité et les comportements suspects. Le résultat : une carte thermique qui te dit où aller — et où éviter.",
      fearRemoved: "Parce que l'intuition, c'est bien. L'intelligence artificielle, c'est mieux."
    },
    {
      id: "SOS DISCRET",
      badge: "CRITIQUE",
      title: "Une alerte silencieuse. Personne ne voit. Tout le monde reçoit.",
      desc: "3 clics. Sans déverrouiller. Sans que personne ne remarque. Tes contacts reçoivent ta position exacte, une alerte et un lien pour suivre ton trajet en direct.",
      fearRemoved: "Dans une situation tendue, la discrétion peut tout changer."
    },
    {
      id: "NAVIGATION ANTI-CRIME",
      badge: "ESSENTIEL",
      title: "L'itinéraire le plus court n'est pas toujours le meilleur.",
      desc: "Sekura calcule le chemin le plus sûr — pas le plus rapide. En intégrant les zones à risque, les incidents récents et l'heure de ta sortie. Parce que 10 minutes de plus valent mieux qu'une mauvaise rencontre.",
      fearRemoved: "La navigation repensée pour ceux qui pensent à leur sécurité."
    },
    {
      id: "ASSISTANT IA",
      badge: "ESSENTIEL",
      title: "Un conseiller de sécurité dans ta poche. 24h/24.",
      desc: '"Je rentre seule à 2h du matin, c\'est sûr ?" Pose la question. L\'IA analyse ton contexte, la zone, l\'heure et te donne une réponse honnête — avec les alternatives si besoin.',
      fearRemoved: "Pas un chatbot. Un copilote de sécurité personnelle."
    }
  ];

  // Auto-rotation every 6s
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Delayed fear appearance
  useEffect(() => {
    setShowFear(false);
    const t = setTimeout(() => setShowFear(true), 500);
    return () => clearTimeout(t);
  }, [activeTab]);

  // Typing indicator for AI tab
  useEffect(() => {
    if (activeTab === 3) {
      setTypingDots(true);
      const t = setTimeout(() => setTypingDots(false), 800);
      return () => clearTimeout(t);
    }
  }, [activeTab]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveTab(prev => (prev + 1) % features.length);
      if (e.key === 'ArrowLeft') setActiveTab(prev => (prev - 1 + features.length) % features.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Tab indicator position for morph effect
  const tabWidth = 100 / features.length;
  const tabOffset = activeTab * tabWidth;

  return (
    <section id="features" className="bg-[#070c09] py-32 relative overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">
      
      {/* Label de section */}
      <div className="absolute top-0 left-0 flex items-center w-full overflow-hidden">
        <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px] px-8 py-4 whitespace-nowrap">
          // 04 &middot; FONCTIONNALITÉS
        </div>
        <div className="h-[1px] w-full max-w-2xl bg-gradient-to-r from-[#00E5A0]/40 to-transparent" />
      </div>

      <div 
        ref={ref as any} 
        className={`max-w-7xl mx-auto px-6 lg:px-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Titre */}
        <div className="mb-20">
          <h2 className="text-[clamp(28px,4vw,52px)] font-[900] leading-[1.1] uppercase tracking-tight">
            <span className="text-white block">Quatre outils.</span>
            <span className="text-[#00E5A0] block">Une seule obsession.</span>
          </h2>
        </div>

        {/* Navigation Tabs with morph indicator */}
        <div className="w-full flex flex-wrap lg:flex-nowrap mb-16 border border-white/5 rounded-none overflow-hidden bg-[#0d1410] relative">
          {/* Sliding indicator */}
          <div 
            className="absolute top-0 bottom-0 bg-[#00E5A0] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0 shadow-[0_0_20px_rgba(0,229,160,0.3)] hidden lg:block"
            style={{ width: `${tabWidth}%`, left: `${tabOffset}%` }}
          />
          {features.map((feature, index) => {
            const isActive = activeTab === index;
            return (
              <button 
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`flex-1 py-4 px-4 font-mono text-[10px] sm:text-[11px] tracking-[2px] uppercase transition-all duration-300 relative z-10 ${isActive ? 'lg:text-[#070c09] text-[#070c09] bg-[#00E5A0] lg:bg-transparent font-bold' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}`}
              >
                {isActive ? '◈ ' : '◇ '}
                {feature.id}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Texte - Gauche */}
          <div className="w-full lg:w-1/2 flex flex-col items-start min-h-[300px]">
            <div className={`font-mono text-[10px] tracking-widest px-3 py-1 mb-6 border uppercase rounded-none transition-colors duration-300 ${features[activeTab].badge === 'CRITIQUE' ? 'animate-[badgePulse_2s_ease-in-out_infinite]' : ''}`} style={{ borderColor: features[activeTab].badge === 'CRITIQUE' ? 'rgba(239,68,68,0.5)' : 'rgba(0,229,160,0.3)', backgroundColor: features[activeTab].badge === 'CRITIQUE' ? 'rgba(239,68,68,0.1)' : 'rgba(0,229,160,0.1)', color: features[activeTab].badge === 'CRITIQUE' ? '#ef4444' : '#00E5A0' }}>
              ● {features[activeTab].badge}
            </div>
            
            <h3 className="text-[28px] md:text-[36px] font-[800] leading-[1.2] mb-6 text-white min-h-[90px]">
              {features[activeTab].title}
            </h3>
            
            <p className="text-[14px] md:text-[16px] text-white/50 leading-[1.8] mb-10 min-h-[120px]">
              {features[activeTab].desc}
            </p>
            
            <div className={`border-l-2 border-[#00E5A0] pl-6 py-2 mt-auto transition-all duration-500 ${showFear ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="font-mono text-[10px] text-[#00E5A0] tracking-widest uppercase mb-1">
                // La peur éliminée
              </div>
              <div className="text-[13px] text-white/70 italic">
                &ldquo;{features[activeTab].fearRemoved}&rdquo;
              </div>
            </div>
          </div>

          {/* Mockup - Droite */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end -mx-6 lg:mx-0">
            <div className="w-full lg:max-w-[440px] aspect-square lg:rounded-[24px] border-y lg:border border-[#00E5A0]/20 bg-[#0d1410] relative overflow-hidden shadow-[0_0_40px_rgba(0,229,160,0.05)]">
               
               {/* HEATMAP MOCKUP */}
               <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeTab === 0 ? 'opacity-100 z-10 pointer-events-auto scale-100' : 'opacity-0 z-0 pointer-events-none scale-95'}`}>
                 <div className="absolute inset-0 bg-map-grid bg-[length:40px_40px] opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)' }} />
                 {/* Street lines */}
                 <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <line x1="0" y1="30" x2="100" y2="30" stroke="white" strokeWidth="0.5" />
                   <line x1="0" y1="60" x2="100" y2="60" stroke="white" strokeWidth="0.5" />
                   <line x1="25" y1="0" x2="25" y2="100" stroke="white" strokeWidth="0.5" />
                   <line x1="70" y1="0" x2="70" y2="100" stroke="white" strokeWidth="0.5" />
                   <line x1="50" y1="20" x2="50" y2="80" stroke="white" strokeWidth="0.3" />
                 </svg>
                 {/* District names */}
                 <span className="absolute top-[15%] left-[10%] font-mono text-[7px] text-white/15 tracking-widest">MIRAFLORES</span>
                 <span className="absolute top-[45%] right-[8%] font-mono text-[7px] text-white/15 tracking-widest">CENTRO</span>
                 <span className="absolute bottom-[25%] left-[15%] font-mono text-[7px] text-white/15 tracking-widest">SAN ISIDRO</span>
                 <div className="absolute top-1/4 left-1/4 w-[150px] h-[150px] bg-red-500/30 rounded-full blur-[40px] mix-blend-screen" />
                 <div className="absolute bottom-1/3 right-1/4 w-[120px] h-[120px] bg-orange-500/30 rounded-full blur-[30px] mix-blend-screen" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-[#00E5A0] rounded-full shadow-[0_0_20px_#00E5A0] relative z-20" />
                    <div className="absolute inset-0 bg-[#00E5A0] rounded-full animate-ping opacity-60" />
                 </div>
                 {/* Incident counter */}
                 <div className="absolute top-6 left-6 bg-[#070c09]/80 backdrop-blur border border-red-500/20 px-3 py-2 font-mono text-[9px] text-red-400 tracking-widest">
                    ⚠ 12 INCIDENTS SIGNALÉS
                 </div>
                 {/* Floating UI */}
                 <div className="absolute bottom-6 right-6 bg-[#070c09]/80 backdrop-blur border border-white/10 p-3 flex flex-col gap-2 font-mono text-[9px] tracking-widest">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> ALTO</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"/> MED</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00E5A0]"/> BAJO</div>
                 </div>
               </div>

               {/* SOS MOCKUP */}
               <div className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col items-center justify-center bg-[#070c09] ${activeTab === 1 ? 'opacity-100 z-10 pointer-events-auto scale-100' : 'opacity-0 z-0 pointer-events-none scale-95'}`}>
                 <div className="flex gap-4 mb-10">
                    <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                       <div className="absolute bottom-0 left-0 w-full bg-[#00E5A0]/20 animate-[heightFill_3s_infinite]" />
                       <span className="font-mono text-white/50 relative z-10 text-[24px]">1</span>
                    </div>
                    <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                       <div className="absolute bottom-0 left-0 w-full bg-[#00E5A0]/20 animate-[heightFill_3s_infinite_1s]" style={{ height: '0%' }}/>
                       <span className="font-mono text-white/50 relative z-10 text-[24px]">2</span>
                    </div>
                    <div className="w-20 h-20 rounded-xl border border-red-500/40 bg-red-500/10 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                       <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
                       <span className="font-mono text-red-500 relative z-10 text-[24px] font-bold leading-none mt-1">🆘</span>
                    </div>
                 </div>
                 <div className="text-center font-mono text-[10px] text-white/40 leading-loose tracking-widest border border-white/5 bg-white/5 px-6 py-4 rounded-md">
                   &uarr; POSITION GPS PARTAGÉE<br/>
                   <span className="text-[#00E5A0]">LUCAS</span> &middot; <span className="text-[#00E5A0]">EMMA</span> NOTIFIÉS
                 </div>
               </div>

               {/* NAVIGATION MOCKUP */}
               <div className={`absolute inset-0 transition-all duration-500 ease-in-out flex items-center justify-center bg-[#0d1410] overflow-hidden ${activeTab === 2 ? 'opacity-100 z-10 pointer-events-auto scale-100' : 'opacity-0 z-0 pointer-events-none scale-95'}`}>
               <div className="absolute inset-0 bg-map-grid bg-[length:40px_40px] opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)' }} />
                 <svg className="absolute w-[80%] h-[80%] opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Route Danger */}
                    <path d="M 10 90 L 40 50 L 90 20" stroke="rgba(239,68,68,0.4)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                    {/* Zone Danger */}
                    <circle cx="45" cy="45" r="15" fill="rgba(239,68,68,0.15)" />
                    {/* Route Safe — stroke draw animation */}
                    <path 
                      d="M 10 90 C 20 80, 80 80, 90 20" 
                      stroke="#00E5A0" 
                      strokeWidth="3" 
                      fill="none" 
                      className="drop-shadow-[0_0_8px_rgba(0,229,160,0.6)]"
                      strokeDasharray="200"
                      style={{
                        strokeDashoffset: activeTab === 2 ? 0 : 200,
                        transition: 'stroke-dashoffset 1.5s ease-in-out'
                      }}
                    />
                    {/* Glow duplicate */}
                    <path 
                      d="M 10 90 C 20 80, 80 80, 90 20" 
                      stroke="#00E5A0" 
                      strokeWidth="6" 
                      fill="none" 
                      opacity="0.15"
                      strokeDasharray="200"
                      style={{
                        strokeDashoffset: activeTab === 2 ? 0 : 200,
                        transition: 'stroke-dashoffset 1.5s ease-in-out 0.1s'
                      }}
                    />
                    {/* Origin/Dest */}
                    <circle cx="10" cy="90" r="3" fill="#fff" />
                    <circle cx="90" cy="20" r="3" fill="#fff" />
                 </svg>
                 
                 <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-3">
                    <div className="bg-[#070c09]/90 backdrop-blur border border-[#00E5A0]/30 py-2 px-3 rounded text-[10px] font-mono tracking-wide text-[#00E5A0] shadow-[0_4px_20px_rgba(0,229,160,0.15)] flex items-center justify-between">
                       <span>✓ Contournement sécurisé</span>
                       <span className="bg-[#00E5A0]/20 px-2 py-0.5 rounded-sm">+4 MIN</span>
                    </div>
                    <div className="bg-[#070c09]/90 backdrop-blur border border-red-500/20 py-2 px-3 rounded text-[10px] font-mono tracking-wide text-white/40 flex items-center justify-between line-through decoration-red-500/50">
                       <span>✗ Chemin direct</span>
                       <span className="text-red-400">ZONE À RISQUE</span>
                    </div>
                 </div>
               </div>

               {/* AI ASSISTANT MOCKUP */}
               <div className={`absolute inset-0 transition-all duration-500 ease-in-out bg-[#070c09] p-6 flex flex-col ${activeTab === 3 ? 'opacity-100 z-10 pointer-events-auto scale-100' : 'opacity-0 z-0 pointer-events-none scale-95'}`}>
                 <div className="flex-1 flex flex-col justify-end gap-4 pb-4 font-sans text-[13px]">
                    <div className="self-end bg-white/10 text-white/90 px-4 py-2 rounded-2xl rounded-br-sm max-w-[85%] border border-white/5">
                      Je rentre seule à 2h du matin à l&#39;hôtel, c&#39;est sûr de marcher ?
                    </div>
                    {typingDots ? (
                      <div className="self-start bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                        <div className="w-2 h-2 rounded-full bg-[#00E5A0]/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-[#00E5A0]/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-[#00E5A0]/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <div className="self-start bg-[#00E5A0]/10 text-[#00E5A0] px-4 py-3 rounded-2xl rounded-bl-sm max-w-[90%] border border-[#00E5A0]/20 relative">
                         <span className="absolute -top-3 left-2 font-mono text-[8px] bg-[#00E5A0] text-[#0A0C14] px-1.5 py-0.5 rounded-sm tracking-widest font-bold">◈ SEKURA AI</span>
                         Je te déconseille fortement de marcher. La zone autour de Calle 14 a enregistré 2 incidents signalés dans l&#39;heure. Prends plutôt un Uber vérifié, je peux t&#39;indiquer le point de prise en charge le plus sécure et éclairé.
                      </div>
                    )}
                 </div>
                 <div className="h-10 border border-white/10 rounded-full flex items-center px-4 mt-auto">
                   <div className="font-mono text-[10px] text-white/30 tracking-widest">Poser une question...</div>
                   <div className="ml-auto w-4 h-4 rounded-full bg-[#00E5A0] opacity-50 flex items-center justify-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#0A0C14]"/>
                   </div>
                 </div>
               </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
