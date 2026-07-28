export type SpecialEventMode = "live" | "active" | "upcoming" | "normal";

export interface EventContentItem {
  badge: string;
  titlePart1: string;
  titleAccent: string;
  description: string;
  buttonText: string;
  statusTag: string;
  broadcastTag?: string;
  image?: string;
  images?: string[];
  videoUrl?: string;
}

export const specialEventContent = {
  mode: "upcoming" as SpecialEventMode,
  upcomingTargetDate: "2026-08-18T18:00:00",
  eventDetailsHref: "/special-events/kandy-esala-perahera",
  normalHref: "/tours/multi-days",

  live: {
    badge: "Live Event Stream",
    titlePart1: "Watch Live:",
    titleAccent: "Kandy Esala Perahera",
    description:
      "Experience the grand procession live right now. Majestic caparisoned elephants, fire-dancers, and traditional drummers parade through the sacred streets of Kandy.",
    buttonText: "Watch Live & View Details",
    videoUrl: "https://youtu.be/WRo-_cDedq0?si=hpKXU3xIh_1GIgtP",
    // https://www.youtube.com/watch?v=dQw4w9WgXcQ
    // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
    // https://www.facebook.com/facebook/videos/10153231379946729/
    // https://www.twitch.tv/lofigirl
    // https://www.w3schools.com/html/mov_bbb.mp4
    // https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4
    // https://vimeo.com/1084537
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    ],
    broadcastTag: "LIVE NOW",
    statusTag: "LIVE NOW",
  } as EventContentItem,

  active: {
    badge: "Featured Seasonal Festival",
    titlePart1: "Experience the Grand",
    titleAccent: "Kandy Esala Perahera",
    description:
      "Witness Sri Lanka's most magnificent cultural pageant. Dazzling fire-dancers, majestic caparisoned elephants, and ancient traditional drumming come alive.",
    buttonText: "Explore Full Event Details",
    //  videoUrl: "https://youtu.be/WRo-_cDedq0?si=hpKXU3xIh_1GIgtP",
    images: [
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500622944204-b135684e99fd?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=95&w=1600&auto=format&fit=crop",
    ],
    statusTag: "Event Ongoing",
  } as EventContentItem,

  upcoming: {
    badge: "Upcoming Cultural Event",
    titlePart1: "Get Ready For",
    titleAccent: "Kandy Esala Perahera",
    description:
      "The grandest cultural festival in Asia is commencing soon. Reserve your luxury seating, passes, and exclusive itinerary packages in advance.",
    buttonText: "View Event Schedule & Details",
    videoUrl: "https://youtu.be/WRo-_cDedq0?si=hpKXU3xIh_1GIgtP",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206",
    ],
    statusTag: "Starts Soon",
  } as EventContentItem,

  normal: {
    badge: "Cultural Heritage",
    titlePart1: "Immerse in Timeless",
    titleAccent: "Cultural Traditions",
    description:
      "Discover the deep-rooted heritage of Sri Lanka. From ancient ritualistic dances to sacred architectural wonders, journey through centuries of living history.",
    buttonText: "Explore Cultural Itineraries",
    // videoUrl: "https://youtu.be/WRo-_cDedq0?si=hpKXU3xIh_1GIgtP",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    ],
    statusTag: "Heritage Experience",
  } as EventContentItem,
};
