import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info, Download, RefreshCw } from 'lucide-react';

interface HieroglyphData {
  symbolName: string;
  meaning: string;
  pronunciation: string;
  // A function that renders the symbol inside a golden container
  renderSymbol: (color: string) => React.ReactNode;
}

// Map letters A-Z to authentic-inspired Egyptian Hieroglyphs
const HIEROGLYPHS_MAP: Record<string, HieroglyphData> = {
  A: {
    symbolName: "Vulture (Apep's Foe)",
    meaning: "Beginnings, Vision, Sovereignty",
    pronunciation: "Ah",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M20,65 C25,50 35,40 50,40 C65,40 75,50 80,65 M50,40 L50,15 L45,22 M50,15 L55,22 M30,53 L30,80 M70,53 L70,80" />
        <circle cx="50" cy="30" r="4" fill={c} />
        <path d="M40,40 C35,43 30,50 30,53" />
        <path d="M60,40 C65,43 70,50 70,53" />
      </svg>
    )
  },
  B: {
    symbolName: "Foot (Babi's Step)",
    meaning: "Action, Stability, Journeys",
    pronunciation: "Buh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M35,20 L35,65 C35,75 40,80 55,80 L75,80" strokeLinecap="round" />
        <path d="M55,80 C65,80 75,75 75,65" strokeLinecap="round" />
        <path d="M35,35 L45,35 M35,50 L45,50" />
      </svg>
    )
  },
  C: {
    symbolName: "Wicker Basket",
    meaning: "Capacity, Wisdom, Gathering",
    pronunciation: "Kuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M20,40 L80,40 C80,65 65,80 50,80 C35,80 20,65 20,40 Z" strokeLinejoin="round" />
        <path d="M20,40 L50,80 M80,40 L50,80 M50,40 L50,80" strokeDasharray="3,3" />
      </svg>
    )
  },
  D: {
    symbolName: "Hand of Atum",
    meaning: "Creation, Giving, Protection",
    pronunciation: "Duh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M25,60 L50,60 C55,60 75,55 80,50 C85,45 80,35 70,40 L60,45" />
        <path d="M50,43 C55,30 50,20 42,20 C35,20 38,35 43,43" />
        <path d="M43,43 C47,25 42,15 35,15 C28,15 30,30 35,43" />
        <path d="M35,43 C38,28 32,18 25,18 C18,18 20,32 27,45" />
        <path d="M27,45 C20,35 15,25 10,30 C5,35 12,45 22,50" />
      </svg>
    )
  },
  E: {
    symbolName: "Flowering Reed",
    meaning: "Life force, Breath, Spirit",
    pronunciation: "Eh/Ee",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M50,85 L50,15" />
        <path d="M50,15 C40,25 40,45 50,55" />
        <path d="M50,25 C42,32 42,48 50,55" />
        <path d="M50,75 L65,85 M50,65 L35,75" />
      </svg>
    )
  },
  F: {
    symbolName: "Horned Viper",
    meaning: "Focus, Adaptability, Defense",
    pronunciation: "Ef",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M15,65 C25,65 30,55 45,55 C60,55 65,65 80,65 C90,65 95,50 85,45 C75,40 65,48 60,48" strokeLinecap="round" />
        <path d="M85,45 L88,35 M85,45 L78,38" />
      </svg>
    )
  },
  G: {
    symbolName: "Sacred Jar Stand",
    meaning: "Purity, Refreshment, Ritual",
    pronunciation: "Guh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M30,80 L70,80" />
        <path d="M50,80 L50,45" />
        <path d="M35,45 L65,45 C75,45 75,20 65,20 L35,20 C25,20 25,45 35,45 Z" />
        <path d="M35,20 L40,10 L60,10 L65,20" />
      </svg>
    )
  },
  H: {
    symbolName: "Reed Shelter",
    meaning: "Home, Protection, Sanctuary",
    pronunciation: "Huh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <rect x="25" y="25" width="50" height="50" rx="5" />
        <path d="M40,75 L40,60 L60,60 L60,75" />
        <line x1="25" y1="50" x2="75" y2="50" />
      </svg>
    )
  },
  I: {
    symbolName: "Double Flowering Reeds",
    meaning: "Duality, Harmony, Balance",
    pronunciation: "Ee",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M40,85 L40,15" />
        <path d="M40,15 C30,25 30,45 40,55" />
        <path d="M60,85 L60,15" />
        <path d="M60,15 C50,25 50,45 60,55" />
      </svg>
    )
  },
  J: {
    symbolName: "Uraeus Cobra",
    meaning: "Divine Power, Protection, Fire",
    pronunciation: "Juh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M30,80 C45,80 50,75 50,60 C50,45 35,40 35,25 C35,15 45,15 55,20 C65,25 70,35 65,50" />
        <path d="M55,20 C58,12 68,12 70,22" />
        <circle cx="53" cy="18" r="2" fill={c} />
      </svg>
    )
  },
  K: {
    symbolName: "Basket with Handle",
    meaning: "Rulership, Containment, Authority",
    pronunciation: "Kuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M20,45 L80,45 C80,68 65,80 50,80 C35,80 20,68 20,45 Z" />
        <path d="M80,45 C88,45 88,30 80,30 L70,30" />
      </svg>
    )
  },
  L: {
    symbolName: "Recumbent Lion",
    meaning: "Strength, Nobility, The Sun",
    pronunciation: "Luh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M20,70 L80,70" />
        <path d="M20,70 C15,65 15,50 25,50 L55,50 C65,50 70,40 70,30 C75,20 85,25 80,45 C78,55 75,70 70,70" />
        <path d="M72,30 C75,25 80,25 82,32" />
        <path d="M20,70 C15,75 10,70 12,65" />
      </svg>
    )
  },
  M: {
    symbolName: "Water Waves",
    meaning: "Creation, Change, Emotion",
    pronunciation: "Muh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M15,40 L25,30 L35,40 L45,30 L55,40 L65,30 L75,40 L85,30" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15,60 L25,50 L35,60 L45,50 L55,60 L65,50 L75,60 L85,50" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  N: {
    symbolName: "Water Ripple",
    meaning: "Flow, Connection, Nourishment",
    pronunciation: "Nuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M15,50 L22,40 L29,50 L36,40 L43,50 L50,40 L57,50 L64,40 L71,50 L78,40 L85,50" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  O: {
    symbolName: "Lasso of Eternity",
    meaning: "Infinity, Order, Protection",
    pronunciation: "Oh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <circle cx="50" cy="45" r="22" />
        <path d="M35,60 L25,80 M65,60 L75,80" />
        <line x1="25" y1="80" x2="75" y2="80" />
      </svg>
    )
  },
  P: {
    symbolName: "Reed Mat",
    meaning: "Foundation, Comfort, Order",
    pronunciation: "Puh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <rect x="25" y="25" width="50" height="50" rx="4" />
        <line x1="37" y1="25" x2="37" y2="75" />
        <line x1="50" y1="25" x2="50" y2="75" />
        <line x1="62" y1="25" x2="62" y2="75" />
        <line x1="25" y1="50" x2="75" y2="50" />
      </svg>
    )
  },
  Q: {
    symbolName: "Sandy Hillside",
    meaning: "Ascent, Vision, Endurance",
    pronunciation: "Kuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M15,80 L45,40 C50,35 55,35 60,40 L85,80" strokeLinejoin="round" />
        <path d="M30,60 C40,55 50,62 60,57" />
      </svg>
    )
  },
  R: {
    symbolName: "Mouth of Ra",
    meaning: "Speech, Breath, Magic",
    pronunciation: "Ruh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M20,50 C35,30 65,30 80,50 C65,70 35,70 20,50 Z" strokeLinejoin="round" />
        <line x1="20" y1="50" x2="80" y2="50" />
      </svg>
    )
  },
  S: {
    symbolName: "Folded Cloth",
    meaning: "Refinement, Clothing, Health",
    pronunciation: "Suh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M35,20 L65,20 C65,20 65,55 50,60 C35,65 35,80 50,80 L65,80" strokeLinecap="round" />
        <path d="M35,20 L35,50" />
      </svg>
    )
  },
  T: {
    symbolName: "Loaf of Bread",
    meaning: "Nourishment, Offerings, Life",
    pronunciation: "Tuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M20,70 L80,70 C80,70 80,30 50,30 C20,30 20,70 20,70 Z" strokeLinejoin="round" />
        <line x1="30" y1="50" x2="70" y2="50" />
      </svg>
    )
  },
  U: {
    symbolName: "Quail Chick",
    meaning: "Youth, Growth, Messages",
    pronunciation: "Oo/Wuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <circle cx="65" cy="35" r="12" />
        <path d="M65,47 C55,50 45,45 35,55 C25,65 25,80 45,80 C65,80 77,65 77,47" />
        <path d="M75,32 L83,30" />
        <path d="M35,70 L30,80 M45,78 L45,85 M55,75 L60,85" />
      </svg>
    )
  },
  V: {
    symbolName: "Horned Viper (Royal)",
    meaning: "Sovereignty, Protection, Alertness",
    pronunciation: "Vuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M15,55 C25,55 35,65 50,65 C65,65 75,55 85,55" strokeLinecap="round" />
        <path d="M15,55 L10,48 M15,55 L22,48" strokeLinecap="round" />
        <path d="M85,55 C90,50 90,40 82,35 C75,30 70,40 65,42" />
      </svg>
    )
  },
  W: {
    symbolName: "Quail Chick (Nesting)",
    meaning: "Community, Prosperity, Wind",
    pronunciation: "Wuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <circle cx="60" cy="30" r="10" />
        <path d="M60,40 C50,43 40,40 30,50 C20,60 20,75 40,75 C60,75 70,60 70,40" />
        <path d="M30,65 L25,75 M40,73 L40,80 M50,70 L55,80" />
      </svg>
    )
  },
  X: {
    symbolName: "Crossed Scepters",
    meaning: "Rulership, Crossroads, Union",
    pronunciation: "Eks",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <line x1="25" y1="25" x2="75" y2="75" strokeLinecap="round" />
        <line x1="75" y1="25" x2="25" y2="75" strokeLinecap="round" />
        <circle cx="25" cy="25" r="5" fill={c} />
        <circle cx="75" cy="25" r="5" fill={c} />
      </svg>
    )
  },
  Y: {
    symbolName: "Sacred Feather of Ma'at",
    meaning: "Truth, Order, Cosmic Justice",
    pronunciation: "Yuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <path d="M50,85 C50,85 50,40 50,15" />
        <path d="M50,15 C65,22 70,50 60,85" />
        <path d="M50,30 L60,35 M50,45 L58,50 M50,60 L56,65" />
      </svg>
    )
  },
  Z: {
    symbolName: "Door Bolt of Sekhmet",
    meaning: "Security, Sealing, Strength",
    pronunciation: "Zuh",
    renderSymbol: (c) => (
      <svg viewBox="0 0 100 100" className="w-12 h-12" stroke={c} strokeWidth="3" fill="none">
        <line x1="15" y1="50" x2="85" y2="50" strokeLinecap="round" />
        <line x1="35" y1="35" x2="35" y2="65" strokeLinecap="round" />
        <line x1="65" y1="35" x2="65" y2="65" strokeLinecap="round" />
        <circle cx="50" cy="50" r="4" fill={c} />
      </svg>
    )
  }
};

