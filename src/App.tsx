import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, ScrollText, CalendarDays, Eye, BookOpen, Anchor, Map, Info, Sun, Moon } from 'lucide-react';
import { Booking } from './types';
import CartoucheGenerator from './components/CartoucheGenerator';
import ScribeOracle from './components/ScribeOracle';
import ExcursionCatalog, { EXCURSIONS_DATA } from './components/ExcursionCatalog';
import EgyptologyGallery from './components/EgyptologyGallery';
import BookingManager from './components/BookingManager';
import AdminDashboard from './components/AdminDashboard';
import FooterNewsletter from './components/FooterNewsletter';
import OraclesWisdomFAQ from './components/OraclesWisdomFAQ';
import MobileBottomNav from './components/MobileBottomNav';
import ScarabCelebration from './components/ScarabCelebration';
import PapyrusScrollCelebration from './components/PapyrusScrollCelebration';

export default function App() {
  const [theme, setTheme] = useState<'desert' | 'nile'>(() => {
    return (localStorage.getItem('kemet_theme') as 'desert' | 'nile') || 'desert';
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('kemet_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kemet_theme', theme);
  }, [theme]);

  const [excursions, setExcursions] = useState<any[]>(() => {
    const saved = localStorage.getItem('kemet_excursions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore fallback
      }
    }
    return EXCURSIONS_DATA;
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [activeStage, setActiveStage] = useState<'browsing' | 'itinerary' | 'finalizing'>('browsing');
  const [isAdminVerified, setIsAdminVerified] = useState<boolean>(() => {
    return localStorage.getItem('kemet_admin_verified') === 'true';
  });

  // Sync with secure server database on mount and when admin status changes
  useEffect(() => {
    const syncData = async () => {
      try {
        const resEx = await fetch('/api/excursions');
        if (resEx.ok) {
          const exData = await resEx.json();
          setExcursions(exData);
          localStorage.setItem('kemet_excursions', JSON.stringify(exData));
          window.dispatchEvent(new Event('kemet_excursions_updated'));
        }
      } catch (err) {
        console.error("Failed to load excursions from sacred server registry:", err);
      }

      if (isAdminVerified) {
        const passcode = localStorage.getItem('kemet_admin_passcode') || 'pharaoh';
        try {
          const resBk = await fetch('/api/bookings', {
            headers: {
              'x-admin-passcode': passcode
            }
          });
          if (resBk.ok) {
            const bkData = await resBk.json();
            setBookings(bkData);
            localStorage.setItem('kemet_bookings', JSON.stringify(bkData));
          }
        } catch (err) {
          console.error("Failed to load bookings ledger from server:", err);
        }
      }
    };
    syncData();
  }, [isAdminVerified]);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string>('');
  const [scrollY, setScrollY] = useState<number>(0);
  const [celebrationCount, setCelebrationCount] = useState<number>(0);
  const [newlyCreatedBooking, setNewlyCreatedBooking] = useState<Booking | null>(null);

  // Scroll listener to update the active stage in progress tracker
  useEffect(() => {
    if (isAdminMode) return;

    const handleScrollStage = () => {
      const sections = [
        { id: 'excursions-section', stage: 'browsing' as const },
        { id: 'gallery-section', stage: 'browsing' as const },
        { id: 'scribe-section', stage: 'itinerary' as const },
        { id: 'cartouche-section', stage: 'itinerary' as const },
        { id: 'faq-section', stage: 'itinerary' as const },
        { id: 'ledger-section', stage: 'finalizing' as const }
      ];

      let closestStage: 'browsing' | 'itinerary' | 'finalizing' = 'browsing';
      let minDistance = Infinity;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Distance from top-middle viewport focus line
          const distance = Math.abs(rect.top - 150);
          if (distance < minDistance) {
            minDistance = distance;
            closestStage = section.stage;
          }
        }
      }

      // If at the very top of page (Hero section)
      if (window.scrollY < 200) {
        closestStage = 'browsing';
      }

      // If scrolled near bottom
      const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 150);
      if (isNearBottom) {
        closestStage = 'finalizing';
      }

      setActiveStage(closestStage);
    };

    window.addEventListener('scroll', handleScrollStage, { passive: true });
    // Run once immediately
    handleScrollStage();

    return () => {
      window.removeEventListener('scroll', handleScrollStage);
    };
  }, [isAdminMode]);

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

  // Global celebrate event listener
  useEffect(() => {
    const handleCelebrate = () => {
      triggerCelebration();
    };
    window.addEventListener('kemet_celebrate', handleCelebrate);
    return () => {
      window.removeEventListener('kemet_celebrate', handleCelebrate);
    };
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kemet_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Handle adding a new booking from the catalog
  const handleAddBooking = async (newBooking: Booking) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (response.ok) {
        const savedBooking = await response.json();
        setBookings(prev => [savedBooking, ...prev]);
        setNewlyCreatedBooking(savedBooking);
        triggerCelebration();
      } else {
        const errData = await response.json();
        console.error(errData.error || "Failed to submit booking to server.");
        // Fallback to local memory
        setBookings(prev => [newBooking, ...prev]);
        setNewlyCreatedBooking(newBooking);
        triggerCelebration();
      }
    } catch (err) {
      console.error("Error creating booking:", err);
      setBookings(prev => [newBooking, ...prev]);
      setNewlyCreatedBooking(newBooking);
      triggerCelebration();
    }
  };

  // Handle cancelling/revoking a pending booking
  const handleCancelBooking = async (bookingId: string) => {
    const passcode = localStorage.getItem('kemet_admin_passcode') || 'pharaoh';
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode }
      });
      if (response.ok) {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
      } else {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
      }
    } catch (err) {
      console.error("Failed to cancel booking on server:", err);
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    const passcode = localStorage.getItem('kemet_admin_passcode') || 'pharaoh';
    try {
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      } else {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      }
    } catch (err) {
      console.error("Failed to update booking status on server:", err);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    }
  };

  const handleUpdateBookingsList = (updatedList: Booking[]) => {
    setBookings(updatedList);
  };

  const handleVerifyCheckIn = async (bookingId: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}/checkin`, {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.bookings) {
          setBookings(data.bookings);
        } else {
          setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Completed', checkedIn: true } : b));
        }
      } else {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Completed', checkedIn: true } : b));
      }
    } catch (err) {
      console.error("Failed to sync check-in with server, checking in locally:", err);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Completed', checkedIn: true } : b));
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#100c08] text-stone-200 font-sans selection:bg-[#d4af37]/30 selection:text-white overflow-x-hidden relative ${theme === 'nile' ? 'theme-nile' : 'theme-desert'}`} id="app-root">
      
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
              src={theme === 'nile' ? "/src/assets/images/nile_midnight_bg_1784129212752.jpg" : "/src/assets/images/egypt_red_sea_hero_1784070351173.jpg"}
              alt={theme === 'nile' ? "Nile River Midnight View" : "Ancient Egypt Red Sea Coast"}
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
                Experience Ancient Egypt
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
              Explore world-class Red Sea coral reefs, experience desert quad and camel safaris, and discover the historic temples and tombs of Luxor with our personalized travel planner.
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
                Explore Tours
              </button>
              <button
                onClick={() => scrollToSection('scribe-section')}
                className="bg-[#140f0a]/90 hover:bg-[#201710] border border-[#d4af37]/50 text-[#e6c280] font-serif font-bold text-sm uppercase tracking-widest px-8 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer hover:border-amber-300"
              >
                Chat with AI Assistant
              </button>
            </motion.div>
          </div>

          {/* Golden Bottom Border Corner Accents */}
          <div className="absolute bottom-4 left-4 text-[#d4af37] font-serif text-sm select-none pointer-events-none opacity-40">𓋹 𓎬</div>
          <div className="absolute bottom-4 right-4 text-[#d4af37] font-serif text-sm select-none pointer-events-none opacity-40">𓅃 𓉐</div>
        </header>

        {/* EMBEDDED NAVIGATION BAR */}
        <nav className="sticky top-0 bg-[#140f0c]/90 border-b border-[#d4af37]/25 py-3.5 px-6 z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto space-y-3.5">
            {/* Main Nav Actions */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              
              {/* Logo */}
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className="text-[#d4af37] text-2xl font-serif">𓋹</span>
                <span className="font-serif font-bold text-[#e6c280] tracking-widest uppercase text-base">
                  KEMET VOYAGES
                </span>
              </div>

              {/* Anchors & Toggle */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5 text-xs font-mono uppercase tracking-widest">
                {!isAdminMode && [
                  { label: '𓆛 Tours & Excursions', target: 'excursions-section' },
                  { label: '𓋹 AI Travel Planner', target: 'scribe-section' },
                  { label: '𓅓 Photo Gallery', target: 'gallery-section' },
                  { label: '𓉐 Name Translator', target: 'cartouche-section' },
                  { label: '𓇚 Questions & Answers', target: 'faq-section' },
                  { label: '𓎬 My Bookings', target: 'ledger-section' }
                ].map((item) => (
                  <button
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                    className="text-stone-400 hover:text-[#d4af37] hover:underline underline-offset-4 transition-all duration-300 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Theme Toggle Button */}
                <button
                  onClick={() => setTheme(theme === 'desert' ? 'nile' : 'desert')}
                  className="px-3 py-1.5 rounded-lg border font-mono font-bold transition-all duration-300 cursor-pointer uppercase flex items-center gap-1.5 bg-[#241a10]/60 text-[#e6c280] border-[#d4af37]/40 hover:border-[#d4af37]"
                  title={theme === 'desert' ? "Switch to Nile Midnight" : "Switch to Desert Sun"}
                >
                  {theme === 'desert' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Desert Sun</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-sky-400" />
                      <span>Nile Midnight</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`px-3 py-1.5 rounded-lg border font-bold transition-all duration-300 cursor-pointer uppercase flex items-center gap-1.5 ${
                    isAdminMode
                      ? 'bg-[#d4af37] text-[#140f0a] border-[#d4af37]'
                      : 'bg-[#241a10]/60 text-[#e6c280] border-[#d4af37]/40 hover:border-[#d4af37]'
                  }`}
                >
                  {isAdminMode ? '𓀚 Traveler View' : '𓋹 Admin Dashboard'}
                </button>
              </div>
            </div>

            {/* Stage Progress Tracker */}
            <div className={`pt-3 border-t border-[#d4af37]/10 flex-col items-center justify-center admin-stage-tracker ${isAdminMode ? 'flex' : 'hidden'}`}>
              <div className="flex items-center gap-2 mb-3 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-[0.25em]">
                  𓂀 Real-Time Active Traveler Stage Monitor 𓋹
                </span>
              </div>
              
              <div className="w-full max-w-xl flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] relative py-1">
                {/* Progress Line Background */}
                <div className="absolute top-[14px] left-[30px] right-[30px] h-[1.5px] bg-stone-800/80 z-0"></div>
                {/* Active Progress Line */}
                <div 
                  className="absolute top-[14px] left-[30px] h-[1.5px] bg-[#d4af37] z-0 transition-all duration-500 ease-in-out"
                  style={{
                    width: activeStage === 'browsing' ? '0%' : activeStage === 'itinerary' ? '50%' : '100%'
                  }}
                ></div>

                {/* Steps */}
                {[
                  { id: 'browsing', label: 'Browsing Tours', glyph: '𓆛', target: 'excursions-section', baseUsers: 4 },
                  { id: 'itinerary', label: 'Building Itinerary', glyph: '𓋹', target: 'scribe-section', baseUsers: 2 },
                  { id: 'finalizing', label: 'Finalizing Bookings', glyph: '𓎬', target: 'ledger-section', baseUsers: 1 }
                ].map((step, idx) => {
                  const isCompleted = 
                    (activeStage === 'itinerary' && idx === 0) ||
                    (activeStage === 'finalizing' && (idx === 0 || idx === 1));
                  const isActive = activeStage === step.id;

                  // Active users counts: simulated base + 1 if the current visitor (admin simulating) is on this section
                  const currentCount = step.baseUsers + (isActive ? 1 : 0);

                  return (
                    <button
                      key={step.id}
                      onClick={() => scrollToSection(step.target)}
                      className="relative z-10 flex flex-col items-center group focus:outline-none cursor-pointer"
                      title={`Go to ${step.label}`}
                    >
                      {/* Step Bubble */}
                      <div 
                        className={`w-7 h-7 rounded-full flex items-center justify-center border font-serif text-xs transition-all duration-500 ${
                          isActive 
                            ? 'bg-[#d4af37] text-[#140f0a] border-[#d4af37] scale-110 shadow-md shadow-[#d4af37]/35' 
                            : isCompleted
                              ? 'bg-[#241a10] text-[#d4af37] border-[#d4af37]'
                              : 'bg-[#140f0c] text-stone-500 border-stone-800/80 hover:border-stone-600'
                        }`}
                      >
                        {step.glyph}
                      </div>
                      
                      {/* Step Label */}
                      <span 
                        className={`mt-1.5 text-[8.5px] font-bold tracking-wider transition-all duration-300 ${
                          isActive 
                            ? 'text-[#e6c280]' 
                            : isCompleted 
                              ? 'text-[#d4af37]/80' 
                              : 'text-stone-500 group-hover:text-stone-400'
                        }`}
                      >
                        {step.label}
                      </span>

                      {/* Active Users Tag */}
                      <span className={`mt-1 px-1.5 py-0.5 rounded-md text-[7px] font-mono tracking-normal font-bold border transition-all duration-300 ${
                        isActive
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)]'
                          : 'bg-stone-900/40 text-stone-500 border-stone-800/60'
                      }`}>
                        {currentCount} Active {isActive && '• Current'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* MAIN BODY CONTENTS */}
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 relative">
          
          {isAdminMode ? (
            !isAdminVerified ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto bg-[#14100c] border border-[#d4af37]/40 rounded-2xl p-8 space-y-6 text-center shadow-2xl relative overflow-hidden my-12"
              >
                {/* Background ambient glow */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#8e6b12] p-4 rounded-full border border-[#d4af37]/30 shadow-lg animate-pulse">
                    <span className="text-[#140f0a] font-serif text-3xl">𓀚</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.25em] block">Restricted Area</span>
                  <h3 className="font-serif text-2xl font-black text-[#e6c280] uppercase tracking-wide">
                    Admin Dashboard Access
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    Access is restricted to authorized travel administrators. Please enter the admin passcode to view the dashboard.
                  </p>
                </div>

                 <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const response = await fetch('/api/admin/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ passcode: passcodeInput })
                      });
                      const data = await response.json();
                      if (response.ok && data.success) {
                        setIsAdminVerified(true);
                        localStorage.setItem('kemet_admin_verified', 'true');
                        localStorage.setItem('kemet_admin_passcode', passcodeInput.trim());
                        setPasscodeError('');
                        setPasscodeInput('');
                        triggerCelebration(); // Celebrate!
                      } else {
                        setPasscodeError(data.error || 'Incorrect passcode. Please try again.');
                      }
                    } catch (err) {
                      setPasscodeError('Divine verification server is offline. Please try again.');
                    }
                  }}
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mb-1">Enter Admin Passcode</label>
                    <input
                      type="password"
                      placeholder="e.g. pharaoh"
                      value={passcodeInput}
                      onChange={(e) => setPasscodeInput(e.target.value)}
                      className="w-full bg-[#1c1611] border border-stone-800 rounded-xl px-4 py-3 text-xs text-stone-200 font-mono text-center focus:outline-none focus:border-[#d4af37]/60 shadow-inner"
                    />
                    {passcodeError && (
                      <p className="text-red-400 text-[10px] font-mono mt-1.5 text-center italic">{passcodeError}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAdminMode(false)}
                      className="flex-1 bg-[#1a1511] hover:bg-stone-900 border border-stone-800 text-stone-400 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#b59228] hover:from-[#e3be44] hover:to-[#cfa72d] text-[#140f0a] font-bold py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-colors shadow-md cursor-pointer"
                    >
                      Verify Admin
                    </button>
                  </div>
                </form>

                <p className="text-[9px] text-stone-600 font-mono italic">
                  Hint: pharaoh
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 scroll-mt-24"
                id="admin-dashboard-section"
              >
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#15110d] border border-[#d4af37]/35 rounded-2xl p-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#d4af37] text-lg">𓀚</span>
                    <span className="text-xs font-mono text-[#e6c280] uppercase tracking-wider">
                      Administrative Clearance Level: High Priest Active
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsAdminVerified(false);
                        localStorage.removeItem('kemet_admin_verified');
                        triggerCelebration();
                      }}
                      className="bg-red-950/40 text-red-400 hover:bg-red-900/20 border border-red-500/20 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                      title="Lock dashboard control credentials"
                    >
                      Lock Sanctuary
                    </button>
                    <button
                      onClick={() => setIsAdminMode(false)}
                      className="bg-[#2a2016] text-[#e6c280] hover:bg-[#3d2f21] border border-[#d4af37]/40 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Return to Explorer Mode
                    </button>
                  </div>
                </div>

                <AdminDashboard
                  bookings={bookings}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                  onCancelBooking={handleCancelBooking}
                  onUpdateBookingsList={handleUpdateBookingsList}
                />
              </motion.div>
            )
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
                    AI Travel Guide & Assistant
                  </h2>
                  <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
                    Ask our AI helper any questions or generate a custom day-by-day travel plan.
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
                  <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Egyptian Cartouche</span>
                  <h2 className="font-serif text-3xl font-extrabold text-[#e6c280] uppercase mt-1">
                    Egyptian Name Translator
                  </h2>
                  <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
                    Translate your name into ancient Egyptian hieroglyphic symbols inside a beautiful protective cartouche.
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
                  <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">My Bookings</span>
                  <h2 className="font-serif text-3xl font-extrabold text-[#e6c280] uppercase mt-1">
                    Your Bookings & Reviews
                  </h2>
                  <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
                    View your pending or confirmed bookings, and read reviews from other travelers.
                  </p>
                </div>
                <BookingManager bookings={bookings} excursions={excursions} onCancelBooking={handleCancelBooking} onVerifyCheckIn={handleVerifyCheckIn} />
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
            Designed for desert explorers, deep-sea divers, and lovers of history. Safe travels and have an amazing trip!
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
            © 2026 Kemet Voyages, Inc. • All Rights Reserved.
          </div>
        </footer>

        {/* ERGONOMIC MOBILE BOTTOM NAVIGATION DRAWER */}
        <MobileBottomNav
          scrollToSection={scrollToSection}
          isAdminMode={isAdminMode}
          setIsAdminMode={setIsAdminMode}
          theme={theme}
          setTheme={setTheme}
        />

        {/* FLOATING WHATSAPP ASSISTANCE WIDGET */}
        <div className="fixed bottom-24 md:bottom-6 right-6 z-40 no-print">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const msg = "𓂀 KEMET PHARAOH VOYAGES 𓂀\n\nGreetings Scribe! I am visiting your temple dashboard and would like to inquire about customized itineraries, booking availability, or special Pharaonic excursions!";
              const url = `https://wa.me/201202181834?text=${encodeURIComponent(msg)}`;
              window.open(url, '_blank') || (window.location.href = url);
            }}
            className="bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] border-2 border-[#d4af37] relative group cursor-pointer"
            title="Instant WhatsApp Consultation"
          >
            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4af37]"></span>
            </span>

            {/* Icon */}
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.006c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>

            {/* Tooltip */}
            <span className="absolute bottom-full right-0 mb-3 scale-0 transition-all rounded bg-stone-900 border border-[#d4af37] px-3 py-1.5 text-[10px] font-mono text-[#e6c280] uppercase tracking-wider whitespace-nowrap group-hover:scale-100 z-50 shadow-2xl">
              𓂀 Chat with High Priest (+201202181834)
            </span>
          </motion.button>
        </div>

        {/* Golden Scarab Particle Celebration Overlay */}
        <ScarabCelebration triggerCount={celebrationCount} />

        {/* Papyrus Scroll Unrolling Celebration Overlay */}
        <AnimatePresence>
          {newlyCreatedBooking && (
            <PapyrusScrollCelebration
              booking={newlyCreatedBooking}
              onClose={() => setNewlyCreatedBooking(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
