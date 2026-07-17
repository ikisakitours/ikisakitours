
export const heroStats = [
  { value: "5.0", label: "TripAdvisor" },
  { value: "12+", label: "Languages" },
  { value: "100%", label: "Private" },
] as const;

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

//  Popular Tags
export const heroPopularTags = [
  { label: "#GalleFort", href: "/destinations/galle-fort" },
  { label: "#YalaSafari", href: "/destinations/yala-safari" },
  { label: "#TeaCountry", href: "/destinations/tea-country" },
] as const;

// Popular Services
export const heroPopularServices = [
  { label: "Private Vehicle Hire", href: "/services/private-vehicle" },
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