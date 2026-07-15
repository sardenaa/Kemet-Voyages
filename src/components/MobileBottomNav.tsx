import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, HelpCircle, FileText, Menu, X, Sparkles, Image, MessageSquare, ShieldAlert, Award, Sun, Moon } from 'lucide-react';

interface MobileBottomNavProps {
  scrollToSection: (id: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  theme: 'desert' | 'nile';
  setTheme: (theme: 'desert' | 'nile') => void;
}

export default function MobileBottomNav({ scrollToSection, isAdminMode, setIsAdminMode, theme, setTheme }: MobileBottomNavProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavClick = (targetId: string) => {
    scrollToSection(targetId);
    setIsDrawerOpen(false);
  };

  const handleAdminToggle = () => {
    setIsAdminMode(!isAdminMode);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* 1. BOTTOM FIXED TAB BAR (Visible on mobile/tablet screens only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#140f0c]/95 border-t border-[#d4af37]/35 backdrop-blur-lg px-4 py-2.5 flex justify-around items-center md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.8)] pb-safe no-print">
        
        {/* Expeditions button */}
        <button
          onClick={() => handleNavClick('excursions-section')}
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#d4af37] active:text-[#d4af37] transition-all cursor-pointer flex-1"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-widest font-medium">Expeditions</span>
        </button>

        {/* FAQ button */}
        <button
          onClick={() => handleNavClick('faq-section')}
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#d4af37] active:text-[#d4af37] transition-all cursor-pointer flex-1"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-widest font-medium">FAQs</span>
        </button>

        {/* Ledger button */}
        <button
          onClick={() => handleNavClick('ledger-section')}
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#d4af37] active:text-[#d4af37] transition-all cursor-pointer flex-1"
        >
          <FileText className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-widest font-medium">Bookings</span>
        </button>

        {/* More/Drawer Trigger button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-[#d4af37] hover:text-amber-300 transition-all cursor-pointer flex-1 relative"
        >
          <div className="absolute -top-1 right-8 w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
          <Menu className="w-5 h-5" />
          <span className="text-[9px] font-mono uppercase tracking-widest font-bold">Menu</span>
        </button>

      </div>

      {/* Padding helper to prevent content overlap with bottom tab bar on mobile */}
      <div className="h-20 block md:hidden no-print" />

      {/* 2. SLIDE-UP BOTTOM DRAWER & BACKDROP OVERLAY */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm md:hidden no-print"
            />

            {/* Bottom Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#16110d] border-t-2 border-[#d4af37] rounded-t-3xl shadow-[0_-15px_40px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-y-auto px-6 pt-5 pb-8 flex flex-col space-y-6 md:hidden no-print"
            >
              
              {/* Drag line visual indicator */}
              <div className="w-12 h-1.5 bg-stone-800 rounded-full mx-auto" />

              {/* Drawer Header */}
                <div className="flex justify-between items-center border-b border-stone-800/85 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#d4af37] text-xl font-serif">𓋹</span>
                  <h4 className="font-serif text-lg font-bold text-[#e6c280] uppercase tracking-wider">
                    Travel Directory
                  </h4>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-stone-400 hover:text-stone-200 p-1.5 bg-stone-900 rounded-full cursor-pointer transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Options List */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* 1. Expeditions */}
                <button
                  onClick={() => handleNavClick('excursions-section')}
                  className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-[#1c1510] border border-[#d4af37]/15 hover:border-[#d4af37]/45 text-left transition-all cursor-pointer"
                >
                  <Compass className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-xs font-bold text-[#e6c280] uppercase">Expeditions</span>
                  <span className="text-[9px] font-sans text-stone-500">Traverse deep Sea & Dunes</span>
                </button>

                {/* 2. Scribe Oracle */}
                <button
                  onClick={() => handleNavClick('scribe-section')}
                  className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-[#1c1510] border border-[#d4af37]/15 hover:border-[#d4af37]/45 text-left transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-xs font-bold text-[#e6c280] uppercase">AI Assistant</span>
                  <span className="text-[9px] font-sans text-stone-500">Chat with Sennedjem</span>
                </button>

                {/* 3. Immersive Galleries */}
                <button
                  onClick={() => handleNavClick('gallery-section')}
                  className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-[#1c1510] border border-[#d4af37]/15 hover:border-[#d4af37]/45 text-left transition-all cursor-pointer"
                >
                  <Image className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-xs font-bold text-[#e6c280] uppercase">Galleries</span>
                  <span className="text-[9px] font-sans text-stone-500">Visual Egyptology guide</span>
                </button>

                {/* 4. Cartouche Scribe */}
                <button
                  onClick={() => handleNavClick('cartouche-section')}
                  className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-[#1c1510] border border-[#d4af37]/15 hover:border-[#d4af37]/45 text-left transition-all cursor-pointer"
                >
                  <Award className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-xs font-bold text-[#e6c280] uppercase">Cartouche</span>
                  <span className="text-[9px] font-sans text-stone-500">Write your name in hieroglyphs</span>
                </button>

                {/* 5. FAQ Wisdom */}
                <button
                  onClick={() => handleNavClick('faq-section')}
                  className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-[#1c1510] border border-[#d4af37]/15 hover:border-[#d4af37]/45 text-left transition-all cursor-pointer"
                >
                  <HelpCircle className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-xs font-bold text-[#e6c280] uppercase">Help & FAQs</span>
                  <span className="text-[9px] font-sans text-stone-500">Gear, seasons, & health tips</span>
                </button>

                {/* 6. Ledger ledger */}
                <button
                  onClick={() => handleNavClick('ledger-section')}
                  className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-[#1c1510] border border-[#d4af37]/15 hover:border-[#d4af37]/45 text-left transition-all cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif text-xs font-bold text-[#e6c280] uppercase">My Bookings</span>
                  <span className="text-[9px] font-sans text-stone-500">View trip statuses & details</span>
                </button>

              </div>

              {/* Theme Toggle (Mobile Drawer) */}
              <div className="pt-2">
                <button
                  onClick={() => setTheme(theme === 'desert' ? 'nile' : 'desert')}
                  className="w-full py-3.5 px-4 rounded-xl border font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 bg-[#241a10]/60 text-[#e6c280] border-[#d4af37]/35 hover:border-[#d4af37]"
                >
                  {theme === 'desert' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Desert Sun Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-sky-400" />
                      <span>Nile Midnight Theme</span>
                    </>
                  )}
                </button>
              </div>

              {/* Admin Portal Toggle (High Priest CRM console) */}
              <div className="pt-2 border-t border-stone-800/85">
                <button
                  onClick={handleAdminToggle}
                  className="w-full py-3.5 px-4 rounded-xl border font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 bg-[#d4af37]/10 text-[#e6c280] border-[#d4af37]/35 hover:bg-[#d4af37]/20"
                >
                  <ShieldAlert className="w-4 h-4 text-[#d4af37]" />
                  <span>
                    {isAdminMode ? '𓀚 Exit Manager Mode' : '𓋹 Manager Console (CRM)'}
                  </span>
                </button>
              </div>

              {/* Small lore quote in drawer footer */}
              <div className="text-center pt-2">
                <p className="text-[10px] font-mono text-stone-600 italic">
                  Have a wonderful journey through Egypt!
                </p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
