import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Shield,
  Users,
  Award,
  DollarSign,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  FileText,
  Mail,
  MessageSquare,
  Compass,
  Send,
  Check,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Settings,
  Briefcase,
  Layers,
  ChevronDown,
  Sparkles,
  BookOpen,
  MapPin,
  Clock,
  ThumbsUp,
  UserPlus
} from 'lucide-react';
import { Booking, Excursion, Review, ScribeMessage } from '../types';

// Initial Excursions from Catalog for fallback
const INITIAL_EXCURSIONS_DATA: Excursion[] = [
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

export interface TravelerCRMProfile {
  id: string;
  name: string;
  email: string;
  vipTier: 'Noble' | 'High Priest' | 'Royal Prince' | 'Pharaoh';
  leadStatus: 'Warm Prospect' | 'Deposited Pilgrim' | 'Eternal Royal Traveler' | 'Closed Lost';
  totalSpend: number;
  lastActive: string;
  scribeNotes: string;
  inquiriesCount: number;
}

const INITIAL_CRM_PROFILES: TravelerCRMProfile[] = [
  {
    id: 'crm-1',
    name: "Cleopatra the Diver",
    email: "cleo.ocean@royal-kemet.com",
    vipTier: "Pharaoh",
    leadStatus: "Eternal Royal Traveler",
    totalSpend: 540,
    lastActive: "2026-06-20",
    scribeNotes: "Deep love for scuba diving in Ras Mohammed. Prefers private maritime escorts and certified Egyptologist guides.",
    inquiriesCount: 5
  },
  {
    id: 'crm-2',
    name: "Ramses the Nomad",
    email: "ramses.great@deshret-safaris.org",
    vipTier: "Royal Prince",
    leadStatus: "Deposited Pilgrim",
    totalSpend: 225,
    lastActive: "2026-07-01",
    scribeNotes: "Excellent quad driver. Demands premium organic Bedouin flatbread and high-magnification astronomical equipment for celestial stargazing.",
    inquiriesCount: 3
  },
  {
    id: 'crm-3',
    name: "Hatshepsut the Explorer",
    email: "hatshepsut@luxor-tours.net",
    vipTier: "High Priest",
    leadStatus: "Deposited Pilgrim",
    totalSpend: 360,
    lastActive: "2026-07-11",
    scribeNotes: "Interested in the architectural history of Hatshepsut Temple. Booked sunset Felucca with a private harpist.",
    inquiriesCount: 4
  },
  {
    id: 'crm-4',
    name: "Nefertiti Noble",
    email: "nefertiti.beauty@beauty-kemet.com",
    vipTier: "Noble",
    leadStatus: "Warm Prospect",
    totalSpend: 0,
    lastActive: "2026-07-14",
    scribeNotes: "Looking for an immersive couples retreat. Interested in both Ras Mohammed marine life and Luxor historical tombs.",
    inquiriesCount: 2
  }
];

interface AdminDashboardProps {
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onCancelBooking: (id: string) => void;
  onUpdateBookingsList: (updated: Booking[]) => void;
}

type CRMTab = 'dashboard' | 'caravans' | 'nobles' | 'offerings' | 'testimonies' | 'oracle' | 'subscribers';

export default function AdminDashboard({
  bookings,
  onUpdateBookingStatus,
  onCancelBooking,
  onUpdateBookingsList
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<CRMTab>('dashboard');

  // Subscribers state
  const [subscribers, setSubscribers] = useState<any[]>(() => {
    const saved = localStorage.getItem('kemet_newsletter_signups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    const INITIAL_SUBS = [
      {
        id: 'sub-seed-1',
        email: 'alexander.great@macedon.org',
        interests: ['diving', 'history'],
        tier: 'pharaoh',
        signupDate: '2026-07-10',
        promoCode: 'RAMSES-8821-30'
      },
      {
        id: 'sub-seed-2',
        email: 'hypatia.scribe@alexandrialibrary.edu',
        interests: ['history'],
        tier: 'scribe',
        signupDate: '2026-07-12',
        promoCode: 'RAMSES-1029-30'
      }
    ];
    localStorage.setItem('kemet_newsletter_signups', JSON.stringify(INITIAL_SUBS));
    return INITIAL_SUBS;
  });

  // Synchronize subscribers from local storage
  useEffect(() => {
    const syncSubs = () => {
      const saved = localStorage.getItem('kemet_newsletter_signups');
      if (saved) {
        try {
          setSubscribers(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener('kemet_subscribers_updated', syncSubs);
    return () => {
      window.removeEventListener('kemet_subscribers_updated', syncSubs);
    };
  }, []);

  // Core CRM States backed by localStorage
  const [excursions, setExcursions] = useState<Excursion[]>(() => {
    const saved = localStorage.getItem('kemet_excursions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Excursion[];
        const merged = [...parsed];
        INITIAL_EXCURSIONS_DATA.forEach(initial => {
          if (!merged.some(ex => ex.id === initial.id)) {
            merged.push(initial);
          }
        });
        return merged;
      } catch (e) {
        return INITIAL_EXCURSIONS_DATA;
      }
    }
    return INITIAL_EXCURSIONS_DATA;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('kemet_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  const [crmProfiles, setCrmProfiles] = useState<TravelerCRMProfile[]>(() => {
    const saved = localStorage.getItem('kemet_crm_profiles');
    if (saved) return JSON.parse(saved);
    // Otherwise seed with initials plus any names from bookings
    return INITIAL_CRM_PROFILES;
  });

  const [oracleLogs, setOracleLogs] = useState<any[]>(() => {
    const saved = localStorage.getItem('kemet_oracle_chats_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        name: "Nefertiti Prospect",
        email: "nefertiti.beauty@beauty-kemet.com",
        query: "What is the ancient lore behind the sea god Nun at Ras Mohammed?",
        time: "2026-07-14 14:32"
      },
      {
        id: 'log-2',
        name: "Marc Antony Noble",
        email: "antony.rome@empire.org",
        query: "Do you have chariot tours crossing from Hurghada to Luxor for the Hypostyle Hall?",
        time: "2026-07-14 11:15"
      }
    ];
  });

  // Interactive Revenue Forecaster & Caravan Ledger Search/Filters state
  const [targetRevenue, setTargetRevenue] = useState<number>(5000);
  const [caravanSearch, setCaravanSearch] = useState<string>("");
  const [caravanStatusFilter, setCaravanStatusFilter] = useState<string>("all");

  // Edit / Add Excursion States
  const [editingExcursion, setEditingExcursion] = useState<Excursion | null>(null);
  const [isAddOfferingOpen, setIsAddOfferingOpen] = useState<boolean>(false);
  const [newExTitle, setNewExTitle] = useState<string>("");
  const [newExTagline, setNewExTagline] = useState<string>("");
  const [newExCategory, setNewExCategory] = useState<'diving' | 'safari' | 'history' | 'boat' | 'speedboat'>("diving");
  const [newExDuration, setNewExDuration] = useState<string>("Full Day (8 Hours)");
  const [newExPrice, setNewExPrice] = useState<number>(100);
  const [newExLocation, setNewExLocation] = useState<string>("Red Sea, Egypt");
  const [newExImage, setNewExImage] = useState<string>("/src/assets/images/egypt_sea_diving_1784070366165.jpg");
  const [newExDesc, setNewExDesc] = useState<string>("");
  const [newExLore, setNewExLore] = useState<string>("");

  // Traveler CRM Edit States
  const [editingProfile, setEditingProfile] = useState<TravelerCRMProfile | null>(null);
  const [filterVip, setFilterVip] = useState<string>("all");
  const [filterLead, setFilterLead] = useState<string>("all");
  const [crmSearch, setCrmSearch] = useState<string>("");

  // Feedback Notification
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Bulk Actions selection state for Caravan Ledger
  const [selectedBookingIds, setSelectedBookingIds] = useState<string[]>([]);

  // Clear selected bookings whenever the active tab or caravan filters change
  useEffect(() => {
    setSelectedBookingIds([]);
  }, [activeTab, caravanStatusFilter]);

  // Sync state helpers
  const triggerNotification = (text: string, type: 'success' | 'info' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBulkApprove = () => {
    if (selectedBookingIds.length === 0) return;
    
    let count = 0;
    const updated = bookings.map(b => {
      if (selectedBookingIds.includes(b.id)) {
        if (b.status === 'Pending Oracle Approval') {
          count++;
          return { ...b, status: 'Confirmed by High Priest' as const };
        } else if (b.status === 'Confirmed by High Priest') {
          count++;
          return { ...b, status: 'Completed' as const };
        }
      }
      return b;
    });

    onUpdateBookingsList(updated);
    setSelectedBookingIds([]);
    triggerNotification(`Approved & advanced ${count} selected bookings!`);
  };

  const handleBulkCancel = () => {
    if (selectedBookingIds.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedBookingIds.length} selected bookings from the sacred ledger?`)) {
      const count = selectedBookingIds.length;
      const updated = bookings.filter(b => !selectedBookingIds.includes(b.id));
      onUpdateBookingsList(updated);
      setSelectedBookingIds([]);
      triggerNotification(`Banished ${count} selected bookings from ledger`);
    }
  };

  useEffect(() => {
    localStorage.setItem('kemet_excursions', JSON.stringify(excursions));
  }, [excursions]);

  useEffect(() => {
    localStorage.setItem('kemet_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('kemet_crm_profiles', JSON.stringify(crmProfiles));
  }, [crmProfiles]);

  useEffect(() => {
    localStorage.setItem('kemet_oracle_chats_logs', JSON.stringify(oracleLogs));
  }, [oracleLogs]);

  // Compile Dynamic CRM Profiles based on new bookings automatically
  useEffect(() => {
    let updatedProfiles = [...crmProfiles];
    let profilesChanged = false;

    bookings.forEach((booking) => {
      const exists = updatedProfiles.find(
        (p) => p.email.toLowerCase() === booking.travelerEmail.toLowerCase()
      );

      if (!exists) {
        // Automatically spawn a new traveler CRM profile!
        const newProfile: TravelerCRMProfile = {
          id: `crm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: booking.travelerName,
          email: booking.travelerEmail,
          vipTier: 'Noble',
          leadStatus: 'Deposited Pilgrim',
          totalSpend: booking.totalCost,
          lastActive: booking.date,
          scribeNotes: `Automatically created from Booking of: ${booking.excursionTitle}. Special Requests listed: ${booking.specialRequests || 'None'}`,
          inquiriesCount: 1
        };
        updatedProfiles.push(newProfile);
        profilesChanged = true;
      } else {
        // Update their total spend if changed
        const currentBookingSpend = bookings
          .filter((b) => b.travelerEmail.toLowerCase() === booking.travelerEmail.toLowerCase())
          .reduce((sum, b) => sum + b.totalCost, 0);

        if (exists.totalSpend !== currentBookingSpend) {
          exists.totalSpend = currentBookingSpend;
          exists.lastActive = booking.date;
          if (exists.leadStatus === 'Warm Prospect') {
            exists.leadStatus = 'Deposited Pilgrim';
          }
          profilesChanged = true;
        }
      }
    });

    if (profilesChanged) {
      setCrmProfiles(updatedProfiles);
    }
  }, [bookings]);

  // Analytics Computations
  const totalGoldCoins = bookings
    .filter((b) => b.status === 'Confirmed by High Priest' || b.status === 'Completed')
    .reduce((sum, b) => sum + b.totalCost, 0);

  const pendingGoldCoins = bookings
    .filter((b) => b.status === 'Pending Oracle Approval')
    .reduce((sum, b) => sum + b.totalCost, 0);

  const conversionRate = crmProfiles.length
    ? Math.round((crmProfiles.filter((p) => p.leadStatus === 'Deposited Pilgrim' || p.leadStatus === 'Eternal Royal Traveler').length / crmProfiles.length) * 100)
    : 0;

  const avgExcursionPrice = excursions.length 
    ? Math.round(excursions.reduce((sum, ex) => sum + ex.price, 0) / excursions.length) 
    : 100;

  const bookingsNeeded = Math.ceil(targetRevenue / (avgExcursionPrice || 1));

  const progressPercentage = targetRevenue > 0 
    ? Math.min(Math.round((totalGoldCoins / targetRevenue) * 100), 100) 
    : 0;

  // Review status
  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    triggerNotification("Testimony deleted from the sacred public board");
  };

  const handlePurgeAllData = async () => {
    if (window.confirm("𓋹 WARNING: You are about to initiate a TOTAL PURGE of the sacred records! This will permanently delete all customer bookings, active traveler cards, user reviews, newsletter subscriptions, and chat transcripts. This action is irreversible. Proceed?")) {
      const passcode = localStorage.getItem('kemet_admin_passcode') || 'pharaoh';
      try {
        const response = await fetch('/api/admin/purge', {
          method: 'POST',
          headers: { 'x-admin-passcode': passcode }
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
        }
      } catch (err) {
        console.error("Failed to purge server database:", err);
      }

      localStorage.setItem('kemet_bookings', JSON.stringify([]));
      localStorage.setItem('kemet_reviews', JSON.stringify([]));
      localStorage.setItem('kemet_newsletter_signups', JSON.stringify([]));
      localStorage.setItem('kemet_oracle_chats_logs', JSON.stringify([]));
      localStorage.setItem('kemet_crm_profiles', JSON.stringify([]));
      localStorage.setItem('kemet_excursions', JSON.stringify(INITIAL_EXCURSIONS_DATA));

      setReviews([]);
      setCrmProfiles([]);
      setOracleLogs([]);
      setSubscribers([]);
      setExcursions(INITIAL_EXCURSIONS_DATA);
      onUpdateBookingsList([]);

      window.dispatchEvent(new Event('kemet_reviews_updated'));
      window.dispatchEvent(new Event('kemet_excursions_updated'));
      window.dispatchEvent(new Event('kemet_subscribers_updated'));

      triggerNotification("Sacred Sanctuary Cleansed! All demo data purged.", "info");
    }
  };

  const handleRestoreDivineSeeds = async () => {
    if (window.confirm("Do you wish to populate the sanctuary with premium pre-configured traveler data, reviews, and bookings for testing/presentation?")) {
      const passcode = localStorage.getItem('kemet_admin_passcode') || 'pharaoh';
      try {
        const response = await fetch('/api/admin/seed', {
          method: 'POST',
          headers: { 'x-admin-passcode': passcode }
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
        }
      } catch (err) {
        console.error("Failed to seed server database:", err);
      }

      const SEED_BOOKINGS: Booking[] = [
        {
          id: 'b-seed-1',
          excursionId: 'diving-1',
          excursionTitle: 'Ras Mohammed Royal Coral Diving',
          travelerName: 'Cleopatra the Diver',
          travelerEmail: 'cleo.ocean@royal-kemet.com',
          date: '2026-07-20',
          numberOfGuests: 2,
          totalCost: 240,
          specialRequests: 'Prefers private boat transfer and certified diving guides',
          status: 'Confirmed by High Priest',
          createdAt: new Date('2026-07-10').toISOString()
        },
        {
          id: 'b-seed-2',
          excursionId: 'safari-1',
          excursionTitle: "Set's Golden Deshret Safari",
          travelerName: 'Ramses the Nomad',
          travelerEmail: 'ramses.great@deshret-safaris.org',
          date: '2026-07-22',
          numberOfGuests: 3,
          totalCost: 225,
          specialRequests: 'Demands premium quad bikes and heavy star alignments info',
          status: 'Pending Oracle Approval',
          createdAt: new Date('2026-07-12').toISOString()
        }
      ];

      const SEED_REVIEWS: Review[] = [
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
         }
      ];

      const SEED_SUBS = [
        {
          id: 'sub-seed-1',
          email: 'alexander.great@macedon.org',
          interests: ['diving', 'history'],
          tier: 'pharaoh',
          signupDate: '2026-07-10',
          promoCode: 'RAMSES-8821-30'
        },
        {
          id: 'sub-seed-2',
          email: 'hypatia.scribe@alexandrialibrary.edu',
          interests: ['history'],
          tier: 'scribe',
          signupDate: '2026-07-12',
          promoCode: 'RAMSES-1029-30'
        }
      ];

      const SEED_ORACLE_LOGS = [
        {
          id: 'log-1',
          name: "Nefertiti Prospect",
          email: "nefertiti.beauty@beauty-kemet.com",
          query: "What is the ancient lore behind the sea god Nun at Ras Mohammed?",
          time: "2026-07-14 14:32"
        },
        {
          id: 'log-2',
          name: "Marc Antony Noble",
          email: "antony.rome@empire.org",
          query: "Do you have chariot tours crossing from Hurghada to Luxor for the Hypostyle Hall?",
          time: "2026-07-14 11:15"
        }
      ];

      localStorage.setItem('kemet_bookings', JSON.stringify(SEED_BOOKINGS));
      localStorage.setItem('kemet_reviews', JSON.stringify(SEED_REVIEWS));
      localStorage.setItem('kemet_newsletter_signups', JSON.stringify(SEED_SUBS));
      localStorage.setItem('kemet_oracle_chats_logs', JSON.stringify(SEED_ORACLE_LOGS));
      localStorage.setItem('kemet_crm_profiles', JSON.stringify(INITIAL_CRM_PROFILES));
      localStorage.setItem('kemet_excursions', JSON.stringify(INITIAL_EXCURSIONS_DATA));

      setReviews(SEED_REVIEWS);
      setCrmProfiles(INITIAL_CRM_PROFILES);
      setOracleLogs(SEED_ORACLE_LOGS);
      setSubscribers(SEED_SUBS);
      setExcursions(INITIAL_EXCURSIONS_DATA);
      onUpdateBookingsList(SEED_BOOKINGS);

      window.dispatchEvent(new Event('kemet_reviews_updated'));
      window.dispatchEvent(new Event('kemet_excursions_updated'));
      window.dispatchEvent(new Event('kemet_subscribers_updated'));

      triggerNotification("Divine seeds successfully sown inside the registry!");
    }
  };

  const handleSimulateRandomBooking = async () => {
    const randomNames = ["Anubis Voyager", "Isis Pilgrim", "Osiris Nomad", "Thoth Explorer", "Sobek Diver", "Nut Gazer"];
    const randomEmails = ["anubis@underworld.org", "isis.heals@sacred.com", "osiris.lord@aaru.net", "thoth.wisdom@library.edu", "sobek.waters@nile.com", "nut.sky@stars.org"];
    const randomRequests = ["Wants to see dolphin pods and ancient hieroglyph marks", "Requires cold water at all stops", "Prefers early morning desert departures", "Wishes to have an extra scroll copy", "Vegetarian food options requested"];
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    const chosenEx = excursions[Math.floor(Math.random() * excursions.length)] || INITIAL_EXCURSIONS_DATA[0];
    const numGuests = Math.floor(Math.random() * 4) + 1;

    const simulatedBooking = {
      excursionId: chosenEx.id,
      excursionTitle: chosenEx.title,
      travelerName: randomNames[randomIndex],
      travelerEmail: randomEmails[randomIndex],
      date: new Date(Date.now() + 86400000 * (Math.floor(Math.random() * 15) + 3)).toISOString().split('T')[0],
      numberOfGuests: numGuests,
      totalCost: chosenEx.price * numGuests,
      specialRequests: randomRequests[Math.floor(Math.random() * randomRequests.length)]
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulatedBooking)
      });
      if (response.ok) {
        const savedBooking = await response.json();
        const updatedBookings = [savedBooking, ...bookings];
        onUpdateBookingsList(updatedBookings);
        localStorage.setItem('kemet_bookings', JSON.stringify(updatedBookings));
        triggerNotification(`Simulated booking received from ${savedBooking.travelerName}!`);
      }
    } catch (err) {
      console.error("Failed to post simulated booking:", err);
      const fbBooking: Booking = {
        id: `b-sim-${Date.now()}`,
        ...simulatedBooking,
        status: 'Pending Oracle Approval',
        createdAt: new Date().toISOString()
      };
      const updatedBookings = [fbBooking, ...bookings];
      onUpdateBookingsList(updatedBookings);
      localStorage.setItem('kemet_bookings', JSON.stringify(updatedBookings));
      triggerNotification(`Simulated booking received from ${fbBooking.travelerName}!`);
    }
  };

  // Excursion management
  const handleAddExcursionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExTitle || !newExDesc) return;

    const newEx = {
      title: newExTitle,
      tagline: newExTagline || "Eternally curated pharaonic voyage",
      category: newExCategory,
      duration: newExDuration,
      price: newExPrice,
      rating: 5.0,
      location: newExLocation,
      image: newExImage,
      description: newExDesc,
      inclusions: ["Premium transport under royal flag", "Certified High Priest Guides", "Fresh water of the Nile"],
      highlights: ["Inspect unique architectural glyphs", "Engage with desert/maritime local tribes"],
      ancientLore: newExLore || "This sacred terrain was aligned by Imhotep to match the solar zenith, granting safety to all travelers under the eye of Horus."
    };

    const passcode = localStorage.getItem('kemet_admin_passcode') || 'pharaoh';
    try {
      const response = await fetch('/api/excursions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode
        },
        body: JSON.stringify(newEx)
      });
      if (response.ok) {
        const updatedCatalog = await response.json();
        setExcursions(updatedCatalog);
        localStorage.setItem('kemet_excursions', JSON.stringify(updatedCatalog));
        window.dispatchEvent(new Event('kemet_excursions_updated'));
        triggerNotification("Divine Excursion added to the active catalog!");
      }
    } catch (err) {
      console.error("Failed to add excursion to server:", err);
    }

    setIsAddOfferingOpen(false);
    setNewExTitle("");
    setNewExTagline("");
    setNewExDesc("");
    setNewExLore("");
  };

  const handleEditExcursionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExcursion) return;

    const passcode = localStorage.getItem('kemet_admin_passcode') || 'pharaoh';
    try {
      const response = await fetch('/api/excursions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode
        },
        body: JSON.stringify(editingExcursion)
      });
      if (response.ok) {
        const updatedCatalog = await response.json();
        setExcursions(updatedCatalog);
        localStorage.setItem('kemet_excursions', JSON.stringify(updatedCatalog));
        window.dispatchEvent(new Event('kemet_excursions_updated'));
        triggerNotification("Sacred offering updated successfully.");
      }
    } catch (err) {
      console.error("Failed to update excursion on server:", err);
    }

    setEditingExcursion(null);
  };

  const handleDeleteExcursion = async (id: string) => {
    if (window.confirm("Are you sure you wish to banish this excursion offering from Kemet?")) {
      const passcode = localStorage.getItem('kemet_admin_passcode') || 'pharaoh';
      try {
        const response = await fetch(`/api/excursions/${id}`, {
          method: 'DELETE',
          headers: { 'x-admin-passcode': passcode }
        });
        if (response.ok) {
          const updatedCatalog = await response.json();
          setExcursions(updatedCatalog);
          localStorage.setItem('kemet_excursions', JSON.stringify(updatedCatalog));
          window.dispatchEvent(new Event('kemet_excursions_updated'));
          triggerNotification("Offering banished from catalog", "info");
        }
      } catch (err) {
        console.error("Failed to delete excursion on server:", err);
      }
    }
  };

  // Traveler Profile Scribe notes edit
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;

    const updated = crmProfiles.map((p) => (p.id === editingProfile.id ? editingProfile : p));
    setCrmProfiles(updated);
    setEditingProfile(null);
    triggerNotification("Traveler relationship card updated");
  };

  // Compose an email draft in the voice of Sennedjem
  const composeScribeEmailDraft = (profile: TravelerCRMProfile) => {
    const drafts = [
      `Hello ${profile.name}!\n\nI am your Kemet Travel Assistant. I have recorded your travel preferences and marked your interest in Kemet. Your current status is: [${profile.leadStatus}].\n\nWe are looking forward to designing an unforgettable tour for you. May your journey with Kemet Tours - Powered by Mas international Agency be wonderful and secure!\n\nBest regards,\nKemet Tours Team`,
      `Hello ${profile.name}!\n\nAs we prepare our custom boats and desert safaris, our team has noted your request: "${profile.scribeNotes.slice(0, 80)}...". We are preparing a customized golden itinerary for you.\n\nLet us know how we can make your dream trip a reality.\n\nSafe travels,\nKemet Travel Team`
    ];
    alert(`AUTOMATED TRAVEL CRM EMAIL DRAFT FOR ${profile.name.toUpperCase()}:\n\n${drafts[Math.floor(Math.random() * drafts.length)]}`);
  };

  // Filter Profiles
  const filteredProfiles = crmProfiles.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(crmSearch.toLowerCase()) || p.email.toLowerCase().includes(crmSearch.toLowerCase());
    const matchesVip = filterVip === 'all' || p.vipTier === filterVip;
    const matchesLead = filterLead === 'all' || p.leadStatus === filterLead;
    return matchesSearch && matchesVip && matchesLead;
  });

  return (
    <div className="bg-[#0f0c09] border-2 border-[#d4af37]/60 rounded-3xl p-6 space-y-8 relative overflow-hidden" id="crm-dashboard-root">
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Title & Action Notifications */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#d4af37]/30 pb-5">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#d4af37] to-[#8e6b12] p-3 rounded-2xl shadow-lg border border-[#d4af37]/40">
            <Shield className="text-[#140f0a] w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-[#d4af37]/25">
                Staff Only • High Priest Clearance
              </span>
            </div>
            <h2 className="font-serif text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#faf5e6] via-[#d4af37] to-[#e6c280] uppercase tracking-wider mt-1">
              Royal Scribe Admin Dashboard
            </h2>
          </div>
        </div>

        {/* Live Feedback Toast inside the CRM */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-2 border shadow-lg ${
                notification.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {notification.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CRM Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-4">
        {[
          { key: 'dashboard', label: '📊 Command Dashboard', desc: 'Financial & Lead funnels' },
          { key: 'caravans', label: '𓎬 Caravan Ledger', desc: `${bookings.length} active bookings` },
          { key: 'nobles', label: '𓀚 Traveler CRM', desc: `${crmProfiles.length} traveler cards` },
          { key: 'offerings', label: '𓆛 Offerings Catalog', desc: `${excursions.length} active trips` },
          { key: 'testimonies', label: '𓁠 Review Moderation', desc: 'Verify traveler testimonies' },
          { key: 'oracle', label: '𓋹 Oracle Lead Logs', desc: 'Inspect recent chats' },
          { key: 'subscribers', label: '𓇚 Imperial Scrolls', desc: `${subscribers.length} newsletter signups` }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key as CRMTab);
              setEditingProfile(null);
              setEditingExcursion(null);
            }}
            className={`px-4 py-3 rounded-xl transition-all duration-300 text-left cursor-pointer border flex flex-col justify-between ${
              activeTab === tab.key
                ? 'bg-gradient-to-b from-[#2a2016] to-[#1c140e] border-[#d4af37] text-[#f3e5c8] shadow-md shadow-[#d4af37]/5'
                : 'bg-[#15110d]/50 border-transparent text-stone-400 hover:text-[#e6c280] hover:bg-[#1f1913]/40'
            }`}
          >
            <span className="text-xs font-serif font-black uppercase tracking-wider">{tab.label}</span>
            <span className="text-[9px] font-mono text-stone-500 mt-1 uppercase tracking-widest">{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[450px]">
        
        {/* TAB 1: EXECUTIVE ANALYTICS DASHBOARD */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Gold Treasury */}
              <div className="bg-[#18120d] border border-[#d4af37]/30 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-[#d4af37] to-[#8e6b12]"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest block">Gold Coins Collected</span>
                    <strong className="text-3xl font-mono text-[#d4af37] block mt-1">${totalGoldCoins}</strong>
                    <span className="text-xs text-stone-400 mt-1 block">From confirmed expeditions</span>
                  </div>
                  <div className="bg-[#d4af37]/10 p-2 rounded-xl text-[#d4af37]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Pending Tribute */}
              <div className="bg-[#18120d] border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-1 w-full bg-amber-500/40"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest block">Pending Caravan Value</span>
                    <strong className="text-3xl font-mono text-amber-400 block mt-1">${pendingGoldCoins}</strong>
                    <span className="text-xs text-amber-500/80 mt-1 block">Awaiting High Priest seal</span>
                  </div>
                  <div className="bg-amber-500/10 p-2 rounded-xl text-amber-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Total CRM Profiles */}
              <div className="bg-[#18120d] border border-[#d4af37]/20 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-1 w-full bg-amber-300/30"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest block">Sovereign Traveler Profiles</span>
                    <strong className="text-3xl font-mono text-stone-200 block mt-1">{crmProfiles.length}</strong>
                    <span className="text-xs text-stone-400 mt-1 block">Registered in sacred ledger</span>
                  </div>
                  <div className="bg-[#d4af37]/10 p-2 rounded-xl text-stone-300">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-[#18120d] border border-[#d4af37]/20 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-1 w-full bg-emerald-500/30"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-stone-500 text-[10px] font-mono uppercase tracking-widest block">Lead Conversion Efficiency</span>
                    <strong className="text-3xl font-mono text-emerald-400 block mt-1">{conversionRate}%</strong>
                    <span className="text-xs text-stone-400 mt-1 block">Inquirers to booking depositors</span>
                  </div>
                  <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>

            </div>

            {/* Middle Section: Funnel Visualization & Excursion Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Funnel Layout */}
              <div className="lg:col-span-5 bg-[#14100c] border border-stone-800 rounded-2xl p-6 space-y-4">
                <h4 className="font-serif text-[#e6c280] font-bold text-sm uppercase tracking-wider">
                  𓂀 Sacred CRM Traveler Conversion Funnel
                </h4>
                
                <div className="space-y-3 pt-3">
                  {/* Step 1: Inquirers */}
                  <div className="bg-[#211912] border border-[#d4af37]/10 rounded-xl p-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs font-mono font-bold flex items-center justify-center">1</span>
                      <span className="text-xs font-mono text-stone-300 uppercase">Scribe Oracle Inquirers</span>
                    </div>
                    <span className="text-[#d4af37] font-mono font-bold">{crmProfiles.length + 3} Warm Leads</span>
                  </div>

                  {/* Funnel narrow bar */}
                  <div className="w-0.5 h-3 bg-gradient-to-b from-[#d4af37]/60 to-amber-500/40 mx-auto"></div>

                  {/* Step 2: Leads Carded */}
                  <div className="bg-[#1d1611] border border-amber-500/15 rounded-xl p-3.5 flex justify-between items-center w-[94%] mx-auto">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold flex items-center justify-center">2</span>
                      <span className="text-xs font-mono text-stone-300 uppercase">Noble Traveler Cards</span>
                    </div>
                    <span className="text-amber-400 font-mono font-bold">{crmProfiles.length} Travelers</span>
                  </div>

                  {/* Funnel narrow bar */}
                  <div className="w-0.5 h-3 bg-gradient-to-b from-amber-500/40 to-emerald-500/40 mx-auto"></div>

                  {/* Step 3: Pending Passage */}
                  <div className="bg-[#191410] border border-emerald-500/15 rounded-xl p-3.5 flex justify-between items-center w-[88%] mx-auto">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center">3</span>
                      <span className="text-xs font-mono text-stone-300 uppercase">Pending Inscriptions</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold">
                      {bookings.filter(b => b.status === 'Pending Oracle Approval').length} Caravans
                    </span>
                  </div>

                  {/* Funnel narrow bar */}
                  <div className="w-0.5 h-3 bg-gradient-to-b from-emerald-500/40 to-purple-500/40 mx-auto"></div>

                  {/* Step 4: Deposited Pilgrims */}
                  <div className="bg-[#140f0c] border border-[#d4af37]/35 rounded-xl p-3.5 flex justify-between items-center w-[82%] mx-auto shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#d4af37]/30 text-stone-200 text-xs font-mono font-bold flex items-center justify-center">𓋹</span>
                      <span className="text-xs font-serif text-[#e6c280] font-black uppercase">Confirmed Pilgrims</span>
                    </div>
                    <span className="text-[#d4af37] font-mono font-extrabold">
                      {crmProfiles.filter(p => p.leadStatus === 'Deposited Pilgrim' || p.leadStatus === 'Eternal Royal Traveler').length} Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Excursion Catalog Share / Popularity */}
              <div className="lg:col-span-7 bg-[#14100c] border border-stone-800 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif text-[#e6c280] font-bold text-sm uppercase tracking-wider">
                    𓆛 Excursion Popularity & Revenue Matrix
                  </h4>
                  <span className="text-[9px] font-mono text-stone-500 uppercase">Interactive stats</span>
                </div>

                <div className="space-y-4 pt-2">
                  {excursions.map((ex) => {
                    const exBookings = bookings.filter((b) => b.excursionId === ex.id);
                    const bookingCount = exBookings.length;
                    const revenue = exBookings
                      .filter((b) => b.status !== 'Pending Oracle Approval')
                      .reduce((sum, b) => sum + b.totalCost, 0);
                    
                    const percent = bookings.length ? Math.round((bookingCount / bookings.length) * 100) : 0;

                    return (
                      <div key={ex.id} className="space-y-1.5 border-b border-stone-900 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-stone-300 font-serif font-bold uppercase tracking-wider text-[11px] truncate max-w-[260px]">{ex.title}</span>
                          <span className="text-[#d4af37] font-bold">
                            ${revenue} <span className="text-[10px] text-stone-500">({bookingCount} Caravans)</span>
                          </span>
                        </div>
                        {/* Custom visual bar */}
                        <div className="w-full bg-stone-950 h-2.5 rounded-full overflow-hidden border border-stone-850">
                          <div
                            className="bg-gradient-to-r from-[#d4af37] to-[#b08e23] h-full rounded-full"
                            style={{ width: `${Math.max(percent, 8)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* INTERACTIVE REVENUE FORECASTER CALCULATOR */}
            <div className="bg-[#14100c] border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-stone-900 pb-3">
                <h4 className="font-serif text-[#e6c280] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="text-[#d4af37]">𓋹</span> Royal Scribe's Sacred Revenue Forecast Alignment
                </h4>
                <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Strategic Planning Tool</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block mb-1">Target Tribute Revenue (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-[#d4af37] font-mono text-xs">$</span>
                      <input
                        type="number"
                        min="1000"
                        max="100000"
                        step="500"
                        value={targetRevenue}
                        onChange={(e) => setTargetRevenue(Number(e.target.value))}
                        className="w-full bg-[#1c1611] border border-stone-850 rounded-lg py-2 pl-7 pr-3 text-xs text-stone-200 font-mono focus:outline-none focus:border-[#d4af37]/60"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {[5000, 10000, 25000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTargetRevenue(preset)}
                        className={`flex-1 py-1.5 px-2 rounded bg-stone-950 hover:bg-stone-900 border text-[9px] font-mono transition-colors cursor-pointer ${
                          targetRevenue === preset ? 'border-[#d4af37] text-[#d4af37]' : 'border-stone-800 text-stone-400'
                        }`}
                      >
                        ${preset.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {/* Metric 1 */}
                  <div className="bg-[#1a1410] border border-stone-900 rounded-xl p-3 text-center">
                    <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest block">Average Voyage Price</span>
                    <span className="text-[#d4af37] text-lg font-mono font-bold block mt-1">${avgExcursionPrice}</span>
                    <span className="text-[9px] text-stone-400 font-sans block mt-0.5">Based on {excursions.length} offerings</span>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-[#1a1410] border border-stone-900 rounded-xl p-3 text-center">
                    <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest block">Bookings to Align</span>
                    <span className="text-stone-200 text-lg font-mono font-bold block mt-1">{bookingsNeeded}</span>
                    <span className="text-[9px] text-stone-400 font-sans block mt-0.5">Approximate voyages</span>
                  </div>

                  {/* Metric 3: Progress percentage */}
                  <div className="bg-[#1a1410] border border-stone-900 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
                    <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest block">Treasury Progress</span>
                    <span className="text-emerald-400 text-lg font-mono font-bold block mt-1">{progressPercentage}%</span>
                    <span className="text-[9px] text-stone-400 font-sans block mt-0.5">Of current ${totalGoldCoins}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar representation */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-stone-500 uppercase">
                  <span>Current Treasury: ${totalGoldCoins}</span>
                  <span>Target Alignment: ${targetRevenue}</span>
                </div>
                <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden border border-stone-850 p-0.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 via-[#d4af37] to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-stone-400 leading-relaxed italic text-center">
                  {progressPercentage >= 100 
                    ? "𓋹 The alignment is fulfilled! Kemet's coffers overflow by the grace of the Pharaoh." 
                    : `𓎬 We must secure ${bookingsNeeded} more bookings to completely harmonize the celestial balance.`}
                </p>
              </div>
            </div>

            {/* Quick Scribe Guidance Box */}
            <div className="bg-[#241a10] border-l-4 border-[#d4af37] rounded-r-2xl p-5 space-y-2">
              <span className="font-serif text-xs font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#d4af37]" /> Travel Assistant's Administrative Guide
              </span>
              <p className="text-stone-300 text-xs italic leading-relaxed">
                "Our tours depart Hurghada, Dahab, and Luxor regularly. As administrator, please prioritize 'Pending Oracle Approval' booking status records. Approving a booking seals its registration status and gets everything ready for our travelers."
              </p>
            </div>

            {/* Database & System Maintenance System */}
            <div className="bg-[#140c08] border-2 border-red-500/20 rounded-2xl p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex justify-between items-center border-b border-red-500/10 pb-3">
                <h4 className="font-serif text-rose-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="text-red-500">𓂀</span> Sanctuary Database Purification & Live Simulation
                </h4>
                <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded border border-red-500/25">
                  Production Controls
                </span>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed">
                As the High Priest, you have absolute authority to clear all temporary data to make the system **100% ready for the public**, restore rich simulated seeds for testing, or simulate live user bookings to test the CRM lead channels.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePurgeAllData}
                  className="bg-red-950/40 text-red-400 hover:bg-red-900/30 border border-red-500/30 px-4 py-2.5 rounded-xl text-[11px] font-mono uppercase tracking-wider cursor-pointer flex-1 min-w-[200px] transition-colors duration-200 text-center"
                >
                  🧹 Clear Ledger & Purge All Demo Data
                </button>
                <button
                  type="button"
                  onClick={handleRestoreDivineSeeds}
                  className="bg-stone-900 text-stone-300 hover:bg-stone-850 border border-stone-700 px-4 py-2.5 rounded-xl text-[11px] font-mono uppercase tracking-wider cursor-pointer flex-1 min-w-[200px] transition-colors duration-200 text-center"
                >
                  🌱 Restore Premium Divine Seeds
                </button>
                <button
                  type="button"
                  onClick={handleSimulateRandomBooking}
                  className="bg-[#241a10] text-[#d4af37] hover:bg-[#322417] border border-[#d4af37]/40 px-4 py-2.5 rounded-xl text-[11px] font-mono uppercase tracking-wider cursor-pointer flex-1 min-w-[200px] transition-colors duration-200 text-center"
                >
                  ⚡ Simulate Random Live Customer Booking
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: CARAVAN LEDGER (CRM BOOKINGS MANAGER) */}
        {activeTab === 'caravans' && (() => {
          const filteredBookings = bookings.filter((b) => {
            const matchesSearch = b.excursionTitle.toLowerCase().includes(caravanSearch.toLowerCase()) ||
                                  b.travelerName.toLowerCase().includes(caravanSearch.toLowerCase()) ||
                                  b.travelerEmail.toLowerCase().includes(caravanSearch.toLowerCase()) ||
                                  b.id.toLowerCase().includes(caravanSearch.toLowerCase());
            const matchesStatus = caravanStatusFilter === 'all' || b.status === caravanStatusFilter;
            return matchesSearch && matchesStatus;
          });

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wider">
                    Active Caravan Ledger Registry
                  </h3>
                  <p className="text-stone-400 text-xs">Manage active customer registrations and high priest sealing approvals.</p>
                </div>

                {/* Status tally legend */}
                <div className="flex gap-2 text-[9px] font-mono uppercase tracking-widest">
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full px-2 py-0.5">
                    {bookings.filter(b => b.status === 'Pending Oracle Approval').length} Pending
                  </span>
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full px-2 py-0.5">
                    {bookings.filter(b => b.status === 'Confirmed by High Priest').length} Confirmed
                  </span>
                  <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full px-2 py-0.5">
                    {bookings.filter(b => b.status === 'Completed').length} Completed
                  </span>
                </div>
              </div>

              {/* Search and Filters for Caravans */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-[#14100c] p-4 rounded-xl border border-stone-850">
                <div className="sm:col-span-8 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    placeholder="Search Caravans by traveler name, email, excursion title, or ledger entry number..."
                    value={caravanSearch}
                    onChange={(e) => setCaravanSearch(e.target.value)}
                    className="w-full bg-[#1c1611] border border-stone-800 rounded-lg py-2 pl-9 pr-4 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]/65"
                  />
                </div>

                {/* Status filter */}
                <div className="sm:col-span-4">
                  <select
                    value={caravanStatusFilter}
                    onChange={(e) => setCaravanStatusFilter(e.target.value)}
                    className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-300 focus:outline-none focus:border-[#d4af37]/60"
                  >
                    <option value="all">All Caravan Statuses</option>
                    <option value="Pending Oracle Approval">Pending Oracle Approval</option>
                    <option value="Confirmed by High Priest">Confirmed by High Priest</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Bulk Actions Bar */}
              {filteredBookings.length > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#18120d] px-5 py-4 rounded-xl border border-[#d4af37]/20 shadow-[inset_0_0_12px_rgba(212,175,55,0.03)]">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="select-all-bookings"
                      checked={filteredBookings.every(b => selectedBookingIds.includes(b.id))}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const allIds = filteredBookings.map(b => b.id);
                          setSelectedBookingIds(allIds);
                        } else {
                          setSelectedBookingIds([]);
                        }
                      }}
                      className="w-4 h-4 rounded border-stone-800 bg-[#14100c] text-[#d4af37] focus:ring-0 cursor-pointer accent-[#d4af37]"
                    />
                    <label htmlFor="select-all-bookings" className="text-xs font-mono text-stone-300 uppercase tracking-widest cursor-pointer select-none flex items-center gap-1.5">
                      <span>𓀚</span> Select All Matched ({filteredBookings.length})
                    </label>
                  </div>

                  {selectedBookingIds.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <span className="text-[10px] font-mono text-[#d4af37] font-bold bg-[#d4af37]/10 border border-[#d4af37]/35 px-2.5 py-1 rounded-md">
                        {selectedBookingIds.length} SELECTED
                      </span>

                      <button
                        onClick={handleBulkApprove}
                        className="bg-emerald-500 hover:bg-emerald-400 text-[#140f0a] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/10"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve Selected
                      </button>

                      <button
                        onClick={handleBulkCancel}
                        className="bg-red-950/50 hover:bg-red-900/40 text-red-400 border border-red-500/20 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Cancel Selected
                      </button>

                      <button
                        onClick={() => setSelectedBookingIds([])}
                        className="text-stone-400 hover:text-stone-200 text-[10px] font-mono uppercase tracking-widest px-2 py-1.5 rounded transition-all cursor-pointer"
                      >
                        Clear Selection
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-stone-500 italic uppercase">
                      Select multiple entries below for bulk actions
                    </span>
                  )}
                </div>
              )}

              {/* Bookings Ledger list */}
              <div className="space-y-4">
                {filteredBookings.length === 0 ? (
                  <div className="bg-[#18120d] border border-stone-850 rounded-2xl p-12 text-center text-stone-500 text-sm">
                    <p className="italic">No bookings matched your criteria inside the caravan ledger.</p>
                    <p className="text-xs text-[#d4af37]/60 mt-1">Try adjusting your search terms or status filter above!</p>
                  </div>
                ) : (
                  filteredBookings.map((booking) => {
                    const isSelected = selectedBookingIds.includes(booking.id);
                    return (
                      <div
                        key={booking.id}
                        className={`bg-[#18120d] border rounded-2xl p-5 space-y-4 relative overflow-hidden transition-all duration-300 ${
                          isSelected 
                            ? 'border-[#d4af37]/60 shadow-[0_4px_20px_rgba(212,175,55,0.05)] bg-[#211812]' 
                            : 'border-stone-850 hover:border-stone-750'
                        }`}
                      >
                        {/* Checkbox for individual selection */}
                        <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBookingIds(prev => [...prev, booking.id]);
                              } else {
                                setSelectedBookingIds(prev => prev.filter(id => id !== booking.id));
                              }
                            }}
                            className="w-4 h-4 rounded border-stone-800 bg-[#14100c] text-[#d4af37] focus:ring-0 cursor-pointer accent-[#d4af37]"
                          />
                        </div>

                        {/* Visual left indicator line based on booking status */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                          booking.status === 'Pending Oracle Approval'
                            ? 'bg-amber-500'
                            : booking.status === 'Confirmed by High Priest'
                            ? 'bg-emerald-500'
                            : 'bg-purple-500'
                        }`}></div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pl-2 pr-8">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Ledger Entry #{booking.id.slice(-6)}</span>
                              <span className="text-stone-600 text-xs">•</span>
                              <span className="text-xs text-stone-400 font-mono">{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <h4 className="font-serif text-[#e6c280] font-black text-base uppercase mt-1">
                              {booking.excursionTitle}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap pr-4">
                            {/* Approve buttons */}
                            {booking.status === 'Pending Oracle Approval' && (
                              <button
                                onClick={() => {
                                  onUpdateBookingStatus(booking.id, 'Confirmed by High Priest');
                                  triggerNotification(`Caravan #${booking.id.slice(-4)} sealed & confirmed!`);
                                }}
                                className="bg-emerald-500 hover:bg-emerald-400 text-[#140f0a] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Seal & Approve
                              </button>
                            )}

                            {booking.status === 'Confirmed by High Priest' && (
                              <button
                                onClick={() => {
                                  onUpdateBookingStatus(booking.id, 'Completed');
                                  triggerNotification("Caravan marked Completed! Scribes shall thank the traveler.");
                                }}
                                className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Mark Completed
                              </button>
                            )}

                            {/* Status chip */}
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest border ${
                              booking.status === 'Pending Oracle Approval'
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                : booking.status === 'Confirmed by High Priest'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                            }`}>
                              {booking.status}
                            </span>

                            {/* Revoke button */}
                            <button
                              onClick={() => {
                                if (window.confirm("Banish this booking request from the sacred ledger?")) {
                                  onCancelBooking(booking.id);
                                  triggerNotification("Booking petition deleted from ledger");
                                }
                              }}
                              className="text-stone-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-stone-900 transition-colors cursor-pointer"
                              title="Revoke Petition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Booking Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#14100c] rounded-xl p-3.5 text-xs text-stone-300 font-sans pl-2">
                          <div>
                            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">Traveler Noble:</span>
                            <span className="text-stone-100 font-semibold">{booking.travelerName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">Messenger Email:</span>
                            <span className="text-stone-100">{booking.travelerEmail}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">Passage Date:</span>
                            <span className="text-stone-100">{booking.date}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">Caravan Cost Tribute:</span>
                            <span className="text-[#d4af37] font-mono font-bold">${booking.totalCost} ({booking.numberOfGuests} Guests)</span>
                          </div>
                        </div>

                        {booking.specialRequests && (
                          <div className="bg-[#110d0a] rounded-lg p-3 text-xs italic text-stone-400 border border-stone-900 ml-2">
                            <strong className="not-italic text-stone-500 font-mono text-[9px] uppercase tracking-wider block mb-0.5">Customer special requests:</strong>
                            "{booking.specialRequests}"
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* TAB 3: TRAVELER CRM & NOBLE RELATIONSHIPS */}
        {activeTab === 'nobles' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wider">
                  𓂀 Sovereign Travelers Relationship ledger (CRM)
                </h3>
                <p className="text-stone-400 text-xs">Track customer VIP tiers, spend statistics, and custom scribe relationship notes.</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#14100c] p-4 rounded-xl border border-stone-850">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search Nobles by name or messenger email..."
                  value={crmSearch}
                  onChange={(e) => setCrmSearch(e.target.value)}
                  className="w-full bg-[#1c1611] border border-stone-800 rounded-lg py-2 pl-9 pr-4 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]/65"
                />
              </div>

              {/* VIP tier Filter */}
              <div className="md:col-span-3">
                <select
                  value={filterVip}
                  onChange={(e) => setFilterVip(e.target.value)}
                  className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-300 focus:outline-none"
                >
                  <option value="all">All VIP Tiers</option>
                  <option value="Noble">Noble</option>
                  <option value="High Priest">High Priest</option>
                  <option value="Royal Prince">Royal Prince</option>
                  <option value="Pharaoh">Pharaoh</option>
                </select>
              </div>

              {/* Lead status Filter */}
              <div className="md:col-span-3">
                <select
                  value={filterLead}
                  onChange={(e) => setFilterLead(e.target.value)}
                  className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-300 focus:outline-none"
                >
                  <option value="all">All Lead Statuses</option>
                  <option value="Warm Prospect">Warm Prospect</option>
                  <option value="Deposited Pilgrim">Deposited Pilgrim</option>
                  <option value="Eternal Royal Traveler">Eternal Royal Traveler</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>
            </div>

            {/* Profile cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-[#18120d] border border-stone-800 rounded-2xl p-5 space-y-4 shadow-sm"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37]/30 to-[#8e6b12]/20 border border-[#d4af37]/25 flex items-center justify-center text-lg font-serif">
                        𓀚
                      </div>
                      <div>
                        <h4 className="font-serif text-[#e6c280] font-bold text-sm uppercase">
                          {profile.name}
                        </h4>
                        <span className="text-[10px] font-mono text-stone-500 block">{profile.email}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      {/* VIP Badge */}
                      <span className="bg-[#d4af37]/10 border border-[#d4af37]/40 text-[#d4af37] rounded-full px-2.5 py-0.5 text-[8px] font-mono uppercase tracking-widest font-black">
                        👑 {profile.vipTier}
                      </span>
                      {/* Lead Badge */}
                      <span className={`rounded-full px-2 py-0.5 text-[8px] font-mono uppercase tracking-widest ${
                        profile.leadStatus === 'Eternal Royal Traveler'
                          ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                          : profile.leadStatus === 'Deposited Pilgrim'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}>
                        {profile.leadStatus}
                      </span>
                    </div>
                  </div>

                  {/* CRM metrics */}
                  <div className="grid grid-cols-3 gap-2 bg-[#120d09] rounded-xl p-3 text-center text-xs font-mono">
                    <div>
                      <span className="text-[8px] text-stone-500 uppercase tracking-widest block">Total Tribute</span>
                      <span className="text-[#d4af37] font-bold text-sm">${profile.totalSpend}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-stone-500 uppercase tracking-widest block">Inquiries</span>
                      <span className="text-stone-300 font-bold text-sm">{profile.inquiriesCount} logs</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-stone-500 uppercase tracking-widest block">Last Active</span>
                      <span className="text-stone-400 text-[10px] font-sans">{profile.lastActive || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Scribe Relationship Notes */}
                  <div className="bg-[#14100c] rounded-xl p-3 text-xs text-stone-400 relative">
                    <strong className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mb-1">
                      Scribe Relationship Notes:
                    </strong>
                    {profile.scribeNotes ? (
                      <p className="italic">"{profile.scribeNotes}"</p>
                    ) : (
                      <p className="italic text-stone-600">No custom scribe notes. Click Edit Card below to write notes.</p>
                    )}
                  </div>

                  {/* CRM Actions */}
                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      onClick={() => composeScribeEmailDraft(profile)}
                      className="bg-stone-900 border border-stone-850 hover:bg-stone-850 text-stone-300 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" /> Draft Followup
                    </button>
                    <button
                      onClick={() => setEditingProfile(profile)}
                      className="bg-[#d4af37] hover:bg-amber-400 text-[#140f0a] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Card
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile edit Modal */}
            <AnimatePresence>
              {editingProfile && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#140f0c] border border-[#d4af37] rounded-2xl max-w-md w-full p-6 space-y-4"
                  >
                    <h4 className="font-serif text-[#e6c280] font-black text-lg uppercase">
                      Update Traveler Relationship Card
                    </h4>
                    
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      {/* Name display */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-stone-500 uppercase block">Traveler Name</label>
                        <input
                          type="text"
                          required
                          value={editingProfile.name}
                          onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                          className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none"
                        />
                      </div>

                      {/* VIP Select */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-stone-500 uppercase block">Sovereign VIP Tier</label>
                        <select
                          value={editingProfile.vipTier}
                          onChange={(e) => setEditingProfile({ ...editingProfile, vipTier: e.target.value as any })}
                          className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-300 focus:outline-none"
                        >
                          <option value="Noble">Noble (Standard VIP)</option>
                          <option value="High Priest">High Priest (Elite status)</option>
                          <option value="Royal Prince">Royal Prince (Sovereign class)</option>
                          <option value="Pharaoh">Pharaoh (Supreme client)</option>
                        </select>
                      </div>

                      {/* Lead Status Select */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-stone-500 uppercase block">CRM Lead Status</label>
                        <select
                          value={editingProfile.leadStatus}
                          onChange={(e) => setEditingProfile({ ...editingProfile, leadStatus: e.target.value as any })}
                          className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-300 focus:outline-none"
                        >
                          <option value="Warm Prospect">Warm Prospect (Oracle chat inquiry)</option>
                          <option value="Deposited Pilgrim">Deposited Pilgrim (Active booking deposit)</option>
                          <option value="Eternal Royal Traveler">Eternal Royal Traveler (Frequent traveler)</option>
                          <option value="Closed Lost">Closed Lost (Revoked passage)</option>
                        </select>
                      </div>

                      {/* Notes area */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-stone-500 uppercase block">Scribe Relationship Notes</label>
                        <textarea
                          rows={3}
                          value={editingProfile.scribeNotes}
                          onChange={(e) => setEditingProfile({ ...editingProfile, scribeNotes: e.target.value })}
                          className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none"
                        />
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingProfile(null)}
                          className="bg-stone-900 hover:bg-stone-850 text-stone-300 text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#d4af37] text-[#140f0a] text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* TAB 4: OFFERING CATALOG BUILDER (MANAGE EXCURSIONS) */}
        {activeTab === 'offerings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wider">
                  𓂀 Divine Catalog Offerings Builder
                </h3>
                <p className="text-stone-400 text-xs">Create and edit the Pharaonic excursions presented to travelers on the public landing page.</p>
              </div>

              <button
                onClick={() => setIsAddOfferingOpen(true)}
                className="bg-gradient-to-r from-[#d4af37] to-[#b08e23] text-[#140f0a] text-xs font-serif font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-lg shadow-[#d4af37]/15 hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Expedition
              </button>
            </div>

            {/* List of current excursions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {excursions.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-[#18120d] border border-stone-800 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={ex.image}
                      alt={ex.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#140f0a]/90 text-[#d4af37] text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[#d4af37]/20">
                      {ex.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-[#d4af37] text-[#140f0a] font-mono font-black text-xs px-2.5 py-0.5 rounded-lg">
                      ${ex.price}
                    </span>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h4 className="font-serif text-[#e6c280] font-bold text-sm uppercase leading-snug">
                        {ex.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {ex.duration} • <MapPin className="w-3.5 h-3.5" /> {ex.location.split(',')[0]}
                      </p>
                      <p className="text-stone-300 text-xs leading-relaxed line-clamp-2">
                        {ex.description}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-stone-900">
                      <button
                        onClick={() => handleDeleteExcursion(ex.id)}
                        className="text-stone-500 hover:text-red-400 p-2 bg-stone-950 rounded-xl hover:bg-stone-900 transition-colors cursor-pointer"
                        title="Ban Offering"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingExcursion(ex)}
                        className="flex-1 bg-stone-900 border border-stone-850 text-[#e6c280] text-xs font-mono uppercase tracking-widest py-2 rounded-xl hover:bg-[#201a14] transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit Offering
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: ADD OFFERING */}
            <AnimatePresence>
              {isAddOfferingOpen && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#140f0c] border-2 border-[#d4af37] rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto"
                  >
                    <h3 className="font-serif text-[#e6c280] font-black text-xl uppercase">
                      Inscribe Divine Offering Excursion
                    </h3>

                    <form onSubmit={handleAddExcursionSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Trip Title</label>
                          <input
                            type="text"
                            required
                            placeholder="E.g., Dahab Blue Hole Pilgrimage"
                            value={newExTitle}
                            onChange={(e) => setNewExTitle(e.target.value)}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Tagline Summary</label>
                          <input
                            type="text"
                            placeholder="Explore deep sea rifts"
                            value={newExTagline}
                            onChange={(e) => setNewExTagline(e.target.value)}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Category</label>
                          <select
                            value={newExCategory}
                            onChange={(e) => setNewExCategory(e.target.value as any)}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-300 focus:outline-none"
                          >
                            <option value="diving">Diving 𓆛</option>
                            <option value="safari">Desert Safari 𓅓</option>
                            <option value="history">Luxor History 𓉐</option>
                            <option value="boat">Boat Trip 𓊟</option>
                            <option value="speedboat">Speedboat 𓊡</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Rate (Tribute Gold Coins)</label>
                          <input
                            type="number"
                            required
                            value={newExPrice}
                            onChange={(e) => setNewExPrice(Number(e.target.value))}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Voyage Length</label>
                          <input
                            type="text"
                            value={newExDuration}
                            onChange={(e) => setNewExDuration(e.target.value)}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Image URL (Assets or online)</label>
                          <input
                            type="text"
                            value={newExImage}
                            onChange={(e) => setNewExImage(e.target.value)}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-stone-400 uppercase">Dossier Description</label>
                        <textarea
                          rows={3}
                          required
                          value={newExDesc}
                          onChange={(e) => setNewExDesc(e.target.value)}
                          placeholder="Provide deep immersive trip descriptors..."
                          className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-stone-400 uppercase">Scribe's Ancient Egyptology Lore</label>
                        <textarea
                          rows={2}
                          value={newExLore}
                          onChange={(e) => setNewExLore(e.target.value)}
                          placeholder="Ancient myth associated with the location or activities..."
                          className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none"
                        />
                      </div>

                      <div className="flex gap-2 justify-end pt-3">
                        <button
                          type="button"
                          onClick={() => setIsAddOfferingOpen(false)}
                          className="bg-stone-900 hover:bg-stone-850 text-stone-300 text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#d4af37] text-[#140f0a] text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer hover:bg-amber-300"
                        >
                          Inscribe Offering Catalog
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Modal: EDIT OFFERING */}
            <AnimatePresence>
              {editingExcursion && (
                <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#140f0c] border-2 border-[#d4af37] rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto"
                  >
                    <h3 className="font-serif text-[#e6c280] font-black text-xl uppercase">
                      Edit Divine Expedition Offering
                    </h3>

                    <form onSubmit={handleEditExcursionSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Trip Title</label>
                          <input
                            type="text"
                            required
                            value={editingExcursion.title}
                            onChange={(e) => setEditingExcursion({ ...editingExcursion, title: e.target.value })}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Tagline Summary</label>
                          <input
                            type="text"
                            value={editingExcursion.tagline}
                            onChange={(e) => setEditingExcursion({ ...editingExcursion, tagline: e.target.value })}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Price (Gold Coins)</label>
                          <input
                            type="number"
                            required
                            value={editingExcursion.price}
                            onChange={(e) => setEditingExcursion({ ...editingExcursion, price: Number(e.target.value) })}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-stone-400 uppercase">Voyage Length</label>
                          <input
                            type="text"
                            value={editingExcursion.duration}
                            onChange={(e) => setEditingExcursion({ ...editingExcursion, duration: e.target.value })}
                            className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-stone-400 uppercase">Dossier Description</label>
                        <textarea
                          rows={3}
                          required
                          value={editingExcursion.description}
                          onChange={(e) => setEditingExcursion({ ...editingExcursion, description: e.target.value })}
                          className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-stone-400 uppercase">Scribe's Ancient Egyptology Lore</label>
                        <textarea
                          rows={2}
                          value={editingExcursion.ancientLore}
                          onChange={(e) => setEditingExcursion({ ...editingExcursion, ancientLore: e.target.value })}
                          className="w-full bg-[#1c1611] border border-stone-800 rounded-lg p-2.5 text-xs text-stone-200 focus:outline-none"
                        />
                      </div>

                      <div className="flex gap-2 justify-end pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingExcursion(null)}
                          className="bg-stone-900 hover:bg-stone-850 text-stone-300 text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#d4af37] text-[#140f0a] text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer hover:bg-amber-300"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* TAB 5: PUBLIC TESTIMONY BOARD MODERATION */}
        {activeTab === 'testimonies' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wider">
                𓂀 Public Testimony Moderation Bench
              </h3>
              <p className="text-stone-400 text-xs">Verify customer testimonies, or purge inappropriate/unapproved texts from Pharaoh's Monument Board.</p>
            </div>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="bg-[#18120d] border border-stone-850 rounded-2xl p-12 text-center text-stone-500 text-sm">
                  <p className="italic">Thy testimony review logs are currently empty. Scribe reviews inside the client module to populate this list.</p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#18120d] border border-stone-800 rounded-2xl p-5 space-y-3 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{rev.avatar ? rev.avatar.split(' ')[0] : '𓀚'}</span>
                        <div>
                          <h5 className="font-serif text-sm font-bold text-[#e6c280]">
                            {rev.author}
                          </h5>
                          <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">
                            {rev.avatar ? rev.avatar.split(' ').slice(1).join(' ') : 'Noble Traveler'} • {rev.date}
                          </span>
                        </div>
                      </div>

                      <p className="text-stone-300 text-xs italic leading-relaxed">
                        "{rev.comment}"
                      </p>

                      <span className="inline-block bg-[#120d09] border border-stone-800 text-[#d4af37]/80 rounded-full px-2.5 py-0.5 text-[8px] font-mono uppercase tracking-widest">
                        Excursion Target: {rev.excursionId}
                      </span>
                    </div>

                    <div className="flex gap-2 self-end sm:self-start">
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Purge Testimony
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 6: ORACLE SCRIBE logs & INQUIRIES */}
        {activeTab === 'oracle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wider">
                𓂀 AI Chat Lead Captures
              </h3>
              <p className="text-stone-400 text-xs">Observe live travelers consulting the AI Assistant to proactively design specialized follow-up offerings.</p>
            </div>

            <div className="space-y-4">
              {oracleLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-[#18120d] border border-stone-800 rounded-2xl p-5 space-y-3 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#d4af37] text-xs font-serif">
                        𓋹
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wide">{log.name}</h4>
                        <span className="text-[10px] font-mono text-stone-500">{log.email}</span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono text-stone-500 uppercase">{log.time}</span>
                  </div>

                  <div className="bg-[#14100c] rounded-xl p-3 border border-stone-900 text-xs text-stone-300">
                    <strong className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider block mb-1">
                      Traveler Scribe Query:
                    </strong>
                    "{log.query}"
                  </div>

                  {/* CRM followup button */}
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        // Check if traveler profile exists or make one
                        const exists = crmProfiles.find((p) => p.email.toLowerCase() === log.email.toLowerCase());
                        if (exists) {
                          setEditingProfile(exists);
                          setActiveTab('nobles');
                        } else {
                          // Spawn traveler card from lead
                          const spawned: TravelerCRMProfile = {
                            id: `crm-${Date.now()}`,
                            name: log.name,
                            email: log.email,
                            vipTier: 'Noble',
                            leadStatus: 'Warm Prospect',
                            totalSpend: 0,
                            lastActive: log.time.split(' ')[0],
                            scribeNotes: `Lead captured from Oracle conversation. Primary inquiry was: ${log.query}`,
                            inquiriesCount: 2
                          };
                          setCrmProfiles([spawned, ...crmProfiles]);
                          setEditingProfile(spawned);
                          setActiveTab('nobles');
                          triggerNotification("Traveler card spawned from Scribe inquiry!");
                        }
                      }}
                      className="bg-[#d4af37] hover:bg-amber-400 text-[#140f0a] text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Convert to Noble Card & Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 7: IMPERIAL SCROLL SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wider">
                  𓇚 Imperial Scroll Subscribers
                </h3>
                <p className="text-stone-400 text-xs">Manage active email subscribers of the Court who have requested custom excursion scrolls and seasonal discounts.</p>
              </div>
              <button
                onClick={() => {
                  const confirmed = window.confirm("Are you sure you want to clear all active covenant newsletter signups from the stone tablets?");
                  if (confirmed) {
                    localStorage.setItem('kemet_newsletter_signups', JSON.stringify([]));
                    setSubscribers([]);
                    triggerNotification("All imperial newsletter signups have been revoked.");
                  }
                }}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono uppercase tracking-widest px-3 py-2 rounded-xl transition-all cursor-pointer"
              >
                Clear All Tablets
              </button>
            </div>

            {/* Grid display or Table */}
            <div className="bg-[#18120d] border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-[#211a13]/30 border-b border-stone-800/80 font-mono text-[10px] uppercase tracking-wider text-[#d4af37]">
                Active Parchments ({subscribers.length})
              </div>
              
              {subscribers.length === 0 ? (
                <div className="p-8 text-center text-stone-500 italic text-xs">
                  No active subscribers are currently inscribed. Signups will appear here dynamically when explorers subscribe on the main page.
                </div>
              ) : (
                <div className="divide-y divide-stone-900 overflow-x-auto">
                  <table className="w-full text-left text-stone-300 text-xs min-w-[600px]">
                    <thead>
                      <tr className="bg-black/30 text-[10px] font-mono text-stone-500 uppercase tracking-widest border-b border-stone-900">
                        <th className="py-3 px-4">Royal Email Parchment</th>
                        <th className="py-3 px-4">Court Tier</th>
                        <th className="py-3 px-4">Targeted Interests</th>
                        <th className="py-3 px-4">Generated Promo Code</th>
                        <th className="py-3 px-4">Decree Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-900">
                      {subscribers.map((sub: any) => (
                        <tr key={sub.id} className="hover:bg-stone-900/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-medium text-[#f3e5c8]">
                            {sub.email}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-block text-[9px] font-serif uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                              sub.tier === 'pharaoh' 
                                ? 'bg-amber-500/10 border-amber-500/30 text-[#e6c280]' 
                                : sub.tier === 'scribe'
                                ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]'
                                : 'bg-stone-800 border-stone-700 text-stone-400'
                            }`}>
                              {sub.tier === 'pharaoh' ? '𓁠 Pharaoh' : sub.tier === 'scribe' ? '𓁟 Scribe' : '𓀚 Citizen'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                              {sub.interests.map((int: string) => (
                                <span key={int} className="text-[9px] font-mono uppercase bg-[#1e150e] border border-[#d4af37]/20 text-[#d4af37] px-1.5 py-0.5 rounded">
                                  {int}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-[11px] font-bold text-amber-500 select-all tracking-wider">
                              {sub.promoCode}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px] text-stone-500">
                            {sub.signupDate}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              {/* Spawning Noble button */}
                              <button
                                onClick={() => {
                                  // Check if traveler profile exists or make one
                                  const exists = crmProfiles.find((p) => p.email.toLowerCase() === sub.email.toLowerCase());
                                  if (exists) {
                                    setEditingProfile(exists);
                                    setActiveTab('nobles');
                                    triggerNotification("Traveler card already exists!");
                                  } else {
                                    // Spawn traveler card
                                    const spawned: TravelerCRMProfile = {
                                      id: `crm-${Date.now()}`,
                                      name: sub.email.split('@')[0].toUpperCase(),
                                      email: sub.email,
                                      vipTier: sub.tier === 'pharaoh' ? 'Pharaoh' : sub.tier === 'scribe' ? 'High Priest' : 'Noble',
                                      leadStatus: 'Deposited Pilgrim',
                                      totalSpend: 0,
                                      lastActive: sub.signupDate,
                                      scribeNotes: `Lead converted from Newsletter subscriber. Code assigned: ${sub.promoCode}. Targeted categories: ${sub.interests.join(', ')}`,
                                      inquiriesCount: 1
                                    };
                                    const updated = [spawned, ...crmProfiles];
                                    setCrmProfiles(updated);
                                    localStorage.setItem('kemet_crm_profiles', JSON.stringify(updated));
                                    setEditingProfile(spawned);
                                    setActiveTab('nobles');
                                    triggerNotification("Successfully created Noble CRM Card!");
                                  }
                                }}
                                className="bg-[#d4af37]/10 hover:bg-[#d4af37]/25 text-[#d4af37] border border-[#d4af37]/35 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <UserPlus className="w-3 h-3" /> Convert to Noble Card
                              </button>
                              
                              {/* Delete button */}
                              <button
                                onClick={() => {
                                  const filtered = subscribers.filter((s: any) => s.id !== sub.id);
                                  setSubscribers(filtered);
                                  localStorage.setItem('kemet_newsletter_signups', JSON.stringify(filtered));
                                  window.dispatchEvent(new Event('kemet_subscribers_updated'));
                                  triggerNotification("Newsletter subscription revoked.");
                                }}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                              >
                                Revoke
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
