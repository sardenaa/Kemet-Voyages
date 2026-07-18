import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de' | 'pl';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Navigation & Bottom Bar
  nav_tours: { en: '𓆛 Tours & Excursions', de: '𓆛 Touren & Ausflüge', pl: '𓆛 Wycieczki i wyprawy' },
  nav_map: { en: '𓉶 Ancient Map', de: '𓉶 Antike Karte', pl: '𓉶 Starożytna mapa' },
  nav_ai_planner: { en: '𓋹 AI Travel Planner', de: '𓋹 KI-Reiseplaner', pl: '𓋹 Planer podróży AI' },
  nav_gallery: { en: '𓅓 Photo Gallery', de: '𓅓 Fotogalerie', pl: '𓅓 Galeria zdjęć' },
  nav_cartouche: { en: '𓉐 Name Translator', de: '𓉐 Namensübersetzer', pl: '𓉐 Tłumacz imion' },
  nav_faq: { en: '𓇚 Questions & Answers', de: '𓇚 Fragen & Antworten', pl: '𓇚 Pytania i odpowiedzi' },
  nav_bookings: { en: '𓎬 My Bookings', de: '𓎬 Meine Buchungen', pl: '𓎬 Moje rezerwacje' },
  nav_traveler: { en: '𓀚 Traveler View', de: '𓀚 Reisenden-Ansicht', pl: '𓀚 Widok podróżnika' },
  nav_admin: { en: '𓋹 Admin Dashboard', de: '𓋹 Admin-Dashboard', pl: '𓋹 Panel administratora' },
  mob_expeditions: { en: 'Expeditions', de: 'Expeditionen', pl: 'Wyprawy' },
  mob_faqs: { en: 'FAQs', de: 'FAQs', pl: 'FAQ' },
  mob_oracle: { en: 'Oracle', de: 'Orakel', pl: 'Wyrocznia' },
  mob_cartouche: { en: 'Cartouche', de: 'Kartusche', pl: 'Kartusz' },
  mob_bookings: { en: 'Bookings', de: 'Buchungen', pl: 'Rezerwacje' },

  // Hero Section
  hero_sub: { en: 'Experience Ancient Egypt', de: 'Erlebe das Alte Ägypten', pl: 'Doświadcz Starożytnego Egiptu' },
  hero_title: { en: 'Kemet Tours', de: 'Kemet Touren', pl: 'Kemet Tours' },
  hero_powered: { en: 'Powered by Mas international Agency', de: 'Unterstützt von der Mas international Agency', pl: 'Wspierane przez Mas international Agency' },
  hero_desc: { en: 'Explore world-class Red Sea coral reefs, experience desert quad and camel safaris, and discover the historic temples and tombs of Luxor with our personalized travel planner.', de: 'Erkunden Sie erstklassige Korallenriffe im Roten Meer, erleben Sie Wüsten-Quad- und Kamelsafaris und entdecken Sie die historischen Tempel und Gräber von Luxor mit unserem personalisierten Reiseplaner.', pl: 'Odkrywaj światowej klasy rafy koralowe Morza Czerwonego, weź udział w pustynnych safari na quadach i wielbłądach oraz odkrywaj historyczne świątynie i grobowce Luksoru dzięki naszemu spersonalizowanemu planerowi podróży.' },
  hero_explore: { en: 'Explore Tours', de: 'Touren Erkunden', pl: 'Przeglądaj wycieczki' },
  hero_chat_ai: { en: 'Chat with AI Assistant', de: 'Mit KI-Assistent Chatten', pl: 'Rozmawiaj z asystentem AI' },

  // FAQ Page / Scribe's Sanctuary (App.tsx)
  archive: { en: '𓇚 Egyptian Archives 𓇚', de: '𓇚 Ägyptisches Archiv 𓇚', pl: '𓇚 Egipskie archiwa 𓇚' },
  sanctuary_title: { en: "The Scribes' Sanctuary", de: 'Heiligtum der Schreiber', pl: 'Sanktuarium Pisarzy' },
  sanctuary_desc: { en: 'Access critical travel wisdom and sacred records here.', de: 'Greifen Sie hier auf wichtiges Reisewissen und heilige Aufzeichnungen zu.', pl: 'Uzyskaj dostęp do kluczowej mądrości podróżniczej i świętych zapisów tutaj.' },
  back_to_sanctuary: { en: '← Back to Sanctuary', de: '← Zurück zur Hauptseite', pl: '← Powrót do Sanktuarium' },
  safety_title: { en: 'Sacred Nile & Desert Safety', de: 'Heiliger Nil & Wüstensicherheit', pl: 'Bezpieczeństwo na świętym Nilu i pustyni' },
  safety_water: { en: 'Water Wisdom', de: 'Wasser-Weisheit', pl: 'Mądrość wody' },
  safety_water_desc: { en: 'Standard tap water is not fit for consumption. Please enjoy the abundant, complimentary ice-cold bottled mineral water provided across all tours and camps.', de: 'Leitungswasser ist nicht trinkbar. Bitte genießen Sie das reichliche, kostenlose eiskalte Mineralwasser in Flaschen, das auf allen Touren und in den Camps angeboten wird.', pl: 'Zwykła woda z kranu nie nadaje się do spożycia. Zapraszamy do korzystania z obfitej, bezpłatnej, lodowatej butelkowanej wody mineralnej, dostępnej podczas wszystkich wycieczek i w obozach.' },
  safety_garb: { en: 'Desert Garb', de: 'Wüstenkleidung', pl: 'Strój pustynny' },
  safety_garb_desc: { en: 'When riding quad bikes or hiking sand dunes, wear secure closed-toe shoes and wraps. The sun evaporates heat instantly, but temperatures drop rapidly after twilight.', de: 'Tragen Sie bei Quad-Fahrten oder Dünenwanderungen geschlossene Schuhe und Decken. Die Sonne verdunstet die Hitze sofort, aber die Temperaturen sinken nach der Dämmerung rapide.', pl: 'Podczas jazdy na quadach lub wędrówek po wydmach noś zakryte buty i chusty. Słońce błyskawicznie nagrzewa powietrze, ale temperatury gwałtownie spadają po zmierzchu.' },
  safety_cultural: { en: 'Cultural Respect', de: 'Kultureller Respekt', pl: 'Szacunek dla kultury' },
  safety_cultural_desc: { en: 'Cover shoulders and knees when visiting ancient shrines, and always request permission before capturing memories of Bedouin hosts.', de: 'Bedecken Sie Schultern und Knie beim Besuch antiker Schreine und bitten Sie immer um Erlaubnis, bevor Sie Fotos von Beduinen-Gastgebern machen.', pl: 'Zakrywaj ramiona i kolana podczas odwiedzania starożytnych świątyń i zawsze pytaj o zgodę przed robieniem zdjęć beduińskim gospodarzom.' },
  diving_title: { en: 'Diving & Historical Passes', de: 'Tauchen & Historische Pässe', pl: 'Nurkowanie i przepustki historyczne' },
  diving_coral: { en: 'Corals of Sobek', de: 'Sobeks Korallen', pl: 'Korale Sobka' },
  diving_coral_desc: { en: 'Use strictly reef-safe biodegradable sunscreen. Never stand on, touch, or handle corals as it damages sensitive living systems.', de: 'Verwenden Sie ausschließlich riffsichere, biologisch abbaubare Sonnencreme. Betreten, berühren oder hantieren Sie niemals mit Korallen, da dies empfindliche lebende Systeme beschädigt.', pl: 'Używaj wyłącznie biodegradowalnych filtrów przeciwsłonecznych bezpiecznych dla raf. Nigdy nie stawaj na koralowcach, nie dotykaj ich ani ich nie zrywaj, ponieważ niszczy to wrażliwe żywe ekosystemy.' },
  diving_passes: { en: 'Valley Passes', de: 'Pässe fürs Tal', pl: 'Przepustki do Doliny' },
  diving_passes_desc: { en: 'Standard entry tickets are included and allow entry into 3 major tombs. Specialty tombs like Tutankhamun can be booked through your guide 48 hours in advance.', de: 'Standard-Eintrittskarten sind inbegriffen und ermöglichen den Zugang zu 3 großen Gräbern. Spezialgräber wie das von Tutanchamun können 48 Stunden im Voraus über Ihren Guide gebucht werden.', pl: 'Standardowe bilety wstępu są wliczone w cenę i umożliwiają wejście do 3 głównych grobowców. Grobowce specjalne, takie jak Tutanchamon, można zarezerwować u przewodnika z 48-godzinnym wyprzedzeniem.' },
  diving_photo: { en: 'Pharaonic Photography', de: 'Pharaonische Fotografie', pl: 'Fotografia faraońska' },
  diving_photo_desc: { en: 'Smartphone photos are free inside tombs, but professional DSLR cameras/tripods are strictly banned without commercial licenses.', de: 'Smartphone-Fotos in den Gräbern sind kostenlos, aber professionelle DSLR-Kameras/Stative sind ohne kommerzielle Lizenz strengstens verboten.', pl: 'Zdjęcia smartfonem wewnątrz grobowców są bezpłatne, ale profesjonalne lustrzanki i statywy są surowo zabronione bez licencji komercyjnych.' },

  // Excursion Catalog
  cat_subtitle: { en: 'Sacred Offerings', de: 'Heilige Angebote', pl: 'Święte dary' },
  cat_title: { en: 'Available Expeditions', de: 'Verfügbare Expeditionen', pl: 'Dostępne wyprawy' },
  cat_desc: { en: 'Enlist in our premium curated experiences along the Nile, desert dunes, and aquatic depths.', de: 'Melden Sie sich für unsere erstklassigen Erlebnisse entlang des Nils, der Wüstendünen und der Wassertiefen an.', pl: 'Zapisz się na nasze starannie zaplanowane, wyjątkowe wycieczki wzdłuż Nilu, pustynnych wydm i morskich głębin.' },
  cat_all: { en: '𓆃 All Expeditions', de: '𓆃 Alle Expeditionen', pl: '𓆛 Wszystkie wyprawy' },
  cat_diving: { en: '𓆛 Diving & Sea', de: '𓆛 Tauchen & Meer', pl: '𓆛 Nurkowanie i morze' },
  cat_safari: { en: '𓃗 Desert Safari', de: '𓃗 Wüstensafari', pl: '𓃗 Pustynne safari' },
  cat_history: { en: '𓉐 Luxor History', de: '𓉐 Luxor-Geschichte', pl: '𓉐 Historia Luksoru' },
  cat_boat: { en: '𓊟 Private Boat', de: '𓊟 Private Boote', pl: '𓊟 Prywatna łódź' },
  cat_speedboat: { en: '𓆛 Speedboat', de: '𓆛 Schnellboote', pl: '𓆛 Motorówka' },
  cat_search_placeholder: { en: 'Search expeditions by name, location, or ancient lore...', de: 'Suchen Sie Expeditionen nach Name, Ort oder antiker Überlieferung...', pl: 'Szukaj wypraw według nazwy, lokalizacji lub starożytnej wiedzy...' },
  cat_duration: { en: 'Duration', de: 'Dauer', pl: 'Czas trwania' },
  cat_price_from: { en: 'Price', de: 'Preis', pl: 'Cena' },
  cat_ancient_lore: { en: 'Ancient Lore & Wisdom', de: 'Antike Überlieferung & Weisheit', pl: 'Starożytna mądrość i wierzenia' },
  cat_highlights: { en: 'Sacred Highlights', de: 'Heilige Highlights', pl: 'Święte atrakcje' },
  cat_inclusions: { en: 'What is Included', de: 'Was inbegriffen ist', pl: 'Co zawiera cena' },
  cat_enlist: { en: 'Enlist in Expedition', de: 'Für Expedition anmelden', pl: 'Zapisz się na wyprawę' },
  cat_reviews: { en: 'Traveler Reviews', de: 'Reisenden-Berichte', pl: 'Opinie podróżników' },
  cat_rating: { en: 'Rating', de: 'Bewertung', pl: 'Ocena' },
  cat_book_now: { en: 'Book This Expedition', de: 'Diese Expedition buchen', pl: 'Zarezerwuj tę wyprawę' },
  cat_unfold_lore: { en: 'Unfold Ancient Scroll Lore', de: 'Antike Schriftrolle entfalten', pl: 'Rozwiń starożytny zwój wiedzy' },
  cat_fold_lore: { en: 'Roll Up Ancient Scroll', de: 'Antike Schriftrolle einrollen', pl: 'Zwiń starożytny zwój' },

  // Booking Card/Form Dialog
  form_header: { en: 'Initiate Sacred Booking Scroll', de: 'Heilige Buchungsrolle initiieren', pl: 'Rozpocznij święty zwój rezerwacji' },
  form_name: { en: 'Your Name (Scribe Sign)', de: 'Ihr Name (Unterschrift des Schreibers)', pl: 'Twoje imię (podpis pisarza)' },
  form_email: { en: 'Your Email (Sacred Inbox)', de: 'Ihre E-Mail (Heiliger Posteingang)', pl: 'Twój e-mail (święta skrzynka odbiorcza)' },
  form_date: { en: 'Expedition Date', de: 'Expeditionsdatum', pl: 'Data wyprawy' },
  form_guests: { en: 'Number of Guests', de: 'Anzahl der Gäste', pl: 'Liczba gości' },
  form_special: { en: 'Special Requests / Offerings to the Gods', de: 'Besondere Wünsche / Opfergaben an die Götter', pl: 'Specjalne życzenia / dary dla bogów' },
  form_submit: { en: 'Seal Booking & Consult Oracle', de: 'Buchung versiegeln & Orakel befragen', pl: 'Przypieczętuj rezerwację i skonsultuj się z Wyrocznią' },
  form_close: { en: 'Close', de: 'Schließen', pl: 'Zamknij' },

  // AI Scribe Oracle
  oracle_subtitle: { en: 'Artificial Intelligence', de: 'Künstliche Intelligenz', pl: 'Sztuczna inteligencja' },
  oracle_title: { en: 'AI Travel Guide & Assistant', de: 'KI-Reiseplaner & Assistent', pl: 'Przewodnik i asystent podróży AI' },
  oracle_desc: { en: 'Ask our AI helper any questions or generate a custom day-by-day travel plan.', de: 'Fragen Sie unseren KI-Assistenten alles oder erstellen Sie einen maßgeschneiderten Reiseplan.', pl: 'Zadaj naszemu pomocnikowi AI dowolne pytanie lub wygeneruj spersonalizowany plan podróży dzień po dniu.' },
  oracle_placeholder: { en: 'Ask the Scribe about Egypt, excursions, or custom itineraries...', de: 'Fragen Sie den Schreiber nach Ägypten, Ausflügen oder maßgeschneiderten Reiseplänen...', pl: 'Zapytaj pisarza o Egipt, wycieczki lub spersonalizowane plany podróży...' },
  oracle_send: { en: 'Consult Scribe', de: 'Schreiber befragen', pl: 'Skonsultuj się z pisarzem' },
  oracle_suggest_btn1: { en: '☀️ Generate 5-Day Desert & Sea Itinerary', de: '☀️ 5-tägigen Wüsten- und Meeres-Reiseplan erstellen', pl: '☀️ Wygeneruj 5-dniowy plan podróży po pustyni i morzu' },
  oracle_suggest_btn2: { en: '𓆛 Best coral reefs to dive in Hurghada?', de: '𓆛 Beste Korallenriffe zum Tauchen in Hurghada?', pl: '𓆛 Najlepsze rafy koralowe do nurkowania w Hurghadzie?' },
  oracle_suggest_btn3: { en: '𓉐 Historical significance of Valley of the Kings', de: '𓉐 Historische Bedeutung des Tals der Könige', pl: '𓉐 Historyczne znaczenie Doliny Królów' },

  // Cartouche Generator
  cart_subtitle: { en: 'Egyptian Cartouche', de: 'Ägyptische Kartusche', pl: 'Egipski kartusz' },
  cart_title: { en: 'Egyptian Name Translator', de: 'Ägyptischer Namensübersetzer', pl: 'Egipski tłumacz imion' },
  cart_desc: { en: 'Translate your name into ancient Egyptian hieroglyphic symbols inside a beautiful protective cartouche.', de: 'Übersetzen Sie Ihren Namen in altägyptische Hieroglyphen in einer wunderschönen, schützenden Kartusche.', pl: 'Przetłumacz swoje imię na starożytne egipskie symbole hieroglificzne wewnątrz pięknego, ochronnego kartusza.' },
  cart_placeholder: { en: 'Enter your name (A-Z characters)...', de: 'Geben Sie Ihren Namen ein (A-Z Zeichen)...', pl: 'Wpisz swoje imię (litery A-Z)...' },
  cart_btn: { en: 'Translate to Hieroglyphs', de: 'In Hieroglyphen übersetzen', pl: 'Przetłumacz na hieroglify' },
  cart_key_guide: { en: 'Hieroglyphic Symbol Guide', de: 'Hieroglyphen-Symbolführer', pl: 'Przewodnik po symbolach hieroglificznych' },

  // Booking Ledger & Reviews Section
  book_section_sub: { en: 'My Bookings', de: 'Meine Buchungen', pl: 'Moje rezerwacje' },
  book_section_title: { en: 'Your Bookings & Reviews', de: 'Ihre Bookings & Bewertungen', pl: 'Twoje rezerwacje i opinie' },
  book_section_desc: { en: 'View your pending or confirmed bookings, and read reviews from other travelers.', de: 'Sehen Sie Ihre ausstehenden oder bestätigten Buchungen und lesen Sie Bewertungen anderer Reisender.', pl: 'Zobacz swoje oczekujące lub potwierdzone rezerwacje i przeczytaj opinie innych podróżników.' },
  book_no_bookings: { en: 'No sacred expeditions booked yet. Visit the Available Expeditions section above to book your first journey.', de: 'Noch keine heiligen Expeditionen gebucht. Besuchen Sie den Abschnitt „Verfügbare Expeditionen“ oben, um Ihre erste Reise zu buchen.', pl: 'Nie zarezerwowano jeszcze żadnych świętych wypraw. Odwiedź sekcję Dostępne wyprawy powyżej, aby zarezerwować swoją pierwszą podróż.' },
  book_cancel: { en: 'Cancel Pending Scroll', de: 'Ausstehende Buchung stornieren', pl: 'Anuluj oczekujący zwój' },
  book_confirmed_label: { en: 'Confirmed by High Priest', de: 'Vom Hohenpriester bestätigt', pl: 'Potwierdzone przez Arcykapłana' },
  book_pending_label: { en: 'Pending Oracle Approval', de: 'Wartet auf Freigabe des Orakels', pl: 'Oczekiwanie na zatwierdzenie przez Wyrocznią' },
  book_completed_label: { en: 'Completed', de: 'Abgeschlossen', pl: 'Zakończono' },
  book_total_cost: { en: 'Total Cost', de: 'Gesamtkosten', pl: 'Całkowity koszt' },
  book_date: { en: 'Date', de: 'Datum', pl: 'Data' },
  book_guests: { en: 'Guests', de: 'Gäste', pl: 'Goście' },
  book_write_review: { en: 'Write a Review', de: 'Eine Bewertung schreiben', pl: 'Napisz opinię' },
  book_submitted_reviews: { en: 'Submitted Reviews', de: 'Eingereichte Bewertungen', pl: 'Przesłane opinie' },
  book_add_rating: { en: 'Rate Expedition', de: 'Expedition bewerten', pl: 'Oceń wyprawę' },
  book_review_comment: { en: 'Your Review Comment', de: 'Ihr Bewertungskommentar', pl: 'Twój komentarz do opinii' },
  book_submit_review: { en: 'Submit Review', de: 'Bewertung abschicken', pl: 'Prześlij opinię' },

  // FAQ Component (Inner FAQ)
  faq_sub: { en: 'Travel Help & Tips', de: 'Reisehilfe & Tipps', pl: 'Pomoc i wskazówki podróżnicze' },
  faq_title: { en: 'Frequently Asked Questions', de: 'Häufig gestellte Fragen', pl: 'Najczęściej zadawane pytania' },
  faq_desc: { en: 'Got questions about diving gear, desert clothing, temple passes, or staying hydrated? We have got you covered with simple, practical answers.', de: 'Haben Sie Fragen zu Tauchausrüstung, Wüstenkleidung, Tempelpässen oder Flüssigkeitszufuhr? Wir haben einfache, praktische Antworten für Sie.', pl: 'Masz pytania dotyczące sprzętu do nurkowania, odzieży pustynnej, przepustek do świątyń lub nawodnienia? Mamy dla Ciebie proste, praktyczne odpowiedzi.' },
  faq_tab_questions: { en: '𓋹 Oracle FAQs', de: '𓋹 Orakel-FAQs', pl: '𓋹 FAQ Wyroczni' },
  faq_tab_packing: { en: '𓊟 Packing & Etiquette', de: '𓊟 Packliste & Etikette', pl: '𓊟 Pakowanie i etykieta' },
  faq_search: { en: 'Search wisdom archive...', de: 'Weisheitsarchiv durchsuchen...', pl: 'Przeszukaj archiwum mądrości...' },
  faq_select_env: { en: 'Select Environment:', de: 'Umgebung wählen:', pl: 'Wybierz środowisko:' },
  faq_select_season: { en: 'Select Season:', de: 'Jahreszeit wählen:', pl: 'Wybierz porę roku:' },
  faq_packing_title: { en: 'Interactive Packing Checklist', de: 'Interaktive Packliste', pl: 'Interaktive lista rzeczy do spakowania' },
  faq_etiquette_title: { en: 'Cultural Etiquette & Guidelines', de: 'Kulturelle Etikette & Richtlinien', pl: 'Kulturalna etykieta i wskazówki' },
  faq_progress: { en: 'Packed', de: 'Gepackt', pl: 'Spakowane' },
  faq_reset: { en: 'Reset Checklist', de: 'Checkliste zurücksetzen', pl: 'Zresetuj listę' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('kemet_language') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('kemet_language', lang);
  };

  const t = (key: string, fallback?: string): string => {
    const entry = TRANSLATIONS[key];
    if (entry && entry[language]) {
      return entry[language];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
