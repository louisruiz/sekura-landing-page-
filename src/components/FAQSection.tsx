"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Wifi, Shield, Battery, Globe, CreditCard, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";

// Helper to highlight keywords in jade
function HighlightAnswer({ text }: { text: string }) {
  const keywords = ["JAMAIS", "SOS", "SMS", "3%", "6h", "tarif préférentiel à vie", "Aucun engagement", "cache localement", "contacts de confiance"];
  
  const parts: (string | JSX.Element)[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliestIndex = remaining.length;
    let matchedKeyword = "";

    for (const kw of keywords) {
      const idx = remaining.indexOf(kw);
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx;
        matchedKeyword = kw;
      }
    }

    if (matchedKeyword) {
      if (earliestIndex > 0) {
        parts.push(remaining.substring(0, earliestIndex));
      }
      parts.push(<span key={key++} className="text-[#00E5A0] font-medium">{matchedKeyword}</span>);
      remaining = remaining.substring(earliestIndex + matchedKeyword.length);
    } else {
      parts.push(remaining);
      remaining = "";
    }
  }

  return <>{parts}</>;
}

const faqs = [
  {
    q: "Sekura fonctionne sans connexion internet ?",
    a: "Les heatmaps sont mises en cache localement. L'essentiel fonctionne offline — y compris le SOS qui passe par SMS si le data est indisponible.",
    num: "01",
    icon: <Wifi className="w-4 h-4" />
  },
  {
    q: "Mes données de position sont-elles partagées ?",
    a: "Ta position n'est JAMAIS vendue ni partagée avec des tiers. Elle est transmise uniquement à tes contacts de confiance, quand tu le décides.",
    num: "02",
    icon: <Shield className="w-4 h-4" />
  },
  {
    q: "L'app consomme beaucoup de batterie ?",
    a: "Mode optimisé par défaut : moins de 3% de batterie par heure. Le tracking GPS s'adapte à ta vitesse de déplacement.",
    num: "03",
    icon: <Battery className="w-4 h-4" />
  },
  {
    q: "Disponible dans quels pays ?",
    a: "Mexique, Colombie, Brésil, Argentine, Pérou, Chili et 12 autres pays au lancement. Europe dès Q2 2025.",
    num: "04",
    icon: <Globe className="w-4 h-4" />
  },
  {
    q: "Que se passe-t-il après les 3 mois gratuits ?",
    a: "Tu choisis de continuer (membres fondateurs = tarif préférentiel à vie) ou tu arrêtes. Sans friction. Aucun engagement.",
    num: "05",
    icon: <CreditCard className="w-4 h-4" />
  },
  {
    q: "La heatmap est mise à jour à quelle fréquence ?",
    a: "Données rafraîchies toutes les 6h depuis sources officielles + signalements communauté vérifiés. Toujours plus précis qu'hier.",
    num: "06",
    icon: <RefreshCw className="w-4 h-4" />
  }
];

