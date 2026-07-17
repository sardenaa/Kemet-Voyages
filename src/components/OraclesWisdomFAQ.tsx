import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Compass, Shield, Anchor, Calendar, Waves, Search, Sparkles, BookOpen, CheckSquare, Square, RotateCcw, Luggage, Shirt, Info, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'equipment' | 'seasons' | 'history' | 'general';
  question: string;
  glyph: string;
  answer: string;
  loreQuote?: string;
  highlights: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'equipment',
    question: 'What diving gear is provided and what do I need to bring?',
    glyph: '𓆛',
    answer: 'We provide all your main scuba diving equipment, including 12L tanks, high-quality regulators, BCD vests, and wetsuits (3mm or 5mm thickness). All you need to bring is your swimsuit and your physical or digital diving certification card. If you use a prescription diving mask, we highly recommend bringing yours so you can enjoy the reefs to the fullest!',
    loreQuote: 'The Red Sea is stunningly clear, but having the right gear ensures a safe and comfortable dive.',
    highlights: ['All core dive gear included', '3mm & 5mm wetsuits available', 'Just bring swimwear & certification']
  },
  {
    id: 'faq-2',
    category: 'equipment',
    question: 'What should I wear for desert safaris and stargazing?',
    glyph: '𓅓',
    answer: 'The desert is very sunny and warm during the day but gets surprisingly cold once the sun goes down! We recommend wearing loose, light long-sleeve clothing to protect yourself from sunburn. Make sure to wear comfortable closed-toe shoes like sneakers or hiking boots (sandals are not allowed for safety). We will give you a free cotton headscarf and safety goggles to keep dust out of your face during quad biking.',
    loreQuote: 'Layer up for the desert. Sun protection by day, cozy layers by night.',
    highlights: ['Closed-toe sneakers or boots required', 'Wear light long-sleeve clothes', 'Free headscarf & safety goggles']
  },
  {
    id: 'faq-3',
    category: 'seasons',
    question: 'When is the best time of year to go diving in the Red Sea?',
    glyph: '𓊟',
    answer: 'Diving here is great all year round! However, if you want the absolute best visibility (often over 30 meters) and lovely warm water temperatures (between 26°C and 29°C), we recommend visiting from late September to November, or in spring from April to June. If you specifically want to see schools of Hammerhead Sharks, the hot summer months of July and August are the absolute best times.',
    loreQuote: 'Spring and autumn offer the clearest water and the most comfortable weather.',
    highlights: ['September–November: Best visibility', 'July–August: Hammerhead shark season', 'Water temp: 21°C (Winter) to 29°C (Summer)']
  },
  {
    id: 'faq-4',
    category: 'seasons',
    question: 'Is the Nile cruise comfortable during the hot summer months?',
    glyph: '𓊡',
    answer: 'Yes! Our cruise boats have excellent, modern air conditioning throughout, along with nice shaded outdoor decks and swimming pools to help you cool off. While it can get over 40°C at noon in Luxor, we schedule all temple sightseeing tours for early in the morning (around 5:30 AM) or late in the afternoon. This way, you avoid the midday heat and get to see the monuments in beautiful golden light.',
    loreQuote: 'We skip the midday heat with smart scheduling, leaving your afternoons free to relax by the pool.',
    highlights: ['Full air conditioning on board', 'Early-morning cool temple tours', 'Relax by the pool during peak heat']
  },
  {
    id: 'faq-5',
    category: 'history',
    question: 'Do I need tickets or permits to take photos inside the tombs?',
    glyph: '𓉐',
    answer: 'Yes, we take care of pre-booking your standard entry tickets, which cover access to three major tombs in places like the Valley of the Kings. Some famous tombs, like King Tutankhamun or Seti I, require extra individual tickets—just let us know 48 hours before your tour and we will get them sorted for you. You can take photos with your smartphone for free in almost all tombs, but professional cameras and tripods are not allowed without an expensive commercial permit.',
    loreQuote: 'Smartphones are great for capturing memories for free, but please turn off your flash to protect the ancient paintings.',
    highlights: ['Standard passes booked for you', 'Tutankhamun requires extra ticket', 'Free smartphone photos (no flash)']
  },
  {
    id: 'faq-6',
    category: 'history',
    question: 'Is there a dress code for visiting temples and ancient sites?',
    glyph: '𓋹',
    answer: 'Yes. Even though these are outdoor historic sites, they are still highly respected cultural landmarks. We kindly ask both men and women to wear respectful clothing that covers shoulders and knees. Bringing a light scarf is super handy for sun protection, and comfortable walking shoes are absolutely essential for uneven stone pathways.',
    loreQuote: 'Dress respectfully to honor local culture, and protect yourself from the hot sun.',
    highlights: ['Cover shoulders and knees', 'Sturdy walking shoes are a must', 'Bring a light scarf for sun cover']
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'Is the tap water safe to drink, and how do I stay hydrated?',
    glyph: '𓎬',
    answer: 'Please do not drink tap water or river water from the Nile. We provide unlimited, ice-cold bottled mineral water in all of our tour vans, transfer cars, boats, and desert camps completely free of charge. We recommend drinking 3 to 4 liters of water a day to stay healthy in the desert. Our tour guides also carry first-aid kits and rehydration salts just in case you feel dehydrated.',
    loreQuote: 'Drink plenty of bottled water to keep your energy up under the Egyptian sun.',
    highlights: ['Do not drink tap or river water', 'Unlimited free bottled water provided', 'Rehydration kits carried on all tours']
  }
];

