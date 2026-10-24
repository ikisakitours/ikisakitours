export default {
  Metadata: {
    title: "Contact Us - Get in Touch",
    description:
      "Please feel free to contact IkiSaki Tours for any inquiries regarding travel to Sri Lanka, including private charter services, taxi services, airport transfers, or the arrangement of bespoke, tailor-made tours. We are here to help you plan a comfortable journey perfectly suited to your preferences.",
  },
  Hero: {
    eyebrow: "Start a Conversation",
    title: "A journey begins with the very first word",
    accent: "first word",
    strapline: "Please feel free to consult us about anything.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
    altText: "Sri Lankan sunset",
  },
  IntroCard: {
    badge: "Start a conversation",
    titleMain: "Talk to Our Team",
    titleBreak: "",
    description:
      "Please feel free to reach out to us regarding any aspect of your trip to Sri Lanka—whether it’s travel planning, private charters, airport transfers, or bespoke tours. We will help you design the perfect journey tailored to your needs.",
    slides: [
      {
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop",
        alt: "Local Travel Desk",
        badge: "Expert Advice",
        desc: "Personal planning, fast follow-up, practical guidance",
      },
      {
        image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
        alt: "Custom Itinerary Planning",
        badge: "Tailored Routes",
        desc: "Share your interests and we'll craft the perfect journey",
      },
      {
        image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
        alt: "Transport and Chauffeur Services",
        badge: "Seamless Transport",
        desc: "Reliable drivers and comfortable vehicles for your trip",
      },
      {
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
        alt: "Accommodation Booking",
        badge: "Boutique Stays",
        desc: "Handpicked hotels and resorts to match your style",
      },
      {
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
        alt: "Wildlife and Safari Tours",
        badge: "Unforgettable Safaris",
        desc: "Expert naturalists and thrilling wildlife encounters",
      },
    ],
  },
  Sidebar: {
    title: "Contact Info",
    messagesTitle: "Prefer WhatsApp or Line?",
    whatsappButton: "Chat on WhatsApp",
    lineButton: "Chat on LINE",
    onlineStatus: "Online & Ready to Chat",
    info: [
      { label: "Email", value: "hello@ikisakitours.com" },
      { label: "Phone", value: "+94 77 123 4567" },
      { label: "Location", value: "Colombo, Sri Lanka" },
      { label: "Working Hours", value: "24/7 Available" },
    ],
  },
  Form: {
    title: "Send Us a Message",
    inquiryOptions: ["Tour Inquiry & Availability", "Custom Journey Planning", "General Support", "Partnership"],
    tourOptions: [
      "Multi-Day Tour",
      "One-Day Tour",
      "Custom Made Journeys",
      "Private Chauffeur Service",
      "Airport & City Transfers",
      "Other",
    ],
  },
  Features: [
    {
      title: "Travel Specialists",
      desc: "Talk to a local team that understands routes, timing, hotels, and guest comfort.",
    },
    {
      title: "Custom Planning",
      desc: "Share your pace, interests, budget, and dates. We will shape the next steps around you.",
    },
    {
      title: "Clear Follow-up",
      desc: "Your inquiry is sent into our lead desk so the right person can respond with context.",
    },
  ],
} as const;