export default function FAQSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackState, setFeedbackState] = useState<{ [key: number]: 'up' | 'down' | null }>({});

  const toggle = (idx: number) => {
    setOpenIndices(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const filteredFaqs = faqs.filter(faq => 
    searchQuery === "" || 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="bg-[#070c09] py-32 relative overflow-hidden selection:bg-[#00E5A0] selection:text-[#0A0C14]">
      
      {/* Label de section */}
      <div className="absolute top-0 left-0 flex items-center w-full overflow-hidden">
        <div className="font-mono text-[11px] text-[#00E5A0] tracking-[3px] px-8 py-4 whitespace-nowrap">
          // 08 &middot; FAQ
        </div>
        <div className="h-[1px] w-full max-w-2xl bg-gradient-to-r from-[#00E5A0]/40 to-transparent" />
      </div>

      <div ref={ref as any} className={`max-w-[800px] mx-auto px-6 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Titre */}
        <div className="mb-12 text-center">
          <h2 className="text-[clamp(28px,4vw,52px)] font-[900] leading-[1.1] uppercase tracking-tight mb-2">
            <span className="text-white block">Les vraies questions.</span>
            <span className="text-[#00E5A0] block">Les vraies réponses.</span>
          </h2>
        </div>

        {/* Search input */}
        <div className="mb-10 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une question..."
            className="w-full bg-white/5 border border-[#00E5A0]/15 rounded-md px-5 py-3 pl-10 text-white placeholder:text-white/20 font-mono text-[12px] tracking-wide outline-none focus:border-[#00E5A0]/40 focus:bg-[#00E5A0]/5 transition-all"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Accordion */}
        <div className="flex flex-col">
          {filteredFaqs.map((faq, idx) => {
            const originalIdx = faqs.indexOf(faq);
            const isOpen = openIndices.has(originalIdx);
            return (
              <div
                key={originalIdx}
                className={`transition-colors duration-300 mb-[-1px] ${isOpen ? 'border border-[#00E5A0]/30 bg-[#00E5A0]/[0.02] relative z-10' : 'border border-[#00E5A0]/15 hover:border-[#00E5A0]/25'}`}
                style={{ borderImage: isOpen ? 'none' : `linear-gradient(to right, rgba(0,229,160,0.15), rgba(0,229,160,0.05)) 1` }}
              >
                <button
                  onClick={() => toggle(originalIdx)}
                  className="w-full text-left px-6 md:px-8 py-6 flex items-center justify-between gap-4 group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${originalIdx}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-[#00E5A0]/40 hidden sm:inline transition-colors group-hover:text-[#00E5A0]/70">{faq.icon}</span>
                    <span className="font-mono text-[10px] text-[#00E5A0]/60 tracking-widest hidden sm:inline">{faq.num}</span>
                    <span className="text-[14px] md:text-[16px] text-white/90 font-medium leading-snug group-hover:text-white transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <span className={`text-[#00E5A0] text-[24px] font-light leading-none transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    +
                  </span>
                </button>
                
                <div 
                  id={`faq-answer-${originalIdx}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen ? 'max-h-[300px] opacity-100 backdrop-blur-sm bg-black/10' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 md:px-8 pb-8 text-[14px] text-white/50 leading-[1.8] border-t border-[#00E5A0]/10 pt-4 mx-4 sm:ml-[4.5rem]">
                    <HighlightAnswer text={faq.a} />
                    
                    {/* Thumbs up/down feedback */}
                    <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between">
                       <span className="font-mono text-[9px] tracking-widest uppercase text-white/30">
                         Cette réponse t'a aidé ?
                       </span>
                       <div className="flex gap-2">
                         <button 
                            onClick={(e) => { e.stopPropagation(); setFeedbackState(prev => ({ ...prev, [originalIdx]: 'up' })); }}
                            className={`p-2 rounded-md border transition-all ${feedbackState[originalIdx] === 'up' ? 'bg-[#00E5A0]/20 border-[#00E5A0] text-[#00E5A0]' : 'border-white/10 text-white/40 hover:text-white/80 hover:bg-white/5 hover:border-white/20'}`}
                         >
                           <ThumbsUp className="w-3 h-3" />
                         </button>
                         <button 
                            onClick={(e) => { e.stopPropagation(); setFeedbackState(prev => ({ ...prev, [originalIdx]: 'down' })); }}
                            className={`p-2 rounded-md border transition-all ${feedbackState[originalIdx] === 'down' ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-white/10 text-white/40 hover:text-white/80 hover:bg-white/5 hover:border-white/20'}`}
                         >
                           <ThumbsDown className="w-3 h-3" />
                         </button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA en bas */}
        <div className="mt-12 text-center">
          <a href="#" className="font-mono text-[11px] text-white/40 tracking-widest hover:text-[#00E5A0] transition-colors inline-flex items-center gap-2 group">
            TU AS D&#39;AUTRES QUESTIONS ? <span className="text-[#00E5A0] group-hover:translate-x-1 transition-transform inline-block">CONTACTE-NOUS →</span>
          </a>
        </div>

      </div>

      {/* Schema.org FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
              }
            }))
          })
        }}
      />
    </section>
  );
}
