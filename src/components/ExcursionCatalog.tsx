import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldAlert, CheckCircle, Clock, MapPin, Sparkles, Filter, ChevronRight, X, User, Mail, Calendar, HelpCircle, MessageSquare, Send, ThumbsUp, PenTool } from 'lucide-react';
import { Excursion, Booking } from '../types';
import ReviewSystem from './ReviewSystem';
import PromotionalBanner from './PromotionalBanner';

// Let's use our exact generated image paths!
export const EXCURSIONS_DATA: Excursion[] = [
  {
    id: 'diving-1',
    title: "Ras Mohammed Royal Coral Diving",
    tagline: "Explore the sunken statues of the sea god Nun",
    category: 'diving',
    duration: "Full Day (8 Hours)",
    price: 120,
    rating: 4.9,
    location: "Red Sea, Egypt (Ras Mohammed National Park)",
    image: "/src/assets/images/egypt_sea_diving_1784070366165.jpg",
    description: "Plunge into the deep turquoise kingdom of Nun, the primordial waters of Egyptian lore. This professional-led scuba diving excursion guides you past vertical coral walls, hammerhead sanctuaries, and a breathtaking submerged field of hand-carved Pharaonic stone monuments resting on the seabed.",
    inclusions: [
      "All high-quality diving equipment (scuba tanks, wetsuits, regulators)",
      "Two deep dives with certified Egyptian Egyptologist-Divers",
      "Traditional open-deck yacht lunch cooked by maritime Bedouins",
      "Hotel pick-up & drop-off in Hurghada or Sharm El Sheikh"
    ],
    highlights: [
      "Swim alongside giant Napoleon fish & sea turtles",
      "Unveil the underwater stone sanctuary of Anubis & Ramses",
      "Professional underwater video and photography package"
    ],
    ancientLore: "Ancient priests of the Red Sea wrote of 'Nun'—the source of all life. They believed that submerged stone statues kept the ocean spirits pacified, ensuring safe passage for Queen Hatshepsut's trade caravans navigating to the mythical land of Punt."
  },
  {
    id: 'safari-1',
    title: "Set's Golden Deshret Safari",
    tagline: "Race quad bikes and trek camels across the red dunes",
    category: 'safari',
    duration: "Half Day (6 Hours)",
    price: 75,
    rating: 4.8,
    location: "Sinai Desert, Egypt (Hurghada Outskirts)",
    image: "/src/assets/images/egypt_desert_safari_1784070379685.jpg",
    description: "Race high-performance quad bikes over rolling sand ripples before transitioning to the majestic pace of a traditional camel caravan. Conclude your voyage at a secluded, torch-lit Bedouin oasis, enjoying hibiscus tea, fireside lore, and powerful telescope stargazing into the starry canopy of Nut.",
    inclusions: [
      "Premium Quad Bike (ATV) and safety gear",
      "Traditional 30-minute sunrise/sunset camel trek",
      "Secluded Bedouin camp feast with flatbread baking masterclass",
      "Egyptologist-led telescope stargazing and celestial alignment talk"
    ],
    highlights: [
      "Conquer high sand waves at 50km/h on a quad",
      "Listen to Bedouin rababa tunes around open acacia campfires",
      "Trace the constellation Sah (Orion) under the guidance of our oracle stargazers"
    ],
    ancientLore: "The red desert was called 'Deshret' by Pharaohs, ruled by Set, the god of storms. Ancient miners traversed these dunes under the guard of the King's archers to secure Sinai's copper and turquoise, marking key rocks with cartouches to guarantee their return."
  },
  {
    id: 'history-1',
    title: "Pharaoh's Pilgrimage to Waset (Luxor)",
    tagline: "Unlock the tombs of Valley of the Kings & Karnak",
    category: 'history',
    duration: "Full Day (14 Hours)",
    price: 180,
    rating: 4.95,
    location: "Luxor (Ancient Waset), Egypt",
    image: "/src/assets/images/egypt_luxor_temple_1784070393047.jpg",
    description: "Cross the Sinai mountains to the rich Nile Valley. Arrive in ancient Waset (Luxor), capital of the New Kingdom, where you will wander the gargantuan column halls of Karnak, descend into the painted royal vaults of the Valley of the Kings, and stand in awe before the Colossi of Memnon.",
    inclusions: [
      "Private luxury chariot (Mercedes minibus) transport from Red Sea coast",
      "VIP tickets to 3 Royal Tombs in the Valley of the Kings",
      "Guided tour of Karnak Temple & Hatshepsut's Temple",
      "Traditional Egyptian lunch on a private island on the Nile River"
    ],
    highlights: [
      "Touch the hieroglyphs of the giant Hypostyle Hall in Karnak",
      "Descend into Tutankhamun's resting chamber",
      "A scenic sunset Felucca cruise down the life-giving Nile"
    ],
    ancientLore: "To cross from the East Bank to the West Bank of Luxor is to traverse the veil between the living and the dead. The Pharaohs carved their tombs deep inside mountain crevices to match the setting of Ra, assuring resurrection into the eternal fields of Aaru."
  },
  {
    id: 'boat-1',
    title: "Sobek's Royal Queen Nefertari Cruise",
    tagline: "Sail past Giftun Island aboard our gold-appointed yacht",
    category: 'boat',
    duration: "Full Day (7 Hours)",
    price: 95,
    rating: 4.85,
    location: "Hurghada, Red Sea, Egypt",
    image: "/src/assets/images/egypt_boat_trip_1784071711626.jpg",
    description: "Sail upon the shimmering turquoise empire of Sobek in absolute luxury. Relax on the double-tiered sun-decks of our royal wooden yacht as we voyage toward Giftun Island. Feast on a fresh sea-tribute banquet cooked by your private onboard chefs, swim in pristine shallow lagoons, and snorkel amidst vibrant coral clusters.",
    inclusions: [
      "All high-quality snorkeling gear and safety vests",
      "Gourmet seafood and traditional mezze buffet cooked onboard",
      "Unlimited fresh juices, Egyptian coffee, and Bedouin mint tea",
      "Round-trip air-conditioned VIP van transfer"
    ],
    highlights: [
      "Snorkel the pristine lagoons of Giftun Orange Bay",
      "Sunbathe on comfortable golden leather lounge beds",
      "Spot playful Red Sea dolphins dancing alongside the bow"
    ],
    ancientLore: "The Nile and the seas were overseen by Sobek, the patron of water and fertility. Ancient Egyptian kings launched cedarwood pleasure barges covered in gold leaf to honor the water spirits, believing that a joyful voyage over the sea ensured good harvest and divine favor from Osiris."
  },
  {
    id: 'speedboat-1',
    title: "Horus's Falcon Eye Speedboat Cruise",
    tagline: "Unleash adrenaline at high speeds across secret islands",
    category: 'speedboat',
    duration: "Half Day (4 Hours)",
    price: 150,
    rating: 4.9,
    location: "El Gouna & Red Sea Islands, Egypt",
    image: "/src/assets/images/egypt_speedboat_1784071721552.jpg",
    description: "Soar across the waves of the Red Sea like the sacred sky falcon Horus. This premium speedboat voyage lets you bypass the slow yachts and dive straight into the most secluded, untouched island reefs of the Red Sea. Tailor your route, stop at uninhabited sandbanks, and experience the thrill of high-speed pharaonic transport.",
    inclusions: [
      "Private high-speed luxury yacht/speedboat with professional captain",
      "Premium snorkeling kits and underwater action cameras",
      "Gourmet refreshments and iced organic hibiscus elixir",
      "VIP hotel pickup with private modern sedan"
    ],
    highlights: [
      "Fly across the turquoise waters at thrilling speeds",
      "Private custom stops at uninhabited sandbars for solitary swims",
      "Explore hidden coral gardens unknown to the public"
    ],
    ancientLore: "Horus, the falcon-headed lord of skies, was famous for his unmatched speed and piercing vision. Pharaonic scouts used swift reed skiffs to patrol the shores with falcon-like swiftness, communicating back to the royal temples via mirrored light signals."
  }
];

