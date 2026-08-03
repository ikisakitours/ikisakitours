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
    mobileUrl: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
    desktopUrl: "/images/sander-traa-bfdshIHD5Y4-unsplash.webp",
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
  { value: "500+", id: "CompletedTours" }, // mapped to "floatingStats" in JSON
  { value: "10+", id: "YearsOf" },
] as const;

export const experienceImagesData = [
  { id: "culturalGuide", src: "/images/polonnaruwa-185290_1280.webp", className: "" },
  { id: "luxuryTravel", src: "/images/sri-lanka-334437_1280.webp", className: "mt-8 md:mt-12 xl:mt-16 3xl:mt-24" },
] as const;

// ==========================================
// TRANSFERS SECTION DATA
// ==========================================
export const trustBadgesData = [{ id: "insured" }, { id: "availability" }] as const;

export const transferCards = [
  {
    id: "airportPickup",
    href: "/services/transfers",
  },
  {
    id: "hotelCity",
    href: "/services/transfers",
  },
  {
    id: "dropOff",
    href: "/services/transfers",
  },
] as const;
// ==========================================
// PRIVATE VEHICLE SECTION DATA
// ==========================================
export const privateVehicleImagesData = [
  {
    id: "luxuryVan",
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop",
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
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=95&w=1400&auto=format&fit=crop",
  },
  {
    id: "detailShot",
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=800&auto=format&fit=crop",
  },
] as const;

export const contactCtaUsersData = [
  { id: "user1", avatarUrl: "https://i.pravatar.cc/100?img=31" },
  { id: "user2", avatarUrl: "https://i.pravatar.cc/100?img=32" },
  { id: "user3", avatarUrl: "https://i.pravatar.cc/100?img=33" },
] as const;