type EnvironmentType = 'diving' | 'desert' | 'temples';
type SeasonType = 'spring_autumn' | 'summer' | 'winter';

const BASE_PACKING_DATA: Record<EnvironmentType, string[]> = {
  diving: [
    'Swimwear & swim trunks (bring 2 sets)',
    'Reef-safe biodegradable sunscreen (SPF 50+)',
    'Waterproof dry bag for boat decks',
    'Personal diving mask (prescription if needed)',
    'Physical or digital dive certification card & logbook',
    'Lightweight sandals or flip-flops'
  ],
  desert: [
    'Sturdy closed-toe sneakers or hiking boots (sandals not permitted)',
    'Lightweight, breathable long-sleeve shirts (protection from sun & dust)',
    'Polarized sunglasses with high UV protection',
    'Washable cotton headscarf / bandana (for wind protection)',
    'Moisture-wicking athletic socks',
    'High-UV lip balm & intensive moisturizer'
  ],
  temples: [
    'Modest apparel (shoulders and knees covered for sacred ruins)',
    'Wide-brim sun hat or linen cap',
    'Ultra-comfortable, supportive walking shoes',
    'Hand sanitizer & pocket wet wipes',
    'Small local cash bills (EGP coins for temple facilities)',
    'Compact travel umbrella for personal shade'
  ]
};

const SEASONAL_PACKING_DATA: Record<SeasonType, string[]> = {
  spring_autumn: [
    'Light jacket or wrap for cool evening breezes',
    'Versatile layering options for high diurnal temperature swings'
  ],
  summer: [
    'Handheld personal misting fan',
    'Electrolyte rehydration powder packs',
    'UV protective cooling towel',
    'High-grade sunblock (reapply every 2 hours)'
  ],
  winter: [
    'Cozy fleece jacket or packable down coat for chilly desert nights',
    'Warm pashmina scarf or travel shawl',
    'Thermal base layer if participating in overnight stargazing camping'
  ]
};

