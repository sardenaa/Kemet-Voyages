# 𓂀 Kemet Tours - Powered by Mas international Agency: Sacred Excursions & Pharaonic Itineraries 𓋹

Kemet Tours - Powered by Mas international Agency is an immersive, ancient-Egypt-themed full-stack travel portal, CRM, and itinerary planner. It transports travelers to the mystical lands of the Nile, the Red Sea, and the Western deserts, blending a cohesive **Pharaonic visual identity** with sophisticated **Gemini 3.5 Flash Generative AI** capabilities.

Designed to mimic a royal treasury and scribe’s papyrus scroll, Kemet Tours is optimized for both desktop and mobile screens, offering travelers and administrators alike an interactive portal into historical tours, mythical lore, and real-time caravan management.

---

## 📖 Table of Contents
1. [Core Features](#-core-features)
2. [Visual Identity & Themes](#-visual-identity--themes)
3. [Tech Stack & Architecture](#-tech-stack--architecture)
4. [File Directory Structure](#-file-directory-structure)
5. [Setup & Installation](#-setup--installation)
6. [API Reference](#-api-reference)
7. [Step-by-Step Walkthrough](#-step-by-step-walkthrough)

---

## 🌟 Core Features

### 1. 𓆛 Excursion Catalog (`ExcursionCatalog`)
*   Browse curated tour packages categorized by sea, chariot safari, and historic explorations (e.g., diving Ras Mohammed, desert safaris, and Valley of the Kings luxury voyages).
*   Filter by categories and search titles, taglines, or locations.
*   Every excursion comes with transparent pricing, duration, ratings, curated lists of inclusions/highlights, and a **Thematic Ancient Lore** snippet providing historical immersion.

### 2. 𓎬 Sacred Caravan Ledger (`BookingManager`)
*   Step-by-step booking interface for securing spots on excursions.
*   Input guest counts, departure dates, traveler names, emails, and custom special instructions.
*   Instantly generates a beautiful, printable **Papyrus Scroll Invoice** featuring a full financial breakdown and priest blessings.
*   Triggers the **Sacred Scarab Celebration**—interactive, crawling golden scarabs running across the user's viewport upon successful reservations.

### 3. 𓋹 Gemini AI Scribe & Interactive Oracle (`ScribeOracle`)
*   **The Scribe Planner:** Connects server-side with Gemini 3.5 Flash to construct custom, bespoke travel itineraries based on interests, duration (days), intensity, and special requests. Outputs structured JSON styled as a royal greeting.
*   **The Scribe Chat:** Converse directly in real-time with *Sennedjem, Royal Scribe of Kemet*. Sennedjem speaks in elegant Pharaonic prose and provides answers about Egyptian mythology, travel tips, and desert coordinates.

### 4. 𓁮 Cartouche Hieroglyph Generator (`CartoucheGenerator`)
*   Enter any name or word to see it instantly translated into authentic ancient Egyptian hieroglyphic glyph cards.
*   Provides the phonetic meaning and corresponding mythological symbol card for each letter (e.g., Scarab for transformation, Ankh for life, Eye of Horus for protection).

### 5. 𓁼 Egyptology Gallery & Reviews (`EgyptologyGallery` & `ReviewSystem`)
*   Explore a media gallery of ancient Egypt's visual wonders (temples, coral reefs, desert dunes) with category tabs.
*   Read and submit traveler reviews, choosing an Egyptian-themed traveler avatar (e.g., Pharaoh, High Priestess, Desert Nomad).

### 6. 𓂀 High Priest's Admin Dashboard (`AdminDashboard`)
A robust back-office platform that operates as a real-time Command Center:
*   **Tour CMS Panel:** Add, edit, or delete excursions from the live catalog.
*   **Real-Time Traveler Stage Monitor:** A simulated active-user monitoring system mapping how many concurrent travelers are currently *Browsing Tours*, *Building Itinerary*, or *Finalizing Bookings*, with dynamic count adjustments depending on the admin's simulation.
*   **Sacred Ledger CRM (Bookings Manager) with Bulk Actions:** 
    *   Search and filter registrations by status: *Pending Oracle Approval*, *Confirmed by High Priest*, and *Completed*.
    *   **Bulk Action Checkboxes:** Easily select multiple ledger entries using standard multi-select or click-all controls. Approve all selected bookings at once (advancing status) or banish them (bulk delete) with validation prompts.
*   **Noble Contacts Directory:** View details, total tributes paid, and customer histories of VIP clients.

---

## 🎨 Visual Identity & Themes

Kemet Tours features custom ambient styles designed to emphasize the desert majesty:
*   **Default Theme (Desert Sand & Obsidian):** Deep charcoal colors (`#140f0c`), glowing Egyptian Gold borders (`#d4af37`), warm parchment headers, and rich bronze shadow indicators.
*   **Nile Blue Theme:** Smooth obsidian colors paired with deep-river turquoise, lapis lazuli accents, and cool aquatic neon shadows.
*   **Responsive Layouts:** Employs micro-animations, fade transitions powered by `motion`, hover effects, and custom CSS-pulsing containers to mimic candle-lit stone chambers.

---

## 🛠️ Tech Stack & Architecture

### Frontend
*   **React 19** & **Vite 6** (Single Page Application environment).
*   **Tailwind CSS v4** for utility classes, custom grids, and unified typography pairings (Inter, Space Grotesk, JetBrains Mono).
*   **Motion** (from `motion/react`) for smooth, cinematic transitions.
*   **Lucide React** for consistent vector icons.

### Backend
*   **Express Server (Node.js)** handling secure proxy requests to keep APIs protected.
*   **tsx** & **esbuild** bundling pipeline to compile TypeScript into a optimized, self-contained CommonJS (`dist/server.cjs`) container build.

### Generative AI Integration
*   **`@google/genai` SDK** (latest model-approved package) to interface server-side with `gemini-3.5-flash`.
*   Includes fallback safety checks to notify the admin gracefully if the secret environment variables are unconfigured.

---

## 📁 File Directory Structure

```text
├── .env.example              # Declarations of required server-side secret keys
├── server.ts                 # Full-stack Express server entry point (Vite dev middleware & API endpoints)
├── vite.config.ts            # Vite bundler options
├── package.json              # Script directives & dependencies
├── metadata.json             # AI Studio app permissions & metadata
├── src/
│   ├── main.tsx              # Main React hydration mount
│   ├── index.css             # Tailwind v4 directives & global pharaonic keyframes
│   ├── App.tsx               # Primary coordinator (state, themes, layouts, layout routes)
│   ├── types.ts              # TypeScript schemas for Excursions, Bookings, Reviews, & Itineraries
│   └── components/
│       ├── AdminDashboard.tsx      # CMS, CRM, simulated active stage trackers, and bulk-action lists
│       ├── BookingManager.tsx      # Checkout form, papyrus scroll invoice generator
│       ├── CartoucheGenerator.tsx  # Name translation and rendering logic for Hieroglyphs
│       ├── EgyptologyGallery.tsx   # Curated media galleries with filters
│       ├── ExcursionCatalog.tsx    # Scrollable tours browser
│       ├── ScribeOracle.tsx        # Gemini-powered Travel Planner and conversational chat widget
│       ├── ScrollItineraryModal.tsx# rolling scroll layout displaying Scribe itineraries
│       ├── ReviewSystem.tsx        # High Priest rating boards and customer reviews
│       ├── ScarabCelebration.tsx   # Interactive scarab beetle canvas animation
│       ├── FooterNewsletter.tsx    # Pharaonic newsletter subscriptions
│       └── MobileBottomNav.tsx     # Tactile navigation bar for hand-held tablets
```

---

## ⚙️ Setup & Installation

Follow these steps to spin up the sacred temple portal on your local machine:

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) or **Bun** installed on your system.

### 2. Configure Environment Variables
Copy `.env.example` to a new file named `.env` in the root folder:
```bash
cp .env.example .env
```
Inside your newly created `.env` file, specify your Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*Note: Do not prefix this variable with `VITE_` as it is accessed strictly on the server-side to guarantee client key-protection.*

### 3. Install Dependencies
Run npm install to populate the node modules folder:
```bash
npm install
```

### 4. Run Development Server
Boot the Express back-end proxy and Vite development module concurrently:
```bash
npm run dev
```
The application will launch on port **3000** (accessible at `http://localhost:3000`).

### 5. Build & Start in Production
Compile both the React bundle and server TypeScript file into production-ready output, and launch the standalone node runtime:
```bash
npm run build
npm start
```

---

## 🔌 API Reference

The server exposes three core full-stack JSON endpoints:

### 1. `GET /api/health`
Verifies backend connectivity and returns the current ISO timestamp.

### 2. `POST /api/itinerary`
Crafts a structured vacation plan using Gemini 3.5 Flash.
*   **Request Body:**
    ```json
    {
      "durationDays": 4,
      "interest": "Diving and Ancient temples",
      "intensity": "Moderate",
      "companion": "Family trip",
      "customPreferences": "Vegetarian cuisine, no long camel rides"
    }
    ```
*   **Response Format (JSON):** Matches the `CustomItinerary` interface detailed in `src/types.ts`.

### 3. `POST /api/scribe-chat`
Supports conversational chats with the Scribe Sennedjem oracle.
*   **Request Body:**
    ```json
    {
      "message": "Translate the name 'Alex' and explain what the owl symbol stands for.",
      "chatHistory": [
        { "role": "user", "text": "Hello Scribe!" },
        { "role": "assistant", "text": "Greetings, noble traveler..." }
      ]
    }
    ```
*   **Response Format (JSON):**
    ```json
    {
      "response": "By the grace of Isis, 'Alex' begins with the sacred hieroglyph of the eagle... [Lore details]"
    }
    ```

---

## 𓀚 Step-by-Step Walkthrough

### For the Traveler Persona
1.  **Browse Tours:** Click **Tours** to search and filter excursions. Review the ancient lore snippets on each.
2.  **Book a Caravan:** Select a tour and press **Book Tour**. Complete the scroll request. Watch the golden scarabs crawl across the sands of your screen in celebration upon submission.
3.  **Generate an Itinerary:** Navigate to the **AI Scribe**, select your itinerary preferences, and click **Assemble Royal Plan**. Within seconds, watch a sacred scroll unfurl containing your daily guide, historical trivia, and Pharaoh's blessings.
4.  **Engage with Sennedjem:** Open the **Interactive Chat** to query the scribe on historical facts, hieroglyphs, or mythical stories of Osiris and Ra.
5.  **Translate Your Name:** Go to the **Cartouche** screen, enter your name, and marvel at your royal cartouche rendering.

### For the Administrator Persona
1.  **Toggle Admin Mode:** Turn on the Admin Toggle in the header navigation.
2.  **Monitor Travelers:** Watch the **Traveler Stage Tracker** update to reflect current traffic flows.
3.  **Perform Bulk Operations:** Open the **Caravan Ledger** (CRM) tab.
    *   Search and check multiple travelers' bookings.
    *   Click **Approve Selected** to advance their states from *Pending Oracle Approval* to *Confirmed by High Priest*, and eventually *Completed*.
    *   Click **Cancel Selected** to remove outdated booking entries in bulk from the ledger.
4.  **Curate Tour Offerings:** Utilize the **CMS Excursions Manager** to add or edit existing Egyptian tour offerings instantly.

---

*“May your path be guided by the sun of Ra and the wisdom of Thoth as you travel through Kemet!”*
