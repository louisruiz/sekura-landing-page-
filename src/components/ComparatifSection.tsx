"use client";

import { useInView } from "@/hooks/useInView";

export default function ComparatifSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const criteria = [
    { name: "Heatmap zones criminelles IA", sekura: true, mb: false, wa: false, others: false, exclusive: true },
    { name: "SOS 3 clics (sans déverrouiller)", sekura: true, mb: false, wa: false, others: false, exclusive: true },
    { name: "Routing anti-crime temps réel", sekura: true, mb: false, wa: false, others: false, exclusive: true },
    { name: "Conçu pour l'Amérique Latine", sekura: true, mb: false, wa: false, others: false, exclusive: true },
    { name: "Assistant IA sécurité locale", sekura: true, mb: false, wa: false, others: false, exclusive: true },
    { name: "Navigation GPS", sekura: true, mb: true, wa: false, others: false, exclusive: false },
    { name: "Partage de position", sekura: true, mb: true, wa: true, others: true, exclusive: false },
    { name: "Gratuit 3 mois", sekura: true, mb: true, wa: true, others: false, exclusive: false },
  ];

  const exclusiveCount = criteria.filter(c => c.exclusive).length;

  const Check = ({ active, delay, isSekura = false }: { active: boolean; delay: number; isSekura?: boolean }) => (
    <div 
      className={`transition-all duration-700 ease-out font-sans ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${
        active 
          ? isSekura 
            ? 'text-[#00E5A0] font-bold text-[20px]' 
            : 'text-[#00E5A0] font-bold text-[14px]'
          : 'text-white/20 text-[14px]'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {active ? '✓' : '—'}
    </div>
  );

  return (
    <section id="comparatif" className="bg-[#0d1410] py-32 relative overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">
      
      {/* Label de section */}
      <div className="absolute top-0 right-0 flex items-center justify-end w-full overflow-hidden">
        <div className="h-[1px] w-full max-w-2xl bg-gradient-to-l from-[#00E5A0]/40 to-transparent" />
        <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px] px-8 py-4 whitespace-nowrap">
          COMPARATIF &middot; 05 //
        </div>
      </div>

      <div ref={ref as any} className={`max-w-6xl mx-auto px-6 overflow-hidden transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Titres */}
        <div className="col-span-12 mb-20 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h2 className="text-[clamp(28px,4vw,52px)] font-[900] leading-[1.1] uppercase tracking-tight mb-4">
            <span className="text-white block">Les autres apps protègent tes données.</span>
            <span className="text-[#00E5A0] block">Sekura protège ta vie.</span>
          </h2>
          <p className="font-mono text-[11px] sm:text-[13px] text-white/40 tracking-widest uppercase">
            Ce que personne d&#39;autre ne fait — et pourquoi ça compte.
          </p>
        </div>

        {/* Desktop: Tableau */}
        <div className="hidden md:block w-full overflow-x-auto pb-8">
          <div className="min-w-[800px] grid grid-cols-[1fr_repeat(4,minmax(120px,1fr))] items-center gap-0">
            
            {/* Headers */}
            <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase pb-4 px-4">
               // CRITÈRE
            </div>
            <div className="font-mono text-[12px] font-bold text-[#00E5A0] tracking-widest uppercase pb-4 text-center border-b-2 border-[#00E5A0] bg-[#00E5A0]/5 pt-4 rounded-t-md shadow-[0_0_30px_-10px_rgba(0,229,160,0.2)] sticky top-0 z-10">
               SEKURA
            </div>
            <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase pb-4 text-center border-b border-[#00E5A0]/15 pt-4 sticky top-0 z-10">
               Google Maps
            </div>
            <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase pb-4 text-center border-b border-[#00E5A0]/15 pt-4 sticky top-0 z-10">
               WhatsApp
            </div>
            <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase pb-4 text-center border-b border-[#00E5A0]/15 pt-4 sticky top-0 z-10">
               Autres (Life360)
            </div>

            {/* Rows */}
            {criteria.map((row, idx) => (
              <div key={idx} className="contents group">
                 <div className={`py-4 px-4 font-mono text-[11px] sm:text-[12px] uppercase text-white/80 tracking-wide border-b border-white/5 transition-colors group-hover:bg-white/[0.08] ${idx % 2 === 0 ? 'bg-white/5' : ''}`}>
                    {row.name}
                    {row.exclusive && <span className="ml-2 text-[8px] text-[#00E5A0] opacity-0 group-hover:opacity-100 transition-opacity">EXCLUSIF</span>}
                 </div>
                 <div className={`py-4 text-center border-b border-[#00E5A0]/10 transition-colors group-hover:bg-[#00E5A0]/[0.12] ${idx % 2 === 0 ? 'bg-[#00E5A0]/10' : 'bg-[#00E5A0]/5'}`} style={{ background: `linear-gradient(180deg, ${idx % 2 === 0 ? 'rgba(0,229,160,0.1)' : 'rgba(0,229,160,0.05)'}, rgba(0,229,160,${0.02 + idx * 0.008}))` }}>
                    <Check active={row.sekura} delay={idx * 80} isSekura />
                 </div>
                 <div className={`py-4 text-center border-b border-white/5 transition-colors group-hover:bg-white/[0.08] ${idx % 2 === 0 ? 'bg-white/5' : ''}`}>
                    <Check active={row.mb} delay={idx * 80 + 100} />
                 </div>
                 <div className={`py-4 text-center border-b border-white/5 transition-colors group-hover:bg-white/[0.08] ${idx % 2 === 0 ? 'bg-white/5' : ''}`}>
                    <Check active={row.wa} delay={idx * 80 + 200} />
                 </div>
                 <div className={`py-4 text-center border-b border-white/5 transition-colors group-hover:bg-white/[0.08] ${idx % 2 === 0 ? 'bg-white/5' : ''}`}>
                    <Check active={row.others} delay={idx * 80 + 300} />
                 </div>
              </div>
            ))}

            {/* Empty footer for style */}
            <div className="col-span-1 rounded-bl-md"></div>
            <div className="col-span-1 bg-[#00E5A0]/5 h-4 border-t border-[#00E5A0] rounded-b-md"></div>
            <div className="col-span-3"></div>

          </div>
        </div>

        {/* Mobile: Cards layout */}
        <div className="md:hidden flex flex-col gap-4">
          {criteria.map((row, idx) => (
            <div 
              key={idx}
              className={`border border-white/10 rounded-lg p-5 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="font-mono text-[12px] text-white/80 uppercase tracking-wide mb-4 flex items-center gap-2">
                {row.name}
                {row.exclusive && <span className="text-[8px] text-[#00E5A0] border border-[#00E5A0]/30 px-1.5 py-0.5 rounded-sm">EXCLUSIF</span>}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'SEKURA', active: row.sekura, color: '#00E5A0' },
                  { label: 'MAPS', active: row.mb, color: 'white' },
                  { label: 'WHATSAPP', active: row.wa, color: 'white' },
                  { label: 'LIFE360', active: row.others, color: 'white' },
                ].map((col) => (
                  <div key={col.label} className="text-center">
                    <div className="font-mono text-[7px] text-white/30 tracking-widest mb-1">{col.label}</div>
                    <div className={`text-[18px] ${col.active ? (col.label === 'SEKURA' ? 'text-[#00E5A0] font-bold' : 'text-[#00E5A0]') : 'text-white/15'}`}>
                      {col.active ? '✓' : '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Badge Bottom with counter */}
        <div className="mt-12 text-center lg:text-left flex flex-col sm:flex-row items-center gap-4">
           <div className={`inline-block bg-[#00E5A0]/10 border border-[#00E5A0]/40 font-mono text-[11px] sm:text-[12px] text-[#00E5A0] tracking-[2px] px-6 py-3 uppercase transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '600ms' }}>
              ◈ LE SEUL CONÇU POUR LES RÉALITÉS D&#39;AMÉRIQUE LATINE
           </div>
           <div className={`font-mono text-[11px] text-white/40 tracking-widest transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
              {exclusiveCount} fonctionnalités exclusives sur {criteria.length}
           </div>
        </div>

      </div>
    </section>
  )
}
