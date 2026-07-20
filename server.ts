import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// ==========================================
// SEED DATA DECLARATIONS
// ==========================================
const EXCURSIONS_DATA_SEED = [
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

const INITIAL_REVIEWS_SEED = [
  {
    id: 'rev-1',
    excursionId: 'diving-1',
    author: "Cleopatra the Diver",
    avatar: "𓁠 Cleopatra",
    rating: 5,
    comment: "I plunged into Ras Mohammed and was greeted by a massive underwater statue of Osiris, surrounded by thousands of golden glassfish. Truly, Sennedjem has aligned the elements perfectly. It felt like walking through a submerged palace of the Nile!",
    date: "2026-06-20"
  },
  {
    id: 'rev-2',
    excursionId: 'safari-1',
    author: "Ramses the Nomad",
    avatar: "𓀚 Ramses",
    rating: 5,
    comment: "Flying across the red dunes on a quad bike was as exhilarating as racing a war chariot in Kadesh! The Bedouin flatbread baked over acacia coals is delicious, and the stargazing is a true communion with Nut.",
    date: "2026-07-01"
  },
  {
    id: 'rev-3',
    excursionId: 'history-1',
    author: "Hatshepsut the Explorer",
    avatar: "𓁥 Hatshepsut",
    rating: 5,
    comment: "Visiting the mortuary temple in Luxor left my royal caravan speechless. The columns of Karnak are so wide they command complete silence. The private Felucca cruise on the Nile at sunset was absolute bliss.",
    date: "2026-07-11"
  }
];

// ==========================================
// DATABASE PERSISTENCE SETUP
// ==========================================
interface DatabaseSchema {
  excursions: any[];
  bookings: any[];
  reviews: any[];
  newsletter_signups: any[];
  oracle_logs: any[];
  community_photos?: any[];
}

const SEED_COMMUNITY_PHOTOS = [
  {
    id: "photo-seed-1",
    caption: "Catching the golden hour on our beautiful Felucca boat ride across the Nile!",
    author: "Amelia & Mark",
    location: "Luxor, Egypt",
    image: "/src/assets/images/egypt_boat_trip_1784071711626.jpg",
    createdAt: "2026-07-15T18:30:00.000Z"
  },
  {
    id: "photo-seed-2",
    caption: "Stunning desert sunset. Racing across the Sinai sand dunes was the highlight of our summer!",
    author: "Sebastian Vance",
    location: "Sinai Desert",
    image: "/src/assets/images/egypt_desert_safari_1784070379685.jpg",
    createdAt: "2026-07-16T19:15:00.000Z"
  },
  {
    id: "photo-seed-3",
    caption: "Dived with thousands of glassfish and swam past a submerged statue of Osiris. Breathtaking!",
    author: "Elena Rostov",
    location: "Ras Mohammed Seabed",
    image: "/src/assets/images/egypt_sea_diving_1784070366165.jpg",
    createdAt: "2026-07-17T09:00:00.000Z"
  }
];

const DB_FILE_PATH = path.join(process.cwd(), "kemet_db.json");
const DB_FILE_FALLBACK_PATH = "/tmp/kemet_db.json";
let activeDbPath = DB_FILE_PATH;

// Self-verify write permissions on load
try {
  fs.writeFileSync(DB_FILE_PATH, fs.readFileSync(DB_FILE_PATH, 'utf8'), { flag: 'r+' });
} catch (e) {
  activeDbPath = DB_FILE_FALLBACK_PATH;
}

function loadDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(activeDbPath)) {
      const defaultDb: DatabaseSchema = {
        excursions: EXCURSIONS_DATA_SEED,
        bookings: [],
        reviews: INITIAL_REVIEWS_SEED,
        newsletter_signups: [],
        oracle_logs: [],
        community_photos: SEED_COMMUNITY_PHOTOS
      };
      fs.writeFileSync(activeDbPath, JSON.stringify(defaultDb, null, 2), 'utf8');
      return defaultDb;
    }
    const raw = fs.readFileSync(activeDbPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.community_photos || parsed.community_photos.length === 0) {
      parsed.community_photos = SEED_COMMUNITY_PHOTOS;
      fs.writeFileSync(activeDbPath, JSON.stringify(parsed, null, 2), 'utf8');
    }
    return parsed;
  } catch (err) {
    console.error("Database reading error, resolving with default seed structure:", err);
    return {
      excursions: EXCURSIONS_DATA_SEED,
      bookings: [],
      reviews: INITIAL_REVIEWS_SEED,
      newsletter_signups: [],
      oracle_logs: [],
      community_photos: SEED_COMMUNITY_PHOTOS
    };
  }
}

