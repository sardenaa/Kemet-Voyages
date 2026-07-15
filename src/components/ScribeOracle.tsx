import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Compass, User, Zap, Send, MessageCircle, HelpCircle, Loader2, BookOpen, Printer, X } from 'lucide-react';
import { CustomItinerary, ScribeMessage } from '../types';

interface ScribeOracleProps {
  onScribeSuccess?: () => void;
}

export default function ScribeOracle({ onScribeSuccess }: ScribeOracleProps) {
  // Tabs: 'planner' or 'chat'
  const [activeTab, setActiveTab] = useState<'planner' | 'chat'>('planner');

  // Planner States
  const [duration, setDuration] = useState<number>(4);
  const [interest, setInterest] = useState<string>("Balanced Exploration (Corals, Desert, History)");
  const [intensity, setIntensity] = useState<string>("Balanced (Active exploration + temple relaxation)");
  const [companion, setCompanion] = useState<string>("Couple / Partners");
  const [customReq, setCustomReq] = useState<string>("");
  const [itinerary, setItinerary] = useState<CustomItinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [plannerError, setPlannerError] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  
  // Custom Activity Builder States & Methods
  const [newActivityInputs, setNewActivityInputs] = useState<{[key: number]: string}>({});

  const removeActivity = (dayNumber: number, activityIndex: number) => {
    if (!itinerary) return;
    const updatedDays = itinerary.days.map(day => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: day.activities.filter((_, idx) => idx !== activityIndex)
        };
      }
      return day;
    });
    setItinerary({
      ...itinerary,
      days: updatedDays
    });
  };

  const addActivity = (dayNumber: number, activityText: string) => {
    if (!itinerary || !activityText.trim()) return;
    const updatedDays = itinerary.days.map(day => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: [...day.activities, activityText.trim()]
        };
      }
      return day;
    });
    setItinerary({
      ...itinerary,
      days: updatedDays
    });
  };

  // Chat States
  const [chatMessages, setChatMessages] = useState<ScribeMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hello and welcome! I am your AI Travel Assistant. I can help you plan your journey, answer questions about ancient Egyptian history, or explain the meanings behind hieroglyphic symbols. How can I assist you with your travel plans today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Excursion customizable options
  const interests = [
    "Balanced Exploration (Corals, Desert, History)",
    "Deep-Sea Marine Life & Diving",
    "Adrenaline Desert Safaris & Camel Treks",
    "Pharaonic Temples & Ancient Egyptology (Luxor Tours)"
  ];

  const paces = [
    "Leisurely (Slower-paced, sunset sails & light reef walks)",
    "Balanced (Active exploration + temple relaxation)",
    "Intense (Sunrise dune biking, deep scuba dives, day-long monument treks)"
  ];

  const companions = [
    "Solo Adventurer",
    "Couple / Partners",
    "Royal Family (Kids included)",
    "Band of Explorers (Friends/Group)"
  ];

  // Call the backend to generate custom itinerary
  const generateItinerary = async () => {
    setIsGenerating(true);
    setPlannerError(null);
    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          durationDays: duration,
          interest,
          intensity,
          companion,
          customPreferences: customReq
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to contact the Royal Scribe");
      }

      const data = await response.json();
      setItinerary(data);
      onScribeSuccess?.();
    } catch (err: any) {
      console.warn("Express endpoint failed or unconfigured, utilizing royal scribe fallback: ", err);
      // Fallback elegant customized simulated itinerary based on user inputs
      const simulated: CustomItinerary = generateFallbackItinerary(duration, interest, intensity);
      setItinerary(simulated);
      onScribeSuccess?.();
    } finally {
      setIsGenerating(false);
    }
  };

  // Chat with Scribe Sennedjem
  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const queryText = chatInput;

    const userMsg: ScribeMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    // Save CRM Lead Log
    try {
      const savedLogs = localStorage.getItem('kemet_oracle_chats_logs');
      const currentLogs = savedLogs ? JSON.parse(savedLogs) : [];
      const newLog = {
        id: `log-${Date.now()}`,
        name: "Prospect Noble",
        email: `prospect.${Math.floor(Math.random() * 900) + 100}@traveler.kemet.com`,
        query: queryText,
        time: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
      localStorage.setItem('kemet_oracle_chats_logs', JSON.stringify([newLog, ...currentLogs]));
    } catch (e) {
      console.warn("Could not save inquiry lead", e);
    }

    try {
      // Create simplified history
      const history = chatMessages.slice(-6).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/scribe-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMsg.text,
          chatHistory: history
        })
      });

      if (!response.ok) {
        throw new Error("Scribe is busy consulting Osiris");
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, {
        id: `scribe-${Date.now()}`,
        role: 'assistant',
        text: data.response || "My apologies, the cosmic inkwells of Kemet have run dry for a moment. Ask again, noble voyager.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      onScribeSuccess?.();
    } catch (err) {
      console.warn("Express chat failed, utilizing offline scribe response.");
      // Simulated wise responses
      const reply = getOfflineScribeResponse(userMsg.text);
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: `scribe-${Date.now()}`,
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        onScribeSuccess?.();
      }, 800);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="bg-[#1a140f] border border-[#d4af37]/30 rounded-3xl p-6 md:p-8 shadow-2xl relative" id="scribe-oracle-container">
      {/* Ancient Egyptian Design Borders */}
      <div className="absolute top-4 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"></div>
      <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"></div>

      {/* Tabs Menu */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#241c14] p-1.5 rounded-xl border border-[#d4af37]/25 flex gap-2">
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-serif font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-[#d4af37] text-[#140f0a] shadow-lg shadow-[#d4af37]/20'
                : 'text-[#e6c280]/70 hover:text-[#f3e5c8] hover:bg-[#2e241b]'
            }`}
          >
            <Compass className="w-4 h-4" />
            Itinerary Planner
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-serif font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#d4af37] text-[#140f0a] shadow-lg shadow-[#d4af37]/20'
                : 'text-[#e6c280]/70 hover:text-[#f3e5c8] hover:bg-[#2e241b]'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Chat with AI Assistant
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'planner' ? (
          <motion.div
            key="planner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Custom Travel Plan</span>
              <h2 className="font-serif text-3xl font-extrabold text-[#e6c280] mt-1 uppercase">
                Custom Travel Itinerary Planner
              </h2>
              <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
                Plan your perfect trip by entering your travel details below to receive a personalized day-by-day itinerary.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#211911] p-6 rounded-2xl border border-[#d4af37]/15">
              
              {/* Duration Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-stone-300 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    Trip Duration (Days)
                  </label>
                  <span className="text-[#d4af37] font-mono font-bold text-lg">{duration} Days</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={7}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-[#d4af37] bg-stone-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>3 Days (Short Trip)</span>
                  <span>7 Days (Full Experience)</span>
                </div>
              </div>

              {/* Primary Focus */}
              <div className="space-y-1.5">
                <label className="text-stone-300 text-sm flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#d4af37]" />
                  Primary Focus
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-[#16120e] border border-[#d4af37]/35 rounded-lg p-2.5 text-[#f3e5c8] text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                >
                  {interests.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Pacing */}
              <div className="space-y-1.5">
                <label className="text-stone-300 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#d4af37]" />
                  Pacing
                </label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                  className="w-full bg-[#16120e] border border-[#d4af37]/35 rounded-lg p-2.5 text-[#f3e5c8] text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                >
                  {paces.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Companions */}
              <div className="space-y-1.5">
                <label className="text-stone-300 text-sm flex items-center gap-2">
                  <User className="w-4 h-4 text-[#d4af37]" />
                  Travel Companions
                </label>
                <select
                  value={companion}
                  onChange={(e) => setCompanion(e.target.value)}
                  className="w-full bg-[#16120e] border border-[#d4af37]/35 rounded-lg p-2.5 text-[#f3e5c8] text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                >
                  {companions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Special Requests */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-stone-300 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  Special Requests (Optional)
                </label>
                <textarea
                  value={customReq}
                  onChange={(e) => setCustomReq(e.target.value)}
                  placeholder="E.g., Vegetarian options, specific diving sites, anniversary requests..."
                  rows={2}
                  className="w-full bg-[#16120e] border border-[#d4af37]/30 rounded-lg p-3 text-[#f3e5c8] text-sm focus:outline-none focus:ring-1 focus:ring-[#d4af37] placeholder-stone-600"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={generateItinerary}
                disabled={isGenerating}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#9a7b1c] text-[#140f0a] font-serif font-bold text-base px-10 py-3.5 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] hover:scale-[1.02] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                id="consult-scribe-btn"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#140f0a]" />
                    Generating Travel Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#140f0a] animate-pulse" />
                    Generate My Travel Itinerary
                  </>
                )}
              </button>
            </div>

            {/* Generated Itinerary Display */}
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="itinerary-skeleton"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#faf3e0] border-8 border-double border-[#8b6508] rounded-2xl p-6 md:p-8 text-[#2b1f0d] relative shadow-[0_0_50px_rgba(0,0,0,0.6)] font-sans max-w-4xl mx-auto overflow-hidden mt-8"
                  id="parchment-itinerary-skeleton"
                >
                  {/* Parchment Background Texture Accent */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(139,101,8,0.06)_100%)] pointer-events-none"></div>

                  {/* Golden glowing shimmer effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b6508]/15 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none"></div>

                  <div className="text-center border-b-2 border-[#8b6508]/20 pb-6 mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8b6508] font-bold block animate-pulse">
                      Analyzing Travel Options...
                    </span>
                    <h3 className="font-serif text-2xl font-black text-[#5c4001] tracking-wide mt-2 uppercase">
                      Creating Your Custom Itinerary
                    </h3>
                    
                    {/* Animated Golden Hieroglyphs pulsing in sequence */}
                    <div className="flex justify-center gap-3.5 text-[#8b6508] text-2xl font-serif py-3 mt-1.5">
                      {[
                        { glyph: '𓋹', delay: 0 },
                        { glyph: '𓂀', delay: 0.2 },
                        { glyph: '𓅃', delay: 0.4 },
                        { glyph: '𓏞', delay: 0.6 },
                        { glyph: '𓎬', delay: 0.8 },
                        { glyph: '𓆛', delay: 1.0 },
                        { glyph: '𓊟', delay: 1.2 }
                      ].map((item, index) => (
                        <motion.span
                          key={index}
                          animate={{ 
                            opacity: [0.25, 1, 0.25], 
                            scale: [0.95, 1.15, 0.95],
                            y: [0, -3, 0] 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.6, 
                            delay: item.delay,
                            ease: "easeInOut"
                          }}
                          className="filter drop-shadow-[0_0_4px_rgba(139,101,8,0.35)] select-none"
                        >
                          {item.glyph}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Scribe greeting skeleton */}
                  <motion.div 
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="bg-[#f0e4c6] border-l-4 border-[#8b6508] p-4 rounded-r-lg mb-8 space-y-2.5"
                  >
                    <div className="w-full h-3 bg-[#8b6508]/15 rounded-md" />
                    <div className="w-4/5 h-3 bg-[#8b6508]/15 rounded-md" />
                  </motion.div>

                  {/* 3 Days Timeline Skeleton */}
                  <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#8b6508]/15">
                    {[1, 2, 3].map((dayNum) => (
                      <div key={dayNum} className="relative pl-12">
                        {/* Bullet Circle */}
                        <div className="absolute left-[14px] top-1.5 w-5 h-5 rounded-full border-2 border-[#faf3e0] bg-[#8b6508]/40 shadow-[0_0_8px_rgba(139,101,8,0.25)] flex items-center justify-center text-[10px] font-bold text-[#faf3e0] font-mono animate-pulse">
                          {dayNum}
                        </div>

                        <div className="space-y-3">
                          <motion.div 
                            animate={{ opacity: [0.5, 0.9, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: dayNum * 0.2 }}
                            className="w-1/3 h-5 bg-[#8b6508]/20 rounded-md"
                          />
                          
                          <div className="space-y-2">
                            <motion.div 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ repeat: Infinity, duration: 1.5, delay: dayNum * 0.2 + 0.1 }}
                              className="w-full h-3 bg-[#8b6508]/10 rounded-md"
                            />
                            <motion.div 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ repeat: Infinity, duration: 1.5, delay: dayNum * 0.2 + 0.2 }}
                              className="w-5/6 h-3 bg-[#8b6508]/10 rounded-md"
                            />
                          </div>

                          {/* Scribe Wisdom Box Skeleton */}
                          <div className="mt-3 bg-[#f2e7c9] border border-[#8b6508]/15 rounded-lg p-3 space-y-2">
                            <div className="w-24 h-3 bg-[#8b6508]/25 rounded-md animate-pulse" />
                            <div className="w-11/12 h-2.5 bg-[#8b6508]/10 rounded-md animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Royal Blessing Conclusion Skeleton */}
                  <div className="mt-8 pt-6 border-t-2 border-[#8b6508]/20 text-center space-y-2">
                    <div className="w-1/2 h-3.5 bg-[#8b6508]/15 mx-auto rounded-md animate-pulse" />
                    <div className="mt-4 flex justify-center gap-2 text-[#8b6508]/30 text-2xl select-none animate-pulse">
                      𓋹 𓎬 𓅃
                    </div>
                  </div>
                </motion.div>
              ) : itinerary ? (() => {
                const totalActivities = itinerary.days.reduce((sum, d) => sum + d.activities.length, 0);
                const targetActivities = itinerary.days.length * 3;
                const progressPercent = targetActivities > 0 ? Math.min(100, Math.round((totalActivities / targetActivities) * 100)) : 0;

                return (
                  <motion.div
                    key="itinerary-parchment"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-[#faf3e0] border-8 border-double border-[#8b6508] rounded-2xl p-6 md:p-8 text-[#2b1f0d] relative shadow-[0_0_50px_rgba(0,0,0,0.6)] font-sans max-w-4xl mx-auto overflow-hidden mt-8"
                    id="parchment-itinerary"
                  >
                    {/* Parchment Background Texture Accent */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(139,101,8,0.06)_100%)] pointer-events-none"></div>

                    {/* Actions bar */}
                    <div className="md:absolute md:top-6 md:right-6 mb-6 md:mb-0 flex justify-center z-10">
                      <button
                        onClick={() => setShowPrintModal(true)}
                        className="bg-[#8b6508] hover:bg-[#6e4e03] text-white px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 group/btn border border-yellow-600/30"
                        title="Export Itinerary (PDF)"
                      >
                        <Printer className="w-3.5 h-3.5 text-yellow-200 group-hover/btn:scale-110 transition-transform" />
                        <span>Export Itinerary</span>
                      </button>
                    </div>

                    <div className="text-center border-b-2 border-[#8b6508]/20 pb-6 mb-6 md:pr-48">
                      <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8b6508] font-bold">
                        Your Customized Travel Plan
                      </span>
                      <h3 className="font-serif text-3xl font-black text-[#5c4001] tracking-wide mt-1 uppercase">
                        {itinerary.title}
                      </h3>
                    </div>

                    {/* Voyage Progress Banner */}
                    <div className="bg-[#f3e6c3] border-2 border-dashed border-[#8b6508]/40 rounded-xl p-4 mb-6 shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b6508]/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-2.5">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-[#5c4001] uppercase flex items-center gap-2">
                            <span className="text-[#8b6508] text-base">𓊟</span>
                            Your Travel Manifest
                          </h4>
                          <p className="text-[11px] text-stone-600 mt-0.5">
                            {progressPercent < 35 ? (
                              <span>Add more excursions and activities to complete your itinerary.</span>
                            ) : progressPercent < 75 ? (
                              <span>Your travel itinerary is shaping up nicely!</span>
                            ) : progressPercent < 100 ? (
                              <span>Almost finished! Add a couple more activities to complete your plans.</span>
                            ) : (
                              <span className="text-[#5c4001] font-semibold">Perfect! Your travel itinerary is complete and ready.</span>
                            )}
                          </p>
                        </div>
                        <div className="text-right flex md:flex-col items-baseline md:items-end gap-1.5">
                          <span className="text-xs font-mono font-bold text-[#8b6508] bg-[#faf3e0] px-2 py-0.5 rounded border border-[#8b6508]/20 shadow-sm">
                            {totalActivities} / {targetActivities} Activities
                          </span>
                          <span className="text-xs font-serif font-black text-[#5c4001]">
                            {progressPercent}% Complete
                          </span>
                        </div>
                      </div>

                      {/* Modern Progress Track with Sliding Hieroglyph */}
                      <div className="relative h-4 bg-[#e2d5b2] rounded-full overflow-visible border border-[#8b6508]/20 p-[2px]">
                        {/* Active Fill */}
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#8b6508]/60 via-[#8b6508] to-[#604403] rounded-full shadow-[0_0_8px_rgba(139,101,8,0.35)] relative"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        >
                          {/* Glowing Tip */}
                          {progressPercent > 0 && (
                            <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow-200/50 rounded-r-full filter blur-[1px]"></div>
                          )}
                        </motion.div>

                        {/* Sliding Hieroglyph Walker Icon */}
                        <motion.div 
                          className="absolute top-1/2 -translate-y-1/2 -ml-2 text-base select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] cursor-default"
                          animate={{ left: `${progressPercent}%` }}
                          transition={{ type: "spring", stiffness: 80, damping: 15 }}
                          style={{ pointerEvents: 'none' }}
                        >
                          {progressPercent === 100 ? '𓋹' : progressPercent > 60 ? '𓅃' : '𓀚'}
                        </motion.div>
                      </div>

                      {/* Progress Marks */}
                      <div className="flex justify-between text-[9px] font-mono text-stone-500 mt-1.5 px-1">
                        <span>Short Trip (0%)</span>
                        <span className={`${progressPercent >= 50 ? 'text-[#8b6508] font-bold' : ''}`}>Balanced (50%)</span>
                        <span className={`${progressPercent === 100 ? 'text-[#8b6508] font-bold' : ''}`}>Full Experience (100%)</span>
                      </div>
                    </div>

                    {/* Poetic Greeting */}
                    <div className="bg-[#f0e4c6] border-l-4 border-[#8b6508] p-4 rounded-r-lg mb-8 italic text-stone-800 text-sm leading-relaxed shadow-sm">
                      "{itinerary.royalGreeting}"
                    </div>

                    {/* Days Timeline */}
                    <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#8b6508]/20">
                      {itinerary.days.map((day) => (
                        <div key={day.dayNumber} className="relative pl-12 group/day">
                          {/* Bullet Circle */}
                          <div className="absolute left-[14px] top-1.5 w-5 h-5 rounded-full border-4 border-[#faf3e0] bg-[#8b6508] shadow-[0_0_10px_rgba(139,101,8,0.4)] flex items-center justify-center text-[10px] font-bold text-white font-mono group-hover/day:scale-110 transition-transform">
                            {day.dayNumber}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-serif text-lg font-bold text-[#5c4001] uppercase flex items-center gap-2">
                              Day {day.dayNumber}: {day.theme}
                            </h4>
                            
                            {/* Interactive Activities list */}
                            <ul className="space-y-2 text-stone-700 text-sm">
                              {day.activities.map((act, i) => (
                                <motion.li 
                                  key={i} 
                                  layout
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  className="group/item flex items-start justify-between gap-3 bg-[#faf3e0]/40 hover:bg-[#faf3e0]/90 p-2 rounded-lg border border-transparent hover:border-[#8b6508]/15 transition-all"
                                >
                                  <div className="flex items-start gap-2">
                                    <span className="text-[#8b6508] mt-1 select-none text-xs">𓎬</span>
                                    <span className="leading-relaxed text-stone-800">{act}</span>
                                  </div>
                                  <button
                                    onClick={() => removeActivity(day.dayNumber, i)}
                                    className="text-stone-400 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors opacity-0 group-hover/item:opacity-100 focus:opacity-100 cursor-pointer"
                                    title="Remove this activity"
                                  >
                                    <span className="text-xs font-bold font-mono">✕</span>
                                  </button>
                                </motion.li>
                              ))}
                            </ul>

                            {/* Add Custom Activity Form */}
                            <div className="mt-3 bg-[#fbf8ee]/60 border border-dashed border-[#8b6508]/20 rounded-xl p-2.5">
                              <form 
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  const val = newActivityInputs[day.dayNumber] || "";
                                  if (val.trim()) {
                                    addActivity(day.dayNumber, val);
                                    setNewActivityInputs(prev => ({ ...prev, [day.dayNumber]: "" }));
                                  }
                                }}
                                className="flex gap-2"
                              >
                                <input
                                  type="text"
                                  placeholder="Enter custom activity..."
                                  value={newActivityInputs[day.dayNumber] || ""}
                                  onChange={(e) => setNewActivityInputs(prev => ({ ...prev, [day.dayNumber]: e.target.value }))}
                                  className="flex-1 bg-[#fcfaf4] border border-[#8b6508]/25 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8b6508] placeholder-stone-400"
                                />
                                <button
                                  type="submit"
                                  className="bg-[#8b6508] hover:bg-[#6e4e03] text-white px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer active:scale-95"
                                >
                                  <span>+</span>
                                  <span>Add</span>
                                </button>
                              </form>
                            </div>

                            {/* Scribe Wisdom Box */}
                            <div className="mt-3 bg-[#f2e7c9] border border-[#8b6508]/15 rounded-lg p-3 text-xs text-stone-600 italic">
                              <span className="font-serif font-bold text-[#8b6508] block not-italic mb-1 uppercase tracking-wider">
                                𓋹 Historical & Cultural Tip:
                              </span>
                              {day.scribeWisdom}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Royal Blessing Conclusion */}
                    <div className="mt-8 pt-6 border-t-2 border-[#8b6508]/25 text-center">
                      <p className="text-sm font-serif italic text-stone-800 leading-relaxed">
                        "{itinerary.blessing}"
                      </p>
                      <div className="mt-4 flex justify-center text-[#8b6508] text-4xl select-none">
                        𓋹 𓎬 𓅃
                      </div>
                    </div>
                  </motion.div>
                );
              })() : null}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col h-[550px]"
          >
            <div className="text-center mb-4">
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">AI Chat</span>
              <h2 className="font-serif text-2xl font-bold text-[#e6c280] mt-1 uppercase">
                Chat with AI Travel Guide
              </h2>
            </div>

            {/* Chat Messages area */}
            <div className="flex-1 overflow-y-auto bg-[#16120e] border border-[#d4af37]/20 rounded-2xl p-4 md:p-6 space-y-4 mb-4" id="scribe-chat-chamber">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md relative ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-[#d4af37] to-[#c5a059] text-[#140f0a] rounded-tr-none'
                        : 'bg-[#241c14] border border-[#d4af37]/20 text-stone-200 rounded-tl-none'
                    }`}
                  >
                    {/* Timestamp */}
                    <div className={`text-[9px] font-mono mb-1 ${msg.role === 'user' ? 'text-[#140f0a]/60' : 'text-stone-500'}`}>
                      {msg.role === 'user' ? 'Traveler' : 'Scribe Sennedjem'} • {msg.timestamp}
                    </div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#241c14] border border-[#d4af37]/25 rounded-2xl rounded-tl-none px-5 py-3.5 flex flex-col gap-2.5 max-w-[80%] shadow-lg">
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="text-[#d4af37] text-sm font-serif select-none"
                      >
                        𓋹
                      </motion.div>
                      <span className="italic tracking-wide text-[#e6c280]/95">AI Travel Guide is writing...</span>
                    </div>
                    {/* Floating gold hieroglyphs typing transition */}
                    <div className="flex items-center gap-3 bg-[#1c1611] px-4 py-2 rounded-xl border border-[#d4af37]/10 w-fit">
                      {[
                        { symbol: '𓋹', delay: 0 },
                        { symbol: '𓂀', delay: 0.2 },
                        { symbol: '𓅃', delay: 0.4 },
                        { symbol: '𓏞', delay: 0.6 },
                        { symbol: '𓎬', delay: 0.8 }
                      ].map((item, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0.25, y: 1.5 }}
                          animate={{ 
                            opacity: [0.25, 1, 0.25],
                            y: [1.5, -3, 1.5],
                            scale: [0.95, 1.15, 0.95]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.4,
                            delay: item.delay,
                            ease: "easeInOut"
                          }}
                          className="text-[#d4af37] text-lg font-serif select-none filter drop-shadow-[0_0_3px_rgba(212,175,55,0.45)]"
                        >
                          {item.symbol}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={sendChatMessage} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about historical sites, diving spots, desert safaris, or translating a name..."
                className="flex-1 bg-[#201a14] border border-[#d4af37]/45 rounded-xl py-3 px-4 text-[#f3e5c8] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                id="scribe-chat-input"
              />
              <button
                type="submit"
                className="bg-[#d4af37] text-[#140f0a] px-5 rounded-xl flex items-center justify-center hover:bg-[#c5a059] transition-colors active:scale-95 cursor-pointer font-serif font-bold text-sm gap-2"
                id="scribe-chat-send-btn"
              >
                <Send className="w-4 h-4 text-[#140f0a]" />
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Overlay for Printable Papyrus Scroll */}
      <AnimatePresence>
        {showPrintModal && itinerary && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] overflow-y-auto flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#faf3e0] border-8 border-double border-[#8b6508] rounded-2xl p-6 md:p-10 text-[#2b1f0d] relative shadow-[0_0_60px_rgba(0,0,0,0.85)] max-w-3xl w-full my-8 font-sans overflow-hidden"
            >
              {/* Background Subtle Texture */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(139,101,8,0.06)_100%)] pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={() => setShowPrintModal(false)}
                className="absolute top-4 right-4 text-[#8b6508] hover:text-red-700 hover:bg-stone-200/50 p-2 rounded-full transition-colors cursor-pointer z-20"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Print Utility Helper Banner */}
              <div className="bg-[#f2e7c9] border-l-4 border-[#8b6508] p-4 rounded-r-lg mb-6 shadow-sm">
                <h4 className="font-serif text-sm font-bold text-[#5c4001] uppercase flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-[#8b6508]" />
                  Export & Print Itinerary
                </h4>
                <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                  Your custom travel plan is ready! Click <span className="font-semibold text-[#8b6508]">Print Itinerary</span> to open your browser's print menu. You can choose <span className="font-semibold text-[#8b6508]">Save as PDF</span> to save a digital copy or print it directly.
                </p>
              </div>

              {/* Preview Scroll Content */}
              <div className="border-4 border-double border-[#8b6508]/40 p-4 md:p-6 bg-[#fbf8ee]/70 rounded-xl space-y-6 max-h-[50vh] overflow-y-auto mb-6">
                <div className="text-center border-b-2 border-[#8b6508]/20 pb-4 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8b6508] font-bold block mb-1">
                    Your Customized Travel Plan
                  </span>
                  <h3 className="font-serif text-2xl font-black text-[#5c4001] uppercase">
                    {itinerary.title}
                  </h3>
                </div>

                <p className="italic text-stone-700 text-xs leading-relaxed border-l-2 border-[#8b6508]/30 pl-3">
                  "{itinerary.royalGreeting}"
                </p>

                <div className="space-y-6">
                  {itinerary.days.map((day) => (
                    <div key={day.dayNumber} className="space-y-1.5">
                      <h4 className="font-serif text-sm font-bold text-[#5c4001] uppercase">
                        Day {day.dayNumber}: {day.theme}
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-stone-700 text-xs pl-2">
                        {day.activities.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4 border-t border-[#8b6508]/20">
                  <p className="text-xs font-serif italic text-stone-600">
                    "{itinerary.blessing}"
                  </p>
                </div>
              </div>

              {/* Action button */}
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-4 py-2 border border-[#8b6508]/30 rounded-xl text-xs font-semibold hover:bg-stone-200/50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="bg-[#8b6508] hover:bg-[#6e4e03] text-white px-5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-yellow-600/30"
                >
                  <Printer className="w-4 h-4 text-yellow-200" />
                  <span>Print Itinerary (or Save as PDF)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden high-fidelity printing template */}
      {itinerary && (
        <div id="papyrus-print-area" className="hidden">
          <div className="text-center border-b-4 border-double border-[#8b6508] pb-6 mb-8">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#8b6508] font-bold block mb-2">
              𓋹 Sacred Travel Charter of Sennedjem, Royal Scribe 𓋹
            </span>
            <h1 className="font-serif text-4xl font-black text-[#5c4001] tracking-wide uppercase">
              {itinerary.title}
            </h1>
            <p className="text-xs text-stone-500 italic mt-2 font-serif">
              Inscribed on the Nile Calendar, {new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}
            </p>
          </div>

          <div className="bg-[#f0e4c6]/60 border-l-4 border-[#8b6508] p-5 rounded-r-lg mb-8 italic text-stone-800 text-sm leading-relaxed">
            "{itinerary.royalGreeting}"
          </div>

          <div className="space-y-8">
            {itinerary.days.map((day) => (
              <div key={day.dayNumber} className="print-avoid-break border-b border-[#8b6508]/20 pb-6 last:border-0">
                <h3 className="font-serif text-xl font-bold text-[#5c4001] uppercase flex items-center gap-2 mb-3">
                  <span className="text-[#8b6508]">Day {day.dayNumber}:</span> {day.theme}
                </h3>
                
                <ul className="space-y-2 text-stone-800 text-sm pl-4 list-disc mb-4">
                  {day.activities.map((act, i) => (
                    <li key={i} className="leading-relaxed pl-1">{act}</li>
                  ))}
                </ul>

                <div className="bg-[#f2e7c9] border border-[#8b6508]/20 rounded-lg p-4 text-xs text-stone-700 italic">
                  <span className="font-serif font-bold text-[#8b6508] block not-italic mb-1 uppercase tracking-wider">
                    𓋹 Scribe's Ancient Wisdom:
                  </span>
                  {day.scribeWisdom}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t-4 border-double border-[#8b6508] text-center">
            <p className="text-base font-serif italic text-stone-800 leading-relaxed max-w-xl mx-auto">
              "{itinerary.blessing}"
            </p>
            <div className="mt-6 text-[#8b6508] text-4xl select-none tracking-widest">
              𓋹 𓎬 𓅃 𓊟 𓂀
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Generate fallback itinerary in case Gemini key isn't provided
function generateFallbackItinerary(days: number, focus: string, pace: string): CustomItinerary {
  const lowercaseFocus = focus.toLowerCase();
  
  let daysArray: any[] = [];
  
  if (lowercaseFocus.includes("diving") || lowercaseFocus.includes("corals")) {
    daysArray = [
      {
        dayNumber: 1,
        theme: "Anointing of Nun (Red Sea Arrival)",
        activities: [
          "Greet the crystalline shores of Hurghada, checking into your beachside royal lodging",
          "An afternoon snorkeling safari at Giftun Island reefs under the warm eye of Ra",
          "Unwind on a traditional sunset wooden Felucca sailboat listening to ancient Nubian flutes"
        ],
        scribeWisdom: "In Kemet myth, the primordial waters are called 'Nun'. Respect the sea's currents; they are the ancient currents of creation itself. Remember to apply coral-safe sun protection."
      },
      {
        dayNumber: 2,
        theme: "The Abyss of Ras Mohammed",
        activities: [
          "Morning high-speed boat transfer to the Ras Mohammed Marine Sanctuary",
          "First deep scuba dive at 'Yolanda Reef' gazing at giant corals, hammerheads, and ancient submerged amphorae",
          "Gourmet lunch cooked fresh on board by local seafaring Bedouins"
        ],
        scribeWisdom: "Gaze upon the corals, which resemble the lotus flower of Nefertem. The deep sea holds treasures of peace; keep your breathing steady like the reed in the wind."
      },
      {
        dayNumber: 3,
        theme: "Temple of the Submerged Pharaohs",
        activities: [
          "A specialized dive/snorkel exploration of the House of Stone Statues, searching for the submerged Pharaonic monuments",
          "Evening stargazing session by the coast with an Egyptologist detailing how ancient astronomers mapped the sky of Nut",
          "A lavish seafood feast flavored with Egyptian cumin and local lime"
        ],
        scribeWisdom: "Ancient sailors navigated the Red Sea to Punt (Somalia) to retrieve rare frankincense for Hatshepsut. The stars you see tonight guided their cedar ships safely back."
      }
    ];
  } else if (lowercaseFocus.includes("safari") || lowercaseFocus.includes("desert")) {
    daysArray = [
      {
        dayNumber: 1,
        theme: "The Red Dunes of Hurghada",
        activities: [
          "Afternoon pickup in an air-conditioned 4x4 off-road vehicle to cross the desert plains",
          "High-speed quad biking across golden sand ripples and around towering Sinai rock needles",
          "Arrival at a traditional secluded Bedouin camp, welcoming you with fresh hibiscus tea (Karkadeh)"
        ],
        scribeWisdom: "The desert is 'Deshret', the red land, ruled by Set, the god of storms and wilderness. Tread with honor; the sands have memory. Dress in loose linens to shield your skin from the sun's fire."
      },
      {
        dayNumber: 2,
        theme: "The Caravan of Nut",
        activities: [
          "Sunrise camel expedition into the quiet deep valleys, matching the calm tempo of the ancient caravans",
          "Learn the Bedouin art of baking traditional unleavened flatbread over open acacia coals",
          "A thrilling dune-buggy desert racing tour as the sun begins to dip below the horizon"
        ],
        scribeWisdom: "Camel caravans have carried gold, spices, and copper since the times of Ramses. Let the slow rocking rhythm of the camel align your spirit with the pacing of the dunes."
      },
      {
        dayNumber: 3,
        theme: "The Midnight Oracle & Stars",
        activities: [
          "Traditional Bedouin feast with slow-roasted lamb, Egyptian flatbread, and sesame tahini",
          "Live fireside entertainment featuring Egyptian Rababa instruments and the mystical Tannoura spiral dance",
          "Powerful telescope stargazing session under the crystal clear pitch-black desert dome"
        ],
        scribeWisdom: "The goddess Nut bends over the earth, her body studded with stars. Look for the constellation Sah (Orion), which represented the mighty soul of Osiris rising in the night."
      }
    ];
  } else if (lowercaseFocus.includes("history") || lowercaseFocus.includes("temple") || lowercaseFocus.includes("luxor")) {
    daysArray = [
      {
        dayNumber: 1,
        theme: "Pilgrimage to Waset (Luxor Journey)",
        activities: [
          "Scenic sunrise journey from the Red Sea coast through the high mountains to the Nile Valley",
          "Arrival in Waset (Luxor), the glorious capital of the New Kingdom of Egypt",
          "Walk the grand Avenue of Sphinxes, connecting Luxor Temple and the immense Karnak Temple complex"
        ],
        scribeWisdom: "Karnak is the largest temple complex ever constructed by human hands, built over 2,000 years. Touch the giant sandstone pillars to connect with the divine architectural genius of Imhotep."
      },
      {
        dayNumber: 2,
        theme: "The Valley of the Shadows",
        activities: [
          "Cross the sacred Nile River at dawn to the West Bank, the domain of the dead",
          "Descend into the vibrantly painted underground tombs of the Valley of the Kings, including Tutankhamun and Ramses IV",
          "Stand in awe before the Colossi of Memnon, two massive stone statues whispering in the desert wind"
        ],
        scribeWisdom: "The West Bank is where Ra sets, entering the Underworld (Duat). The tomb walls are decorated with the Book of Gates to guide the Pharaohs through tests of the afterlife. Keep silent inside to honor the dead."
      },
      {
        dayNumber: 3,
        theme: "The Temple of the Sun Queen",
        activities: [
          "Explore the terraced mortuary temple of Queen Hatshepsut, carved directly into the sheer cliffs of Deir el-Bahari",
          "A traditional Felucca boat ride on the Nile back to the East Bank, dining on local dates and honey cakes",
          "Return trip to the Red Sea coast under a canopy of desert stars"
        ],
        scribeWisdom: "Hatshepsut was one of Egypt's greatest pharaohs, ruling as a king. Her temple design is a masterpiece of symmetry and matches the rhythm of the cliffs. Be strong and independent in your life journeys."
      }
    ];
  } else {
    // Default balanced
    daysArray = [
      {
        dayNumber: 1,
        theme: "The Golden Shores of Kemet",
        activities: [
          "Warm Pharaonic welcome at the Red Sea, checking into your coastal retreat",
          "Afternoon snorkeling in the house reef, seeing neon-blue parrotfish and golden anemones",
          "An atmospheric seaside dinner under torchlight, enjoying traditional Egyptian Mezze plates"
        ],
        scribeWisdom: "Welcome to Kemet's great sea! The ancient pharaohs sent expeditions here to navigate to distant lands. Gaze out at the water and feel the serenity of Nun."
      },
      {
        dayNumber: 2,
        theme: "Set's Desert Sands & Bedouin Stars",
        activities: [
          "Thrilling afternoon quad bike tour across the rolling desert sand waves",
          "Settle into a traditional desert Bedouin encampment for fresh mint tea and sunset photos",
          "Epic telescope stargazing in the black mountain valleys, reading the celestial tales of Nut"
        ],
        scribeWisdom: "The desert air is pure, carrying the breath of Shu. In the silence of the dunes, you can hear the heartbeat of the Earth. Listen closely and find your inner peace."
      },
      {
        dayNumber: 3,
        theme: "Pilgrimage to Karnak",
        activities: [
          "Full day excursion crossing the desert to Luxor, the ancient city of Waset",
          "Explore the Hypostyle Hall of Karnak Temple, wandering through 134 massive sandstones pillars",
          "A magical sunset Felucca cruise on the holy Nile River, dining on local spiced meats and sweet dates"
        ],
        scribeWisdom: "The Nile is the lifespring of Egypt. As the sun sets over the West Bank, you witness the cycle of rebirth that inspired three thousand years of kings and queens."
      }
    ];
  }

  // Extend days if requested up to 7
  if (days > 3) {
    for (let d = 4; d <= days; d++) {
      if (d === 4) {
        daysArray.push({
          dayNumber: 4,
          theme: "El Gouna Lagoon Navigation",
          activities: [
            "A relaxing day sailing through the quiet turquoise lagoons of El Gouna in a traditional boat",
            "Snorkeling safari at the 'Dolphin House' reef, swimming alongside wild bottle-nose dolphins",
            "Sunset cocktail reception on an elegant marina terrace with live harp music"
          ],
          scribeWisdom: "Dolphins are wise creatures, friends of seafaring guardians. Treat them with deep respect, never rushing them, allowing them to swim alongside in peace."
        });
      } else if (d === 5) {
        daysArray.push({
          dayNumber: 5,
          theme: "The Monasteries of the Desert Fathers",
          activities: [
            "Morning journey into the rugged Red Sea hills to visit St. Anthony, the oldest active monastery in the world",
            "Hike the mountain cave of St. Anthony, gazing at spectacular panoramic desert wilderness views",
            "A hearty lunch featuring local olives, warm flatbread, and fresh goat cheese"
          ],
          scribeWisdom: "These mountains have hosted spiritual hermits since the 4th century. The quietness of the hills acts as a purifying tonic for the active mind."
        });
      } else if (d === 6) {
        daysArray.push({
          dayNumber: 6,
          theme: "Sovereign Spa & Horus Bath",
          activities: [
            "Indulge in a signature Egyptian spa ritual utilizing sea salt scrubs, warm sesame oil, and sweet frankincense massage",
            "An evening stroll through Hurghada's historic Old Town (El Dahar), sampling local mango juices and visiting the spice bazaars",
            "Traditional Egyptian dinner featuring Koshary (the legendary spiced lentil, rice, and macaroni comfort dish)"
          ],
          scribeWisdom: "Ancient queens like Cleopatra bathed in milk and honey to preserve their glow. Frankincense was worth more than gold, used to cleanse both physical and spiritual bodies."
        });
      } else if (d === 7) {
        daysArray.push({
          dayNumber: 7,
          theme: "The Blessing of Ra (Departure)",
          activities: [
            "A final sunrise meditation on the beach, saluting the rising sun god Khepri",
            "Last-minute souvenir shopping in the marina, acquiring local papyrus scrolls and pure alabaster statues",
            "Private royal chariot transfer back to the airport for your departure back home"
          ],
          scribeWisdom: "Every departure is merely a cycle of return. May Ra make his face shine upon your travels, and may your heart remain light as a feather on Ma'at's scale of justice."
        });
      }
    }
  }

  return {
    royalGreeting: "Welcome, explorer! We are excited to help you plan your upcoming journey. Here is a custom itinerary designed for your preferences:",
    title: `${days}-Day Customized Travel Itinerary`,
    days: daysArray,
    blessing: "We hope this travel itinerary inspires your next adventure. Safe travels and have an amazing trip!"
  };
}

// Get offline scribe responses for different queries
function getOfflineScribeResponse(query: string): string {
  const text = query.toLowerCase();
  
  if (text.includes("name") || text.includes("hieroglyph") || text.includes("translate")) {
    return "To see your name written in ancient Egyptian hieroglyphs, check out our Name Translator tool above! Just type in your name, and we will translate each letter into its matching hieroglyphic symbol.";
  }
  
  if (text.includes("dive") || text.includes("coral") || text.includes("reef") || text.includes("sea")) {
    return "The Red Sea is world-famous for its crystal-clear waters and vibrant marine life. When diving at sites like Ras Mohammed, you can explore spectacular coral gardens, historic shipwrecks, and hundreds of species of fish.";
  }

  if (text.includes("safari") || text.includes("desert") || text.includes("camel") || text.includes("quad")) {
    return "Our desert safaris offer a perfect blend of adventure and culture. You can race over the dunes on a quad bike, enjoy a quiet camel trek at sunset, and visit a Bedouin camp to experience traditional hospitality and tea.";
  }

  if (text.includes("luxor") || text.includes("temple") || text.includes("king") || text.includes("ruin") || text.includes("history")) {
    return "Luxor is home to some of the world's most incredible historical sites. On the East Bank of the Nile, you can visit the massive Karnak and Luxor temples. On the West Bank, you can descend into the beautifully painted tombs of the Valley of the Kings.";
  }

  return "Thank you for your question! I can help you with anything related to the Red Sea coral reefs, desert safaris, or historical tours to Luxor. What would you like to know more about?";
}