const ETIQUETTE_DATA: Record<EnvironmentType, { dos: string[]; donts: string[] }> = {
  diving: {
    dos: [
      'Practice neutral buoyancy to keep a safe distance from fragile coral reefs.',
      'Apply reef-safe biodegradable sunscreen at least 30 minutes before entering the water.',
      'Show appreciation by tipping the boat crew (Baksheesh is customary and highly valued).'
    ],
    donts: [
      'Never touch, stand on, or kick the living coral. A single brush can destroy decades of growth.',
      'Do not collect seashells, fossilized coral pieces, or artifacts from marine national parks.',
      'Never feed or try to chase wild marine life; let them swim freely.'
    ]
  },
  desert: {
    dos: [
      'Always wear sturdy closed-toe shoes to protect against hot sand, thorns, or small desert fauna.',
      'Always ask for permission before taking photographs of Bedouin hosts, handlers, or camels.',
      'Drink water constantly, even if you do not feel thirsty; desert air evaporates sweat instantly.'
    ],
    donts: [
      'Do not litter or leave waste. Keep the pristine desert dunes perfectly untouched.',
      'Never wander off alone beyond the marked perimeter of the camp, especially after sunset.',
      'Avoid high-speed quad-biking maneuvers that kick up unnecessary dust clouds near camel routes.'
    ]
  },
  temples: {
    dos: [
      'Dress modestly by keeping both shoulders and knees covered when entering historic temples and tombs.',
      'Keep a supply of small-denomination Egyptian Pound (EGP) cash notes on hand for tipping.',
      'Carry your trash with you until you find a waste receptacle.'
    ],
    donts: [
      'Never touch, lean on, or scratch ancient carved reliefs, painted murals, or hieroglyphic pillars.',
      'Absolutely NO flash photography inside any tombs. Bright strobe light degrades historical organic pigments.',
      'Do not climb or sit on ancient stone altars, walls, ruins, or statues.'
    ]
  }
};

