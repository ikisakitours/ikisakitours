// services/Booking/packageDetails/types.ts

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

export interface PricingTier {
  label: string;
  minPax: number;
  maxPax: number;
  pricePerPerson: number;
}

export interface PricingOptionLocalization {
  en?: string;
  ja?: string;
}

export interface PricingOption {
  id: string;
  name: PricingOptionLocalization | string;
  price: number;
  description?: PricingOptionLocalization | string;
  calculationType: "per_person" | "flat" | string;
}

export interface PassengerPricing {
  infantPrice: number;
  childRateType: "percentage" | "fixed" | string;
  childRateValue: number;
  coupleFixedPrice: number;
  couplePricingType: "auto_tier" | "fixed" | string;
}

export interface PricingConfig {
  tiers?: PricingTier[];
  options?: PricingOption[];
  passengerPricing?: PassengerPricing;
}

export interface PackageDetails {
  id: string;
  slug: string;
  type: "oneday" | "multiday" | string;
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
  pricingConfig?: PricingConfig;
  likes: number;
  createdAt: string;
  updatedAt: string;
}
