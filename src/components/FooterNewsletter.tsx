import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, X, ShieldCheck, Ticket, HelpCircle, Gift, Compass, ChevronRight, Check } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  interests: string[];
  tier: string;
  signupDate: string;
  promoCode: string;
}

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [explorerTier, setExplorerTier] = useState('scribe');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [assignedPromo, setAssignedPromo] = useState('');

  // Check if already subscribed previously
  useEffect(() => {
    const saved = localStorage.getItem('kemet_current_subscriber');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHasSubscribed(true);
        setAssignedPromo(parsed.promoCode);
        setEmail(parsed.email);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsModalOpen(true);
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate unique promo code based on selected interests or tier
    let prefix = 'ROYAL';
    if (selectedInterests.includes('diving')) prefix = 'NEPTUNE';
    if (selectedInterests.includes('safari')) prefix = 'ANUBIS';
    if (selectedInterests.includes('speedboat')) prefix = 'HORUS';
    if (selectedInterests.includes('history')) prefix = 'RAMSES';
    
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const promoCode = `${prefix}-${randomSuffix}-30`;

    setTimeout(() => {
      const subscriberData: Subscriber = {
        id: `sub-${Date.now()}`,
        email: email,
        interests: selectedInterests.length > 0 ? selectedInterests : ['all'],
        tier: explorerTier,
        signupDate: new Date().toISOString().split('T')[0],
        promoCode: promoCode
      };

      // Save to global list of signups for CRM
      const existingSignups = localStorage.getItem('kemet_newsletter_signups');
      let signupsList = [];
      if (existingSignups) {
        try {
          signupsList = JSON.parse(existingSignups);
        } catch (e) {
          signupsList = [];
        }
      }
      signupsList.unshift(subscriberData);
      localStorage.setItem('kemet_newsletter_signups', JSON.stringify(signupsList));

      // Save current subscriber state
      localStorage.setItem('kemet_current_subscriber', JSON.stringify(subscriberData));

      // Dispatch event to update Admin CRM or other components immediately
      window.dispatchEvent(new Event('kemet_subscribers_updated'));

      setAssignedPromo(promoCode);
      setIsSubmitting(false);
      setHasSubscribed(true);
      setIsModalOpen(false);
    }, 1500);
  };

  const handleResetSubscription = () => {
    localStorage.removeItem('kemet_current_subscriber');
    setHasSubscribed(false);
    setAssignedPromo('');
    setEmail('');
    setSelectedInterests([]);
  };

  const INTEREST_OPTIONS = [
    { value: 'diving', label: '𓆛 Scuba Diving', desc: 'Coral walls & deep marine reserves' },
    { value: 'boat', label: '𓊟 Yacht & Boat Trips', desc: 'Island luxury cruises & banquets' },
    { value: 'speedboat', label: '𓊡 Speedboat Excursions', desc: 'High-speed adrenaline island hopping' },
    { value: 'safari', label: '𓅓 Desert Safaris', desc: 'Quad racing & Bedouin stargazing' },
    { value: 'history', label: '𓉐 Historical Luxor', desc: 'Pharaonic tombs & Nile pilgrimages' }
  ];

  const TIER_OPTIONS = [
    { value: 'citizen', name: 'Noble Citizen', discount: '15% Off', icon: '𓀚' },
    { value: 'scribe', name: 'High Scribe', discount: '20% Off', icon: '𓁟' },
    { value: 'pharaoh', name: 'Dynastic Pharaoh', discount: '30% Off', icon: '𓁠' }
  ];

  return (
    <div className="w-full" id="imperial-newsletter-container">
      
      {/* 1. NEWSLETTER SIGNUP BANNER (FOOTER STYLE) */}
      <div className="bg-[#130f0a] border border-[#d4af37]/25 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
        
        {/* Subtle Hieroglyphic background element */}
        <div className="absolute right-0 bottom-0 text-stone-950/20 font-serif text-8xl select-none pointer-events-none transform translate-y-6 translate-x-6">
          𓎬
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          
          {/* Header Texts */}
          <div className="md:col-span-7 space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.25em] flex items-center gap-1.5 justify-center md:justify-start">
              <Sparkles className="w-3 h-3 text-[#d4af37] animate-pulse" />
              Imperial Decrees & Perks
            </span>
            <h3 className="font-serif text-xl md:text-2xl font-black text-[#e6c280] uppercase tracking-wide">
              The Imperial Excursion Discount Scroll
            </h3>
            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              Inscribe your electronic parchment mail below. Unlock divine seasonal discounts up to <span className="text-[#d4af37] font-semibold">30% Gold Coins</span> on diving, speedboats, and Nile cruises.
            </p>
          </div>

          {/* Action Input / Status */}
          <div className="md:col-span-5 w-full">
            {!hasSubscribed ? (
              <form onSubmit={handleInitialSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter thy noble email..."
                    className="w-full bg-[#1c1611] border border-[#d4af37]/30 rounded-xl py-2.5 pl-10 pr-3 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] placeholder:text-stone-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#d4af37] to-[#bca03b] hover:from-[#e2be4c] hover:to-[#cca73d] text-stone-950 font-mono text-[10px] uppercase font-bold tracking-widest px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
                >
                  Acquire Scroll <ChevronRight className="w-3 h-3 stroke-[3px]" />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#211a13]/80 border border-[#d4af37]/40 rounded-xl p-4 text-center sm:text-left space-y-2 relative"
              >
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="w-5 h-5 bg-[#d4af37]/10 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[10px] text-[#d4af37]">
                    ✓
                  </div>
                  <span className="font-serif text-[#e6c280] font-bold text-xs uppercase tracking-wider">
                    Imperial Covenant Sealed
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Welcome to the court! Your active discount code:
                </p>
                <div className="flex items-center justify-between bg-black/50 border border-stone-800 rounded-lg p-2 font-mono text-xs text-[#d4af37] select-all">
                  <span className="font-bold tracking-widest">{assignedPromo}</span>
                  <Ticket className="w-3.5 h-3.5 text-stone-600" />
                </div>
                <button 
                  onClick={handleResetSubscription}
                  className="text-[9px] font-mono text-stone-600 hover:text-stone-400 uppercase tracking-widest block mx-auto sm:ml-0 underline cursor-pointer"
                >
                  Reset / Change Covenant Email
                </button>
              </motion.div>
            )}
          </div>

        </div>
      </div>

      {/* 2. IMPERIAL PREFERENCE CAPTURE MODAL DIALOG */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-[#16110c] border-2 border-[#d4af37] rounded-3xl w-full max-w-xl overflow-hidden relative shadow-2xl z-10"
            >
              
              {/* Pharaonic Header Banner */}
              <div className="bg-gradient-to-b from-[#1c150e] to-[#120e0a] border-b border-[#d4af37]/20 p-5 text-center relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-4 top-4 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-2xl mb-1 text-[#d4af37]">𓂀</div>
                <h3 className="font-serif text-lg md:text-xl font-extrabold text-[#e6c280] uppercase tracking-widest">
                  Custom Caravan Preference Decree
                </h3>
                <p className="text-stone-400 text-xs mt-1 font-mono">
                  Sealing scroll access for: <span className="text-[#d4af37]">{email}</span>
                </p>
              </div>

              {/* Scrollable preference questionnaire */}
              <form onSubmit={handleFinalSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                
                {/* 1. Category checkmarks */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block">
                      Step I: Select Desired Excursions
                    </label>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Which seasonal voyages should we target with your golden parchment scrolls?
                    </p>
                  </div>

                  <div className="space-y-2">
                    {INTEREST_OPTIONS.map((item) => {
                      const isSelected = selectedInterests.includes(item.value);
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => toggleInterest(item.value)}
                          className={`w-full flex items-center justify-between text-left p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#d4af37]/10 border-[#d4af37] text-[#e6c280]'
                              : 'bg-[#1a1410] border-stone-800/80 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold font-serif block">
                              {item.label}
                            </span>
                            <span className="text-[10px] text-stone-500 block leading-none">
                              {item.desc}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#d4af37] border-[#d4af37] text-stone-950' : 'border-stone-700 bg-[#120d09]'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Interactive Court Tier */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block">
                      Step II: Choose Your Court Dignity
                    </label>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      Select your desired level of luxury communication inside the Pharaonic kingdom.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {TIER_OPTIONS.map((tier) => {
                      const isSelected = explorerTier === tier.value;
                      return (
                        <button
                          key={tier.value}
                          type="button"
                          onClick={() => setExplorerTier(tier.value)}
                          className={`flex flex-col items-center justify-center text-center p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#e6c280]'
                              : 'bg-[#1a1410] border-stone-800/80 text-stone-400 hover:border-stone-700'
                          }`}
                        >
                          <span className="text-xl mb-1 select-none">{tier.icon}</span>
                          <span className="text-[10px] font-serif font-bold block leading-tight">
                            {tier.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#d4af37] mt-1 bg-[#d4af37]/10 px-1.5 py-0.5 rounded-md">
                            {tier.discount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* VIP Perks Note */}
                <div className="bg-[#1d1611] border border-[#d4af37]/15 rounded-xl p-3 flex gap-3 items-start">
                  <div className="text-lg text-[#d4af37] select-none">𓋹</div>
                  <p className="text-[10px] text-stone-400 leading-relaxed">
                    By confirming this preference scroll, your email is sealed in our private archive. We respect the silence of Osiris: no promotional spam, only seasonal discount codes delivered with royal discretion.
                  </p>
                </div>

                {/* Submission CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#b29330] hover:from-[#e2be4c] hover:to-[#c3a133] text-stone-950 font-mono text-xs uppercase font-bold tracking-widest py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></span>
                      Engraving Covenant...
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4 animate-spin-slow" />
                      Inscribe Prefential Decree
                    </>
                  )}
                </button>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
