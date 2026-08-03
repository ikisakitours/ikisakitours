import { Fuel, MapPinned, Car, UserCheck, Map, Wallet } from "lucide-react";
// export const featureCards = [
//   {
//     title: "Total Itinerary Control",
//     description: "You decide the destinations, the stops, and the pace. No pre-packaged tours—just your plan.",
//     Icon: MapPinned,
//   },
//   {
//     title: "Flexible & Transparent",
//     description: "All-inclusive, custom quotes tailored to your unique itinerary. No hidden costs, ever.",
//     Icon: Fuel,
//   },
// ] as const;

export const languageBadges = ["JP", "FR", "ES", "GB"] as const;
export const Languages = ["English", "Japanese", "French", "Spanish"] as const;
export const privateVehicleHero = {
  eyebrow: "Private Vehicle Service",
  title: "Seamless Travel, Your Way",
  accent: "Seamless",
  strapline: "Professional Drivers / Door-to-Door Service / Reliable & Punctual",
  image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2400",
  alt: "Private chauffeur transfer vehicle on a coastal Sri Lankan road",
} as const;

export const assuranceBadges = ["Premium Quality", "No Pre-payment", "24/7 Support"] as const;

export const privateVehicleSidebar = {
  titleBase: "Your Private",
  titleAccent: "Chauffeur",
  subtitle: "Experience seamless travel with a professional driver dedicated to your itinerary.",
  features: [
    {
      icon: Car,
      title: "Dedicated Vehicle",
      description: "Comfortable, well-maintained luxury vehicle exclusively for your group.",
    },
    {
      icon: UserCheck,
      title: "Expert Driver",
      description: "Professional, English-speaking driver trained for safe and smooth navigation.",
    },
    {
      icon: Map,
      title: "Your Pace",
      description: "Complete freedom to stop anywhere. No rigid schedules, just your own plan.",
    },
  ],
  footerIcon: Wallet,
  footerTitle: "All-Inclusive Rates",
  footerDescription: "Fuel, highway tolls, and driver accommodation are already covered. No hidden costs.",
};
