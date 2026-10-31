//services/Booking/types.ts
export interface DestinationSummary {
  id: string;
  slug: string;
}

export interface ItineraryDay {
  day: number;
  meals: string[];
  route: string[];
  title: string;
  details: string[];
  locations: string[];
  activities: string[];
  travelTime: string;
  scenicStops: string[];
  accommodation: string[];
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