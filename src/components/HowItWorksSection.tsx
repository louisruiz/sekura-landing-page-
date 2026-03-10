"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { Download, Map, Shield } from "lucide-react";

export default function HowItWorksSection({ dict }: { dict: any }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const phoneRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const steps = [
    {
      id: dict.how.step1_id,
      title: dict.how.step1_title,
      time: dict.how.step1_time,
      desc: dict.how.step1_desc,
      icon: <Download className="w-5 h-5" />
    },
    {
      id: dict.how.step2_id,
      title: dict.how.step2_title,
      time: dict.how.step2_time,
      desc: dict.how.step2_desc,
      icon: <Map className="w-5 h-5" />
    },
    {
      id: dict.how.step3_id,
      title: dict.how.step3_title,
      time: dict.how.step3_time,
      desc: dict.how.step3_desc,
      icon: <Shield className="w-5 h-5" />
    }
  ];

  // Auto-rotation with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Phone 3D tilt on mouse move
  const handlePhoneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handlePhoneMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Touch handlers for mobile swipe (Comment Ça Marche #9)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setActiveStep(prev => (prev + 1) % steps.length);
      else setActiveStep(prev => (prev - 1 + steps.length) % steps.length);
    }
    touchStart.current = null;
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Timeline progress percentage
  const timelineProgress = ((activeStep + 1) / steps.length) * 100;

  return (
    <section id="how-it-works" className="bg-[#0d1410] py-32 px-6 lg:px-12 relative overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">
      
      {/* Label de section */}
      <div className="absolute top-0 right-0 flex items-center justify-end w-full overflow-hidden">
        <div className="h-[1px] w-full max-w-2xl bg-gradient-to-l from-[#00E5A0]/40 to-transparent" />
        <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px] px-8 py-4 whitespace-nowrap">
          {dict.how.label}
        </div>
      </div>

      <div ref={ref as any} className={`max-w-7xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Titre */}
        <div className="mb-20">
          <h2 className="text-[clamp(28px,4vw,52px)] font-[900] leading-[1.1] uppercase tracking-tight">
            <span className="text-white block">{dict.how.title_1}</span>
            <span className="text-[#00E5A0] block">{dict.how.title_2}</span>
          </h2>
        </div>

        <div 
          className="flex flex-col lg:flex-row gap-16 items-center lg:items-start justify-between"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Colonne gauche : Étapes avec timeline */}
          <div className="w-full lg:w-1/2 flex relative">
            
            {/* Timeline connector */}
            <div className="hidden lg:flex flex-col items-center mr-6 relative">
              {/* Track */}
              <div className="w-[2px] h-full bg-[#00E5A0]/10 absolute top-0 left-1/2 -translate-x-1/2" />
              {/* Fill */}
              <div 
                className="w-[2px] bg-[#00E5A0] absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(0,229,160,0.4)]"
                style={{ height: `${timelineProgress}%` }}
              />
              {/* Dots */}
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-3 h-3 rounded-full border-2 z-10 transition-all duration-500 ${
                    idx <= activeStep 
                      ? 'bg-[#00E5A0] border-[#00E5A0] shadow-[0_0_10px_rgba(0,229,160,0.5)]' 
                      : 'bg-[#0d1410] border-[#00E5A0]/30'
                  }`}
                  style={{ marginTop: idx === 0 ? '28px' : 'auto', marginBottom: idx === steps.length - 1 ? '28px' : 'auto' }}
                />
              ))}
            </div>

            <div className="flex flex-col gap-6 flex-1">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <div 
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`cursor-pointer transition-all duration-500 overflow-hidden pl-6 py-5 pr-4 border-l-[3px] lg:border-l-0 ${isActive ? 'border-[#00E5A0] lg:border-transparent bg-[#00E5A0]/[0.05] shadow-[-6px_0_20px_-6px_rgba(0,229,160,0.2)]' : 'border-[#00E5A0]/10 lg:border-transparent hover:border-[#00E5A0]/30'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px]">
                        // {step.id}
                      </div>
                      <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                        {step.time}
                      </div>
                    </div>
                    
                    <h3 className={`text-[20px] font-bold mb-3 flex items-center gap-3 transition-colors ${isActive ? 'text-white' : 'text-white/50'}`}>
                      <span className={`${isActive ? 'text-[#00E5A0]' : 'text-white/30'} transition-colors`}>{step.icon}</span>
                      {step.title}
                    </h3>

                    <div 
                      className={`text-[14px] text-white/50 leading-[1.6] transition-all duration-500 origin-top overflow-hidden ${isActive ? 'max-h-[150px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                    >
                      {step.desc}
                    </div>
                  </div>
                )
              })}

              {/* CTA contextuel */}
              <div className={`transition-all duration-500 overflow-hidden ${activeStep === 2 ? 'max-h-[80px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <a href="#cta-final" className="inline-flex items-center gap-2 font-mono text-[11px] text-[#00E5A0] tracking-widest hover:text-white transition-colors group border border-[#00E5A0]/30 px-5 py-3 hover:bg-[#00E5A0]/10">
                  {dict.how.cta.replace('→', '').trim()} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite : Mockup téléphone avec tilt 3D et Swipe */}
          <div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end" 
            style={{ perspective: '800px' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              ref={phoneRef}
              onMouseMove={handlePhoneMouseMove}
              onMouseLeave={handlePhoneMouseLeave}
              className="w-[260px] h-[520px] rounded-[36px] border-[2px] border-[#00E5A0] bg-[#0a100d] shadow-[0_0_50px_rgba(0,229,160,0.15)] relative overflow-hidden flex flex-col items-center justify-start p-6 transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              
              {/* Notch realistic */}
              <div className="w-[100px] h-[28px] bg-[#0d1410] absolute top-[-2px] left-1/2 -translate-x-1/2 rounded-b-[14px] border-b border-x border-[#00E5A0]/30 z-20 flex items-center justify-center gap-6 px-3">
                <span className="font-mono text-[7px] text-white/30">9:41</span>
                <div className="w-[6px] h-[6px] rounded-full bg-white/10 border border-white/20" />
                <div className="flex gap-[2px] items-end">
                  <div className="w-[2px] h-[4px] bg-white/20" />
                  <div className="w-[2px] h-[6px] bg-white/20" />
                  <div className="w-[2px] h-[8px] bg-white/30" />
                  <div className="w-[2px] h-[10px] bg-white/40" />
                </div>
              </div>

              {/* Contenu dynamique du mockup */}
              <div className="w-full h-full relative mt-6">
                
                {/* Step 1 UI */}
                <div className={`absolute inset-0 transition-all duration-500 flex flex-col gap-4 ${activeStep === 0 ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
                  <div className="text-[#00E5A0] font-mono text-[10px] mb-4 text-center">{dict.how.mockup_config}</div>
                  <div className="w-full h-[40px] bg-white/5 border border-white/10 rounded-md px-3 py-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full mb-2"></div>
                    <div className="w-24 h-1 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="w-full h-[40px] bg-white/5 border border-white/10 rounded-md px-3 py-2">
                    <div className="w-12 h-2 bg-white/20 rounded-full mb-2"></div>
                    <div className="w-20 h-1 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="mt-auto w-full h-[45px] bg-[#00E5A0] rounded-md flex items-center justify-center">
                    <div className="w-16 h-2 bg-[#0a100d] rounded-full"></div>
                  </div>
                </div>

                {/* Step 2 UI */}
                <div className={`absolute inset-0 transition-all duration-500 flex flex-col ${activeStep === 1 ? 'opacity-100 pointer-events-auto z-10 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
                  {/* Grid background for map */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/10" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    {/* Zones danger */}
                    <div className="absolute top-10 right-4 w-24 h-24 bg-red-500/20 rounded-full blur-xl" />
                    <div className="absolute bottom-16 left-6 w-16 h-16 bg-orange-500/20 rounded-full blur-lg" />
                    
                    {/* Position GPS pulsante */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 rounded-full bg-[#00E5A0] relative z-10" />
                      <div className="absolute inset-0 bg-[#00E5A0] rounded-full animate-ping opacity-75" />
                      <div className="absolute -inset-4 border border-[#00E5A0] rounded-full opacity-30" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0d1410]/90 backdrop-blur-md border border-[#00E5A0]/20 rounded-lg p-3">
                     <div className="font-mono text-[9px] text-[#00E5A0] mb-1">{dict.how.mockup_session}</div>
                     <div className="w-3/4 h-2 bg-white/20 rounded-full"></div>
                  </div>
                </div>

                {/* Step 3 UI */}
                <div className={`absolute inset-0 transition-all duration-500 flex flex-col justify-center items-center gap-6 ${activeStep === 2 ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
                  <div className="font-mono text-[10px] text-white/50 mb-4 tracking-widest text-center">{dict.how.mockup_emergency}</div>
                  
                  <div className="w-full flex justify-between px-4">
                     <div className="w-12 h-12 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white/20" />
                     </div>
                     <div className="w-12 h-12 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white/20" />
                     </div>
                     <div className="w-12 h-12 rounded-lg border border-red-500/50 bg-red-500/20 flex items-center justify-center relative shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse">
                        <div className="w-4 h-4 rounded-full bg-red-500" />
                     </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="font-mono text-[12px] text-red-400 font-bold tracking-widest animate-pulse mb-2">{dict.how.mockup_sos}</div>
                    <div className="w-32 h-1 bg-white/10 rounded-full mx-auto"></div>
                  </div>
                </div>

              </div>

              {/* Progress dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[3px] rounded-full transition-all duration-500 ${activeStep === idx ? 'w-5 bg-[#00E5A0]' : 'w-[6px] bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
