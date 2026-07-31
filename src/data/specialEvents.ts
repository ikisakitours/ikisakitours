export type SpecialEventMode = "live" | "SpecialEvent" | "upcoming" | "Event";

export interface EventContentItem {
  id: string;
  slug: string;
  mode: SpecialEventMode;
  badge: string;
  titlePart1: string;
  titleAccent: string;
  description: string;
  buttonText: string;
  statusTag: string;
  broadcastTag?: string;
  image?: string;
  images?: string[];
  videoUrl?: string | null;
  targetDate?: string;
}

export const apiResponseEvents: EventContentItem[] = [
  {
    id: "evt-001",
    slug: "traditional-kandyan-dance",
    mode: "live",
    badge: "Live Event Stream",
    titlePart1: "Live Broadcast:",
    titleAccent: "Kandyan Dance Showcase",
    description:
      "Immerse in the rhythmic beats of ancient drum patterns and breathtaking acrobatics of traditional hill-country dancers broadcasting right now.",
    buttonText: "Watch Live Broadcast Now",
    statusTag: "LIVE NOW",
    broadcastTag: "LIVE NOW",
    videoUrl: "https://youtu.be/WRo-_cDedq0?si=hpKXU3xIh_1GIgtP",
    // https://www.youtube.com/watch?v=dQw4w9WgXcQ
    // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    // https://www.facebook.com/facebook/videos/10153231379946729/
    // https://www.twitch.tv/lofigirl
    // https://www.w3schools.com/html/mov_bbb.mp4
    // https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4
    // https://vimeo.com/1084537
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "evt-002",
    slug: "vesak-lantern-festival",
    mode: "SpecialEvent",
    badge: "Featured Seasonal Festival",
    titlePart1: "Experience the Grand",
    titleAccent: "Vesak Lantern Festival",
    description:
      "Witness the streets illuminate with mesmerizing glowing lanterns, colorful pandols, and heartfelt acts of devotion across the island.",
    buttonText: "Explore Full Event Details",
    statusTag: "Event Ongoing",
    images: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "evt-003",
    slug: "kandy-esala-perahera",
    mode: "upcoming",
    badge: "Upcoming Cultural Event",
    titlePart1: "Get Ready For",
    titleAccent: "Kandy Esala Perahera",
    description:
      "The grandest cultural festival in Asia is commencing soon. Reserve your luxury seating, passes, and exclusive itinerary packages in advance.",
    buttonText: "View Event Schedule & Details",
    statusTag: "Starts Soon",
    targetDate: "2026-08-18T18:00:00",
    videoUrl: "https://youtu.be/WRo-_cDedq0?si=hpKXU3xIh_1GIgtP",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: "evt-004",
    slug: "galle-literary-festival",
    mode: "Event",
    badge: "Cultural Heritage",
    titlePart1: "Immerse in Timeless",
    titleAccent: "Cultural Traditions",
    description:
      "Join acclaimed international authors and creative minds in the historic Galle Fort for days of literature, poetry, and art.",
    buttonText: "Explore Cultural Itineraries",
    statusTag: "Heritage Experience",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    ],
  },
];

export const categories = ["All", "Live", "upcoming", "Special Event", "Event"] as const;
export type EventCategory = (typeof categories)[number];

