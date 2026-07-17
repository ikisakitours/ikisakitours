// Type definitions
export type NavLink = { label: string; href: string; isDropdown?: never; subItems?: never };
export type NavDropdown = {
  label: string;
  isDropdown: true;
  subItems: { label: string; href: string }[];
  href?: never;
};
export type NavItem = NavLink | NavDropdown;

export const primaryNavigation: NavItem[] = [
  { label: "The Experience", href: "/#about" },
  {
    label: "Services",
    isDropdown: true,
    subItems: [
      { label: "Private Vehicle Hire", href: "/#private-Vehicle-Hire" },
      { label: "Customize Tours", href: "/#custom-tours" },
      { label: "Transfers", href: "/#transfers" },
    ],
  },
  { label: "Packages", href: "/#packages" },
  { label: "Journal", href: "/#blog" },
];

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "The Experience", href: "/#about" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Tour Packages", href: "/packages" },
  { label: "Travel Guide", href: "/#blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "#" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/legal#privacy" },
  { label: "Terms of Use", href: "/legal#terms" },
  { label: "Booking Policy", href: "" },
  { label: "Payment Policy", href: "" },
] as const;

export const contactInfo = [
  { label: "123 Galle Road, Colombo 03" },
  { label: "+94 11 234 5678" },
  { label: "hello@MapMate.com" },
] as const;
