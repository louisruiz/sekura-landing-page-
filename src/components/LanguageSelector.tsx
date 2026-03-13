"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const Flags = {
  fr: () => (
    <svg viewBox="0 0 3 2" className="w-4 h-3 rounded-[2px] shadow-sm">
      <rect width="1" height="2" fill="#002395"/>
      <rect width="1" height="2" x="1" fill="#fff"/>
      <rect width="1" height="2" x="2" fill="#ed2939"/>
    </svg>
  ),
  en: () => (
    <svg viewBox="0 0 60 30" className="w-4 h-3 rounded-[2px] shadow-sm">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z"/>
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" clipPath="url(#s)"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#s)"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  ),
  es: () => (
    <svg viewBox="0 0 750 500" className="w-4 h-3 rounded-[2px] shadow-sm">
      <rect width="750" height="500" fill="#c60b1e"/>
      <rect width="750" height="250" y="125" fill="#ffc400"/>
    </svg>
  ),
  pt: () => (
    <svg viewBox="0 0 600 400" className="w-4 h-3 rounded-[2px] shadow-sm">
      <rect width="240" height="400" fill="#006600"/>
      <rect width="360" height="400" x="240" fill="#FF0000"/>
      <circle cx="240" cy="200" r="80" fill="#FFCC00" opacity="0.8"/>
    </svg>
  ),
  de: () => (
    <svg viewBox="0 0 5 3" className="w-4 h-3 rounded-[2px] shadow-sm">
      <rect width="5" height="3" fill="#ffce00"/>
      <rect width="5" height="2" fill="#dd0000"/>
      <rect width="5" height="1" fill="#000"/>
    </svg>
  ),
  it: () => (
    <svg viewBox="0 0 30 20" className="w-4 h-3 rounded-[2px] shadow-sm">
      <rect width="10" height="20" fill="#009246"/>
      <rect width="10" height="20" x="10" fill="#fff"/>
      <rect width="10" height="20" x="20" fill="#ce2b37"/>
    </svg>
  )
};

const LOCALES = [
  { code: "fr", label: "Français", flag: <Flags.fr /> },
  { code: "en", label: "English", flag: <Flags.en /> },
  { code: "es", label: "Español", flag: <Flags.es /> },
  { code: "pt", label: "Português", flag: <Flags.pt /> },
  { code: "de", label: "Deutsch", flag: <Flags.de /> },
  { code: "it", label: "Italiano", flag: <Flags.it /> },
];

export default function LanguageSelector({ currentLocale }: { currentLocale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const current = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchLocale = (code: string) => {
    // Replace current locale prefix in the path
    const newPath = pathname.replace(`/${currentLocale}`, `/${code}`);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative z-[60]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#00E5A0]/30 bg-[#00E5A0]/5 hover:bg-[#00E5A0]/10 hover:border-[#00E5A0]/50 transition-all backdrop-blur-sm group"
        aria-label="Change language"
      >
        <span className="text-[16px]">{current.flag}</span>
        <span className="font-mono text-[11px] tracking-wider text-white/70 group-hover:text-white transition-colors hidden sm:inline">
          {current.code.toUpperCase()}
        </span>
        <svg
          className={`w-3 h-3 text-[#00E5A0] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-[calc(100%+8px)] min-w-[180px] rounded-xl overflow-hidden border border-[#00E5A0]/20 bg-[#0A0C14]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(0,229,160,0.08)] transition-all duration-300 origin-top-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-2"
        }`}
      >
        {LOCALES.map((locale, i) => {
          const isActive = locale.code === currentLocale;
          return (
            <button
              key={locale.code}
              onClick={() => switchLocale(locale.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-[12px] tracking-wide transition-all duration-200 ${
                isActive
                  ? "bg-[#00E5A0]/10 text-[#00E5A0]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              } ${i < LOCALES.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <span className="text-[16px]">{locale.flag}</span>
              <span className="flex-1 text-left">{locale.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse shadow-[0_0_6px_#00E5A0]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
