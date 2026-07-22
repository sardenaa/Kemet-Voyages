import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, X, ShieldCheck, Ticket, HelpCircle, Gift, Compass, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Subscriber {
  id: string;
  email: string;
  interests: string[];
  tier: string;
  signupDate: string;
  promoCode: string;
}

export default function FooterNewsletter() {
  const { language } = useLanguage();
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

  const INTEREST_OPTIONS = language === 'de' ? [
    { value: 'diving', label: '𓆛 Gerätetauchen', desc: 'Korallenriffe und Meeresschutzgebiete' },
    { value: 'boat', label: '𓊟 Yacht- & Bootsausflüge', desc: 'Insel-Luxuskreuzfahrten und Schnorcheln' },
    { value: 'speedboat', label: '𓊡 Schnellbootausflüge', desc: 'Insel-Hopping mit Highspeed' },
    { value: 'safari', label: '𓅓 Wüstensafaris', desc: 'Quad-Rennen und Sternenbeobachtung' },
    { value: 'history', label: '𓉐 Historisches Luxor', desc: 'Antike Tempel und Gräberführungen' }
  ] : language === 'pl' ? [
    { value: 'diving', label: '𓆛 Nurkowanie', desc: 'Rafy koralowe i rezerwaty morskie' },
    { value: 'boat', label: '𓊟 Rejsy jachtem i łodzią', desc: 'Luksusowe rejsy na wyspy i snorkeling' },
    { value: 'speedboat', label: '𓊡 Wycieczki motorówką', desc: 'Szybkie przemieszczanie się między wyspami' },
    { value: 'safari', label: '𓅓 Pustynne safari', desc: 'Wyścigi quadów i obserwacja gwiazd' },
    { value: 'history', label: '𓉐 Historyczny Luksor', desc: 'Starożytne świątynie i zwiedzanie grobowców' }
  ] : [
    { value: 'diving', label: '𓆛 Scuba Diving', desc: 'Coral reefs and marine reserves' },
    { value: 'boat', label: '𓊟 Yacht & Boat Trips', desc: 'Island luxury cruises and snorkeling' },
    { value: 'speedboat', label: '𓊡 Speedboat Excursions', desc: 'High-speed island hopping tours' },
    { value: 'safari', label: '𓅓 Desert Safaris', desc: 'Quad bike racing and stargazing' },
    { value: 'history', label: '𓉐 Historical Luxor', desc: 'Ancient temples and tomb tours' }
  ];

  const TIER_OPTIONS = language === 'de' ? [
    { value: 'citizen', name: 'Standard-Reisender', discount: '15% Rabatt', icon: '𓀚' },
    { value: 'scribe', name: 'Begeisterter Entdecker', discount: '20% Rabatt', icon: '𓁟' },
    { value: 'pharaoh', name: 'VIP-Abenteurer', discount: '30% Rabatt', icon: '𓁠' }
  ] : language === 'pl' ? [
    { value: 'citizen', name: 'Standardowy podróżnik', discount: '15% zniżki', icon: '𓀚' },
    { value: 'scribe', name: 'Zapalony odkrywca', discount: '20% zniżki', icon: '𓁟' },
    { value: 'pharaoh', name: 'Poszukiwacz przygód VIP', discount: '30% zniżki', icon: '𓁠' }
  ] : [
    { value: 'citizen', name: 'Standard Traveler', discount: '15% Off', icon: '𓀚' },
    { value: 'scribe', name: 'Avid Explorer', discount: '20% Off', icon: '𓁟' },
    { value: 'pharaoh', name: 'VIP Adventurer', discount: '30% Off', icon: '𓁠' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full"
      id="imperial-newsletter-container"
    >
      
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
              {language === 'de' ? 'Sonderangebote & Reisedeals' : language === 'pl' ? 'Oferty specjalne i promocje' : 'Special Offers & Travel Deals'}
            </span>
            <h3 className="font-serif text-xl md:text-2xl font-black text-[#e6c280] uppercase tracking-wide">
              {language === 'de' ? 'Reiserabatte & Neuigkeiten' : language === 'pl' ? 'Zniżki podróżnicze i aktualności' : 'Travel Discount & Updates'}
            </h3>
            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              {language === 'de' ? (
                <>Geben Sie unten Ihre E-Mail-Adresse ein, um den Newsletter zu abonnieren und saisonale Rabatte von bis zu <span className="text-[#d4af37] font-semibold">30% Rabatt</span> auf Tauchausflüge, Wüstensafaris und Nil-Tagestouren freizuschalten.</>
              ) : language === 'pl' ? (
                <>Wpisz swój adres e-mail poniżej, aby zapisać się i odblokować sezonowe rabaty do <span className="text-[#d4af37] font-semibold">30% taniej</span> na wycieczki nurkowe, pustynne safari i jednodniowe wycieczki nad Nil.</>
              ) : (
                <>Enter your email below to subscribe and unlock seasonal discounts up to <span className="text-[#d4af37] font-semibold">30% Off</span> on diving trips, desert safaris, and Nile day tours.</>
              )}
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
                    placeholder={language === 'de' ? "Geben Sie Ihre E-Mail-Adresse ein..." : language === 'pl' ? "Wpisz swój adres e-mail..." : "Enter your email address..."}
                    className="w-full bg-[#1c1611] border border-[#d4af37]/30 rounded-xl py-2.5 pl-10 pr-3 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37] placeholder:text-stone-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#d4af37] to-[#bca03b] hover:from-[#e2be4c] hover:to-[#cca73d] text-stone-950 font-mono text-[10px] uppercase font-bold tracking-widest px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
                >
                  {language === 'de' ? 'Abonnieren' : language === 'pl' ? 'Zapisz się' : 'Subscribe'} <ChevronRight className="w-3 h-3 stroke-[3px]" />
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
                    {language === 'de' ? 'Abonnement bestätigt' : language === 'pl' ? 'Subskrypcja potwierdzona' : 'Subscription Confirmed'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">
                  {language === 'de' ? 'Willkommen bei unserem Newsletter! Ihr aktiver Rabattcode lautet:' : language === 'pl' ? 'Witamy w naszym newsletterze! Twój aktywny kod rabatowy to:' : 'Welcome to our newsletter! Your active discount code is:'}
                </p>
                <div className="flex items-center justify-between bg-black/50 border border-stone-800 rounded-lg p-2 font-mono text-xs text-[#d4af37] select-all">
                  <span className="font-bold tracking-widest">{assignedPromo}</span>
                  <Ticket className="w-3.5 h-3.5 text-stone-600" />
                </div>
                <button 
                  onClick={handleResetSubscription}
                  className="text-[9px] font-mono text-stone-600 hover:text-stone-400 uppercase tracking-widest block mx-auto sm:ml-0 underline cursor-pointer"
                >
                  {language === 'de' ? 'Abbestellen / E-Mail-Adresse ändern' : language === 'pl' ? 'Anuluj subskrypcję / Zmień adres e-mail' : 'Unsubscribe / Change Email Address'}
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
                  {language === 'de' ? 'Reiseinteressen anpassen' : language === 'pl' ? 'Dostosuj swoje zainteresowania' : 'Customize Your Travel Interests'}
                </h3>
                <p className="text-stone-400 text-xs mt-1 font-mono">
                  {language === 'de' ? 'Einstellungen auswählen für:' : language === 'pl' ? 'Wybierz preferencje dla:' : 'Select preferences for:'} <span className="text-[#d4af37]">{email}</span>
                </p>
              </div>

              {/* Scrollable preference questionnaire */}
              <form onSubmit={handleFinalSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                
                {/* 1. Category checkmarks */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block">
                      {language === 'de' ? 'Schritt 1: Wählen Sie Ihre Lieblingsaktivitäten' : language === 'pl' ? 'Krok 1: Wybierz swoje ulubione zajęcia' : 'Step 1: Select Your Favorite Activities'}
                    </label>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      {language === 'de' ? 'An welchen Arten von Reisen und Ausflügen sind Sie interessiert?' : language === 'pl' ? 'Jakimi rodzajami podróży i wycieczek się interesujesz?' : 'Which types of travel and excursions are you interested in?'}
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

                {/* 2. Interactive Profile Level */}
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block">
                      {language === 'de' ? 'Schritt 2: Wählen Sie Ihre Profilebene' : language === 'pl' ? 'Krok 2: Wybierz poziom profilu' : 'Step 2: Choose Your Profile Level'}
                    </label>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      {language === 'de' ? 'Wählen Sie die Art von Reiseangeboten und Neuigkeiten, die Sie interessieren.' : language === 'pl' ? 'Wybierz rodzaj ofert turystycznych i wiadomości, które Cię interesują.' : 'Choose the type of travel offers and news you are interested in.'}
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
                    {language === 'de' ? 'Wir schätzen Ihre Privatsphäre. Wir werden Ihre E-Mail-Adresse niemals weitergeben oder Spam senden. Sie erhalten nur maßgeschneiderte Rabattcodes und saisonale Reiseangebote.' : language === 'pl' ? 'Cenimy Twoją prywatność. Nigdy nie udostępnimy Twojego adresu e-mail ani nie będziemy wysyłać spamu. Otrzymasz tylko spersonalizowane kody rabatowe i sezonowe oferty.' : 'We value your privacy. We will never share your email address or send spam. You will only receive custom discount codes and seasonal travel deals.'}
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
                      {language === 'de' ? 'Einstellungen werden gespeichert...' : language === 'pl' ? 'Zapisywanie preferencji...' : 'Saving Preferences...'}
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4 animate-spin-slow" />
                      {language === 'de' ? 'Reiseeinstellungen speichern' : language === 'pl' ? 'Zapisz preferencje podróży' : 'Save Travel Preferences'}
                    </>
                  )}
                </button>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
