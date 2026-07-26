export const MultiDaysHeroData = {
  badge: "Bespoke Itineraries",
  startTitle: "Signature",
  HighlightTitle: "Heritage",
  EndTitle: "Collection",
  description: "Exclusive access to Sri Lanka's hidden wonders with elite multi-lingual guidance.",
  image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2400",
};

// 1. Dynamic Types
export type MultiDaysPackageCategory = string;
export type BadgeType = "popular" | "sale" | "new";
export type PackageBadge = {
  label: string;
  type: BadgeType;
};

export type TourPackage = {
  title: string;
  slug: string;
  subtitle: string;
  origin: string;
  description: string;
  image: string;
  imageAlt: string;
  category: MultiDaysPackageCategory;
  categoryLabel: string;
  duration: string;
  rating: string;
  price: string;
  badges: PackageBadge[];
};

export const packages: TourPackage[] = [
  {
   slug: "minneriya-national-park-elephant-safari",
    title: "Ancient Kingdom Sigiriya",
    subtitle: "Royal Palace Exploration",
    origin: "From Colombo",
    description:
      "Climb the 8th wonder of the world and explore lush gardens. Experience history through ancient frescoes and royal landscape architecture.",
    image: "/images/dinuka-lankaloka-iduEaeBB_rQ-unsplash.webp",
    imageAlt: "Sigiriya",
    category: "cultural",
    categoryLabel: "Cultural",
    duration: "4 Days",
    rating: "5.0",
    price: "$299",
    badges: [
      { label: "Most Popular", type: "popular" },
      { label: "Save 20%", type: "sale" },
    ],
  },
  {
   slug: "minneriya-national-park-elephant-safari",
    title: "Sacred City of Kandy",
    subtitle: "Cultural & Botanical Tour",
    origin: "From Negombo",
    description:
      "Visit the Temple of the Tooth Relic and stroll through the Royal Botanical Gardens in this mist-wrapped mountain capital.",
    image: "/images/polonnaruwa-185290_1280.webp",
    imageAlt: "Kandy",
    category: "religious",
    categoryLabel: "Religious",
    duration: "3 Days",
    rating: "5.0",
    price: "$199",
    badges: [{ label: "New Arrival", type: "new" }],
  },
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Ella Highlands Dream",
    subtitle: "Scenic Mountain Trek",
    origin: "From Nuwara Eliya",
    description:
      "Witness the Nine Arch Bridge and hike to Little Adam's Peak for the most breathtaking views of the Sri Lankan tea country.",
    image: "/images/sri-lanka-334437_1280.webp",
    imageAlt: "Ella",
    category: "nature",
    categoryLabel: "Nature",
    duration: "5 Days",
    rating: "5.0",
    price: "$350",
    badges: [
      { label: "Most Popular", type: "popular" },
      { label: "Save 20%", type: "sale" },
    ],
  },
  {
   slug: "minneriya-national-park-elephant-safari",
    title: "Southern Azure Shores",
    subtitle: "Luxury Beach Escape",
    origin: "From Galle",
    description:
      "Indulge in whale watching, sunset surfing, and beachside luxury along the pristine southern coastline of the island.",
    image: "/images/tower-7314495_1280.webp",
    imageAlt: "Coastal",
    category: "coastal",
    categoryLabel: "Coastal",
    duration: "3 Days",
     rating: "5.0",
    price: "$240",
    badges: [{ label: "New Arrival", type: "new" }],
  },
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Yala Wilderness Safari",
    subtitle: "Private Jeep Safari",
    origin: "From Hambantota",
    description:
      "Embark on an exhilarating jeep safari through dense jungles and golden sand dunes to spot majestic leopards and wild elephants.",
    image: "/images/dinuka-lankaloka-iduEaeBB_rQ-unsplash.webp",
    imageAlt: "Yala National Park",
    category: "nature",
    categoryLabel: "Nature",
    duration: "2 Days",
    rating: "4.9",
    price: "$180",
    badges: [{ label: "Trending", type: "popular" }],
  },
  {
    slug: "minneriya-national-park-elephant-safari",
    title: "Ruins of Polonnaruwa",
    subtitle: "Ancient City Cycling",
    origin: "From Sigiriya",
    description:
      "Cycle through the ancient capital, marveling at monumental stupas, intricately carved stone shrines, and massive royal palaces.",
    image: "/images/polonnaruwa-185290_1280.webp",
    imageAlt: "Polonnaruwa Historical Site",
    category: "cultural",
    categoryLabel: "Cultural",
    duration: "3 Days",
    rating: "4.6",
    price: "$210",
    badges: [],
  },
  {
   slug: "minneriya-national-park-elephant-safari",
    title: "Trincomalee Pristine Sands",
    subtitle: "East Coast Snorkeling",
    origin: "From Habarana",
    description:
      "Relax on untouched white sand beaches and snorkel with colorful marine life in the crystal-clear waters of Pigeon Island.",
    image: "/images/sri-lanka-334437_1280.webp",
    imageAlt: "Trincomalee Beach",
    category: "coastal",
    categoryLabel: "Coastal",
    duration: "4 Days",
    rating: "4.8",
    price: "$270",
    badges: [{ label: "Save 15%", type: "sale" }],
  },
  {
   slug: "minneriya-national-park-elephant-safari",
    title: "Dambulla Cave Sanctuaries",
    subtitle: "Sacred Cave Expedition",
    origin: "From Kandy",
    description:
      "Explore the largest and best-preserved cave temple complex in Sri Lanka, adorned with ancient Buddhist murals and golden statues.",
    image: "/images/tower-7314495_1280.webp",
    imageAlt: "Dambulla Cave Temple",
    category: "religious",
    categoryLabel: "Religious",
    duration: "2 Days",
    rating: "4.7",
    price: "$150",
    badges: [{ label: "New Arrival", type: "new" }],
  },

  // {
  //   title: "TEST PACKAGE - Wild Safari",
  //   description:
  //   image: "/images/sri-lanka-334437_1280.webp",
  //   imageAlt: "Test Package",

  //   category: "adventure",
  //   categoryLabel: "Adventure",
  //   duration: "7 Days",
  //   rating: "4.9", // 🔥 4.8 & up
  //   price: "$950", // 🔥 Over $300
  //   badges: [{ label: "Test", type: "new" }],
  // },
];
