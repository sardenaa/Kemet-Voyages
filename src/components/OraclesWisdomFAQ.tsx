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
    question: 'What sacred garments and equipment are required for Red Sea scuba diving?',
    glyph: '𓆛',
    answer: 'For all deep sea excursions (such as the Thistlegorm wreck or Ras Mohamed coral walls), we provide premium high-end modern scuba gear: regulatory 12L aluminum tanks, balanced regulators, high-buoyancy BCDs, and 3mm to 5mm neoprene wet suits. You only need to bring personal swimwear and your diving certification parchment. If you possess prescription masks, we highly recommend bringing them to observe the deep reef clearly.',
    loreQuote: 'The ocean depths house the secret currents of Nun. Gird yourself in strong garments before sinking below.',
    highlights: ['All core dive gear included', '3-5mm suits recommended', 'Bring your certification card']
  },
  {
    id: 'faq-2',
    category: 'equipment',
    question: 'How should one dress for hot desert safaris and night stargazing?',
    glyph: '𓅓',
    answer: 'The desert sand is dynamic and the sun is intense during daylight, whereas nighttime temperatures drop precipitously. We command all travelers to wear breathable, long-sleeve linen or cotton garments to deflect the rays of Ra. Avoid open shoes; solid trail runners or hiking boots are mandatory. We provide authentic cotton chequered shemagh scarves to shield your breath from sands during quad racing, along with protective wind-goggles.',
    loreQuote: 'The desert winds of Set spare no traveler. Wrap your face and shield your sight with the traditional garments.',
    highlights: ['Closed-toe hiking shoes mandatory', 'Long-sleeve breathable layers', 'Free shemagh scarves & goggles']
  },
  {
    id: 'faq-3',
    category: 'seasons',
    question: 'When does the Red Sea offer the highest clarity and best diving seasons?',
    glyph: '𓊟',
    answer: 'The waters are divine year-round, but distinct windows offer different experiences. For maximum water clarity (exceeding 30 meters) and comfortable temperatures (26°C to 29°C), visit during the High Nile Season from late September to November, or Spring from April to June. If you seek encounters with schools of Hammerhead Sharks, the hot summer months of July and August are optimal, though the sun above burns intensely.',
    loreQuote: 'Observe the seasonal shifts of the celestial skies to witness the marine spirits rise in clarity.',
    highlights: ['September–November: Best clarity & climate', 'July–August: Hammerhead shark season', 'Water temp range: 21°C (Winter) to 29°C (Summer)']
  },
  {
    id: 'faq-4',
    category: 'seasons',
    question: 'Is the Nile cruise excursion pleasant during the high-heat summer months?',
    glyph: '𓊡',
    answer: 'Our royal river vessels are heavily fortified with premium climate-control systems and offer expansive shaded canopies and swimming pools on the upper decks. While the midday temperature in Luxor can exceed 40°C, all historical land explorations of temples are conducted at the crack of dawn (5:30 AM) or near sunset, when the stones are cooled and illuminated by gentle golden rays.',
    loreQuote: 'The sacred river flows endlessly. Even under the peak of Ra’s summer heat, the morning breeze brings relief.',
    highlights: ['Air-conditioned luxury suites', 'Early-morning temple explorations', 'Midday relaxation by the upper deck pool']
  },
  {
    id: 'faq-5',
    category: 'history',
    question: 'What are the official entry requirements and camera permits for Pharaonic Tombs?',
    glyph: '𓉐',
    answer: 'All high-level historical sites (including the Valley of the Kings, Karnak, and Abu Simbel) require pre-booked sacred passes. Standard passes permit entry into three major tombs. Select high-tier tombs, such as King Tutankhamun or Seti I, require premium supplemental tickets which must be arranged 48 hours in advance. Smartphone photography is now permitted for free in most tombs, but heavy tripod equipment and professional cameras require expensive Imperial permits.',
    loreQuote: 'Speak softly and step gently in the chambers of the ancestors. Leave their rest undisturbed.',
    highlights: ['Supplemental tickets needed for Tutankhamun', 'Smartphone photos are free', 'No flash photography permitted']
  },
  {
    id: 'faq-6',
    category: 'history',
    question: 'Are there strict dress codes or cultural expectations when entering temples?',
    glyph: '𓋹',
    answer: 'Yes. While the ancient structures are open-air archaeological parks, they remain sacred monuments of human heritage. We kindly request that both noble gentlemen and ladies wear respectful clothing covering their shoulders and knees. Light scarves are highly useful for covering up from the scorching sun and paying respect. When visiting active religious structures inside modern cities, head coverings may be requested for ladies.',
    loreQuote: 'Approach the sanctuaries of the gods with clean minds and humble vestments.',
    highlights: ['Shoulders and knees must be covered', 'Comfortable walking shoes needed', 'Light scarves are highly recommended']
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'What is the policy regarding hydration, Nile water, and physical wellness?',
    glyph: '𓎬',
    answer: 'Never consume tap water or untreated river water from the Nile. We provide unlimited chilled, double-filtered bottled mineral water in all our transport vehicles, boats, and luxury caravans free of charge. We recommend drinking at least 3-4 liters daily to prevent dehydration. If you experience heat exhaustion, our guides travel with complete trauma kits and rapid hydration salts authorized by the Royal Physicians.',
    loreQuote: 'Water is the blood of Kemet, but drink only of the sealed wells to maintain thy strength.',
    highlights: ['Never drink tap or river water', 'Unlimited free bottled water provided', 'Electrolyte hydration salts available']
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
    { value: 'all', label: '𓆃 All Lore', count: FAQ_DATA.length },
    { value: 'equipment', label: '𓅓 Equipment & Gear', count: FAQ_DATA.filter(f => f.category === 'equipment').length },
    { value: 'seasons', label: '𓊟 Divine Seasons', count: FAQ_DATA.filter(f => f.category === 'seasons').length },
    { value: 'history', label: '𓉐 Temple Entry & Laws', count: FAQ_DATA.filter(f => f.category === 'history').length },
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
            Imperial Travel Scrolls
          </span>
          <h3 className="font-serif text-2xl md:text-3xl font-black text-[#e6c280] uppercase tracking-wide">
            The Oracle's Wisdom FAQ
          </h3>
          <p className="text-stone-400 text-xs max-w-lg mx-auto leading-relaxed">
            Inquire about necessary sand gear, divine diving tides, temple entry permits, and health laws enforced inside the Pharaonic kingdom.
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
              placeholder="Search ancient travel scrolls..."
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
              𓀞 The royal archives found no matching lore for your query. Try searching another parchment.
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
                                  Ancient Papyrus Proverb:
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
            𓋹 Need additional guidance? Engage with <strong className="text-[#e6c280] font-serif uppercase">The Royal Scribe Sennedjem</strong> above for deep custom itineraries.
          </p>
        </div>

      </div>

    </div>
  );
}