export default function OraclesWisdomFAQ() {
  const [viewMode, setViewMode] = useState<'faq' | 'advice'>('faq');
  const [selectedEnv, setSelectedEnv] = useState<EnvironmentType>('diving');
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>('spring_autumn');

  const [activeCategory, setActiveCategory] = useState<'all' | 'equipment' | 'seasons' | 'history' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  // Load / save checklist items state from localStorage
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('egypt_packing_checklist_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('egypt_packing_checklist_v1', JSON.stringify(checkedItems));
  }, [checkedItems]);

  // Combine baseline and seasonal lists to produce dynamic, context-aware packing lists
  const packingList = useMemo(() => {
    const base = BASE_PACKING_DATA[selectedEnv] || [];
    const seasonal = SEASONAL_PACKING_DATA[selectedSeason] || [];
    return [...base, ...seasonal];
  }, [selectedEnv, selectedSeason]);

  // Calculate stats for checked list
  const checkedItemsCount = useMemo(() => {
    return packingList.filter(item => checkedItems[item]).length;
  }, [packingList, checkedItems]);

  const packingProgress = useMemo(() => {
    if (packingList.length === 0) return 0;
    return (checkedItemsCount / packingList.length) * 100;
  }, [packingList, checkedItemsCount]);

  // Retrieve context-aware etiquette rules
  const etiquetteRules = useMemo(() => {
    return ETIQUETTE_DATA[selectedEnv] || { dos: [], donts: [] };
  }, [selectedEnv]);

  const toggleCheckItem = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const resetChecklist = () => {
    const cleared = { ...checkedItems };
    packingList.forEach(item => {
      cleared[item] = false;
    });
    setCheckedItems(cleared);
  };

  // Filter items based on active category and search query
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const categories = [
    { value: 'all', label: '𓆃 All Help', count: FAQ_DATA.length },
    { value: 'equipment', label: '𓅓 Clothing & Gear', count: FAQ_DATA.filter(f => f.category === 'equipment').length },
    { value: 'seasons', label: '𓊟 Best Seasons', count: FAQ_DATA.filter(f => f.category === 'seasons').length },
    { value: 'history', label: '𓉐 Temple Rules', count: FAQ_DATA.filter(f => f.category === 'history').length },
    { value: 'general', label: '𓎬 Hydration & Health', count: FAQ_DATA.filter(f => f.category === 'general').length }
  ];

  return (
    <div className="bg-[#130f0a] border border-[#d4af37]/25 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden" id="oracles-wisdom-section">
      
      {/* Background Pharaonic graphics */}
      <div className="absolute right-4 top-4 text-stone-900/10 font-serif text-9xl select-none pointer-events-none">
        𓂀
      </div>
      <div className="absolute left-4 bottom-4 text-stone-900/10 font-serif text-9xl select-none pointer-events-none">
        𓋹
      </div>

      <div className="relative z-10 space-y-6">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.3em] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Travel Help & Tips
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-black text-[#e6c280] uppercase tracking-wide">
            Frequently Asked Questions
          </h3>
          <p className="text-stone-400 text-xs max-w-lg mx-auto leading-relaxed">
            Got questions about diving gear, desert clothing, temple passes, or staying hydrated? We have got you covered with simple, practical answers.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex justify-center" id="faq-view-toggle">
          <div className="bg-[#1a1410] border border-[#d4af37]/25 rounded-full p-1 flex gap-1">
            <button
              onClick={() => setViewMode('faq')}
              className={`px-5 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'faq'
                  ? 'bg-[#d4af37] text-stone-950 font-black shadow-md shadow-[#d4af37]/20'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              𓋹 Oracle FAQs
            </button>
            <button
              onClick={() => setViewMode('advice')}
              className={`px-5 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                viewMode === 'advice'
                  ? 'bg-[#d4af37] text-stone-950 font-black shadow-md shadow-[#d4af37]/20'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              𓊡 Traveler's Advice
            </button>
          </div>
        </div>

        {/* FAQ Accordion Mode */}
        {viewMode === 'faq' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Search Bar & Categories layout */}
            <div className="space-y-4">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search help topics..."
                  className="w-full bg-[#1c1611] border border-[#d4af37]/35 rounded-xl py-2.5 pl-10 pr-4 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] placeholder:text-stone-600 transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-stone-500 hover:text-stone-300"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Horizontal scrollable tab buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setActiveCategory(cat.value as any);
                        // Open the first item of the filtered list automatically
                        const items = FAQ_DATA.filter(f => cat.value === 'all' || f.category === cat.value);
                        if (items.length > 0) {
                          setExpandedId(items[0].id);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-full border text-[10px] font-mono transition-all uppercase tracking-wider cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'bg-[#d4af37] text-stone-950 border-[#d4af37] font-bold shadow-md shadow-[#d4af37]/10'
                          : 'bg-[#1a1410] border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`inline-block text-[8px] font-bold px-1.5 py-0.2 rounded-full ${isActive ? 'bg-stone-950/25 text-stone-950' : 'bg-stone-900 text-stone-500'}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-3 pt-2">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-10 text-stone-500 italic text-xs border border-stone-800/80 rounded-xl bg-black/10">
                  𓀞 We could not find any topics matching your search. Try searching for other keywords.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredFAQs.map((faq) => {
                    const isExpanded = expandedId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                          isExpanded
                            ? 'border-[#d4af37] bg-[#1e150f]'
                            : 'border-stone-850 bg-[#16110c]/80 hover:border-stone-750'
                        }`}
                      >
                        
                        {/* FAQ Accordion Header */}
                        <button
                          onClick={() => toggleExpand(faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg bg-[#241c14] border border-[#d4af37]/25 w-8 h-8 rounded-full flex items-center justify-center text-[#d4af37] select-none font-serif shadow-sm">
                              {faq.glyph}
                            </span>
                            <span className={`font-serif text-sm font-bold uppercase tracking-wide transition-colors ${
                              isExpanded ? 'text-[#e6c280]' : 'text-stone-300 hover:text-stone-100'
                            }`}>
                              {faq.question}
                            </span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform duration-300 ${
                            isExpanded ? 'transform rotate-180 text-[#d4af37]' : ''
                          }`} />
                        </button>

                        {/* FAQ Accordion Body */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                            >
                              <div className="px-4 pb-4 pt-1 space-y-4 border-t border-stone-900/50">
                                
                                {/* Answer Text */}
                                <p className="text-stone-300 text-xs leading-relaxed font-sans">
                                  {faq.answer}
                                </p>

                                {/* Lore Quote snippet */}
                                {faq.loreQuote && (
                                  <div className="bg-[#2a1e14]/40 border border-[#d4af37]/15 rounded-xl p-3 text-[11px] text-[#e6c280]/90 italic relative overflow-hidden pl-8">
                                    <span className="absolute left-3 top-3.5 text-[#d4af37]/55 text-base select-none font-serif">𓂀</span>
                                    <strong className="not-italic block text-[9px] uppercase font-mono tracking-wider text-[#d4af37] mb-0.5">
                                      Quick Travel Tip:
                                    </strong>
                                    "{faq.loreQuote}"
                                  </div>
                                )}

                                {/* Highlight Bullet badges */}
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {faq.highlights.map((highlight, index) => (
                                    <span
                                      key={index}
                                      className="text-[9px] font-mono uppercase bg-[#140f0b] border border-stone-800 text-stone-400 px-2.5 py-1 rounded-full flex items-center gap-1.5"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/80 animate-ping"></span>
                                      {highlight}
                                    </span>
                                  ))}
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Traveler's Advice Section */}
        {viewMode === 'advice' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 pt-2"
            id="traveler-advice-panel"
          >
            {/* Introduction */}
            <div className="text-center bg-[#1c1611]/80 border border-[#d4af37]/15 rounded-xl p-4">
              <p className="text-xs text-stone-300 leading-relaxed max-w-2xl mx-auto">
                𓋹 Prepare your mortal caravan with the right equipment and respect the sacred ways of Egypt. Select your intended environment and season to generate a customized packing list and cultural etiquette guide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Selectors & Dynamic Packing List Checklist */}
              <div className="md:col-span-6 space-y-6">
                
                {/* Selectors card */}
                <div className="bg-[#1a1410] border border-[#d4af37]/20 rounded-xl p-4 space-y-4">
                  <h4 className="font-serif text-xs font-bold text-[#e6c280] uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#d4af37]" />
                    1. Voyage Parameters
                  </h4>

                  {/* Environment select */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">Environment / Activity</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'diving', label: '𓆛 Diving', icon: Waves },
                        { value: 'desert', label: '𓅓 Desert', icon: Compass },
                        { value: 'temples', label: '𓉐 Temples', icon: BookOpen }
                      ].map((env) => {
                        const IconComp = env.icon;
                        const isSelected = selectedEnv === env.value;
                        return (
                          <button
                            key={env.value}
                            onClick={() => setSelectedEnv(env.value as EnvironmentType)}
                            className={`py-2 px-1 rounded-lg border text-[10px] font-mono uppercase tracking-wider flex flex-col items-center gap-1 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#e6c280]'
                                : 'bg-[#140f0c] border-stone-850 text-stone-500 hover:text-stone-300 hover:border-stone-700'
                            }`}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                            <span>{env.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Season select */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">Season</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'spring_autumn', label: '𓊟 Spring/Fall', icon: Calendar },
                        { value: 'summer', label: '𓊡 Summer', icon: Sparkles },
                        { value: 'winter', label: '𓎬 Winter', icon: Shield }
                      ].map((seas) => {
                        const IconComp = seas.icon;
                        const isSelected = selectedSeason === seas.value;
                        return (
                          <button
                            key={seas.value}
                            onClick={() => setSelectedSeason(seas.value as SeasonType)}
                            className={`py-2 px-1 rounded-lg border text-[10px] font-mono uppercase tracking-wider flex flex-col items-center gap-1 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#e6c280]'
                                : 'bg-[#140f0c] border-stone-850 text-stone-500 hover:text-stone-300 hover:border-stone-700'
                            }`}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                            <span>{seas.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Dynamic Packing Checklist */}
                <div className="bg-[#1a1410] border border-[#d4af37]/20 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xs font-bold text-[#e6c280] uppercase tracking-wider flex items-center gap-2">
                      <Luggage className="w-4 h-4 text-[#d4af37]" />
                      2. Sacred Packing List ({checkedItemsCount}/{packingList.length})
                    </h4>
                    {checkedItemsCount > 0 && (
                      <button
                        onClick={resetChecklist}
                        className="text-[9px] font-mono uppercase text-stone-500 hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-2.5 h-2.5" /> Reset
                      </button>
                    )}
                  </div>

                  {/* Checklist Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-850">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-600 to-[#d4af37]"
                        style={{ width: `${packingProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-stone-500 uppercase tracking-widest">
                      <span>Vessel Empty</span>
                      <span>{Math.round(packingProgress)}% Prepared</span>
                    </div>
                  </div>

                  {/* Checked items list */}
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-950">
                    {packingList.map((item, idx) => {
                      const isChecked = checkedItems[item] || false;
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCheckItem(item)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-[#1f1913] border-[#d4af37]/30 opacity-60'
                              : 'bg-[#130f0b] border-stone-850 hover:border-[#d4af37]/15'
                          }`}
                        >
                          <button
                            type="button"
                            className="text-[#d4af37] focus:outline-none flex-shrink-0 mt-0.5"
                          >
                            {isChecked ? (
                              <CheckSquare className="w-3.5 h-3.5 fill-[#d4af37]/10" />
                            ) : (
                              <Square className="w-3.5 h-3.5 text-stone-700" />
                            )}
                          </button>
                          <span className={`text-[11px] font-sans transition-colors ${isChecked ? 'text-stone-500 line-through' : 'text-stone-200'}`}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Cultural Etiquette */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-6">
                
                <div className="bg-[#1a1410] border border-[#d4af37]/20 rounded-xl p-4 flex-grow space-y-4">
                  <div className="border-b border-[#d4af37]/15 pb-2.5">
                    <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-[0.2em] block">Pharaonic Decorum</span>
                    <h4 className="font-serif text-sm font-bold text-[#e6c280] uppercase tracking-wide flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#d4af37]" />
                      3. Cultural Etiquette & Customs
                    </h4>
                  </div>

                  <div className="space-y-4">
                    
                    {/* DOs Section */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                        <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                        <span>The Path of Ma'at (Sacred Do's)</span>
                      </div>
                      <div className="space-y-2">
                        {etiquetteRules.dos.map((doTip, idx) => (
                          <div key={idx} className="bg-[#141d16]/30 border border-emerald-950/40 rounded-lg p-2.5 flex gap-2.5 items-start">
                            <span className="text-emerald-500 font-serif text-[10px] mt-0.5 select-none">𓋹</span>
                            <p className="text-stone-300 text-[11px] leading-relaxed font-sans">{doTip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DONTs Section */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-red-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                        <ThumbsDown className="w-3.5 h-3.5 text-red-500" />
                        <span>The Path of Chaos (Sacred Don'ts)</span>
                      </div>
                      <div className="space-y-2">
                        {etiquetteRules.donts.map((dontTip, idx) => (
                          <div key={idx} className="bg-[#241311]/30 border border-red-950/40 rounded-lg p-2.5 flex gap-2.5 items-start">
                            <span className="text-red-500 font-serif text-[10px] mt-0.5 select-none">𓅓</span>
                            <p className="text-stone-300 text-[11px] leading-relaxed font-sans">{dontTip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Quick Informational Tip Banner */}
                <div className="bg-[#1e1711] border border-dashed border-[#d4af37]/20 rounded-xl p-3.5 flex gap-3 items-start">
                  <Info className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider block">Universal Advice</span>
                    <p className="text-[10px] text-stone-400 leading-relaxed font-sans">
                      In Egypt, hospitality is a cornerstone of daily life. Showing a friendly, patient attitude and expressing gratitude with a warm <span className="text-stone-200 font-serif italic">"Shukran"</span> (Thank you) will open many hearts and doors on your voyage.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* Footer help note */}
        <div className="bg-[#1a140f] border border-[#d4af37]/10 rounded-xl p-3 text-center">
          <p className="text-[10px] text-stone-500 font-mono">
            𓋹 Need more help? Ask our friendly AI Travel Assistant in the chat above!
          </p>
        </div>

      </div>

    </div>
  );
}
