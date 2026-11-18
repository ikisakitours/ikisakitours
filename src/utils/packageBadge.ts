// src/utils/packageBadge.ts

export type PackageBadgeKey =
  | "best_seller"
  | "top_rated"
  | "popular"
  | "featured"
  | "new_arrival"
  | "exclusive"
  | "limited_availability"
  | "likely_to_sell_out"
  | "instant_confirmation"
  | "bucket_list"
  | "all_inclusive"
  | "family_friendly"
  | "honeymoon_special"
  | "unesco_heritage"
  | "private_tour"
  | "seasonal"
  | "eco_friendly"
  | "discounted"
  | "none";

export const PACKAGE_BADGE_KEYS: PackageBadgeKey[] = [
  "best_seller",
  "top_rated",
  "popular",
  "featured",
  "new_arrival",
  "exclusive",
  "limited_availability",
  "likely_to_sell_out",
  "instant_confirmation",
  "bucket_list",
  "all_inclusive",
  "family_friendly",
  "honeymoon_special",
  "unesco_heritage",
  "private_tour",
  "seasonal",
  "eco_friendly",
  "discounted",
  "none",
];

/**
 * Returns tailored Tailwind CSS classes matching each package badge category.
 * Each badge has a completely distinct, unique color palette for visual contrast.
 */
export const getBadgeStyles = (type?: string): string => {
  if (!type) return "";
  const normalized = type.toLowerCase().trim();

  switch (normalized) {
    // 1. Bright Golden Amber
    case "best_seller":
      return "bg-amber-400 text-neutral-950 font-black shadow-[0_0_14px_rgba(251,191,36,0.45)]";

    // 2. Royal Indigo / Electric Violet
    case "top_rated":
      return "bg-indigo-600 text-white font-bold border border-indigo-400/40 shadow-[0_0_14px_rgba(99,102,241,0.4)]";

    // 3. Signature Ikisaki Gold
    case "popular":
      return "bg-gold text-lanka-black font-extrabold shadow-[0_0_14px_rgba(197,160,89,0.4)]";

    // 4. Vivid Emerald Green
    case "featured":
      return "bg-emerald-500 text-neutral-950 font-black shadow-[0_0_14px_rgba(16,185,129,0.4)]";

    // 5. Frost Ice / Cyan Glass
    case "new_arrival":
      return "bg-cyan-950/80 text-cyan-200 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_12px_rgba(34,211,238,0.25)]";

    // 6. Deep Royal Purple
    case "exclusive":
      return "bg-purple-600 text-white font-bold border border-purple-300/40 shadow-[0_0_14px_rgba(168,85,247,0.4)]";

    // 7. Warning Tangerine Orange
    case "limited_availability":
      return "bg-orange-500 text-white font-bold border border-orange-300/40 animate-pulse shadow-[0_0_14px_rgba(249,115,22,0.4)]";

    // 8. Fiery Coral Rose
    case "likely_to_sell_out":
      return "bg-rose-600 text-white font-bold border border-rose-300/40 animate-pulse shadow-[0_0_14px_rgba(225,29,72,0.4)]";

    // 9. Electric Sky Blue
    case "instant_confirmation":
      return "bg-sky-500 text-neutral-950 font-black shadow-[0_0_14px_rgba(14,165,233,0.4)]";

    // 10. Vivid Magenta / Fuchsia
    case "bucket_list":
      return "bg-fuchsia-600 text-white font-bold border border-fuchsia-300/40 shadow-[0_0_14px_rgba(192,38,211,0.4)]";

    // 11. Tropical Aquamarine Teal
    case "all_inclusive":
      return "bg-teal-500 text-neutral-950 font-black shadow-[0_0_14px_rgba(20,184,166,0.4)]";

    // 12. Deep Ocean Blue
    case "family_friendly":
      return "bg-blue-600 text-white font-bold border border-blue-300/40 shadow-[0_0_14px_rgba(37,99,235,0.4)]";

    // 13. Romantic Hot Pink
    case "honeymoon_special":
      return "bg-pink-500 text-white font-bold border border-pink-200/40 shadow-[0_0_14px_rgba(236,72,153,0.4)]";

    // 14. Antique Bronze / Historic Ochre
    case "unesco_heritage":
      return "bg-[#92400e] text-[#fef3c7] font-bold border border-[#f59e0b]/40 shadow-[0_0_14px_rgba(146,64,14,0.4)]";

    // 15. Sleek Obsidian Black & Gold Accent
    case "private_tour":
      return "bg-neutral-900/95 text-gold font-bold border border-gold/70 backdrop-blur-md shadow-[0_0_14px_rgba(197,160,89,0.35)]";

    // 16. Autumn Copper / Warm Terracotta
    case "seasonal":
      return "bg-amber-700 text-amber-100 font-bold border border-amber-400/40 shadow-[0_0_14px_rgba(180,83,9,0.4)]";

    // 17. Bright Nature Lime Green
    case "eco_friendly":
      return "bg-lime-500 text-neutral-950 font-black shadow-[0_0_14px_rgba(132,204,22,0.4)]";

    // 18. Bold Ruby Red
    case "discounted":
      return "bg-red-600 text-white font-bold border border-red-300/40 animate-pulse shadow-[0_0_14px_rgba(220,38,38,0.5)]";

    case "none":
      return "";

    default:
      return "bg-white/10 text-white border border-white/20";
  }
};

/**
 * Checks whether the badge should be rendered in the UI (skips null, undefined, or "none").
 */
export const isBadgeVisible = (badge?: string | null): boolean => {
  if (!badge) return false;
  return badge.toLowerCase().trim() !== "none";
};

/**
 * Resolves translated badge text using the next-intl translation function, or formats nicely with spaces.
 */
export const getBadgeLabel = (badge: string, t: (key: string) => string): string => {
  const normalized = badge.toLowerCase().trim() as PackageBadgeKey;
  if (PACKAGE_BADGE_KEYS.includes(normalized) && normalized !== "none") {
    try {
      const translated = t(`Badges.${normalized}`);
      if (translated) return translated;
    } catch {
      // Fallback if missing
    }
  }
  return badge.replace(/_/g, " ");
};