function saveDb(data: DatabaseSchema) {
  try {
    fs.writeFileSync(activeDbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Failed to commit changes to the persistent database file:", err);
  }
}

// ==========================================
// GEMINI CLIENT SETUP
// ==========================================
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please set it in the Secrets panel in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// CUSTOM SECURITY MIDDLEWARES
// ==========================================

// Memory store for API Rate Limiting to prevent brute-force or AI API abuse
const rateLimitStore = new Map<string, { count: number, resetTime: number }>();

function apiRateLimiter(maxRequests: number, windowMs: number) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const limitInfo = rateLimitStore.get(ip);

    if (!limitInfo || now > limitInfo.resetTime) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (limitInfo.count >= maxRequests) {
      return res.status(429).json({
        error: "Too many petitions sent to the divine sanctuary. Please allow the cosmic alignment to balance (wait 1 minute) before calling upon the Royal Scribe again."
      });
    }

    limitInfo.count += 1;
    rateLimitStore.set(ip, limitInfo);
    next();
  };
}

// Security Headers Middleware
function securityHeaders(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:;");
  next();
}

// Admin Authorization Middleware
function adminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const passcodeHeader = req.headers['x-admin-passcode'];
  const correctPasscode = process.env.ADMIN_PASSCODE || "pharaoh";
  if (passcodeHeader && (passcodeHeader as string).trim().toLowerCase() === correctPasscode.toLowerCase()) {
    return next();
  }
  res.status(403).json({ error: "Access Denied. You are not authorized inside the High Priest inner chamber." });
}

// Input sanitization helper to strip potentially malicious characters or tags
function sanitizeString(str: any, maxLen: number = 500): string {
  if (typeof str !== 'string') return '';
  let sanitized = str.trim();
  // Strip HTML elements for XSS mitigation
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  if (sanitized.length > maxLen) {
    sanitized = sanitized.substring(0, maxLen);
  }
  return sanitized;
}

