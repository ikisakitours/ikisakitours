// Icons
import { ShieldCheck, Sparkles, Clock, Headset } from "lucide-react";

export const bespokeHero = {
  eyebrow: "Bespoke Travel Solutions",
  title: "Curated Journeys, Tailored for You",
  accent: "Tailored",
  strapline: "Private Chauffeur / Custom Itineraries / Uncompromising Privacy",
  image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2400",
  alt: "Private chauffeur transfer vehicle on a coastal Sri Lankan road",
} as const;

export const assuranceBadges = ["Premium Quality", "No Pre-payment", "24/7 Support"] as const;
export const Languages = ["English", "Japanese", "French", "Spanish"] as const;

export const BespokeSidebar = {
  titleBase: "The Bespoke",
  titleAccent: "Experience",
  subtitle: "Crafting personalized journeys with uncompromising luxury, privacy, and precision.",
  features: [
    {
      icon: ShieldCheck,
      title: "Ultimate Privacy",
      description: "Discreet chauffeurs and tinted vehicles ensuring your complete confidentiality.",
    },
    {
      icon: Clock,
      title: "Total Flexibility",
      description: "Your itinerary is fluid. Adjust routes or extend your journey as you wish.",
    },
    {
      icon: Headset,
      title: "24/7 Concierge",
      description: "A dedicated travel manager is available at your fingertips, anytime.",
    },
  ],
  footerIcon: Sparkles,
  footerTitle: "No upfront payment required",
  footerDescription: "Our team will confirm your exact requirements before finalizing the booking.",
};
