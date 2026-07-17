export type TestimonialLanguage = string;
export type GuestLanguage = Exclude<TestimonialLanguage, "all">;

export type Testimonial = {
  id: string;
  language: GuestLanguage;
  quote: string;
  name: string;
  initials: string;
  date: string;
  avatar: string;
  vip: boolean;
};

export const testimonialHeroData = {
  badge: "Unfiltered Experiences",
  titleStart: "Guest",
  titleHighlight: "Journals",
  description:
    "Real stories from real travelers. Discover why the world's most discerning explorers choose LankaElite for their Sri Lankan odyssey.",
} as const;

export const testimonialStats = [
  { value: "99%", label: "Success", featured: false },
  { value: "24/7", label: "Support", featured: false },
  { value: "1.5k+", label: "Reviews", featured: false },
  { value: "5.0", label: "Rating", featured: true },
] as const;

export const testimonials: Testimonial[] = [
  {
    id: "alexander-vance",
    language: "English",
    quote:
      "The level of detail was breathtaking. From the private tea tasting in Nuwara Eliya to our guide's deep knowledge, we felt like royalty.",
    name: "Alexander Vance",
    initials: "AV",
    date: "January 15, 2026",
    avatar: "https://i.pravatar.cc/150?u=alexander-vance",
    vip: true,
  },
  {
    id: "isabelle-roche",
    language: "French",
    quote:
      "Un service impeccable. Notre chauffeur parlait un français parfait, ce qui a rendu notre voyage tellement plus riche.",
    name: "Isabelle Roche",
    initials: "IR",
    date: "January 15, 2026",
    avatar: "https://i.pravatar.cc/150?u=isabelle-roche",
    vip: true,
  },
  {
    id: "yuki-tanaka",
    language: "Japanese",
    quote:
      "非常によかった。Everything was handled with true 'Omotenashi' spirit. The guide was respectful and punctual.",
    name: "Yuki Tanaka",
    initials: "YT",
    date: "January 15, 2026",
    avatar: "https://i.pravatar.cc/150?u=yuki-tanaka",
    vip: true,
  },
  {
    id: "elena-gomez",
    language: "Spanish",
    quote:
      "Un viaje inolvidable. La atención personalizada en español marcó la diferencia from the first airport pickup to the final coastal sunset.",
    name: "Elena Gomez",
    initials: "EG",
    date: "January 15, 2026",
    avatar: "https://i.pravatar.cc/150?u=elena-gomez",
    vip: false,
  },
];