const INITIAL_INLINE_REVIEWS = [
  {
    id: 'rev-1',
    excursionId: 'diving-1',
    author: "Cleopatra the Diver",
    avatar: "𓁠 Cleopatra the Diver",
    rating: 5,
    comment: "I plunged into Ras Mohammed and was greeted by a massive underwater statue of Osiris, surrounded by thousands of golden glassfish. Truly, Sennedjem has aligned the elements perfectly. It felt like walking through a submerged palace of the Nile!",
    date: "2026-06-20"
  },
  {
    id: 'rev-2',
    excursionId: 'safari-1',
    author: "Ramses the Nomad",
    avatar: "𓀚 Ramses the Nomad",
    rating: 5,
    comment: "Flying across the red dunes on a quad bike was as exhilarating as racing a war chariot in Kadesh! The Bedouin flatbread baked over acacia coals is delicious, and the stargazing is a true communion with Nut.",
    date: "2026-07-01"
  },
  {
    id: 'rev-3',
    excursionId: 'history-1',
    author: "Hatshepsut the Explorer",
    avatar: "𓁥 Hatshepsut the Scribe",
    rating: 5,
    comment: "Visiting the mortuary temple in Luxor left my royal caravan speechless. The columns of Karnak are so wide they command complete silence. The private Felucca cruise on the Nile at sunset was absolute bliss.",
    date: "2026-07-11"
  },
  {
    id: 'rev-4',
    excursionId: 'boat-1',
    author: "Bastet the Voyager",
    avatar: "𓃠 Bastet the Explorer",
    rating: 4,
    comment: "The Queen Nefertari Cruise was splendid. Feasting on fresh red sea bass cooked onboard while watching dolphins leap at the horizon is an experience worthy of the gods. The golden loungers were exceptionally comfortable.",
    date: "2026-07-13"
  },
  {
    id: 'rev-5',
    excursionId: 'speedboat-1',
    author: "Horus the Brave",
    avatar: "𓅃 Horus the Speedster",
    rating: 5,
    comment: "Absolutely thrilling! We flew across the azure waves at breathtaking speeds. Landing on a completely isolated sandbar and diving into virgin reefs felt like entering a pristine secret dimension. Worth every golden coin!",
    date: "2026-07-14"
  }
];

interface CatalogProps {
  onAddBooking: (booking: Booking) => void;
  excursions?: Excursion[];
}

