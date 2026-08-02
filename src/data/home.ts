export const heroStats = [
  { value: "5.0", label: "TripAdvisor" },
  { value: "12+", label: "Languages" },
  { value: "100%", label: "Private" },
] as const;

//  Popular Tags
export const heroPopularTags = [
  { label: "#GalleFort", href: "/destinations/galle-fort" },
  { label: "#YalaSafari", href: "/destinations/yala-safari" },
  { label: "#TeaCountry", href: "/destinations/tea-country" },
] as const;

// Popular Services
export const heroPopularServices = [
  { label: "Chartering a Tax", href: "/services/private-vehicle" },
  { label: "Custom Made Tours", href: "/services/bespoke-travel" },
  { label: "Transfer Tours", href: "/services/transfers" },
] as const;

//Discovery Places
export const destinations = [
  { number: "/01", name: "Sigiriya" },
  { number: "/02", name: "Ella" },
  { number: "/03", name: "Mirissa" },
  { number: "/04", name: "Nuwara Eliya" },
  { number: "/05", name: "Galle Fort" },
] as const;

export const heroContent = {
  badge: "The Gold Standard of Travel",
  award: "Travel+Leisure 2026",
  titleMain: "Sri Lanka",
  titleAccent: "Beyond the Map",
  description: "MapMate personalized tours with master guides in ",
  languagesOne: "Japanese, French, Spanish",
  languagesTwo: "English.",
  searchPlaceholder: "Where to explore?",
  startJourneyText: "Start Journey",
  popularLabel: "Popular:",
  servicesHeading: "Discover Our Popular Services",
};

export const discoveryContent = {
  tag: "Discovery",
  titleOne: "The Most Popular",
  titleTwo: "Destinations of 2026",
  subheading: "A Journey Redefined",
  descriptionPart1: "Experience the curated selection of Sri Lanka's finest. Check our exclusive packages and ",
  highlightText: "explore the Pearl of the Indian Ocean",
  descriptionPart2: "in unparalleled luxury.",
  status: "Status: Trending",
};

export const experienceSectionContent = {
  badge: "MapMate Travel Partner",
  titlePart1: "Curating Memories",
  titleAccent: "Beyond Borders",
  description:
    "We specialize in high-end, personalized journeys across Sri Lanka. Our mission is to bridge the gap between cultures by providing expert insights in your native tongue.",
  responseTitle: "Response within 2 hours",
  responseSubtitle: "Available 24/7 Global Support",
  inquireButtonText: "Inquire Now",
  floatingStats: [
    { value: "500+", label: "Completed Tours", mobileLabel: "Tours" },
    { value: "10+", labelOne: "Years of", labelTwo: "Luxury Hosting" }, // Note: handled in component
  ],
};

export const experiencePillars = [
  {
    title: "Native Fluency",
    description: "Japanese, French, and English support for seamless communication.",
  },
  {
    title: "Certified",
    description: "Licensed National Tourist Guide Lecturers with deep expertise.",
  },
  {
    title: "Private Fleet",
    description: "Executive luxury vehicles.",
  },
  {
    title: "Customized",
    description: "Tailored unique pace.",
  },
] as const;

export const transfersSectionContent = {
  badge: "Chauffeur Service",
  titlePart1: "Traveler's Pick-Up",
  titleAccent: "&",
  titlePart2: "Drop-Off",
  subtitle:
    "Comfortable, safe & reliable transport for Japanese 🇯🇵 , French 🇫🇷 ,Spain 🇪🇸 and English 🇬🇧 travelers anywhere in Sri Lanka.",
};

export const privateVehicleContent = {
  badge: "Private Vehicle Hire",
  titlePart1: "Your Private Vehicle",
  titleAccent: "&",
  titlePart2: "Driver",
  description:
    "Experience total autonomy on your travels. Whether you are crafting a cross-country adventure or a simple city transfer, our premium vehicles and professional drivers are at your command. You dictate the destination, the stops, and the schedule—we handle the logistics, ensuring a seamless journey entirely on your terms.",
  nativeFriendlyText: "Native Friendly",
  quote:
    "You design the journey, we ensure the safety. Experience total freedom while we handle your protection and logistics.",
  hireButtonText: "Hire Your Vehicle",
  consultText: "Consult With Us",
  whatsappText: "Direct WhatsApp",
  modalTitlePart: "How would you like to",
  modalTitleAccent: "connect?",
  modalWhatsapp: "WhatsApp",
  modalEmail: "Email",
  modalResponseText: "Our team typically responds within 15 minutes.",
};

export const toursSectionContent = {
  badge: "Exclusive Itineraries",
  titlePart1: "Curated",
  titleAccent: "Tour Packages",
  multiDayBtn: "Multi-Day Tours",
  oneDayBtn: "One Day Excursions",
  startingFromText: "Starting from",
  detailsBtnText: "Details",
  visitAllMultiText: "Visit All Multi Day Tours",
  viewAllOneText: "View All One Day Tours",
};

export const journalPreviewContent = {
  badge: "Insights",
  titlePart1: "Travel",
  titleAccent: "Journal",
  subtitle: "Curated stories and expert advice to help you navigate the wonders of Sri Lanka with ease.",
  readMoreText: "Read More",
  exploreMoreBtn: "Explore More Blogs",
};

export const clientExperiencesContent = {
  badge: "Client Experiences",
  titlePart1: "Voices of",
  titleAccent: "MapMate",
  avgScoreLabel: "Average Score",
  basedOnText: "Based on",
  globalReviewsText: "global reviews",
  leaveMarkBtn: "Leave Your Mark",
  backReviewsBtn: "BACK TO REVIEWS",
  exploreMoreTestimonialsBtn: "Explore More Testimonials",
};

export const customTourContent = {
  badge: "Bespoke & Flexible",
  titlePart1: "Your Journey,",
  titleAccent: "Entirely",
  titlePart2: "Your Way.",
  watermark: "BESPOKE",
  description:
    "Break free from rigid itineraries. Shape every single detail on the fly and let our experts adapt your private journey to match your exact mood, pace, and spontaneous desires.",
  ctaText: "Craft Your Journey",
};

export const contactCtaContent = {
  badge: "Bespoke Experiences",
  titlePart1: "Your Vision,",
  titleAccent: "Impeccably",
  titlePart2: "Executed.",
  watermark: "MAPMATE",
  description:
    "Break free from preset routes. Share your desires, and our luxury travel designers will curate a flawless, private itinerary completely tailored to your pace.",
  ctaButtonText: "Enquire Your Bespoke",
  reviewCountText: "Loved by 1k+ Explorers",
  localExpertsText: "Local Experts",
  supportText: "24/7 Support",
};
