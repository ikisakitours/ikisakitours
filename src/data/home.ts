// ==========================================
// HERO SECTION DATA
// ==========================================
export const heroStats = [
  { value: "5.0", id: "TripAdvisor" },
  { value: "12+", id: "Languages" },
  { value: "100%", id: "Private" },
] as const;

export const heroPopularTags = [
  { id: "GalleFort", href: "/destinations/galle-fort" },
  { id: "YalaSafari", href: "/destinations/yala-safari" },
  { id: "TeaCountry", href: "/destinations/tea-country" },
] as const;

export const heroPopularServices = [
  { id: "Taxi", href: "/services/private-vehicle" },
  { id: "CustomTours", href: "/services/bespoke-travel" },
  { id: "Transfers", href: "/services/transfers" },
] as const;

export const HeroBackGroundImages = [
  {
    id: "sigiriyaView",
    url: "/ikisaki-images/home/hero/sigiriya-rock-fortress.webp",
  },
] as const;

// ==========================================
// DISCOVERY SECTION DATA
// ==========================================
export const destinations = [
  { number: "/01", id: "sigiriya" },
  { number: "/02", id: "ella" },
  { number: "/03", id: "mirissa" },
  { number: "/04", id: "nuwaraEliya" },
  { number: "/05", id: "galleFort" },
] as const;

// ==========================================
// EXPERIENCE SECTION DATA
// ==========================================
export const experiencePillars = [
  { id: "NativeFluency" },
  { id: "Certified" },
  { id: "PrivateFleet" },
  { id: "Customized" },
] as const;

export const experienceFloatingStatsData = [
  { value: "600+", id: "CompletedTours" }, // mapped to "floatingStats" in JSON
  { value: "10+", id: "YearsOf" },
] as const;

export const experienceImagesData = [
  { id: "culturalGuide", src: "/ikisaki-images/home/about/ella-mountain-swing-sri-lanka.webp", className: "" },
  { id: "luxuryTravel", src: "/ikisaki-images/home/about/sri-lanka-coastal-resort-beach.webp", className: "mt-8 md:mt-12 xl:mt-16 3xl:mt-24" },
] as const;

// ==========================================
// TRANSFERS SECTION DATA
// ==========================================
export const trustBadgesData = [{ id: "insured" }, { id: "availability" }] as const;

export const transferCards = [
  {
    id: "airportPickup",
    href: "/services/transfers?type=pickup",
  },
  {
    id: "hotelCity",
    href: "/services/transfers?type=hotel",
  },
  {
    id: "dropOff",
    href: "/services/transfers?type=dropoff",
  },
] as const;
// ==========================================
// PRIVATE VEHICLE SECTION DATA
// ==========================================
export const privateVehicleImagesData = [
  {
    id: "luxuryVan",
    src: "/ikisaki-images/home/private-vehicle/private-tour-vehicle-nine-arch-bridge-ella.webp",
  },
] as const;

export const featureCardsData = [
  {
    id: "itineraryControl",
  },
  {
    id: "flexibleTransparent",
  },
] as const;
// ==========================================
// CONTACT CTA
// ==========================================
export const contactCtaImagesData = [
  {
    id: "mainExperience",
    src: "/ikisaki-images/home/contact-cta/sri-lanka-aerial-beach-waves.webp",
  },
  {
    id: "detailShot",
    src: "/ikisaki-images/home/contact-cta/nine-arch-bridge-ella-sri-lanka.webp",
  },
] as const;