export default function ExcursionCatalog({ onAddBooking, excursions }: CatalogProps) {
  const [filter, setFilter] = useState<'all' | 'diving' | 'safari' | 'history' | 'boat' | 'speedboat'>('all');
  const [selectedExcursion, setSelectedExcursion] = useState<Excursion | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Expanded card reviews state
  const [expandedReviewsId, setExpandedReviewsId] = useState<string | null>(null);

  // Reviews List State
  const [reviews, setReviews] = useState<any[]>(() => {
    const saved = localStorage.getItem('kemet_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_INLINE_REVIEWS;
      }
    }
    return INITIAL_INLINE_REVIEWS;
  });

  // Inline Review Form State
  const [inlineAuthor, setInlineAuthor] = useState<string>("");
  const [inlineComment, setInlineComment] = useState<string>("");
  const [inlineRating, setInlineRating] = useState<number>(5);
  const [inlineAvatar, setInlineAvatar] = useState<string>("𓁠 Cleopatra");
  const [inlineSuccessId, setInlineSuccessId] = useState<string | null>(null);
  const [hoveredInlineStar, setHoveredInlineStar] = useState<number | null>(null);

  // Synchronize reviews from localStorage and server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
          localStorage.setItem('kemet_reviews', JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to fetch reviews inside ExcursionCatalog:", err);
      }
    };
    fetchReviews();

    const syncReviews = () => {
      const saved = localStorage.getItem('kemet_reviews');
      if (saved) {
        try {
          setReviews(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    };

    window.addEventListener('kemet_reviews_updated', syncReviews);
    return () => {
      window.removeEventListener('kemet_reviews_updated', syncReviews);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Booking Form State
  const [travelerName, setTravelerName] = useState<string>("");
  const [travelerEmail, setTravelerEmail] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [requests, setRequests] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  // Interactive Feedback & Rating States
  const [ratingExcursion, setRatingExcursion] = useState<Excursion | null>(null);
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackAuthor, setFeedbackAuthor] = useState<string>("");
  const [feedbackAvatar, setFeedbackAvatar] = useState<string>("𓁠 Cleopatra");
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);
  const [hoveredFeedbackStar, setHoveredFeedbackStar] = useState<number | null>(null);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingExcursion || !feedbackAuthor.trim() || !feedbackComment.trim()) return;

    // Map the selected avatar to its full name
    const avatarLabels: Record<string, string> = {
      "𓁠 Cleopatra": "Cleopatra the Diver",
      "𓀚 Ramses": "Ramses the Nomad",
      "𓁥 Hatshepsut": "Hatshepsut the Scribe",
      "𓃠 Bastet": "Bastet the Explorer",
      "𓆛 Sobek": "Sobek the Mariner",
      "𓅃 Horus": "Horus the Speedster",
      "𓋹 Anubis": "Anubis the Guardian"
    };
    const avatarFull = `${feedbackAvatar} ${avatarLabels[feedbackAvatar] || 'the Noble'}`;

    const newReview = {
      id: `rev-${Date.now()}`,
      excursionId: ratingExcursion.id,
      author: feedbackAuthor,
      avatar: avatarFull,
      rating: feedbackRating,
      comment: feedbackComment,
      date: new Date().toISOString().split('T')[0]
    };

    // 1. Save to kemet_reviews in localStorage
    const savedReviewsStr = localStorage.getItem('kemet_reviews');
    let allReviews = [];
    if (savedReviewsStr) {
      try {
        allReviews = JSON.parse(savedReviewsStr);
      } catch (err) {
        allReviews = [];
      }
    }
    allReviews = [newReview, ...allReviews];
    localStorage.setItem('kemet_reviews', JSON.stringify(allReviews));

    // 2. Recalculate average rating for this excursion
    const excursionReviews = allReviews.filter((r: any) => r.excursionId === ratingExcursion.id);
    const sum = excursionReviews.reduce((acc: number, r: any) => acc + r.rating, 0);
    const average = Math.round((sum / excursionReviews.length) * 100) / 100;

    // 3. Update the excursion rating in kemet_excursions
    const savedExStr = localStorage.getItem('kemet_excursions');
    if (savedExStr) {
      try {
        const localExcursions = JSON.parse(savedExStr);
        const updatedExcursions = localExcursions.map((ex: any) => {
          if (ex.id === ratingExcursion.id) {
            return { ...ex, rating: average };
          }
          return ex;
        });
        localStorage.setItem('kemet_excursions', JSON.stringify(updatedExcursions));
      } catch (err) {
        console.error("Could not update excursion rating", err);
      }
    }

    // 4. Dispatch events to trigger app state updates & golden scarab celebration!
    window.dispatchEvent(new Event('kemet_reviews_updated'));
    window.dispatchEvent(new Event('kemet_excursions_updated'));
    window.dispatchEvent(new Event('kemet_celebrate'));

    // 5. Show success overlay and close
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setRatingExcursion(null);
      setFeedbackAuthor("");
      setFeedbackComment("");
      setFeedbackRating(5);
    }, 2200);
  };

  const handleInlineFeedbackSubmit = async (e: React.FormEvent, exId: string) => {
    e.preventDefault();
    if (!inlineAuthor.trim() || !inlineComment.trim()) return;

    const avatarLabels: Record<string, string> = {
      "𓁠 Cleopatra": "Cleopatra the Diver",
      "𓀚 Ramses": "Ramses the Nomad",
      "𓁥 Hatshepsut": "Hatshepsut the Scribe",
      "𓃠 Bastet": "Bastet the Explorer",
      "𓆛 Sobek": "Sobek the Mariner",
      "𓅃 Horus": "Horus the Speedster",
      "𓋹 Anubis": "Anubis the Guardian"
    };
    const avatarFull = `${inlineAvatar} ${avatarLabels[inlineAvatar] || 'the Noble'}`;

    const newReview = {
      id: `rev-${Date.now()}`,
      excursionId: exId,
      author: inlineAuthor,
      avatar: avatarFull,
      rating: inlineRating,
      comment: inlineComment,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          excursionId: exId,
          author: inlineAuthor,
          avatar: avatarFull,
          rating: inlineRating,
          comment: inlineComment
        })
      });
    } catch (err) {
      console.error("Failed to post inline review to database:", err);
    }

    const savedReviewsStr = localStorage.getItem('kemet_reviews');
    let allReviews = [];
    if (savedReviewsStr) {
      try {
        allReviews = JSON.parse(savedReviewsStr);
      } catch (err) {
        allReviews = [];
      }
    }
    allReviews = [newReview, ...allReviews];
    localStorage.setItem('kemet_reviews', JSON.stringify(allReviews));
    setReviews(allReviews);

    // Recalculate average rating for this excursion
    const excursionReviews = allReviews.filter((r: any) => r.excursionId === exId);
    const sum = excursionReviews.reduce((acc: number, r: any) => acc + r.rating, 0);
    const average = Math.round((sum / excursionReviews.length) * 100) / 100;

    const savedExStr = localStorage.getItem('kemet_excursions');
    if (savedExStr) {
      try {
        const localExcursions = JSON.parse(savedExStr);
        const updatedExcursions = localExcursions.map((ex: any) => {
          if (ex.id === exId) {
            return { ...ex, rating: average };
          }
          return ex;
        });
        localStorage.setItem('kemet_excursions', JSON.stringify(updatedExcursions));
      } catch (err) {
        console.error("Could not update excursion rating locally", err);
      }
    }

    window.dispatchEvent(new Event('kemet_reviews_updated'));
    window.dispatchEvent(new Event('kemet_excursions_updated'));
    window.dispatchEvent(new Event('kemet_celebrate'));

    setInlineSuccessId(exId);
    setInlineAuthor("");
    setInlineComment("");
    setInlineRating(5);

    setTimeout(() => {
      setInlineSuccessId(null);
    }, 2500);
  };

  const activeCatalog = excursions && excursions.length > 0 ? excursions : EXCURSIONS_DATA;

  const filteredExcursions = activeCatalog.filter(
    ex => filter === 'all' || ex.category === filter
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelerName || !travelerEmail || !bookingDate || !selectedExcursion) return;

    const totalCost = selectedExcursion.price * guests;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      excursionId: selectedExcursion.id,
      excursionTitle: selectedExcursion.title,
      travelerName,
      travelerEmail,
      date: bookingDate,
      numberOfGuests: guests,
      totalCost,
      specialRequests: requests,
      status: 'Pending Oracle Approval',
      createdAt: new Date().toISOString()
    };

    onAddBooking(newBooking);
    setSuccessMsg(true);

    // Formulate a beautiful WhatsApp detail message
    const message = `𓂀 KEMET VOYAGES - EXPEDITION BOOKING 𓂀

Greetings Scribe! I have inscribed a new caravan passage:

𓋹 Expedition: ${selectedExcursion.title}
𓀚 Traveler Name: ${travelerName}
✉ Messenger Email: ${travelerEmail}
📅 Departure Date: ${bookingDate}
👥 Caravan Size: ${guests} Nobles
💰 Total Tribute: $${totalCost} Gold Coins
✍ Special Requests: ${requests || "None"}

Please seal my booking with the High Priest approval!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201202181834?text=${encodedMessage}`;

    setTimeout(() => {
      setSuccessMsg(false);
      setIsBookingOpen(false);
      // Reset form
      setTravelerName("");
      setTravelerEmail("");
      setBookingDate("");
      setGuests(2);
      setRequests("");

      // Redirect the traveler to the WhatsApp Chat
      window.open(whatsappUrl, '_blank') || (window.location.href = whatsappUrl);
    }, 2000);
  };

  return (
    <div className="space-y-10" id="excursions-section">
      
      {/* Title */}
      <div className="text-center">
        <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Royal Offerings</span>
        <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#e6c280] uppercase mt-1">
          Divine Red Sea Expeditions
        </h2>
        <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
          Hand-curated, highly immersive voyages matching the golden standards of the Ancient Egyptian pharaohs.
        </p>
      </div>

      {/* Promotional Seasonal Discount Banner */}
      <PromotionalBanner />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { key: 'all', label: 'All Expeditions' },
          { key: 'diving', label: '𓆛 Coral Diving' },
          { key: 'safari', label: '𓅓 Desert Safari' },
          { key: 'history', label: '𓉐 Luxor History' },
          { key: 'boat', label: '𓊟 Boat Trips' },
          { key: 'speedboat', label: '𓊡 Speedboats' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              filter === tab.key
                ? 'bg-gradient-to-r from-[#d4af37] to-[#bfa030] text-[#140f0a] font-bold shadow-lg shadow-[#d4af37]/15'
                : 'bg-[#1a140f] border border-[#d4af37]/20 text-[#e6c280]/70 hover:text-[#f3e5c8] hover:bg-[#281e14]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Excursions */}
      {isLoading ? (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="bg-[#1a140f] border border-[#d4af37]/15 rounded-2xl overflow-hidden shadow-xl flex flex-col relative group"
              id={`excursion-skeleton-${index}`}
            >
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

              {/* Image Thumbnail Skeleton */}
              <div className="h-56 bg-[#211a13]/80 relative flex items-center justify-center overflow-hidden">
                {/* Floating animated hieroglyphs */}
                <motion.span 
                  animate={{ 
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.15, 0.45, 0.15],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 6, 
                    ease: "easeInOut",
                    delay: index * 0.4 
                  }}
                  className="text-[#d4af37] text-6xl font-serif select-none"
                >
                  {index % 3 === 0 ? '𓋹' : index % 3 === 1 ? '𓂀' : '𓅃'}
                </motion.span>
                <div className="absolute top-4 left-4 w-24 h-5 bg-[#140f0a]/60 rounded-full border border-stone-850 animate-pulse" />
                <div className="absolute bottom-4 right-4 w-16 h-7 bg-[#d4af37]/5 border border-[#d4af37]/10 rounded-lg animate-pulse" />
              </div>

              {/* Content Skeleton */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#1a140f]/90">
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <div className="w-24 h-3.5 bg-[#211a13] rounded-md animate-pulse" />
                    <div className="w-10 h-3.5 bg-[#211a13] rounded-md animate-pulse" />
                  </div>

                  <div className="w-11/12 h-5 bg-[#211a13] rounded-md animate-pulse" />
                  <div className="w-2/3 h-3.5 bg-[#211a13]/80 rounded-md animate-pulse" />
                  
                  <div className="space-y-2 pt-2">
                    <div className="w-full h-3 bg-[#211a13]/60 rounded-md animate-pulse" />
                    <div className="w-full h-3 bg-[#211a13]/60 rounded-md animate-pulse" />
                    <div className="w-5/6 h-3 bg-[#211a13]/60 rounded-md animate-pulse" />
                  </div>
                </div>

                {/* Ancient Lore Snippet Skeleton */}
                <div className="bg-[#211a13]/40 border border-[#d4af37]/10 rounded-xl p-3.5 h-[68px] flex flex-col justify-between relative overflow-hidden">
                  <div className="w-28 h-3.5 bg-[#211a13] rounded-md animate-pulse" />
                  <div className="w-full h-2.5 bg-[#211a13]/50 rounded-md animate-pulse" />
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-2.5 pt-2">
                  <div className="flex-1 h-9 bg-[#211a13]/60 rounded-xl animate-pulse" />
                  <div className="flex-1 h-9 bg-[#d4af37]/10 rounded-xl animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExcursions.map((ex) => (
            <motion.div
              key={ex.id}
              layout
              className="bg-[#1a140f] border border-[#d4af37]/25 rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:border-[#d4af37]/85 hover:shadow-[0_0_22px_rgba(212,175,55,0.22)] transition-all duration-300"
              id={`excursion-card-${ex.id}`}
            >
              {/* Image Thumbnail with Overlay */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={ex.image}
                  alt={ex.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140f0a] via-transparent to-transparent"></div>
                
                {/* Category Tag */}
                <span className="absolute top-4 left-4 bg-[#140f0a]/80 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/40 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                  {ex.category === 'diving' ? '𓆛 Diving' : ex.category === 'safari' ? '𓅓 Safari' : ex.category === 'history' ? '𓉐 History' : ex.category === 'boat' ? '𓊟 Boat Trip' : '𓊡 Speedboat'}
                </span>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-[#d4af37] text-[#140f0a] font-mono font-bold px-3 py-1 rounded-lg text-sm shadow-md">
                  ${ex.price} <span className="text-xs font-normal">/ noble</span>
                </div>
              </div>

              {/* Content info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> {ex.duration}
                    </span>
                    {/* Interactive Golden Star Rating Widget */}
                    <div 
                      className="flex items-center gap-1.5 cursor-pointer group/rating relative"
                      title="Inscribe thy feedback (Click to Rate)"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRatingExcursion(ex);
                        setFeedbackRating(Math.round(ex.rating) || 5);
                      }}
                    >
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((num) => {
                          const isFilled = num <= Math.round(ex.rating);
                          return (
                            <Star
                              key={num}
                              className={`w-3.5 h-3.5 transition-all duration-200 ${
                                isFilled 
                                  ? 'text-[#d4af37] fill-current group-hover/rating:text-amber-300 group-hover/rating:scale-110' 
                                  : 'text-stone-700 group-hover/rating:text-stone-500'
                              }`}
                              style={{ transitionDelay: `${num * 25}ms` }}
                            />
                          );
                        })}
                      </div>
                      <span className="text-[#d4af37] font-mono font-bold text-xs group-hover/rating:text-amber-200 ml-0.5 transition-colors">
                        {ex.rating ? ex.rating.toFixed(1) : '0.0'}
                      </span>
                      
                      {/* Floating tooltip invitation */}
                      <span className="pointer-events-none opacity-0 group-hover/rating:opacity-100 transition-opacity duration-300 text-[9px] font-mono text-[#140f0a] uppercase tracking-widest absolute -top-8 right-0 bg-gradient-to-r from-[#d4af37] to-[#f3e5c8] px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-20 border border-[#d4af37]/30">
                        ✍ Rate Journey
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#e6c280] group-hover:text-amber-200 transition-colors uppercase tracking-wide">
                    {ex.title}
                  </h3>
                  
                  <p className="text-xs italic text-stone-400">{ex.tagline}</p>
                  
                  <p className="text-stone-300 text-xs leading-relaxed pt-2 line-clamp-3">
                    {ex.description}
                  </p>
                </div>

                {/* Ancient Lore Snippet button */}
                <div className="bg-[#241a10] border border-[#d4af37]/15 rounded-xl p-3.5 text-[11px] text-[#e6c280]/80 italic relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[#d4af37]/5 rounded-bl-2xl"></div>
                  <strong className="font-serif text-[#d4af37] not-italic block mb-0.5 uppercase tracking-widest text-[10px]">
                    𓋹 Pharaonic Lore:
                  </strong>
                  "{ex.ancientLore.slice(0, 115)}..."
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => {
                        setSelectedExcursion(ex);
                        setIsBookingOpen(false); // just detail view
                      }}
                      className="flex-1 bg-[#221c14] hover:bg-[#32281d] border border-[#d4af37]/30 text-[#e6c280] font-mono text-[11px] uppercase tracking-widest py-2.5 rounded-xl transition-all cursor-pointer text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        setSelectedExcursion(ex);
                        setIsBookingOpen(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#b08e23] hover:from-[#e5c250] hover:to-[#c5a02e] text-[#140f0a] font-serif font-bold text-xs uppercase tracking-wide py-2.5 rounded-xl transition-all hover:scale-[1.02] shadow-md shadow-[#d4af37]/10 cursor-pointer"
                    >
                      Book Expedition
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      const msg = `𓂀 KEMET VOYAGES - EXPEDITION INQUIRY 𓂀\n\nGreetings Scribe! I am interested in embarking on the beautiful "${ex.title}" (${ex.duration}) expedition. Can you please tell me more about availability and itineraries?`;
                      const url = `https://wa.me/201202181834?text=${encodeURIComponent(msg)}`;
                      window.open(url, '_blank') || (window.location.href = url);
                    }}
                    className="w-full bg-[#140f0a] hover:bg-emerald-950/15 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 text-[10px] font-mono uppercase tracking-widest py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="text-emerald-400 text-xs">𓍢</span> Inquire on WhatsApp (+201202181834)
                  </button>
                </div>

                {/* Collapsible Reviews & Comments Accordion */}
                <div className="pt-2.5 border-t border-stone-800/60">
                  <button
                    onClick={() => setExpandedReviewsId(expandedReviewsId === ex.id ? null : ex.id)}
                    className="w-full text-center text-[10px] font-mono text-[#d4af37]/80 hover:text-[#d4af37] flex items-center justify-center gap-1.5 py-1.5 hover:bg-[#d4af37]/5 rounded-lg transition-all border border-dashed border-[#d4af37]/25 cursor-pointer uppercase tracking-widest"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>
                      {expandedReviewsId === ex.id 
                        ? 'Hide Reviews' 
                        : `Read & Write Reviews (${reviews.filter((r: any) => r.excursionId === ex.id).length})`}
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedReviewsId === ex.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3 space-y-4"
                      >
                        {/* List of existing reviews for this specific excursion */}
                        <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
                          {reviews.filter((r: any) => r.excursionId === ex.id).length === 0 ? (
                            <p className="text-[10px] italic text-stone-500 text-center py-2">
                              No travelers have inscribed testimony yet. Be the first!
                            </p>
                          ) : (
                            reviews.filter((r: any) => r.excursionId === ex.id).map((r: any) => (
                              <div key={r.id} className="bg-[#120d09]/80 border border-stone-850 rounded-xl p-2.5 space-y-1">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-serif font-bold text-[#e6c280]">{r.author}</span>
                                  <div className="flex gap-0.5">
                                    {Array.from({ length: r.rating }).map((_, i) => (
                                      <Star key={i} className="w-2.5 h-2.5 fill-current text-amber-500" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-[10px] text-stone-300 leading-normal italic">
                                  "{r.comment}"
                                </p>
                                <span className="text-[8px] font-mono text-stone-500 block text-right">
                                  {r.date}
                                </span>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Inline Review Form */}
                        <div className="border-t border-[#d4af37]/15 pt-3 space-y-3 bg-[#110c08]/50 p-3 rounded-xl border border-stone-850">
                          {inlineSuccessId === ex.id ? (
                            <div className="text-center py-4 space-y-1.5">
                              <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto animate-bounce" />
                              <p className="text-xs font-serif font-semibold text-emerald-400 uppercase tracking-wider">
                                Testimony Inscribed!
                              </p>
                              <p className="text-[9px] font-mono text-stone-400">
                                Thy review has been saved in the ledger.
                              </p>
                            </div>
                          ) : (
                            <form onSubmit={(e) => handleInlineFeedbackSubmit(e, ex.id)} className="space-y-2.5">
                              <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#e6c280] flex items-center gap-1.5 font-bold">
                                <PenTool className="w-3 h-3 text-[#d4af37]" /> Write Review
                              </h4>

                              {/* Star Picker */}
                              <div className="flex items-center justify-between bg-stone-950/40 p-1.5 rounded-lg border border-stone-850">
                                <span className="text-[9px] font-mono text-stone-400 uppercase">Rating</span>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                      key={num}
                                      type="button"
                                      onClick={() => setInlineRating(num)}
                                      onMouseEnter={() => setHoveredInlineStar(num)}
                                      onMouseLeave={() => setHoveredInlineStar(null)}
                                      className="cursor-pointer transition-transform hover:scale-110 focus:outline-none text-stone-600"
                                    >
                                      <Star
                                        className={`w-4 h-4 transition-colors ${
                                          num <= (hoveredInlineStar ?? inlineRating)
                                            ? 'text-amber-400 fill-current drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]'
                                            : 'text-stone-800'
                                        }`}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  required
                                  placeholder="Thy Name"
                                  value={inlineAuthor}
                                  onChange={(e) => setInlineAuthor(e.target.value)}
                                  className="w-full bg-stone-950/40 border border-[#d4af37]/20 rounded-lg p-2 text-stone-200 text-[10px] focus:outline-none focus:border-[#d4af37] transition-colors"
                                />

                                <select
                                  value={inlineAvatar}
                                  onChange={(e) => setInlineAvatar(e.target.value)}
                                  className="w-full bg-stone-950/40 border border-[#d4af37]/20 rounded-lg p-1.5 text-stone-200 text-[10px] focus:outline-none focus:border-[#d4af37] transition-colors"
                                >
                                  <option value="𓁠 Cleopatra">𓁠 Cleopatra</option>
                                  <option value="𓀚 Ramses">𓀚 Ramses</option>
                                  <option value="𓁥 Hatshepsut">𓁥 Hatshepsut</option>
                                  <option value="𓃠 Bastet">𓃠 Bastet</option>
                                  <option value="𓆛 Sobek">𓆛 Sobek</option>
                                  <option value="𓅃 Horus">𓅃 Horus</option>
                                  <option value="𓋹 Anubis">𓋹 Anubis</option>
                                </select>
                              </div>

                              <textarea
                                required
                                rows={2}
                                placeholder="Share details of your excursion..."
                                value={inlineComment}
                                onChange={(e) => setInlineComment(e.target.value)}
                                className="w-full bg-stone-950/40 border border-[#d4af37]/20 rounded-lg p-2 text-stone-200 text-[10px] focus:outline-none focus:border-[#d4af37] transition-colors leading-relaxed"
                              />

                              <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#d4af37]/15 to-[#b08e23]/15 hover:from-[#d4af37]/30 hover:to-[#b08e23]/30 border border-[#d4af37]/35 text-[#e6c280] rounded-lg py-1.5 text-[9px] font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1 font-bold"
                              >
                                <Send className="w-3 h-3 text-[#d4af37]" /> Submit Review
                              </button>
                            </form>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Details & Booking Modal */}
      <AnimatePresence>
        {selectedExcursion && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#140f0c] border-2 border-[#d4af37] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedExcursion(null);
                  setIsBookingOpen(false);
                }}
                className="absolute top-4 right-4 bg-stone-900 border border-stone-800 text-stone-400 hover:text-white p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Message Banner */}
              {successMsg && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-6">
                  <CheckCircle className="text-[#d4af37] w-16 h-16 mb-4 animate-bounce" />
                  <h4 className="font-serif text-2xl font-bold text-[#e6c280] uppercase tracking-wider">
                    Expedition Inscribed!
                  </h4>
                  <p className="text-stone-300 text-sm mt-2 max-w-md">
                    By the grace of Ra, your booking requests have been logged inside the sacred ledger. Prepare thy bags, noble traveler!
                  </p>
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <span className="w-5 h-5 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></span>
                    <p className="text-stone-400 font-mono text-xs uppercase tracking-widest animate-pulse">
                      Redirecting to WhatsApp chat...
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Core Contents */}
              {!isBookingOpen ? (
                // VIEW DETAILS CONTENT
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={selectedExcursion.image}
                      alt={selectedExcursion.title}
                      className="w-full md:w-1/2 h-56 object-cover rounded-xl border border-[#d4af37]/30"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-3 md:w-1/2">
                      <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block">
                        Excursion Dossier
                      </span>
                      <h3 className="font-serif text-2xl font-black text-[#e6c280] uppercase tracking-wide">
                        {selectedExcursion.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-[#d4af37]" /> {selectedExcursion.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#d4af37]" /> {selectedExcursion.duration}
                        </span>
                        <button
                          onClick={() => {
                            setRatingExcursion(selectedExcursion);
                            setFeedbackRating(Math.round(selectedExcursion.rating) || 5);
                          }}
                          className="flex items-center gap-1 text-[#d4af37] hover:text-amber-300 transition-colors cursor-pointer bg-stone-900/50 border border-[#d4af37]/20 rounded-md px-2 py-0.5"
                          title="Click to Rate this Journey"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{selectedExcursion.rating ? selectedExcursion.rating.toFixed(1) : '0.0'}</span>
                        </button>
                      </div>
                      <p className="text-stone-300 text-xs leading-relaxed">
                        {selectedExcursion.description}
                      </p>
                    </div>
                  </div>

                  {/* Highlights & Inclusions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800">
                    <div className="space-y-2.5">
                      <h4 className="font-serif text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#d4af37]" /> Highlights of the Day
                      </h4>
                      <ul className="space-y-1.5 text-stone-300 text-xs list-disc list-inside">
                        {selectedExcursion.highlights.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="font-serif text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500" /> Royal Inclusions
                      </h4>
                      <ul className="space-y-1.5 text-stone-300 text-xs list-disc list-inside">
                        {selectedExcursion.inclusions.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Ancient Egypt Lore Deep Dive */}
                  <div className="bg-[#1f1914] border border-[#d4af37]/35 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-3 right-4 font-serif text-stone-700/40 text-4xl select-none pointer-events-none">
                      𓋹
                    </div>
                    <h4 className="font-serif text-[#d4af37] font-extrabold uppercase text-sm mb-1">
                      Ancient Egyptian Mysteries
                    </h4>
                    <p className="text-stone-300 text-xs leading-relaxed italic">
                      {selectedExcursion.ancientLore}
                    </p>
                  </div>

                  {/* Reviews & Testimonials specifically for this excursion */}
                  <div className="space-y-4 pt-4 border-t border-stone-800">
                    <h4 className="font-serif text-[#e6c280] font-bold uppercase text-sm flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#d4af37] fill-current" />
                      Explorer Witness Testimonies
                    </h4>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      Read what preceding noble travelers have inscribed about this specific caravan passage, or leave your own seal of approval below.
                    </p>
                    <ReviewSystem excursionId={selectedExcursion.id} />
                  </div>

                  {/* Pricing and Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-stone-800">
                    <div>
                      <span className="text-stone-500 text-xs uppercase tracking-widest block font-mono">Total Rate</span>
                      <strong className="text-3xl font-mono text-[#d4af37]">${selectedExcursion.price}</strong>
                      <span className="text-stone-400 text-xs font-normal"> / person</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          const msg = `𓂀 KEMET VOYAGES - EXPEDITION DOSSIER INQUIRY 𓂀\n\nGreetings Scribe! I was reviewing the beautiful details of "${selectedExcursion.title}" (${selectedExcursion.duration}) located in "${selectedExcursion.location}". Can you please advise me on availability, customization options, and seasonal discounts?`;
                          const url = `https://wa.me/201202181834?text=${encodeURIComponent(msg)}`;
                          window.open(url, '_blank') || (window.location.href = url);
                        }}
                        className="bg-emerald-950/25 hover:bg-emerald-900/35 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 font-mono text-xs uppercase tracking-widest py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span className="text-emerald-400 text-xs">𓍢</span> Inquire on WhatsApp
                      </button>
                      <button
                        onClick={() => setIsBookingOpen(true)}
                        className="bg-gradient-to-r from-[#d4af37] to-[#b08e23] hover:from-[#e5c250] hover:to-[#c5a02e] text-[#140f0a] font-serif font-black text-sm uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg shadow-[#d4af37]/20 cursor-pointer text-center"
                      >
                        Book Expedition Now
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // BOOKING FORM CONTENT
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest block">Expedition Booking Ledger</span>
                    <h3 className="font-serif text-2xl font-black text-[#e6c280] uppercase tracking-wider mt-1">
                      Request Royal Passage
                    </h3>
                    <p className="text-stone-400 text-xs">
                      Enlist in the expedition: {selectedExcursion.title} (${selectedExcursion.price} per person)
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-stone-300 text-xs font-mono uppercase tracking-widest flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#d4af37]" /> Traveler Name
                        </label>
                        <input
                          type="text"
                          required
                          value={travelerName}
                          onChange={(e) => setTravelerName(e.target.value)}
                          placeholder="Your Name (e.g. Ramses Smith)"
                          className="w-full bg-[#1c1611] border border-[#d4af37]/40 rounded-lg p-2.5 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                          id="booking-name"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-stone-300 text-xs font-mono uppercase tracking-widest flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#d4af37]" /> Messenger Email
                        </label>
                        <input
                          type="email"
                          required
                          value={travelerEmail}
                          onChange={(e) => setTravelerEmail(e.target.value)}
                          placeholder="your.messenger@domain.com"
                          className="w-full bg-[#1c1611] border border-[#d4af37]/40 rounded-lg p-2.5 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                          id="booking-email"
                        />
                      </div>

                      {/* Date */}
                      <div className="space-y-1">
                        <label className="text-stone-300 text-xs font-mono uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Departure Date
                        </label>
                        <input
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-[#1c1611] border border-[#d4af37]/40 rounded-lg p-2.5 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                          id="booking-date"
                        />
                      </div>

                      {/* Guests */}
                      <div className="space-y-1">
                        <label className="text-stone-300 text-xs font-mono uppercase tracking-widest flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#d4af37]" /> Size of Caravan (Guests)
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={15}
                          required
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full bg-[#1c1611] border border-[#d4af37]/40 rounded-lg p-2.5 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                          id="booking-guests"
                        />
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-1">
                      <label className="text-stone-300 text-xs font-mono uppercase tracking-widest flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" /> Inscribe Special Requests
                      </label>
                      <textarea
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                        placeholder="Dietary requests, pick-up room numbers, physical constraints..."
                        rows={3}
                        className="w-full bg-[#1c1611] border border-[#d4af37]/30 rounded-lg p-3 text-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                        id="booking-requests"
                      />
                    </div>

                    {/* Price calculation summary */}
                    <div className="bg-[#241a12] border border-[#d4af37]/20 rounded-xl p-4 flex justify-between items-center text-xs">
                      <span className="text-stone-400 font-mono uppercase">Caravan Passage Cost:</span>
                      <strong className="text-xl font-mono text-[#d4af37]">${selectedExcursion.price} × {guests} = ${selectedExcursion.price * guests}</strong>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-4 justify-end">
                      <button
                        type="button"
                        onClick={() => setIsBookingOpen(false)}
                        className="bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 px-6 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-[#d4af37] text-[#140f0a] font-serif font-black text-xs uppercase tracking-widest px-8 py-2.5 rounded-lg shadow-md shadow-[#d4af37]/15 cursor-pointer hover:bg-amber-300"
                        id="submit-passage-btn"
                      >
                        Submit Passage Inscription
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pharaonic Feedback Tablet (Interactive Rating Widget Modal) */}
      <AnimatePresence>
        {ratingExcursion && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#140f0c] border-2 border-[#d4af37] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative p-6 md:p-8"
            >
              {/* Decorative Horus Eye background */}
              <div className="absolute top-2 right-4 text-stone-900/25 font-serif text-6xl select-none pointer-events-none">
                𓂀
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setRatingExcursion(null)}
                className="absolute top-4 right-4 bg-stone-900 border border-stone-800 text-stone-400 hover:text-white p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {feedbackSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="inline-flex bg-gradient-to-br from-[#d4af37] to-amber-500 p-4 rounded-full border border-[#d4af37]/35 shadow-lg animate-bounce">
                    <Sparkles className="w-8 h-8 text-[#140f0a]" />
                  </div>
                  <h4 className="font-serif text-2xl font-black text-[#e6c280] uppercase tracking-wider">
                    Feedback Inscribed!
                  </h4>
                  <p className="text-stone-300 text-xs max-w-sm mx-auto leading-relaxed">
                    By the eternal wisdom of Thoth, your sacred review has been etched onto the permanent tablets of Kemet. May the gods bless your travels!
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400 animate-pulse uppercase tracking-widest pt-2">
                    𓋹 Aligning Celestial Averages...
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.2em] block">Inscribe Feedback Tablet</span>
                    <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wide">
                      {ratingExcursion.title}
                    </h3>
                    <p className="text-stone-400 text-xs">
                      Share your genuine traveler testimony & rate this voyage
                    </p>
                  </div>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    {/* Interactive Star Picker */}
                    <div className="bg-[#1b1511] border border-[#d4af37]/20 rounded-2xl p-4 text-center space-y-2">
                      <label className="text-stone-400 text-[10px] font-mono uppercase tracking-widest block">
                        Select Sacred Rating
                      </label>
                      <div className="flex justify-center gap-3 py-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setFeedbackRating(num)}
                            onMouseEnter={() => setHoveredFeedbackStar(num)}
                            onMouseLeave={() => setHoveredFeedbackStar(null)}
                            className="cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                            title={`${num} Star${num > 1 ? 's' : ''}`}
                          >
                            <Star
                              className={`w-8 h-8 transition-all ${
                                num <= (hoveredFeedbackStar ?? feedbackRating) 
                                  ? 'text-amber-400 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' 
                                  : 'text-stone-800 border-stone-900'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-stone-500 text-[11px] font-mono uppercase tracking-widest block h-4">
                        {feedbackRating === 5 ? "👑 Worthy of the Gods!" :
                         feedbackRating === 4 ? "✨ Splendid Caravan Journey!" :
                         feedbackRating === 3 ? "👍 Satisfactory Alignment" :
                         feedbackRating === 2 ? "⚠️ Deshret Dust Storms" :
                         "❌ Lost in the Duat!"} ({feedbackRating} / 5 Stars)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-stone-400 text-[10px] font-mono uppercase tracking-widest block">
                          Your Noble Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Cleopatra Johnson"
                          value={feedbackAuthor}
                          onChange={(e) => setFeedbackAuthor(e.target.value)}
                          className="w-full bg-[#1c1611] border border-[#d4af37]/35 rounded-xl p-2.5 text-stone-200 text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                        />
                      </div>

                      {/* Avatar */}
                      <div className="space-y-1">
                        <label className="text-stone-400 text-[10px] font-mono uppercase tracking-widest block">
                          Pharaonic Persona
                        </label>
                        <select
                          value={feedbackAvatar}
                          onChange={(e) => setFeedbackAvatar(e.target.value)}
                          className="w-full bg-[#1c1611] border border-[#d4af37]/35 rounded-xl p-2.5 text-stone-200 text-xs focus:outline-none focus:border-[#d4af37] transition-colors"
                        >
                          <option value="𓁠 Cleopatra">𓁠 Cleopatra the Diver</option>
                          <option value="𓀚 Ramses">𓀚 Ramses the Nomad</option>
                          <option value="𓁥 Hatshepsut">𓁥 Hatshepsut the Scribe</option>
                          <option value="𓃠 Bastet">𓃠 Bastet the Explorer</option>
                          <option value="𓆛 Sobek">𓆛 Sobek the Mariner</option>
                          <option value="𓅃 Horus">𓅃 Horus the Speedster</option>
                          <option value="𓋹 Anubis">𓋹 Anubis the Guardian</option>
                        </select>
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-1">
                      <label className="text-stone-400 text-[10px] font-mono uppercase tracking-widest block">
                        Witness Testimony
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Write thy feedback... (e.g., The coral reef was mindblowing, the guide was very informative!)"
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        className="w-full bg-[#1c1611] border border-[#d4af37]/35 rounded-xl p-3 text-stone-200 text-xs focus:outline-none focus:border-[#d4af37] transition-colors leading-relaxed"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setRatingExcursion(null)}
                        className="flex-1 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer"
                      >
                        Banish Tablet
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#b08e23] hover:from-[#e5c250] hover:to-[#c5a02e] text-[#140f0a] font-bold py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Inscribe Testimony
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
