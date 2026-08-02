// 1. Dynamic Types
export type OneDayPackageCategory = string;
export type BadgeType = "popular" | "sale" | "new";
export type PackageBadge = {
  label: string;
  type: BadgeType;
};

export type TourPackage = {
  title: string;
  tourType: string;
  slug: string;
  subtitle: string;
  origin: string;
  description: string;
  image: string;
  imageAlt: string;
  category: OneDayPackageCategory;
  categoryLabel: string;
  duration: string;
  rating: string;
  price: string;
  badges: PackageBadge[];
};

export const oneDayHeroData = {
  badge: "Quick Escapes",
  startTitle: "Curated",
  HighlightTitle: "One Day",
  EndTitle: "Excursions",
  description:
    "Experience the magic of Sri Lanka in a single day. Perfect for short stays, spontaneous adventures, and quick getaways.",
  image: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&q=80&w=2400",
};

export const oneDayTours: TourPackage[] = [
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Galle Fort & Madu River",
    tourType: "one-day",
    subtitle: "Coastal Heritage & Mangroves",
    origin: "From Colombo or Bentota",
    description:
      "Explore the UNESCO-listed Galle Dutch Fort, witness stilt fishermen, and enjoy a relaxing boat ride through the Madu River mangroves.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
    imageAlt: "Galle Dutch Fort Lighthouse",
    category: "coastal",
    categoryLabel: "Coastal",
    duration: "1 Day (10 Hours)",
    rating: "4.9",
    price: "$120",
    badges: [
      { label: "Most Popular", type: "popular" },
      { label: "Save 20%", type: "sale" },
    ],
  },
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Kandy Cultural Insight",
    tourType: "one-day",
    subtitle: "Sacred Relics & Botanical Beauty",
    origin: "From Colombo or Negombo",
    description:
      "Visit the revered Temple of the Sacred Tooth Relic, stroll through Peradeniya Botanical Gardens, and experience a traditional cultural show.",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
    imageAlt: "Temple of the Tooth Kandy",
    category: "cultural",
    categoryLabel: "Cultural",
    duration: "1 Day (12 Hours)",
    rating: "4.8",
    price: "$145",
    badges: [{ label: "New Arrival", type: "new" }],
  },
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Udawalawe Elephant Safari",
    tourType: "one-day",
    subtitle: "Wild Elephant Encounters",
    origin: "From South Coast or Colombo",
    description:
      "A thrilling jeep safari in Udawalawe National Park, renowned for its large herds of free-roaming wild elephants and vibrant birdlife.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
    imageAlt: "Elephants in Udawalawe",
    category: "nature",
    categoryLabel: "Nature",
    duration: "1 Day (8 Hours)",
    rating: "5.0",
    price: "$160",
    badges: [
      { label: "Trending", type: "popular" },
      { label: "Save 10%", type: "sale" },
    ],
  },
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Colombo City & Shopping",
    tourType: "one-day",
    subtitle: "Urban Pulse & Architecture",
    origin: "From Negombo or Airport",
    description:
      "Discover the vibrant capital city. Visit Gangaramaya Temple, Independence Square, Pettah markets, and enjoy premium shopping.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
    imageAlt: "Lotus Tower Colombo",
    category: "city",
    categoryLabel: "City Tour",
    duration: "Half Day (6 Hours)",
    rating: "4.6",
    price: "$65",
    badges: [{ label: "New Arrival", type: "new" }],
  },
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Sigiriya Rock & Dambulla",
    tourType: "one-day",
    subtitle: "Ancient Wonders in a Day",
    origin: "From Kandy or Colombo",
    description:
      "Climb the majestic Sigiriya Lion Rock fortress and explore the intricate murals of the Dambulla Cave Temple in one epic journey.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    imageAlt: "Sigiriya Rock Fortress",
    category: "cultural",
    categoryLabel: "Cultural",
    duration: "1 Day (14 Hours)",
    rating: "4.9",
    price: "$185",
    badges: [{ label: "Trending", type: "popular" }],
  },
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Mirissa Whale Watching",
    tourType: "one-day",
    subtitle: "Marine Giants Expedition",
    origin: "From Galle or Mirissa",
    description:
      "Set sail at dawn into the deep blue Indian Ocean to witness majestic Blue Whales, Sperm Whales, and playful dolphin pods.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=95&w=1600&auto=format&fit=crop",
    imageAlt: "Blue Whale Tail Mirissa",
    category: "coastal",
    categoryLabel: "Coastal",
    duration: "Half Day (5 Hours)",
    rating: "4.7",
    price: "$95",
    badges: [],
  },
];
