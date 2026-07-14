import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Compass, User, Zap, Send, MessageCircle, HelpCircle, Loader2, BookOpen } from 'lucide-react';
import { CustomItinerary, ScribeMessage } from '../types';

export default function ScribeOracle() {
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

  // Chat States
  const [chatMessages, setChatMessages] = useState<ScribeMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hail, noble traveler! I am Sennedjem, Scribe of the Sacred Cartouches and keeper of Kemet's secrets. Ask me of the hidden reefs in Nun's deep turquoise waters, the ancient path of Luxor's sun god, or request me to translate thy sacred title into hieroglyphic wisdom. What sayest thou?",
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
    } catch (err: any) {
      console.warn("Express endpoint failed or unconfigured, utilizing royal scribe fallback: ", err);
      // Fallback elegant customized simulated itinerary based on user inputs
      const simulated: CustomItinerary = generateFallbackItinerary(duration, interest, intensity);
      setItinerary(simulated);
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
            Royal Itinerary Customizer
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
            Consult Scribe Sennedjem
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
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Bespoke Journeys</span>
              <h2 className="font-serif text-3xl font-extrabold text-[#e6c280] mt-1 uppercase">
                The Pharaonic Voyage Planner
              </h2>
              <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
                Allow Sennedjem to roll out the sacred papyrus and align the stars of Nut to script your personalized Red Sea and Luxor adventure.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#211911] p-6 rounded-2xl border border-[#d4af37]/15">
              
              {/* Duration Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-stone-300 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#d4af37]" />
                    Voyage Length (Days)
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
                  <span>3 Days (Quick escape)</span>
                  <span>7 Days (Grand Explorer)</span>
                </div>
              </div>

              {/* Primary Focus */}
              <div className="space-y-1.5">
                <label className="text-stone-300 text-sm flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#d4af37]" />
                  Primary Spirit (Focus)
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
                  Pace of Exploration
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
                  Expedition Companions
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
                  Special Scribe Inscriptions (Optional requests or dietary focus)
                </label>
                <textarea
                  value={customReq}
                  onChange={(e) => setCustomReq(e.target.value)}
                  placeholder="E.g., Vegetarian options, focusing on Ras Mohammed scuba sites, celebrating an anniversary..."
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
                    Mixing Nile Ink...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#140f0a] animate-pulse" />
                    Summon Custom Pharaoh Itinerary
                  </>
                )}
              </button>
            </div>

            {/* Generated Itinerary Display */}
            <AnimatePresence>
              {itinerary && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-[#faf3e0] border-8 border-double border-[#8b6508] rounded-2xl p-6 md:p-8 text-[#2b1f0d] relative shadow-[0_0_50px_rgba(0,0,0,0.6)] font-sans max-w-4xl mx-auto overflow-hidden mt-8"
                  id="parchment-itinerary"
                >
                  {/* Parchment Background Texture Accent */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(139,101,8,0.06)_100%)] pointer-events-none"></div>

                  <div className="text-center border-b-2 border-[#8b6508]/20 pb-6 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8b6508] font-bold">
                      Decree of Sennedjem, Royal Scribe
                    </span>
                    <h3 className="font-serif text-3xl font-black text-[#5c4001] tracking-wide mt-1 uppercase">
                      {itinerary.title}
                    </h3>
                  </div>

                  {/* Poetic Greeting */}
                  <div className="bg-[#f0e4c6] border-l-4 border-[#8b6508] p-4 rounded-r-lg mb-8 italic text-stone-800 text-sm leading-relaxed shadow-sm">
                    "{itinerary.royalGreeting}"
                  </div>

                  {/* Days Timeline */}
                  <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#8b6508]/20">
                    {itinerary.days.map((day) => (
                      <div key={day.dayNumber} className="relative pl-12 group">
                        {/* Bullet Circle */}
                        <div className="absolute left-[14px] top-1.5 w-5 h-5 rounded-full border-4 border-[#faf3e0] bg-[#8b6508] shadow-[0_0_10px_rgba(139,101,8,0.4)] flex items-center justify-center text-[10px] font-bold text-white font-mono group-hover:scale-110 transition-transform">
                          {day.dayNumber}
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-serif text-lg font-bold text-[#5c4001] uppercase flex items-center gap-2">
                            Day {day.dayNumber}: {day.theme}
                          </h4>
                          
                          <ul className="list-disc list-inside space-y-1.5 text-stone-700 text-sm">
                            {day.activities.map((act, i) => (
                              <li key={i} className="leading-relaxed pl-1">{act}</li>
                            ))}
                          </ul>

                          {/* Scribe Wisdom Box */}
                          <div className="mt-3 bg-[#f2e7c9] border border-[#8b6508]/15 rounded-lg p-3 text-xs text-stone-600 italic">
                            <span className="font-serif font-bold text-[#8b6508] block not-italic mb-1 uppercase tracking-wider">
                              𓋹 Scribe's Ancient Wisdom:
                            </span>
                            {day.scribeWisdom}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Royal Blessing Conclution */}
                  <div className="mt-8 pt-6 border-t-2 border-[#8b6508]/25 text-center">
                    <p className="text-sm font-serif italic text-stone-800 leading-relaxed">
                      "{itinerary.blessing}"
                    </p>
                    <div className="mt-4 flex justify-center text-[#8b6508] text-4xl select-none">
                      𓋹 𓎬 𓅃
                    </div>
                  </div>
                </motion.div>
              )}
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
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Sacred Dialogues</span>
              <h2 className="font-serif text-2xl font-bold text-[#e6c280] mt-1 uppercase">
                Oracle Scribe Conversational Chamber
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
                  <div className="bg-[#241c14] border border-[#d4af37]/25 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#d4af37] animate-spin" />
                    <span className="text-xs font-mono text-stone-400 italic">Sennedjem is drafting glyphs...</span>
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
                placeholder="Ask about Ramses, diving spots, desert myths, or translating a name..."
                className="flex-1 bg-[#201a14] border border-[#d4af37]/45 rounded-xl py-3 px-4 text-[#f3e5c8] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                id="scribe-chat-input"
              />
              <button
                type="submit"
                className="bg-[#d4af37] text-[#140f0a] px-5 rounded-xl flex items-center justify-center hover:bg-[#c5a059] transition-colors active:scale-95 cursor-pointer font-serif font-bold text-sm gap-2"
                id="scribe-chat-send-btn"
              >
                <Send className="w-4 h-4 text-[#140f0a]" />
                Inscribe
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
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
    royalGreeting: "By the decree of the gods, we greet thee, noble explorer. Thou hast chosen well. The alignment of the sun of Ra and the tides of Nun show great fortune for thy journey. Let us scribe thy path...",
    title: `The Royal Expedition of ${days} Suns`,
    days: daysArray,
    blessing: "May the divine protection of the Eye of Horus encircle thy path, may the sands of Deshret cushion thy steps, and may the waters of Nun bring everlasting replenishment to thy spirit. Go in peace, beloved noble!"
  };
}

