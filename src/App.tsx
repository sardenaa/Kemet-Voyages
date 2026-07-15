import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, ScrollText, CalendarDays, Eye, BookOpen, Anchor, Map, Info } from 'lucide-react';
import { Booking } from './types';
import CartoucheGenerator from './components/CartoucheGenerator';
import ScribeOracle from './components/ScribeOracle';
import ExcursionCatalog from './components/ExcursionCatalog';
import EgyptologyGallery from './components/EgyptologyGallery';
import BookingManager from './components/BookingManager';
import AdminCRM from './components/AdminCRM';
import FooterNewsletter from './components/FooterNewsletter';
import OraclesWisdomFAQ from './components/OraclesWisdomFAQ';
import MobileBottomNav from './components/MobileBottomNav';
import ScarabCelebration from './components/ScarabCelebration';

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('kemet_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [excursions, setExcursions] = useState<any[]>(() => {
    const saved = localStorage.getItem('kemet_excursions');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [celebrationCount, setCelebrationCount] = useState<number>(0);

  const triggerCelebration = () => {
    setCelebrationCount(prev => prev + 1);
  };

  // Scroll listener for parallax background hieroglyphs
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Synchronize excursions dynamically when ratings or offerings are updated
  useEffect(() => {
    const syncExcursions = () => {
      const saved = localStorage.getItem('kemet_excursions');
      if (saved) {
        try {
          setExcursions(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener('kemet_excursions_updated', syncExcursions);
    return () => {
      window.removeEventListener('kemet_excursions_updated', syncExcursions);
    };
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kemet_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Handle adding a new booking from the catalog
  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    triggerCelebration();
  };

  // Handle cancelling/revoking a pending booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleUpdateBookingsList = (updatedList: Booking[]) => {
    setBookings(updatedList);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#100c08] text-stone-200 font-sans selection:bg-[#d4af37]/30 selection:text-white overflow-x-hidden relative" id="app-root">
      
      {/* Scroll-Triggered Parallax Background Hieroglyphs */}
      <div className="absolute inset-y-0 left-0 right-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Left Side Runes */}
        {[
          { glyph: '𓋹', top: '10%', speed: 0.12, size: 'text-8xl', left: '1.5rem' },
          { glyph: '𓅃', top: '25%', speed: -0.15, size: 'text-7xl', left: '2.5rem' },
          { glyph: '𓎬', top: '40%', speed: 0.18, size: 'text-9xl', left: '0.75rem' },
          { glyph: '𓉐', top: '55%', speed: -0.08, size: 'text-6xl', left: '2rem' },
          { glyph: '𓆛', top: '70%', speed: 0.22, size: 'text-8xl', left: '1.5rem' },
          { glyph: '𓃠', top: '85%', speed: -0.12, size: 'text-7xl', left: '2.5rem' },
          { glyph: '𓁠', top: '95%', speed: 0.15, size: 'text-9xl', left: '0.75rem' },
        ].map((item, idx) => (
          <div
            key={`left-rune-${idx}`}
            className={`absolute font-serif text-[#1e1610] select-none pointer-events-none opacity-45 hidden xl:block transition-transform duration-75 ease-out ${item.size}`}
            style={{
              top: item.top,
              left: item.left,
              transform: `translateY(${scrollY * item.speed}px)`,
            }}
          >
            {item.glyph}
          </div>
        ))}

        {/* Right Side Runes */}
        {[
          { glyph: '𓆗', top: '12%', speed: -0.14, size: 'text-7xl', right: '1.5rem' },
          { glyph: '𓁠', top: '28%', speed: 0.16, size: 'text-9xl', right: '2.5rem' },
          { glyph: '𓆣', top: '43%', speed: -0.2, size: 'text-8xl', right: '0.75rem' },
          { glyph: '𓊟', top: '58%', speed: 0.1, size: 'text-7xl', right: '2rem' },
          { glyph: '𓂀', top: '73%', speed: -0.25, size: 'text-9xl', right: '1.5rem' },
          { glyph: '𓎡', top: '88%', speed: 0.14, size: 'text-6xl', right: '2.5rem' },
          { glyph: '𓋹', top: '97%', speed: -0.1, size: 'text-8xl', right: '0.75rem' },
        ].map((item, idx) => (
          <div
            key={`right-rune-${idx}`}
            className={`absolute font-serif text-[#1e1610] select-none pointer-events-none opacity-45 hidden xl:block transition-transform duration-75 ease-out ${item.size}`}
            style={{
              top: item.top,
              right: item.right,
              transform: `translateY(${scrollY * item.speed}px)`,
            }}
          >
            {item.glyph}
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative">
        
        {/* HERO BANNER SECTION */}
        <header className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b-4 border-[#d4af37] shadow-[0_15px_30px_rgba(212,175,55,0.08)]">
          
          {/* Hero Image Background */}
          <div className="absolute inset-0">
            <img
              src="/src/assets/images/egypt_red_sea_hero_1784070351173.jpg"
              alt="Ancient Egypt Red Sea Coast"
              className="w-full h-full object-cover object-bottom scale-100"
              referrerPolicy="no-referrer"
            />
            {/* Dark, glowing gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#100c08]/60 via-[#100c08]/30 to-[#100c08] z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#100c08] via-transparent to-[#100c08] opacity-80 z-0"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center gap-2 bg-[#140f0c]/90 border border-[#d4af37]/45 rounded-full px-5 py-1.5 shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-md"
            >
              <Sparkles className="text-[#d4af37] w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e6c280]">
                By Royal Decree of Kemet
              </span>
              <Sparkles className="text-[#d4af37] w-4 h-4 animate-pulse" />
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="font-serif text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#fbf5e6] via-[#d4af37] to-[#8e6b12] uppercase tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-none"
              >
                Pharaoh Voyages
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="font-serif text-lg md:text-2xl text-[#e6c280]/80 tracking-widest uppercase drop-shadow-md"
              >
                Red Sea & Desert Expeditions
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-stone-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans drop-shadow"
            >
              Traverse the crystal sea reefs of Nun, conquer the high dunes of Set, and journey into the ancient tomb sanctuaries of Luxor with the wise counsel of the Pharaoh's Scribe.
            </motion.p>

            {/* Quick action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center pt-4"
            >
              <button
                onClick={() => scrollToSection('excursions-section')}
                className="bg-gradient-to-r from-[#d4af37] to-[#b08e23] hover:from-[#f3e5c8] hover:to-[#d4af37] text-[#140f0a] font-serif font-black text-sm uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg shadow-[#d4af37]/25 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Explore Expeditions
              </button>
              <button
                onClick={() => scrollToSection('scribe-section')}
                className="bg-[#140f0a]/90 hover:bg-[#201710] border border-[#d4af37]/50 text-[#e6c280] font-serif font-bold text-sm uppercase tracking-widest px-8 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer hover:border-amber-300"
              >
                Consult Royal Scribe
              </button>
            </motion.div>
          </div>

          {/* Golden Bottom Border Corner Accents */}
          <div className="absolute bottom-4 left-4 text-[#d4af37] font-serif text-sm select-none pointer-events-none opacity-40">𓋹 𓎬</div>
          <div className="absolute bottom-4 right-4 text-[#d4af37] font-serif text-sm select-none pointer-events-none opacity-40">𓅃 𓉐</div>
        </header>

        {/* EMBEDDED NAVIGATION BAR */}
        <nav className="sticky top-0 bg-[#140f0c]/90 border-b border-[#d4af37]/25 py-3.5 px-6 z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-[#d4af37] text-2xl font-serif">𓋹</span>
              <span className="font-serif font-bold text-[#e6c280] tracking-widest uppercase text-base">
                KEMET VOYAGES
              </span>
            </div>

            {/* Anchors & Toggle */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs font-mono uppercase tracking-widest">
              {!isAdminMode && [
                { label: '𓆛 Expeditions', target: 'excursions-section' },
                { label: '𓋹 Scribe Oracle', target: 'scribe-section' },
                { label: '𓅓 Galleries', target: 'gallery-section' },
                { label: '𓉐 Cartouche Scribe', target: 'cartouche-section' },
                { label: '𓇚 FAQ Wisdom', target: 'faq-section' },
                { label: '𓎬 Ledger', target: 'ledger-section' }
              ].map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className="text-stone-400 hover:text-[#d4af37] hover:underline underline-offset-4 transition-all duration-300 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all duration-300 cursor-pointer uppercase flex items-center gap-1.5 ${
                  isAdminMode
                    ? 'bg-[#d4af37] text-[#140f0a] border-[#d4af37]'
                    : 'bg-[#241a10]/60 text-[#e6c280] border-[#d4af37]/40 hover:border-[#d4af37]'
                }`}
              >
                {isAdminMode ? '𓀚 Explorer View' : '𓋹 High Priest Console (CRM)'}
              </button>
            </div>
          </div>
        </nav>

        {/* MAIN BODY CONTENTS */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 relative">
          
          {isAdminMode ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 scroll-mt-24"
              id="admin-dashboard-section"
            >
              <div className="flex justify-between items-center bg-[#15110d] border border-[#d4af37]/35 rounded-2xl p-4 mb-2">
                <span className="text-xs font-mono text-[#e6c280] uppercase tracking-wider flex items-center gap-1.5">
                  🛡️ Secure Administrative High Priest Overview Active
                </span>
                <button
                  onClick={() => setIsAdminMode(false)}
                  className="bg-[#2a2016] text-[#e6c280] hover:bg-[#3d2f21] border border-[#d4af37]/40 px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Return to Explorer Mode
                </button>
              </div>

              <AdminCRM
                bookings={bookings}
                onUpdateBookingStatus={handleUpdateBookingStatus}
                onCancelBooking={handleCancelBooking}
                onUpdateBookingsList={handleUpdateBookingsList}
              />
            </motion.div>
          ) : (
            <div className="space-y-16">
              {/* SECTION 1: EXCURSIONS CATALOG */}
              <motion.section
                id="excursions-section"
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <ExcursionCatalog onAddBooking={handleAddBooking} excursions={excursions} />
              </motion.section>

              {/* SECTION 2: AI SCRIBE ORACLE */}
              <motion.section
                id="scribe-section"
                className="scroll-mt-24 space-y-8"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-center">
                  <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Artificial Intelligence</span>
                  <h2 className="font-serif text-3xl font-extrabold text-[#e6c280] uppercase mt-1">
                    The Royal Scribe Sennedjem
                  </h2>
                  <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
                    Converse with our Egyptologist scribe or generate an AI-curated itinerary synchronized to the Nile calendar.
                  </p>
                </div>
                <ScribeOracle onScribeSuccess={triggerCelebration} />
              </motion.section>

              {/* SECTION 3: IMMERSIVE GALLERY */}
              <motion.section
                id="gallery-section"
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <EgyptologyGallery />
              </motion.section>

              {/* SECTION 4: HIEROGLYPHIC CARTOUCHE GENERATOR */}
              <motion.section
                id="cartouche-section"
                className="scroll-mt-24 space-y-8"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-center">
                  <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Personal Protection</span>
                  <h2 className="font-serif text-3xl font-extrabold text-[#e6c280] uppercase mt-1">
                    Pharaonic Name Protection
                  </h2>
                  <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
                    Inscribe your title into authentic-inspired stone glyphs inside an oval golden cartouche.
                  </p>
                </div>
                <CartoucheGenerator />
              </motion.section>

              {/* SECTION 5: ORACLE'S WISDOM FAQ */}
              <motion.section
                id="faq-section"
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <OraclesWisdomFAQ />
              </motion.section>

              {/* SECTION 6: BOOKING LEDGER & REVIEWS */}
              <motion.section
                id="ledger-section"
                className="scroll-mt-24 space-y-8"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-center">
                  <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Sacred Ledger</span>
                  <h2 className="font-serif text-3xl font-extrabold text-[#e6c280] uppercase mt-1">
                    Expedition Ledger & Testimonials
                  </h2>
                  <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
                    Inspect active caravans pending confirmation, or review the testimonies of historical travelers.
                  </p>
                </div>
                <BookingManager bookings={bookings} excursions={excursions} onCancelBooking={handleCancelBooking} />
              </motion.section>

              {/* SYSTEM INFO OR NOTIFICATION */}
              <motion.section
                className="bg-[#19130e] border border-[#d4af37]/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center max-w-4xl mx-auto shadow-md"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-[#d4af37]/10 p-3 rounded-full border border-[#d4af37]/30">
                  <Info className="text-[#d4af37] w-6 h-6" />
                </div>
                <div className="space-y-1 text-center md:text-left flex-1">
                  <h4 className="font-serif text-[#e6c280] font-bold text-sm uppercase tracking-wider">
                    Note on AI Customizations & Secrets
                  </h4>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    By default, this application utilizes full-stack server-side routes to proxy your requests with Gemini safely. If you do not see custom AI answers from Sennedjem, make sure you have loaded your <span className="text-[#d4af37] font-semibold">GEMINI_API_KEY</span> inside the **Settings &gt; Secrets** panel.
                  </p>
                </div>
              </motion.section>
            </div>
          )}

        </main>

        {/* IMPERIAL NEWSLETTER SIGNUP BANNER */}
        <section className="px-6 pb-12 w-full">
          <FooterNewsletter />
        </section>

        {/* MAIN FOOTER */}
        <footer className="bg-[#0b0806] border-t-4 border-[#d4af37] py-12 px-6 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex justify-center items-center gap-2">
            <span className="text-[#d4af37] text-2xl font-serif">𓋹</span>
            <span className="font-serif font-black text-xl text-[#e6c280] tracking-widest uppercase">
              KEMET PHARAOH VOYAGES
            </span>
            <span className="text-[#d4af37] text-2xl font-serif">𓋹</span>
          </div>

          <p className="text-stone-500 text-xs max-w-md mx-auto leading-relaxed">
            Crafted for premium desert explorers, deep-sea divers, and lovers of ancient Egyptian history. May Ra make his face shine upon your voyages!
          </p>

          {/* Ancient seals icons */}
          <div className="flex justify-center gap-6 text-[#d4af37] text-3xl opacity-50 select-none">
            <span>𓋹</span>
            <span>𓎬</span>
            <span>𓅃</span>
            <span>𓉐</span>
            <span>𓆛</span>
          </div>

          <div className="pt-4 border-t border-stone-900/60 text-stone-600 text-[10px] font-mono uppercase tracking-widest">
            © 2026 Kemet Voyages, Inc. • Licensed under the Scribes of Luxor
          </div>
        </footer>

        {/* ERGONOMIC MOBILE BOTTOM NAVIGATION DRAWER */}
        <MobileBottomNav
          scrollToSection={scrollToSection}
          isAdminMode={isAdminMode}
          setIsAdminMode={setIsAdminMode}
        />

        {/* Golden Scarab Particle Celebration Overlay */}
        <ScarabCelebration triggerCount={celebrationCount} />

      </div>
    </div>
  );
}
