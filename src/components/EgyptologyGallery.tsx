import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, BookOpen, Compass, MapPin } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  ancientLore: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: "The Gates of the Red Sea (Kemet Coast)",
    location: "Suez Gulf Coast, Red Sea",
    image: "/src/assets/images/egypt_red_sea_hero_1784070351173.jpg",
    description: "The spectacular convergence of pure desert dunes with the rich turquoise tides of the Red Sea. In the distance, an ancient obelisk sentinel watches over the trade vessels.",
    ancientLore: "The Pharaohs knew the Red Sea as 'Yam Suph' or 'The Sea of Reeds'. They sent royal expeditionary fleets of cedarwood ships from these very shorelines to load copper, gold, and exotic wild animals from the southern empires."
  },
  {
    id: 'gal-2',
    title: "Submerged Pharaoh Shrines of Nun",
    location: "Ras Mohammed Seabed",
    image: "/src/assets/images/egypt_sea_diving_1784070366165.jpg",
    description: "Centuries-old stone statues representing the guardians of the afterlife, resting amongst vibrant red anemones and bustling coral reefs.",
    ancientLore: "Egyptian maritime commanders believed that placing stone effigies of the gods on the sea floor would protect sails from sudden winds. Today, scuba divers swim with turtles around these silent underwater pharaonic sentinels."
  },
  {
    id: 'gal-3',
    title: "Caravans of Set's Wild Sands",
    location: "Sinai Mountain Desert",
    image: "/src/assets/images/egypt_desert_safari_1784070379685.jpg",
    description: "Explorers crossing the vast, high-contrast sand ridges of the Hurghada desert, with ancient ruins popping up from the sandy floor under a brilliant gold sunset.",
    ancientLore: "The Sinai desert has always been a place of powerful spiritual transformations and trials. Nomadic Bedouins and Pharaonic caravans shared these mountain paths, using the stars of Orion and Sirius to cross the dry dunes safely."
  },
  {
    id: 'gal-4',
    title: "Sunset Columns of the Karnak Temple",
    location: "East Bank, Luxor (Waset)",
    image: "/src/assets/images/egypt_luxor_temple_1784070393047.jpg",
    description: "The massive, awe-inspiring Hypostyle Hall containing 134 sandstone columns standing tall under a majestic orange sunset.",
    ancientLore: "Built to represent the primordial forest where the sun god Ra first rose from the lotus flower, these columns are covered in deep hieroglyphic inscriptions tracing the royal lineage and victories of Ramses the Great."
  }
];

export default function EgyptologyGallery() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8" id="immersive-gallery">
      {/* Title */}
      <div className="text-center">
        <span className="text-xs font-mono text-[#d4af37] uppercase tracking-[0.25em]">Sights of Kemet</span>
        <h2 className="font-serif text-3xl font-extrabold text-[#e6c280] uppercase mt-1">
          Immersive Desert & Reef Galleries
        </h2>
        <p className="text-stone-400 text-sm max-w-xl mx-auto mt-2">
          Step into the visual majesty of the Red Sea coast and desert ruins. Explore high-fidelity scenery captured under the golden sun of Ra.
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="bg-[#1a1410] border border-[#d4af37]/10 rounded-2xl overflow-hidden shadow-lg animate-pulse"
              id={`gallery-skeleton-${index}`}
            >
              {/* Image container skeleton */}
              <div className="h-64 bg-[#211a13] relative flex items-center justify-center">
                <span className="text-[#d4af37]/15 text-4xl font-serif">𓅃</span>
              </div>

              {/* Content Preview info skeleton */}
              <div className="p-4 space-y-2">
                <div className="w-20 h-3 bg-[#211a13] rounded-md" />
                <div className="w-3/4 h-4 bg-[#211a13]/80 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className="bg-[#1a1410] border border-[#d4af37]/20 rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer"
              onClick={() => setActiveItem(item)}
              id={`gallery-thumb-${item.id}`}
            >
              {/* Image container */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140f0a] via-transparent to-transparent opacity-80"></div>
                
                {/* View Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#140f0a]/40 backdrop-blur-[2px] transition-all duration-300">
                  <div className="bg-[#d4af37] text-[#140f0a] p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Eye className="w-5 h-5 text-[#140f0a]" />
                  </div>
                </div>
              </div>

              {/* Content Preview info */}
              <div className="p-4 relative">
                <div className="flex items-center gap-1 text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                  <MapPin className="w-3 h-3 text-[#d4af37]" /> {item.location.split(',')[0]}
                </div>
                <h4 className="font-serif text-[#e6c280] text-sm font-bold uppercase tracking-wider mt-1 truncate">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Full Theater Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#16110d] border border-[#d4af37]/40 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md border border-stone-800 text-stone-400 hover:text-white p-2.5 rounded-full transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Side */}
              <div className="lg:w-3/5 h-64 lg:h-[480px] relative">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden"></div>
              </div>

              {/* Content Side */}
              <div className="lg:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <Compass className="w-3.5 h-3.5 text-[#d4af37]" /> {activeItem.location}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#e6c280] uppercase tracking-wide leading-snug">
                      {activeItem.title}
                    </h3>
                  </div>

                  <p className="text-stone-300 text-xs leading-relaxed">
                    {activeItem.description}
                  </p>

                  {/* Lore Inscription box */}
                  <div className="bg-[#241c14] border-l-2 border-[#d4af37] rounded-r-xl p-4 space-y-1">
                    <span className="font-serif text-[10px] font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Scribe's Historical Lore
                    </span>
                    <p className="text-stone-400 text-xs italic leading-relaxed">
                      "{activeItem.ancientLore}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex justify-end">
                  <button
                    onClick={() => setActiveItem(null)}
                    className="bg-[#d4af37] text-[#140f0a] font-serif font-black text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Return to Gallery
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