// Get offline scribe responses for different queries
function getOfflineScribeResponse(query: string): string {
  const text = query.toLowerCase();
  
  if (text.includes("name") || text.includes("hieroglyph") || text.includes("translate")) {
    return "Noble voyager! To write thy name in the sacred script of Kemet, navigate to our 'Royal Cartouche Scribe' above. Enter thy name, and behold: the vulture, water ripples, and linen folds shall formulate your protective amulet instantly! On this scroll, we map A to the vulture, N to water ripples, and S to the folded cloth of Sekhmet!";
  }
  
  if (text.includes("dive") || text.includes("coral") || text.includes("reef") || text.includes("sea")) {
    return "Ah, the Red Sea! Our ancestors called it the great green water, part of Nun. The reefs are guarded by the spirits of ancient sailors. When diving, keep your breath measured like a scribe's stroke. The sunken ruins of Ras Mohammed contain massive limestone pillars and stone statues, placed as monuments to honor the sea god Nun.";
  }

  if (text.includes("safari") || text.includes("desert") || text.includes("camel") || text.includes("quad")) {
    return "The desert sands, or Deshret, are ruled by the storm god Set. When navigating the dunes, the quad bike provides the speed of Horus's falcon, while the camel provides the patient endurance of the god Ptah. At night, look up at Nut, the starry goddess of the sky; the Bedouin tea we brew over acacia coals holds herbs that soothe the traveler's fatigue.";
  }

  if (text.includes("luxor") || text.includes("temple") || text.includes("king") || text.includes("ruin") || text.includes("history")) {
    return "Luxor, known of old as Waset, is the golden capital of our greatest Pharaohs. On the East Bank, Karnak Temple stands as a house for Amun-Ra, while the West Bank houses the Valley of the Kings where the pharaohs' souls travel to the underworld. Touch the sandstone pillars—they have stood since the dawn of the New Kingdom, carrying the blessings of eternity.";
  }

  return "Thy words have been inscribed on my papyrus, noble seeker. The wisdom of Kemet is deep like the Nile. Tell me, wouldst thou like to know of the underwater wonders of the Red Sea, the golden safaris of the Hurghada dunes, or the tombs of the Valley of the Kings?";
}