export interface SpecialEventListItem {
  slug: string;
  title: string;
  category: EventCategory;
  date: string;
  status: string;
  description: string;
  image: string;
  mode: SpecialEventMode;
  badge: string;
  statusTag: string;
  broadcastTag?: string;
  images?: string[];
  videoUrl?: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  perks: string[];
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

export const allSpecialEventsList: SpecialEventListItem[] = [
  {
    slug: "traditional-kandyan-dance",
    title: "Traditional Kandyan Dance Showcase",
    category: "Live",
    date: "August 2026",
    status: "LIVE NOW",
    description:
      "Immerse in the rhythmic beats of ancient drum patterns and breathtaking acrobatics of traditional hill-country dancers broadcasting right now.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=95&w=1600&auto=format&fit=crop",
    mode: "live",
    badge: "Live Event Stream",
    statusTag: "LIVE NOW",
    broadcastTag: "LIVE NOW",
    videoUrl: "https://youtu.be/WRo-_cDedq0?si=hpKXU3xIh_1GIgtP",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=95&w=1600&auto=format&fit=crop",
    ],
    aboutTitle: "Live Broadcast Experience",
    aboutText1:
      "Tune into our high-definition live stream capturing the vibrant beats of traditional performances, royal processions, and mesmerizing spectacles unfolding right this second.",
    aboutText2:
      "Interact with live feeds, witness multi-angle coverage of cultural celebrations, and feel the vibrant energy from anywhere in the world.",
    perks: [
      "Multi-Angle HD Live Stream Access",
      "Real-time Cultural Commentary",
      "Live Chat & Community Interaction",
      "Exclusive Post-Stream Archive Access",
    ],
    eventDate: "Happening Right Now",
    eventTime: "Live Broadcast Active",
    eventLocation: "Global Live Stream & Kandyan Cultural Centre",
  },
  {
    slug: "vesak-lantern-festival",
    title: "Vesak Lantern Festival",
    category: "Special Event",
    date: "2026-08-18T18:00:00",
    status: "Upcoming",
    description:
      "Witness the streets illuminate with mesmerizing glowing lanterns, colorful pandols, and heartfelt acts of devotion across the island.",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
    mode: "SpecialEvent",
    badge: "Featured Seasonal Festival",
    statusTag: "Event Ongoing",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
    ],
    aboutTitle: "Island-wide Illumination",
    aboutText1:
      "Experience the spiritual and visual splendor of Vesak as the entire island of Sri Lanka lights up to commemorate the birth, enlightenment, and passing of Lord Buddha.",
    aboutText2:
      "Wander through streets adorned with intricate, hand-crafted lanterns (Koodu) and towering illuminated pandols (Thorana) depicting ancient Buddhist tales.",
    perks: [
      "Guided Colombo Night Walk",
      "Visit to Major Pandols",
      "Traditional Dansal Food Tasting",
      "Lantern Making Workshop",
    ],
    eventDate: "May 23, 2026",
    eventTime: "6:30 PM Onwards",
    eventLocation: "Colombo & Island-wide",
  },
  {
    slug: "kandy-esala-perahera",
    title: "Kandy Esala Perahera",
    category: "upcoming",
    date: "2026-08-18T18:00:00",
    status: "Available",
    description:
      "The grandest cultural festival in Asia is commencing soon. Reserve your luxury seating, passes, and exclusive itinerary packages in advance.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
    mode: "upcoming",
    badge: "Upcoming Cultural Event",
    statusTag: "Starts Soon",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
    ],
    aboutTitle: "Experience the Grandeur",
    aboutText1:
      "Step into a world of ancient martial arts, vibrant costumes, and pulsating drum beats. The traditional Kandy Esala Perahera is a mesmerizing display of Sri Lankan heritage.",
    aboutText2:
      "Our showcase features elite dancers performing the iconic Ves dance, thrilling fire-walking, and the intricate pantheru dances that have been passed down for generations.",
    perks: [
      "Front Row VIP Seating",
      "Meet the Performers Session",
      "Traditional Drumming Lesson",
      "Welcome Cultural Drink",
    ],
    eventDate: "August 18, 2026",
    eventTime: "6:00 PM Onwards",
    eventLocation: "Sacred City of Kandy",
  },
  {
    slug: "galle-literary-festival",
    title: "Galle Literary Festival",
    category: "Event",
    date: "2027-01-15T09:00:00",
    status: "Upcoming",
    description:
      "Join acclaimed international authors and creative minds in the historic Galle Fort for days of literature, poetry, and art.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
    mode: "Event",
    badge: "Cultural Heritage",
    statusTag: "Heritage Experience",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    ],
    aboutTitle: "A Gathering of Literary Minds",
    aboutText1:
      "Set against the backdrop of the UNESCO World Heritage Galle Fort, this internationally acclaimed festival brings together award-winning authors, poets, and thinkers.",
    aboutText2:
      "Enjoy intimate panel discussions, poetry readings, gourmet dinners, and architectural walks through the cobbled streets of the 17th-century Dutch fort.",
    perks: ["VIP Festival Pass", "Exclusive Author Dinners", "Reserved Seating at Panels", "Guided Fort History Walk"],
    eventDate: "January 15-19, 2027",
    eventTime: "9:00 AM - 10:00 PM",
    eventLocation: "Galle Dutch Fort, Southern Province",
  },
];
