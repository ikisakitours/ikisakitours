export type DestinationRegion = "Coastal" | "Cultural & Heritage" | "Hill Country" | "Wildlife";

export type Destination = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  region: DestinationRegion;
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    strapline: string;
    image: string;
  };
  about: string;
  attractions: string[];
  guide: {
    bestTime: string;
    climate: string;
    languages: string;
    currency: string;
  };
  photos: string[];
};

export const destinationsHero = {
  eyebrow: "EXPLORE ISLAND",
  title: "Bespoke ",
  accent: "Destinations",
  strapline: "Discover the timeless heritage, pristine beaches, and misty highlands of Sri Lanka.",
  image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
};

export const destinationsData: Destination[] = [
  {
    slug: "colombo",
    name: "Colombo",
    lat: 6.9271,
    lng: 79.8612,
    region: "Coastal",
    hero: {
      eyebrow: "Destination Colombo",
      title: "Vibrant ",
      accent: "Colombo",
      strapline: "The commercial capital where colonial history meets modern city life.",
      image: "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Colombo is the vibrant commercial capital of Sri Lanka and a perfect starting point for exploring the island. This lively coastal city combines modern attractions with colonial history, cultural landmarks, shopping, and delicious local cuisine. Visitors come to enjoy beautiful ocean views, historic temples, museums, bustling markets, luxury hotels, and a lively nightlife. Colombo also offers excellent restaurants, waterfront parks, and easy access to major transportation hubs. Whether you are interested in history, architecture, shopping, or relaxing by the sea, Colombo provides a unique blend of tradition and modern city life, making it one of the most popular tourist destinations in Sri Lanka.",
    attractions: [
      "Galle Face Green",
      "Gangaramaya Temple",
      "Independence Square",
      "Colombo National Museum",
      "Pettah Market",
      "Viharamahadevi Park",
      "Colombo Lotus Tower",
      "Old Dutch Hospital Shopping Precinct",
      "Beira Lake",
      "Mount Lavinia Beach",
      "Arcade Independence Square",
      "Port City Colombo",
    ],
    guide: {
      bestTime: "Year Round",
      climate: "Coastal Tropical Climate",
      languages: "Sinhala, Tamil, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "kandy",
    name: "Kandy",
    lat: 7.2906,
    lng: 80.6337,
    region: "Hill Country",
    hero: {
      eyebrow: "Destination Kandy",
      title: "Sacred ",
      accent: "Kandy",
      strapline: "The cultural heart of Sri Lanka surrounded by misty mountains.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Nestled amidst lush hills and built around a peaceful lake, Kandy is the cultural capital of Sri Lanka and a UNESCO World Heritage site. It was the last capital of the ancient kings' era of Sri Lanka. The city is world-renowned for the sacred Temple of the Tooth Relic, which houses the relic of the tooth of the Buddha. Kandy's pleasant climate, rich history, traditional arts, and vibrant festivals like the Esala Perahera make it a must-visit destination for those seeking a deep dive into the island's heritage.",
    attractions: [
      "Temple of the Sacred Tooth Relic",
      "Kandy Lake",
      "Peradeniya Botanical Gardens",
      "Udawatta Kele Sanctuary",
      "Bahiravokanda Vihara Buddha Statue",
      "Ceylon Tea Museum",
    ],
    guide: {
      bestTime: "December to April",
      climate: "Mild Tropical Climate (Cooler than coasts)",
      languages: "Sinhala, Tamil, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "galle",
    name: "Galle",
    lat: 6.0535,
    lng: 80.221,
    region: "Coastal",
    hero: {
      eyebrow: "Destination Galle",
      title: "Historic ",
      accent: "Galle",
      strapline: "A living UNESCO World Heritage site with colonial charm.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Galle is a jewel on the southwest coast of Sri Lanka, famous for its 17th-century Dutch Fort, which is the largest remaining fortress in Asia built by European occupiers. Stepping into Galle Fort is like stepping back in time, with its beautifully preserved cobblestone streets, Dutch-colonial buildings, boutique shops, and chic cafes. The coastal breeze, the iconic lighthouse, and the vibrant art scene create a romantic and nostalgic atmosphere that captivates every traveler.",
    attractions: [
      "Galle Dutch Fort",
      "Galle Lighthouse",
      "Dutch Reformed Church",
      "Unawatuna Beach",
      "National Maritime Museum",
      "Japanese Peace Pagoda",
    ],
    guide: {
      bestTime: "December to March",
      climate: "Warm Coastal Climate",
      languages: "Sinhala, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    lat: 6.9497,
    lng: 80.7891,
    region: "Hill Country",
    hero: {
      eyebrow: "Destination Nuwara Eliya",
      title: "Little ",
      accent: "England",
      strapline: "Rolling hills, emerald tea estates, and a refreshing cool climate.",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Often referred to as 'Little England', Nuwara Eliya is nestled in the heart of Sri Lanka’s tea country. It boasts a remarkably cool climate, colonial-era bungalows, beautifully manicured gardens, and endless vistas of emerald-green tea plantations. The scenic train ride to this region is considered one of the most beautiful in the world. Visitors can enjoy tea tasting, golfing, and exploring cascading waterfalls in this tranquil highland retreat.",
    attractions: [
      "Gregory Lake",
      "Victoria Park",
      "Pedro Tea Estate",
      "Hakgala Botanical Garden",
      "Lovers Leap Waterfall",
      "Horton Plains National Park",
    ],
    guide: {
      bestTime: "February to May",
      climate: "Cool Highland Climate (Requires warm clothing)",
      languages: "Sinhala, Tamil, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "ella",
    name: "Ella",
    lat: 6.8667,
    lng: 81.0466,
    region: "Hill Country",
    hero: {
      eyebrow: "Destination Ella",
      title: "Scenic ",
      accent: "Ella",
      strapline: "A paradise for hikers, nature lovers, and train enthusiasts.",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Ella is a small, laid-back town in the Uva Province, famous for its breathtaking views, lush green hills, and a vibrant backpacker culture. Known for the iconic Nine Arch Bridge and the challenging yet rewarding hike up Ella Rock, this destination offers pure natural beauty. The atmosphere here is relaxed, with numerous cafes and restaurants lining the streets, making it the perfect spot to unwind after a day of exploring ravines and waterfalls.",
    attractions: [
      "Nine Arch Bridge",
      "Ella Rock",
      "Little Adam's Peak",
      "Ravana Falls",
      "Lipton's Seat",
      "Demodara Tea Estate",
    ],
    guide: {
      bestTime: "January to May",
      climate: "Mild and Breezy",
      languages: "Sinhala, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "sigiriya",
    name: "Sigiriya",
    lat: 7.957,
    lng: 80.7603,
    region: "Cultural & Heritage",
    hero: {
      eyebrow: "Destination Sigiriya",
      title: "Majestic ",
      accent: "Sigiriya",
      strapline: "The ancient rock fortress rising from the central plains.",
      image: "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Often referred to as the Eighth Wonder of the World, Sigiriya is an ancient palace and fortress complex that sits atop a massive column of rock nearly 200 meters high. Built by King Kasyapa in the 5th century, it is famous for its surviving ancient frescoes, water gardens, and the giant lion paws guarding the final staircase. A climb to the top rewards visitors with spectacular panoramic views of the surrounding jungle.",
    attractions: [
      "Sigiriya Rock Fortress",
      "Pidurangala Rock",
      "Sigiriya Museum",
      "Minneriya National Park (Nearby)",
      "Dambulla Cave Temple (Nearby)",
    ],
    guide: {
      bestTime: "January to April",
      climate: "Dry and Warm",
      languages: "Sinhala, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "yala",
    name: "Yala",
    lat: 6.3728,
    lng: 81.5204,
    region: "Wildlife",
    hero: {
      eyebrow: "Destination Yala",
      title: "Wild ",
      accent: "Yala",
      strapline: "The premier destination for leopard spotting and untamed wilderness.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Yala National Park is Sri Lanka’s most popular wildlife destination. It boasts one of the highest leopard densities in the world, making it a dream for wildlife photographers and nature enthusiasts. The park's diverse ecosystems range from moist monsoon forests to marine wetlands, hosting elephants, sloth bears, crocodiles, and hundreds of bird species. The juxtaposition of untamed jungle meeting the Indian Ocean provides a truly unique safari experience.",
    attractions: [
      "Yala National Park Safari",
      "Sithulpawwa Rock Temple",
      "Magul Maha Viharaya",
      "Kirinda Beach",
      "Kumana National Park (Nearby)",
    ],
    guide: {
      bestTime: "February to July (Park often closes in September/October)",
      climate: "Hot and Semi-Arid",
      languages: "Sinhala, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    lat: 5.9483,
    lng: 80.4713,
    region: "Coastal",
    hero: {
      eyebrow: "Destination Mirissa",
      title: "Coastal ",
      accent: "Mirissa",
      strapline: "Golden beaches, surfing waves, and majestic blue whales.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Mirissa is a breathtaking coastal town on the southern tip of Sri Lanka, famous for its palm-fringed beaches, vibrant surf culture, and laid-back nightlife. It is also globally recognized as one of the best locations for whale watching, particularly for sighting the magnificent blue whale. The relaxed vibe, excellent seafood restaurants, and secret coves make Mirissa a tropical paradise for ocean lovers.",
    attractions: [
      "Mirissa Beach",
      "Secret Beach",
      "Coconut Tree Hill",
      "Whale Watching Tours",
      "Parrot Rock",
      "Weligama Bay (Nearby)",
    ],
    guide: {
      bestTime: "November to April",
      climate: "Tropical Beach Climate",
      languages: "Sinhala, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "trincomalee",
    name: "Trincomalee",
    lat: 8.5874,
    lng: 81.2152,
    region: "Coastal",
    hero: {
      eyebrow: "Destination Trincomalee",
      title: "Pristine ",
      accent: "Trincomalee",
      strapline: "Untouched beaches and vibrant marine life on the east coast.",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Located on the northeastern coast, Trincomalee boasts some of the most beautiful and uncrowded white-sand beaches in Sri Lanka, such as Nilaveli and Uppuveli. Known for its deep-water harbor and historical significance, it offers incredible snorkeling and diving opportunities, particularly at Pigeon Island where visitors can swim with reef sharks and sea turtles. Trinco also has a rich Hindu culture, deeply rooted in the ancient Koneswaram Temple.",
    attractions: [
      "Nilaveli Beach",
      "Pigeon Island National Park",
      "Koneswaram Temple",
      "Fort Frederick",
      "Marble Beach",
      "Kanniya Hot Springs",
    ],
    guide: {
      bestTime: "May to October",
      climate: "Hot and Dry Coastal Climate",
      languages: "Tamil, Sinhala, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    slug: "anuradhapura",
    name: "Anuradhapura",
    lat: 8.3114,
    lng: 80.4037,
    region: "Cultural & Heritage",
    hero: {
      eyebrow: "Destination Anuradhapura",
      title: "Ancient ",
      accent: "Anuradhapura",
      strapline: "The cradle of early Sri Lankan civilization and Buddhism.",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
    },
    about:
      "Anuradhapura is one of the ancient capitals of Sri Lanka and a UNESCO World Heritage site. `It serves as the spiritual heart of the country, famous for its well-preserved ruins of ancient Sinhala civilization. Home to the sacred Jaya Sri Maha Bodhi tree—grown from a cutting of the fig tree under which Lord Buddha attained enlightenment—and massive, awe-inspiring stupas (dagobas), wandering through this vast ancient city is a profoundly spiritual and historical experience.",
    attractions: [
      "Jaya Sri Maha Bodhi",
      "Ruwanwelisaya Stupa",
      "Jetavanaramaya",
      "Abhayagiri Dagoba",
      "Isurumuniya Temple",
      "Twin Ponds (Kuttam Pokuna)",
    ],
    guide: {
      bestTime: "July to September",
      climate: "Dry and Hot",
      languages: "Sinhala, English",
      currency: "Sri Lankan Rupee (LKR)",
    },
    photos: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
    ],
  },
];
