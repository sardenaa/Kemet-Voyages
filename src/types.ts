export interface Excursion {
  id: string;
  title: string;
  tagline: string;
  category: 'diving' | 'safari' | 'history' | 'boat' | 'speedboat';
  duration: string;
  price: number;
  rating: number;
  location: string;
  image: string;
  description: string;
  inclusions: string[];
  highlights: string[];
  ancientLore: string; // Thematic lore snippet for the excursion
}

export interface Booking {
  id: string;
  excursionId: string;
  excursionTitle: string;
  travelerName: string;
  travelerEmail: string;
  date: string;
  numberOfGuests: number;
  totalCost: number;
  specialRequests?: string;
  status: 'Pending Oracle Approval' | 'Confirmed by High Priest' | 'Completed';
  createdAt: string;
}

export interface Review {
  id: string;
  excursionId: string;
  author: string;
  avatar: string; // Egyptian themed avatar name
  rating: number;
  comment: string;
  date: string;
}

export interface HieroglyphChar {
  char: string;
  symbolName: string;
  meaning: string;
  svgPath: string; // Simple path coordinates or SVG rendering details
}

export interface ScribeMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface CustomItineraryDay {
  dayNumber: number;
  theme: string;
  activities: string[];
  scribeWisdom: string;
}

export interface CustomItinerary {
  royalGreeting: string;
  title: string;
  days: CustomItineraryDay[];
  blessing: string;
}
