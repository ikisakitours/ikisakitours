// services/Booking/types.ts
export interface DestinationSummary {
  id: string;
  slug: string;
  title: string;   
  summary: string; 
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string; 
  images: string[];    
  travelTime: string;
  locations: string[];
  route: string[];
  details: string[];
  scenicStops: string[];
  activities: string[];
  meals: string;         
  accommodation: string; 
}

export interface ActivityDetail {
  title: string;
  description: string;
}

export interface PackageDetails {
  id: string;
  slug: string;
  type: "oneday" | "multiday";
  category: string;
  origin: string;
  duration: string;
  badge: string;
  titleEmphasis: string;
  title: string;
  price: number;
  discount: number;
  provider: string;
  leadTitle: string;
  leadDescription: string;
  description: string;
  gallery: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  activityDetails: ActivityDetail[];
  itinerary: ItineraryDay[];
  destinations: DestinationSummary[];
  likes: number;
  createdAt: string;
  updatedAt: string;
}