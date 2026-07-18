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
  { label: "The Experience", href: "/about", sectionId: "#about" },
  { label: "Packages", href: "/packages", sectionId: "#packages" },
  {
    label: "Services",
    isDropdown: true,
    subItems: [
      { label: "Private Vehicle Hire", href: "/services/private-vehicle", sectionId: "#private-Vehicle-Hire" },
      { label: "Customize Tours", href: "/services/bespoke-travel", sectionId: "#custom-tours" },
      { label: "Transfers", href: "/services/transfers", sectionId: "#transfers" },
    ],
  },
  {
    label: "More",
    isDropdown: true,
    subItems: [
      { label: "Journal", href: "/blog", sectionId: "#blog" },
      { label: "Reviews", href: "/testimonials", sectionId: "#testimonials" },
      { label: "FAQs", href: "/faq", sectionId: "" },
      { label: "Contact", href: "/contact", sectionId: "#contact" },
    ],
  },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "The Experience", href: "/about", sectionId: "#about" },
  { label: "Destinations", href: "/destinations", sectionId: "#destinations" },
  { label: "Tour Packages", href: "/packages", sectionId: "#packages" },
  { label: "Travel Guide", href: "/blog", sectionId: "#blog" },
  { label: "Contact", href: "/contact", sectionId: "#contact" },
  { label: "FAQ", href: "/faq" },
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
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Booking Policy", href: "/legal/booking" },
  { label: "Payment Policy", href: "/legal/payment" },
] as const;

export const contactInfo = [
  { label: "123 Galle Road, Colombo 03" },
  { label: "+94 11 234 5678" },
  { label: "hello@MapMate.com" },
] as const;
