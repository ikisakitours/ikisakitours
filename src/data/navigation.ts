export type NavLink = { label: string; href: string; sectionId?: string; isDropdown?: never; subItems?: never };
export type NavDropdown = {
  label: string;
  isDropdown: true;
  subItems: { label: string; href: string; sectionId?: string }[];
  href?: never;
};
export type NavItem = NavLink | NavDropdown;

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/", sectionId: "" },
  { label: "Experience", href: "/about", sectionId: "#about" },
  {
    label: "Tours",
    isDropdown: true,
    subItems: [
      { label: "Multi Days Tours", href: "/tours/multi-days", sectionId: "#tours-multi" },
      { label: "One Day Tours", href: "/tours/one-day", sectionId: "#tours-one" },
    ],
  },
  {
    label: "Services",
    isDropdown: true,
    subItems: [
      { label: "Custom Made Journeys", href: "/services/bespoke-travel", sectionId: "#custom-tours" },
      { label: "Private Chauffeur Service", href: "/services/private-vehicle", sectionId: "#private-Vehicle-Hire" },
      { label: "Airport & City Transfers", href: "/services/transfers", sectionId: "#transfers" },
    ],
  },
  {
    label: "More",
    isDropdown: true,
    subItems: [
      // 1. Discovery & Stories
      { label: "Hidden Havens", href: "/destination", sectionId: "" },
      { label: "Cultural Pageants", href: "/events", sectionId: "#events" },
      { label: "Journal", href: "/blog", sectionId: "#blog" },

      // 2. Trust & Support
      { label: "Reviews", href: "/testimonials", sectionId: "#testimonials" },
      { label: "FAQs", href: "/faq", sectionId: "" },
      { label: "Contact", href: "/contact", sectionId: "#contact" },
    ],
  },
];

export const footerLinks = [
  // 1. Core Navigation
  { label: "Home", href: "/" },
  { label: "The Experience", href: "/about", sectionId: "#about" },

  // 2. Core Products
  { label: "Tour Packages", href: "/tours/multi-days", sectionId: "#packages" },
  { label: "Hidden Havens", href: "/destination", sectionId: "" },
  { label: "Cultural Pageants", href: "/events", sectionId: "#events" },

  // 3. Trust, Stories & Support
  { label: "Journal", href: "/blog", sectionId: "#blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact", sectionId: "#contact" },
];
export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "#" },
] as const;

export const legalLinks = [
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Booking Policy", href: "/legal/booking" },
  { label: "Payment Policy", href: "/legal/payment" },
] as const;

export const contactInfo = [
  { label: "123 Galle Road, Colombo 03" },
  { label: "+94 11 234 5678" },
  { label: "hello@MapMate.com" },
] as const;
