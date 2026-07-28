export interface SpecialEventItem {
  id: string;
  title: string;
  category: "Live" | "Special Event" | "Event";
  description: string;
  image: string;
  date: string;
  href: string;
  status: string;
}

export const allSpecialEvents: SpecialEventItem[] = [
  {
    id: "kandy-esala-perahera",
    title: "Kandy Esala Perahera",
    category: "Live",
    description: "Experience the grand procession live right now. Majestic caparisoned elephants, fire-dancers, and traditional drummers parade through the sacred streets of Kandy.",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
    date: "August 15, 2026",
    href: "/special-events/kandy-esala-perahera",
    status: "LIVE NOW",
  },
  {
    id: "vesak-festival",
    title: "Vesak Festival of Lights",
    category: "Special Event",
    description: "Witness the island-wide illumination, magnificent pandols (thorana), and serene devotional zones celebrating the festival of light.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
    date: "May 2026",
    href: "/special-events/vesak-festival",
    status: "Featured",
  },
  {
    id: "sigiriya-cultural-show",
    title: "Cultural Heritage Dance Night",
    category: "Event",
    description: "An enchanting evening featuring ancient Kandyan drumming, traditional mask dances, and breathtaking fire-walking spectacles.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
    date: "Every Weekend",
    href: "/special-events/cultural-show",
    status: "Ongoing",
  },
  {
    id: "galle-literary-fest",
    title: "Galle Literary & Art Festival",
    category: "Special Event",
    description: "Gathering world-renowned authors, poets, and artists inside the historic ramparts of the 400-year-old Galle Fort.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
    date: "January 2027",
    href: "/special-events/galle-literary-fest",
    status: "Upcoming",
  },
];