// ==========================================
// SERVER INITIALIZATION
// ==========================================
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));
  app.use(express.urlencoded({ limit: "15mb", extended: true }));
  app.use(securityHeaders);

  // ==========================================
  // SYSTEM API ENDPOINTS
  // ==========================================

  // 1. Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString(), db: activeDbPath });
  });

  // 2. Admin Verification
  app.post("/api/admin/verify", (req, res) => {
    const { passcode } = req.body;
    const correctPasscode = process.env.ADMIN_PASSCODE || "pharaoh";
    if (passcode && passcode.trim().toLowerCase() === correctPasscode.toLowerCase()) {
      res.json({ success: true, token: "divine-scribe-token-9821" });
    } else {
      res.status(401).json({ success: false, error: "Incorrect passcode. Access is restricted." });
    }
  });

  // ==========================================
  // EXCURSIONS CMS ENDPOINTS
  // ==========================================
  app.get("/api/excursions", (req, res) => {
    const db = loadDb();
    res.json(db.excursions);
  });

  app.post("/api/excursions", adminAuth, (req, res) => {
    try {
      const { id, title, tagline, category, duration, price, rating, location, image, description, inclusions, highlights, ancientLore } = req.body;
      const db = loadDb();

      const newExcursion = {
        id: id ? sanitizeString(id, 50) : `ex-${Date.now()}`,
        title: sanitizeString(title, 100),
        tagline: sanitizeString(tagline, 150),
        category: sanitizeString(category, 50),
        duration: sanitizeString(duration, 50),
        price: Math.max(1, Number(price) || 50),
        rating: Math.min(5, Math.max(1, Number(rating) || 5.0)),
        location: sanitizeString(location, 150),
        image: sanitizeString(image, 250),
        description: sanitizeString(description, 1000),
        inclusions: Array.isArray(inclusions) ? inclusions.map(i => sanitizeString(i, 200)) : [],
        highlights: Array.isArray(highlights) ? highlights.map(h => sanitizeString(h, 200)) : [],
        ancientLore: sanitizeString(ancientLore, 1000)
      };

      const existingIndex = db.excursions.findIndex(ex => ex.id === newExcursion.id);
      if (existingIndex > -1) {
        db.excursions[existingIndex] = newExcursion;
      } else {
        db.excursions.unshift(newExcursion);
      }

      saveDb(db);
      res.json(db.excursions);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/excursions/:id", adminAuth, (req, res) => {
    const { id } = req.params;
    const db = loadDb();
    db.excursions = db.excursions.filter(ex => ex.id !== id);
    saveDb(db);
    res.json(db.excursions);
  });

  app.post("/api/excursions/bulk", adminAuth, (req, res) => {
    try {
      const bulkData = req.body;
      if (!Array.isArray(bulkData)) {
        return res.status(400).json({ error: "Excursions list must be an array." });
      }

      const db = loadDb();
      bulkData.forEach((ex: any) => {
        const newExcursion = {
          id: ex.id ? sanitizeString(ex.id, 50) : `ex-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          title: sanitizeString(ex.title, 100),
          tagline: sanitizeString(ex.tagline, 150),
          category: sanitizeString(ex.category, 50),
          duration: sanitizeString(ex.duration, 50),
          price: Math.max(1, Number(ex.price) || 50),
          rating: Math.min(5, Math.max(1, Number(ex.rating) || 5.0)),
          location: sanitizeString(ex.location, 150),
          image: sanitizeString(ex.image, 250) || "/src/assets/images/egypt_sea_diving_1784070366165.jpg",
          description: sanitizeString(ex.description, 1000),
          inclusions: Array.isArray(ex.inclusions) ? ex.inclusions.map((i: any) => sanitizeString(i, 200)) : [
            "Premium transport under royal flag",
            "Certified High Priest Guides",
            "Fresh water of the Nile"
          ],
          highlights: Array.isArray(ex.highlights) ? ex.highlights.map((h: any) => sanitizeString(h, 200)) : [
            "Inspect unique architectural glyphs",
            "Engage with desert/maritime local tribes"
          ],
          ancientLore: sanitizeString(ex.ancientLore, 1000) || "This sacred terrain was aligned to grant safety under the eye of Horus."
        };

        const existingIndex = db.excursions.findIndex(existing => existing.id === newExcursion.id);
        if (existingIndex > -1) {
          db.excursions[existingIndex] = newExcursion;
        } else {
          db.excursions.unshift(newExcursion);
        }
      });

      saveDb(db);
      res.json(db.excursions);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ==========================================
  // CARAVAN BOOKINGS ENDPOINTS
  // ==========================================
  app.get("/api/bookings", adminAuth, (req, res) => {
    const db = loadDb();
    res.json(db.bookings);
  });

  app.post("/api/bookings", (req, res) => {
    try {
      const { excursionId, excursionTitle, travelerName, travelerEmail, date, numberOfGuests, totalCost, specialRequests } = req.body;
      const db = loadDb();

      // Simple secure inputs validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!travelerName || !travelerEmail || !emailRegex.test(travelerEmail)) {
        return res.status(400).json({ error: "Noble traveler name and a valid email are required to register inside the ledger." });
      }

      const guestsCount = Math.min(25, Math.max(1, Number(numberOfGuests) || 1));
      const costAmount = Math.max(0, Number(totalCost) || 0);

      const newBooking = {
        id: `b-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        excursionId: sanitizeString(excursionId, 50),
        excursionTitle: sanitizeString(excursionTitle, 100),
        travelerName: sanitizeString(travelerName, 100),
        travelerEmail: sanitizeString(travelerEmail, 100),
        date: sanitizeString(date, 30),
        numberOfGuests: guestsCount,
        totalCost: costAmount,
        specialRequests: sanitizeString(specialRequests, 500),
        status: "Pending Oracle Approval",
        createdAt: new Date().toISOString()
      };

      db.bookings.unshift(newBooking);
      saveDb(db);
      res.json(newBooking);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/bookings/:id/status", adminAuth, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = loadDb();
    const booking = db.bookings.find(b => b.id === id);

    if (booking) {
      booking.status = sanitizeString(status, 50);
      saveDb(db);
      res.json({ success: true, bookings: db.bookings });
    } else {
      res.status(404).json({ error: "Booking ledger entry not found." });
    }
  });

  app.delete("/api/bookings/:id", adminAuth, (req, res) => {
    const { id } = req.params;
    const db = loadDb();
    db.bookings = db.bookings.filter(b => b.id !== id);
    saveDb(db);
    res.json({ success: true, bookings: db.bookings });
  });

  // Instant Check-In Verification from QR Scanner
  app.post("/api/bookings/:id/checkin", (req, res) => {
    const { id } = req.params;
    const db = loadDb();
    const booking = db.bookings.find(b => b.id === id);

    if (booking) {
      booking.status = "Completed";
      booking.checkedIn = true;
      saveDb(db);
      res.json({ success: true, booking, bookings: db.bookings });
    } else {
      res.status(404).json({ error: "Booking ledger entry not found." });
    }
  });

  // ==========================================
  // REVIEW BOARD ENDPOINTS
  // ==========================================
  app.get("/api/reviews", (req, res) => {
    const db = loadDb();
    res.json(db.reviews);
  });

  app.post("/api/reviews", (req, res) => {
    try {
      const { excursionId, author, avatar, rating, comment } = req.body;
      if (!author || !comment) {
        return res.status(400).json({ error: "Reviewer name and testimony content are required." });
      }

      const db = loadDb();
      const ratingVal = Math.min(5, Math.max(1, Number(rating) || 5));

      const newReview = {
        id: `rev-${Date.now()}`,
        excursionId: sanitizeString(excursionId, 50),
        author: sanitizeString(author, 100),
        avatar: sanitizeString(avatar, 100),
        rating: ratingVal,
        comment: sanitizeString(comment, 1000),
        date: new Date().toISOString().split('T')[0]
      };

      db.reviews.unshift(newReview);
      saveDb(db);
      res.json(newReview);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ==========================================
  // COMMUNITY TRAVELS BOARD ENDPOINTS
  // ==========================================
  app.get("/api/community-photos", (req, res) => {
    const db = loadDb();
    res.json(db.community_photos || []);
  });

  app.post("/api/community-photos", (req, res) => {
    try {
      const { image, caption, author, location } = req.body;
      if (!image || !author) {
        return res.status(400).json({ error: "Image data and author name are required." });
      }

      const db = loadDb();
      if (!db.community_photos) {
        db.community_photos = [];
      }

      const newPhoto = {
        id: `photo-${Date.now()}`,
        image, 
        caption: sanitizeString(caption, 280),
        author: sanitizeString(author, 100),
        location: sanitizeString(location, 100),
        createdAt: new Date().toISOString()
      };

      db.community_photos.unshift(newPhoto);
      saveDb(db);
      res.json(newPhoto);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ==========================================
  // NEWSLETTER BOARD ENDPOINTS
  // ==========================================
  app.get("/api/newsletter", adminAuth, (req, res) => {
    const db = loadDb();
    res.json(db.newsletter_signups);
  });

  app.post("/api/newsletter", (req, res) => {
    try {
      const { email, interests, tier } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: "Please offer a valid email to receive the Scribe's scrolls." });
      }

      const db = loadDb();
      if (db.newsletter_signups.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({ error: "Your email is already registered inside our sacred newsletter scrolls!" });
      }

      const promoCode = `RAMSES-${Math.floor(Math.random() * 9000) + 1000}-30`;
      const newSignup = {
        id: `sub-${Date.now()}`,
        email: email.toLowerCase().trim(),
        interests: Array.isArray(interests) ? interests.map(i => sanitizeString(i, 30)) : [],
        tier: sanitizeString(tier, 30) || 'scribe',
        signupDate: new Date().toISOString().split('T')[0],
        promoCode
      };

      db.newsletter_signups.unshift(newSignup);
      saveDb(db);
      res.json(newSignup);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // ==========================================
  // SANCTUARY ADMINISTRATION MAINTENANCE
  // ==========================================
  app.post("/api/admin/purge", adminAuth, (req, res) => {
    const db = loadDb();
    db.bookings = [];
    db.reviews = [];
    db.newsletter_signups = [];
    db.oracle_logs = [];
    db.excursions = EXCURSIONS_DATA_SEED;
    saveDb(db);
    res.json({ success: true, message: "Sanctuary fully purified of transient data records." });
  });

  app.post("/api/admin/seed", adminAuth, (req, res) => {
    const db = loadDb();
    db.bookings = [
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
    db.reviews = INITIAL_REVIEWS_SEED;
    db.newsletter_signups = [
      {
        id: 'sub-seed-1',
        email: 'alexander.great@macedon.org',
        interests: ['diving', 'history'],
        tier: 'pharaoh',
        signupDate: '2026-07-10',
        promoCode: 'RAMSES-8821-30'
      }
    ];
    db.excursions = EXCURSIONS_DATA_SEED;
    saveDb(db);
    res.json({ success: true, message: "Divine seed data safely injected into the server." });
  });

  // ==========================================
  // GEMINI COGNITIVE SERVICES (RATE LIMITED)
  // ==========================================

  // Apply maximum 20 requests per IP per minute limit for all Generative AI services
  const geminiRateLimiter = apiRateLimiter(20, 60000);

  // API Route: Custom Pharaoh Itinerary Creator using Gemini 3.5 Flash
  app.post("/api/itinerary", geminiRateLimiter, async (req, res) => {
    try {
      const durationDays = Math.min(14, Math.max(1, Number(req.body.durationDays) || 3));
      const interest = sanitizeString(req.body.interest, 150);
      const intensity = sanitizeString(req.body.intensity, 100);
      const companion = sanitizeString(req.body.companion, 100);
      const customPreferences = sanitizeString(req.body.customPreferences, 300);

      const prompt = `You are Sennedjem, the Royal Scribe of Kemet, an ancient Egyptian counselor and travel sage. 
Craft a bespoke, day-by-day vacation itinerary located around the Red Sea, Egypt (specifically based out of Hurghada/Sharm El Sheikh).

User preferences:
- Duration: ${durationDays} Days
- Focus: ${interest || 'Balanced Exploration (Corals, Desert, History)'}
- Pace/Intensity: ${intensity || 'Leisurely'}
- Companions: ${companion || 'Solo traveler'}
- Special Requests: ${customPreferences || 'None'}

Incorporate these elements:
1. A poetic Pharaonic introduction greeting the traveler as a visiting noble or dignitary.
2. Day-by-day activities pairing Red Sea wonders (diving Ras Mohammed, Giftun Island, snorkeling reefs) with majestic Desert Safaris (camel treks, Bedouin tea, star gazing under the eye of Nut) and historic Ancient Egypt excursions (like a day-trip to Luxor/Karnak or a mystical valley tour).
3. "Scribe's Wisdom": Ancient lore, mythical trivia, or safety tips for each day (e.g. mentioning Anubis, Ra, Osiris, or the god of the sea, Nun).
4. A concluding royal blessing or cartouche blessing in prose.

Ensure the output is formatted as a clean, structured JSON object with the following JSON schema:
{
  "royalGreeting": "Greeting string",
  "title": "A Pharaonic title for the itinerary",
  "days": [
    {
      "dayNumber": 1,
      "theme": "Theme of the day",
      "activities": ["Activity 1", "Activity 2"],
      "scribeWisdom": "Lore, myth or tip for this day"
    }
  ],
  "blessing": "Concluding blessing"
}

Respond ONLY with valid JSON. Do not wrap in markdown blocks, do not write anything else.`;

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsedItinerary = JSON.parse(responseText.trim());
      res.json(parsedItinerary);
    } catch (error: any) {
      console.error("Error generating itinerary:", error);
      res.status(500).json({ 
        error: error.message || "Failed to summon the Royal Scribe. Please check your Gemini API key." 
      });
    }
  });

  // API Route: Royal Scribe Interactive Oracle Chat
  app.post("/api/scribe-chat", geminiRateLimiter, async (req, res) => {
    try {
      const message = sanitizeString(req.body.message, 1000);
      const { chatHistory } = req.body;
      const ai = getAI();

      const systemInstruction = `You are Sennedjem, the wise Royal Scribe of Kemet. You speak in a highly sophisticated, polite, and atmospheric Pharaonic style. You use terms like 'noble traveler', 'Kemet', 'the gift of the Nile', 'the golden sun of Ra', 'by the grace of Isis'.
You are an expert on Egyptian mythology, history, desert safaris, and the secrets of the Red Sea (Nun's great waters).
If the user asks to translate a name or word into hieroglyphs or to explain its meaning, do so beautifully and explain what ancient symbols represent it (e.g., Scarab for transformation, Ankh for life, Eye of Horus for protection).
Keep your responses relatively concise (1-2 short paragraphs) but highly immersive and flavorful.`;

      let prompt = "";
      if (chatHistory && Array.isArray(chatHistory)) {
        prompt += "Here is our previous conversation:\n";
        chatHistory.slice(-10).forEach((h: any) => {
          const authorRole = h.role === 'user' ? 'Traveler' : 'Scribe Sennedjem';
          const text = sanitizeString(h.text, 500);
          if (text) {
            prompt += `${authorRole}: ${text}\n`;
          }
        });
        prompt += "\n";
      }
      prompt += `Traveler: ${message}\nScribe Sennedjem:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
        }
      });

      // Save to Oracle chats log for administrative insight
      try {
        const db = loadDb();
        db.oracle_logs.unshift({
          id: `log-${Date.now()}`,
          name: "Anonymous Traveler",
          email: "Session Chat Guest",
          query: message,
          time: new Date().toISOString().replace('T', ' ').substring(0, 16)
        });
        // keep logs at max 50
        if (db.oracle_logs.length > 50) db.oracle_logs = db.oracle_logs.slice(0, 50);
        saveDb(db);
      } catch (logErr) {
        // ignore log error
      }

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Error in scribe chat:", error);
      res.status(500).json({ 
        error: error.message || "Failed to consult the Oracle. Please check your Gemini API key." 
      });
    }
  });

  // ==========================================
  // CLIENT ROUTING AND STATIC ASSETS
  // ==========================================
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Kemet Excursions] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