export default function CartoucheGenerator() {
  const [name, setName] = useState<string>("KEMET");
  const [activeSymbol, setActiveSymbol] = useState<HieroglyphData | null>(null);

  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8);

  const triggerDownload = () => {
    alert("By the grace of Isis, take a screenshot of this royal decree to preserve your Pharaonic Cartouche!");
  };

  return (
    <div className="bg-[#16120e] border border-[#d4af37]/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden" id="cartouche-creator">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c5a059]/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-[#d4af37] w-5 h-5 animate-pulse" />
          <h3 className="font-serif text-2xl font-bold tracking-wider text-[#e6c280] uppercase">
            Royal Cartouche Scribe
          </h3>
          <Sparkles className="text-[#d4af37] w-5 h-5 animate-pulse" />
        </div>
        <p className="text-stone-400 text-sm max-w-lg mx-auto">
          In ancient Kemet, royal names were encircled in a golden loop called a <span className="text-[#d4af37]">Cartouche</span> to ward off chaotic spirits. Translate your name phonetically:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Input & Info Side */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-1.5">
              Enter Noble Name (Max 8 letters)
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., RAMSES"
                maxLength={8}
                className="w-full bg-[#201a14] border border-[#d4af37]/40 rounded-lg py-2.5 px-4 text-[#f3e5c8] font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]"
                id="cartouche-name-input"
              />
              {name && (
                <button
                  onClick={() => setName("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[#d4af37] transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Legend Details */}
          <div className="bg-[#1f1913] border border-[#d4af37]/15 rounded-xl p-4 min-h-[140px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeSymbol ? (
                <motion.div
                  key={activeSymbol.symbolName}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-2 text-center lg:text-left"
                >
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Info className="w-4 h-4 text-[#d4af37]" />
                    <span className="font-serif text-[#e6c280] font-semibold text-base">
                      {activeSymbol.symbolName}
                    </span>
                  </div>
                  <p className="text-stone-300 text-sm">
                    <strong className="text-stone-500">Divine Meaning:</strong> {activeSymbol.meaning}
                  </p>
                  <p className="text-[#d4af37]/80 text-xs font-mono uppercase tracking-wider">
                    Phonetic sound: "{activeSymbol.pronunciation}"
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-stone-500 text-sm italic"
                >
                  Hover over or tap any glyph in your cartouche to unveil its ancient protection lore.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={triggerDownload}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4af37]/20 to-[#9a7b1c]/20 hover:from-[#d4af37]/30 hover:to-[#9a7b1c]/30 border border-[#d4af37]/50 text-[#f3e5c8] rounded-xl py-2.5 text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
            id="download-decree-btn"
          >
            <Download className="w-4 h-4 text-[#d4af37]" />
            Seal and Save Royal Decree
          </button>
        </div>

        {/* Visual Cartouche Side */}
        <div className="lg:col-span-7 flex justify-center py-4">
          <div className="relative">
            {/* Golden Oval Royal Frame */}
            <div className="border-[6px] border-[#d4af37] bg-[#221a12] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d2116] to-[#14100c] rounded-full px-8 py-10 min-w-[160px] max-w-[280px] shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col items-center gap-4 relative border-double">
              {/* Cartouche Horizontal Royal Base Bar */}
              <div className="absolute bottom-0 h-4 w-4/5 bg-[#d4af37] border-t-2 border-b-2 border-amber-200 rounded-sm"></div>

              {/* Loop Top Details */}
              <div className="absolute top-2 w-4 h-1 bg-[#d4af37] opacity-60"></div>

              {/* Render Glyph list */}
              {cleanName.length > 0 ? (
                <div className="flex flex-col items-center gap-3.5 py-4 w-full">
                  {cleanName.split('').map((char, index) => {
                    const data = HIEROGLYPHS_MAP[char];
                    if (!data) return null;

                    return (
                      <motion.div
                        key={index}
                        className="group relative cursor-pointer p-1.5 rounded-lg hover:bg-[#d4af37]/10 transition-colors flex flex-col items-center w-full max-w-[80px]"
                        onMouseEnter={() => setActiveSymbol(data)}
                        onMouseLeave={() => setActiveSymbol(null)}
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        {/* Glow Background */}
                        <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/5 rounded-lg blur-md transition-all"></div>
                        
                        {/* Symbol Render */}
                        {data.renderSymbol("#d4af37")}

                        <span className="text-[10px] font-mono text-stone-500 tracking-wider group-hover:text-[#e6c280] transition-colors mt-0.5">
                          {char}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-20 text-center text-stone-600 font-mono text-xs uppercase tracking-widest">
                  EMPTY SLATE
                </div>
              )}
            </div>
            
            {/* Cartouche Side Ribbons for extra elegance */}
            <div className="hidden sm:block absolute -left-12 top-1/2 -translate-y-1/2 text-stone-600/30 text-6xl font-serif select-none pointer-events-none">
              𓋹
            </div>
            <div className="hidden sm:block absolute -right-12 top-1/2 -translate-y-1/2 text-stone-600/30 text-6xl font-serif select-none pointer-events-none">
              𓅃
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
