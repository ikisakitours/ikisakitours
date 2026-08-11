export type NavLink = { key: string; href: string; sectionId?: string; isDropdown?: never; subItems?: never };
export type NavDropdown = {
  key: string;
  isDropdown: true;
  subItems: { key: string; href: string; sectionId?: string }[];
  href?: never;
};
export type NavItem = NavLink | NavDropdown;

export const primaryNavigation: NavItem[] = [
  { key: "Home", href: "/", sectionId: "" },
  { key: "Experience", href: "/about", sectionId: "" },
  {
    key: "Tours",
    isDropdown: true,
    subItems: [
      { key: "Multi Days Tours", href: "/tours/multi-days", sectionId: "" },
      { key: "One Day Tours", href: "/tours/one-day", sectionId: "" },
    ],
  },
  {
    key: "Services",
    isDropdown: true,
    subItems: [
      { key: "Custom Made Journeys", href: "/services/bespoke-travel", sectionId: "" },
      { key: "Private Chauffeur Service", href: "/services/private-vehicle", sectionId: "" },
      { key: "Airport & City Transfers", href: "/services/transfers", sectionId: "" },
    ],
  },
  {
    key: "More",
    isDropdown: true,
    subItems: [
      // 1. Discovery & Stories
      { key: "Hidden Havens", href: "/destination", sectionId: "" },
      { key: "Cultural Pageants", href: "/events", sectionId: "" },
      { key: "Journal", href: "/blog", sectionId: "" },

      // 2. Trust & Support
      { key: "Reviews", href: "/testimonials", sectionId: "" },
      { key: "FAQs", href: "/faq", sectionId: "" },
      { key: "Contact", href: "/contact", sectionId: "" },
    ],
  },
];

export const footerLinks = [
  // 1. Core Navigation
  { label: "Home", href: "/" },
  { label: "The Experience", href: "/about", sectionId: "" },

  // 2. Core Products
  { label: "Tour Packages", href: "/tours/multi-days", sectionId: "" },
  { label: "Hidden Havens", href: "/destination", sectionId: "" },
  { label: "Cultural Pageants", href: "/events", sectionId: "" },

  // 3. Trust, Stories & Support
  { label: "Journal", href: "/blog", sectionId: "" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact", sectionId: "" },
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
  { label: "Address", value: "123 Galle Road, Colombo 03" },
  { label: "Phone", value: "+94 11 234 5678" },
  { label: "Email", value: "hello@MapMate.com" },
] as const;
