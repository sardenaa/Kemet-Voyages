# 𓂀 Kemet Tours - Powered by Mas International Agency: Sacred Excursions & Pharaonic Itineraries 𓋹

Kemet Tours - Powered by Mas International Agency is an immersive, ancient-Egypt-themed full-stack travel portal, CRM, and itinerary planner. It transports travelers to the mystical lands of the Nile, the Red Sea, and the Western deserts, blending a cohesive **Pharaonic visual identity** with sophisticated **Gemini 3.5 Flash Generative AI** capabilities.

Designed to mimic a royal treasury and scribe’s papyrus scroll, Kemet Tours is optimized for both desktop and mobile screens, offering travelers and administrators alike an interactive portal into historical tours, mythical lore, and real-time caravan management.

---

## 📖 Table of Contents
1. [Core Features & Traveler Suite](#-core-features--traveler-suite)
2. [Interactive & Analytical Modules](#-interactive--analytical-modules)
3. [Administrator Command Center](#-administrator-command-center)
4. [Multi-Lingual Support](#-multi-lingual-support)
5. [Visual Identity & Themes](#-visual-identity--themes)
6. [Tech Stack & Architecture](#-tech-stack--architecture)
7. [Comprehensive File Directory Structure](#-comprehensive-file-directory-structure)
8. [Database & API Route Reference](#-database--api-route-reference)
9. [Setup & Installation](#-setup--installation)
10. [Step-by-Step Walkthrough](#-step-by-step-walkthrough)

---

## 🌟 Core Features & Traveler Suite

### 1. 𓆛 Excursion Catalog (`ExcursionCatalog`)
*   Browse curated tour packages categorized by sea, chariot safari, and historic explorations (e.g., diving Ras Mohammed, desert safaris, and Valley of the Kings luxury voyages).
*   Filter by categories and search titles, taglines, or locations.
*   Every excursion comes with transparent pricing, duration, ratings, curated lists of inclusions/highlights, and a **Thematic Ancient Lore** snippet providing historical immersion.

### 2. 𓎬 Sacred Caravan Ledger & Checkout (`BookingManager`)
*   Step-by-step booking interface for securing spots on excursions.
*   Input guest counts, departure dates, traveler names, emails, and custom special instructions.
*   Instantly generates a beautiful, printable **Papyrus Scroll Invoice** featuring a full financial breakdown and priest blessings.
*   Triggers the **Sacred Scarab Celebration**—interactive, crawling golden scarabs running across the user's viewport upon successful reservations.
*   Embeds custom generated **QR Codes** (`BookingQRCode`) containing encrypted verification tokens for high-tech check-ins.

### 3. 𓋹 Gemini AI Scribe & Interactive Oracle (`ScribeOracle`)
*   **The Scribe Planner:** Connects server-side with Gemini 3.5 Flash to construct custom, bespoke travel itineraries based on interests, duration (days), intensity, and special requests. Outputs structured JSON styled as a royal greeting.
*   **The Scribe Chat:** Converse directly in real-time with *Sennedjem, Royal Scribe of Kemet*. Sennedjem speaks in elegant Pharaonic prose and provides answers about Egyptian mythology, travel tips, and desert coordinates.

### 4. 𓁮 Cartouche Hieroglyph Generator (`CartoucheGenerator`)
*   Enter any name or word to see it instantly translated into authentic ancient Egyptian hieroglyphic glyph cards.
*   Provides the phonetic meaning and corresponding mythological symbol card for each letter (e.g., Scarab for transformation, Ankh for life, Eye of Horus for protection).

### 5. 𓁼 Egyptology Gallery & Reviews (`EgyptologyGallery` & `ReviewSystem`)
*   Explore a media gallery of ancient Egypt's visual wonders (temples, coral reefs, desert dunes) with category tabs.
*   Read and submit traveler reviews, choosing an Egyptian-themed traveler avatar (e.g., Pharaoh, High Priestess, Desert Nomad) and rating the caravan services with golden stars.

### 6. 𓋹 24-Hour Travel Departure Alert System
*   Built-in notification reminders alerting travelers who are within 28 hours of departure.
*   Prompts immediate actions (e.g., check-in verification, packing lists, and downloading certificates).

---

## 𓉶 Interactive & Analytical Modules

### 1. 𓉶 Interactive SVG Map of Ancient Sites (`AncientSitesMap`)
*   A responsive vector-drawn map charting historical ruins and ports throughout Egypt (Giza Plateau, Alexandria, Sinai Peninsula, Valley of the Kings, Philae Temple, Red Sea Reefs, and Abydos Temple).
*   Allows travelers to hover and click nodes to view ancient names (e.g., *Achet Chufu*, *Waset*, *Yebu*), localized historical facts, mystical lore, and associated travel excursions.
*   Includes a search panel to instantly pinpoint sites by name, region, or ancient history.

### 2. 𓍝 D3-Powered Donut Budget Calculator (`ExcursionExpenseCalculator`)
*   An advanced, client-side budget manager driven by **D3.js**.
*   Travelers can select or deselect their active excursions and set a custom budget limit.
*   Wired with dynamic transitions, rendering a high-fidelity golden donut chart demonstrating cost breakdowns, percentage slices, and threshold-exceeded alerts when costs surpass the traveler's budget.

### 3. 𓋹 Pharaonic Packing Essentials (`ScribeOracle` Packing Module)
*   An interactive, dynamically generated travel checklist tailored specifically to the traveler's planned or booked excursions.
*   Allows travelers to toggle excursions on and off to dynamically inject customized equipment requirements, auto-syncing from live bookings.
*   Features an interactive progress tracker with a sliding **Eye of Horus** `𓂀` symbol advancing along the bar.
*   Categorizes gear into:
    *   *General Egyptian Travel Essentials:* Passport, entry visas, Type C/F plugs, and Pharaoh's Stomach Care.
    *   *Diving & Red Sea Explorations:* Reef-safe biodegradable sunscreens, dry-bags, dive cards, and UV rash guards.
    *   *Desert Safari & Bedouin Expeditions:* Head scarves (shemagh), closed-toe shoes, and fleece windbreakers.
    *   *Sacred Temples & Ancient Shrines:* Modest light apparel, walking shoes, and compact Hieroglyph LED torches.
*   Offers quick **Copy to Clipboard** plain-text exports and highly polished **PDF Printing Templates**.

### 4. 𓎂 Digital Keepsake Certificate (`DigitalKeepsakeCertificate`)
*   Generates a personalized, royal completion document awarding travelers the eternal title of *"Honorary Explorer of Kemet"*.
*   Features physical signature slots for the High Priest and Scribe, fully printable with ancient borders and stamps.

---

## 𓂀 Administrator Command Center

### 1. 𓓳 Real-Time Booking Analytics (`BookingAnalytics`)
*   An executive dashboard utilizing **Recharts** representing business telemetry:
    *   *Timeline Area Charts:* Continuous stream tracking total caravan revenues over time.
    *   *Excursion Popularity Bar Charts:* Identifying highest-performing excursions based on total bookings and guest counts.
    *   *Category Pie Charts:* Distributing bookings by diving, safari, history, boat, or speedboat categories.
    *   *Ledger Status Distributions:* Mapping completed, confirmed, and pending voyages.
*   Supports toggle controls to toggle between total potential revenue and confirmed-only collections.

### 2. 𓂀 Sacred Ledger CRM & Tour CMS (`AdminDashboard`)
*   **Caravan Registry CRM with Bulk Actions:** 
    *   Search and filter registered bookings by status (*Pending Oracle Approval*, *Confirmed by High Priest*, *Completed*).
    *   Select multiple ledger entries concurrently. Perform bulk actions: *Confirm/Approve Selected* or *Banish/Delete Selected* with safety confirmation triggers.
*   **Tour CMS Panel:** Complete CRUD interface to create, edit, or delete excursions on-the-fly. Changes sync instantly across the traveler-facing catalog.
*   **Traveler Active Stage Simulator:** Visual telemetry screen detailing current concurrent online activities (how many users are currently *Browsing*, *Planning*, or *Finalizing Caravan Bookings*). Includes controls for admins to manually simulate shifts in tourist crowds.
*   **Noble Contacts Directory:** Track total contributions, traveler metadata, and individual voyage histories of VIP clients.

### 3. 𓊟 QR Ticket Verification & Camera Scanner (`TicketScanner`)
*   Wired with **`jsqr`** to allow the High Priest to scan physical or mobile tickets.
*   Taps into the user's camera (supporting environment/user cameras) or accepts image files to parse the QR code.
*   Matches ticket identifiers against the live server ledger, instantly checking in guests and verifying their booking status.

---

## 𓃠 Multi-Lingual Support

Kemet Tours features comprehensive multi-lingual translations across all components, allowing smooth switches between:
*   **EN:** English (International Travel Tongue)
*   **DE:** Deutsch (German)
*   **PL:** Polski (Polish)
*   **CS:** Čeština (Czech)

All static content, interactive labels, dynamic packing lists, certificates, and alerts adapt dynamically to the active state.

---

## 🎨 Visual Identity & Themes

*   **Desert Sand & Obsidian (Default):** Warm charcoal canvases (`#140f0c`), glowing Egyptian Gold borders (`#d4af37`), parchment card overlays, and subtle bronze shadows mimicking candle-lit pyramids.
*   **Nile Blue (Aquatic Variant):** Cool obsidian backdrops paired with deep-river turquoise, lapis lazuli accents, and cool aquatic neon shadows reflecting the Red Sea coast.
*   **Transitions:** Cinematic layout reflows and tabs animated smoothly via `motion`.

---

## 🛠️ Tech Stack & Architecture

### Frontend
*   **React 19** & **Vite 6** (Single Page Application pipeline).
*   **Tailwind CSS v4** for modern utility layout designs.
*   **Motion (from motion/react)** for seamless component entry, tab sliding, and modal overlays.
*   **D3.js** for high-performance SVG budget donuts.
*   **Recharts** for business analytics graphs.
*   **Lucide React** for consistent vector icons.
*   **jsQR** for local client-side video frame QR parsing.

### Backend
*   **Express Server (Node.js)** acting as a secure full-stack middleware and API registry.
*   **JSON-based Flat-File Database:** Local JSON persistence ensuring robust CRUD capabilities, seedy rollbacks, and log archiving.
*   **tsx & esbuild** build setup to bundle TypeScript server files into a unified production output (`dist/server.cjs`).

### Generative AI Integration
*   **`@google/genai` SDK** (standardized model-approved library) to interface server-side with `gemini-3.5-flash`.
*   Access keys are strictly server-bound to guarantee maximum API key protection.

---

## 📁 Comprehensive File Directory Structure

```text
├── .env.example              # Declarations of required server-side secret keys
├── server.ts                 # Full-stack Express server (Vite dev middleware & REST API endpoints)
├── vite.config.ts            # Vite asset bundler configuration
├── package.json              # App dependencies, CLI scripts, and start commands
├── metadata.json             # AI Studio permissions & capability flags
├── src/
│   ├── main.tsx              # React client-side entry point
│   ├── index.css             # Tailwind CSS global styling and Pharaonic animations
│   ├── types.ts              # TypeScript schemas (Excursion, Booking, Review, ScribeMessage, Itinerary)
│   └── components/
│       ├── LanguageContext.tsx           # Multi-lingual context provider (EN, DE, PL, CS)
│       ├── AdminDashboard.tsx            # CMS, CRM registry, traveler simulators, and contact folders
│       ├── BookingAnalytics.tsx          # Recharts area, bar, pie, and status telemetry charts
│       ├── ExcursionExpenseCalculator.tsx# D3-drawn dynamic golden donut budget chart
│       ├── ScribeOracle.tsx              # Gemini planner/chat & dynamic packing list with Horus tracker
│       ├── AncientSitesMap.tsx           # Interactive SVG vector map of Egyptian ruins
│       ├── TicketScanner.tsx             # jsQR web-camera scan validator
│       ├── BookingManager.tsx            # Checkout wizard, guest registries, and printable invoices
│       ├── DetailedTicketCard.tsx        # High-fidelity individual ticket inspector with cancel triggers
│       ├── DigitalKeepsakeCertificate.tsx# Printable explorer certificate under the High Priest's seal
│       ├── CartoucheGenerator.tsx        # Hieroglyph phonetic cards translation deck
│       ├── EgyptologyGallery.tsx         # Media explorer filtered by category
│       ├── ReviewSystem.tsx              # Rating manager with themed Pharaoh/Nomad avatar selectors
│       ├── BookingQRCode.tsx             # QR Canvas rendering from ticket credentials
│       ├── OraclesWisdomFAQ.tsx          # Collapsible ancient Q&A accordion
│       ├── ScarabCelebration.tsx         # Particle system animation spawning golden crawling beetles
│       ├── PapyrusScrollCelebration.tsx  # Particle effect spawning drifting parchment scrolls
│       ├── ScrollItineraryModal.tsx      # Rolling papyrus scroll modal displaying AI itineraries
│       ├── PromotionalBanner.tsx         # Ancient marketing alerts and discount vouchers
│       ├── FooterNewsletter.tsx          # Newsletter collector with tier preferences
│       └── MobileBottomNav.tsx           # Sticky responsive touch-target navigation bar
```

---

## 🔌 Database & API Route Reference

The backend operates as a stateful JSON database server. Here is the full REST specification:

### 1. Generative AI Cognitive Services
*   `POST /api/itinerary`: Sends structured duration, interests, intensity, and companions to Gemini 3.5 Flash. Returns an itinerary matching the `CustomItinerary` JSON schema.
*   `POST /api/scribe-chat`: Forwards traveler prompts and historical chat logs to Sennedjem, returning rich Pharaonic answers.

### 2. Excursions (CRUD CMS)
*   `GET /api/excursions`: Fetch all active tour packages.
*   `POST /api/excursions`: Add a new excursion (requires admin verification).
*   `PUT /api/excursions/:id`: Update an excursion's details, duration, price, or lore.
*   `DELETE /api/excursions/:id`: Banish an excursion from the temple database.

### 3. Bookings (CRM Caravan Ledger)
*   `GET /api/bookings`: Fetch all caravans registered (requires admin pass header `x-admin-passcode`).
*   `POST /api/bookings`: Place a new caravan booking. Generates unique IDs and timestamps.
*   `PUT /api/bookings/:id`: Update guest listings, special requests, or voyage status.
*   `DELETE /api/bookings/:id`: Banish a booking ledger entry.

### 4. Supporting API Registries
*   `GET /api/ancient-sites`: Retrieve coordinate mapping, names, and lore for the Interactive SVG Map.
*   `GET /api/reviews` & `POST /api/reviews`: Browse and write user reviews.
*   `GET /api/newsletter` & `POST /api/newsletter`: Manage email subscribers.
*   `GET /api/oracle-logs`: View conversational chat logs of anonymous traveler interactions with Sennedjem.
*   `POST /api/seed`: Instantly reset and seed the entire database with divine defaults.
*   `GET /api/health`: Perform deep server heartbeat health check.

---

## ⚙️ Setup & Installation

Follow these steps to run the application on your local workstation:

### 1. Prerequisites
Verify that **Node.js** (v18 or higher) or **Bun** is configured on your system.

### 2. Configure Environment Variables
Copy `.env.example` to create a local `.env` configuration file:
```bash
cp .env.example .env
```
Open your newly created `.env` file and input your Gemini credentials:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Note: Do not prefix this variable with `VITE_` as it is accessed exclusively server-side for maximum API key security.)*

### 3. Install Dependencies
Install all required libraries and build scripts:
```bash
npm install
```

### 4. Start Development Server
Launch the full-stack server and bundler:
```bash
npm run dev
```
The application runs on port **3000** (accessible at `http://localhost:3000`).

### 5. Build and Start in Production
Compile both the React assets and Express TypeScript server into a production-optimized build, then boot the standalone Node runner:
```bash
npm run build
npm start
```

---

## 𓀚 Step-by-Step Walkthrough

### Traveler Route
1.  **Map out the Journey:** Explore the **Interactive SVG Map** to locate ancient ruins and discover their deep mythological history.
2.  **Filter Excursions:** Browse the catalog, read the corresponding ancient lore, and compare inclusions.
3.  **Evaluate Budget:** Open the **D3 Budget Calculator**, select excursions, set your budget limit, and watch the visual donut adjust.
4.  **Confirm Booking:** Reserve a caravan. Submit to witness the crawl of **golden scarabs** across the screen. Grab your printable papyrus invoice and QR code ticket.
5.  **Generate AI Plans:** Consult the **Scribe Oracle**, customize daily duration/focus, and generate a bespoke, day-by-day scroll plan.
6.  **Pack Like a Pharaoh:** Access the **Packing Essentials** checklist, toggle your plans, tick off completed items, and watch the Eye of Horus slide along your progress bar. Print the list out for your baggage.
7.  **Write Reviews:** Submit reviews detailing your excursion experiences, selecting custom Egyptian traveler avatars.

### Admin/High Priest Route
1.  **Toggle Admin:** Turn on **Admin Mode** in the navigation header. Use the default passcode `pharaoh` to authenticate.
2.  **Telemetry Review:** Inspect **Recharts Area & Bar graphs** inside the analytical dashboard to review passenger tallies and treasury revenue.
3.  **Approve Caravans:** View the **Sacred Ledger CRM**, check off multiple travelers, and run **Bulk Approval** actions.
4.  **CMS Curation:** Add, update, or remove excursions instantly in the CMS.
5.  **QR Scan Check-in:** Open the **Ticket Scanner** tool, grant camera access, and scan any ticket QR code to verify check-in status in real time.

---

*“May your path be guided by the sun of Ra and the wisdom of Thoth as you travel through Kemet!”*
