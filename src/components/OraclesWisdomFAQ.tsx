import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Compass, Shield, Anchor, Calendar, Waves, Search, Sparkles, BookOpen } from 'lucide-react';

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

export default function OraclesWisdomFAQ() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'equipment' | 'seasons' | 'history' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

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
