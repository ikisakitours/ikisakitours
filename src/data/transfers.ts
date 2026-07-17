export const transferCards = [
  {
    title: "Airport Pick-Up",
    description: "Meet & greet service at Bandaranaike International Airport with comfortable private vehicles.",
    action: "Book Transfer",
    href: "services/transfers",
  },
  {
    title: "Hotel & City",
    description: "Smooth transport between hotels, cities, beaches, and cultural destinations.",
    action: "View Fleet",
    href: "services/transfers",
  },
  {
    title: "Drop-Off",
    description: "Safe and timely drop-off to airport or your next destination at the end of your journey.",
    action: "Schedule Now",
    href: "services/transfers",
  },
] as const;

export type TransferServiceId = "pickup" | "hotel" | "dropoff";

export type TransferServiceType = {
  id: TransferServiceId;
  title: string;
  description: string;
  summaryLabel: string;
};

export const transferHero = {
  eyebrow: "Chauffeur Service",
  title: "Secure Your Elite Transfer",
  accent: "Elite",
  strapline: "Airport Pick-ups / Hotel Transfers / Island-wide Chauffeur",
  image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2400",
  alt: "Private chauffeur transfer vehicle on a coastal Sri Lankan road",
} as const;

export const transferServiceTypes: TransferServiceType[] = [
  {
    id: "pickup",
    title: "Airport Pick-Up",
    description: "Meet and greet arrival support at Bandaranaike International Airport.",
    summaryLabel: "Airport arrival transfer",
  },
  {
    id: "hotel",
    title: "Hotel & City",
    description: "Private transfer between hotels, city stops, beaches, and heritage sites.",
    summaryLabel: "Hotel and city transfer",
  },
  {
    id: "dropoff",
    title: "Airport Drop-Off",
    description: "Timed departure transfer with route planning for a calm airport arrival.",
    summaryLabel: "Airport departure transfer",
  },
];

export const transferLanguages = ["English", "Japanese", "French", "Spanish"] as const;

export const transferAssurances = [
  {
    title: "Fully Insured Fleet",
    description: "Commercial passenger coverage for every confirmed journey.",
  },
  {
    title: "24/7 Availability",
    description: "Concierge support for early arrivals, late flights, and route changes.",
  },
  {
    title: "GPS Mileage Confirmation",
    description: "Final fare is checked against exact route mileage before payment.",
  },
] as const;

export const fareInclusions = [
  "Meet and greet service",
  "Professional chauffeur",
  "Premium insurance",
  "Multi-language concierge support",
] as const;

export const assuranceBadges = ["Premium Quality", "No Pre-payment", "24/7 Support"] as const;
