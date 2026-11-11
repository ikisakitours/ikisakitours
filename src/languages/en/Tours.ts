export default {
  MultiDay: {
    Metadata: {
      title: "Sightseeing Tours",
      description:
        "Discover a selection of exclusive tour packages across Sri Lanka, curated by IkiSaki. Enjoy a premium travel experience as you explore historical heritage sites, lush natural landscapes, religious and cultural landmarks, and stunning coastal regions.",
    },
    Hero: {
      badge: "Sightseeing - Tours",
      startTitle: "Signature",
      HighlightTitle: "Heritage",
      EndTitle: "Collection",
      description: "Exclusive access to Sri Lanka's hidden wonders with ikisaki multi-lingual guidance.",
      image: "/ikisaki-images/Tours/sigiriya-rock-fortress-multiday-tour-sri-lanka.webp",
      alt: "Travelers admiring the majestic Sigiriya Rock Fortress surrounded by lush green forests during a multi-day tour in Sri Lanka",
    },
  },
  OneDay: {
    Metadata: {
      title: "One Day Tours",
      description:
        "Experience the best of Sri Lanka—from World Heritage sites and breathtaking scenery to historic townscapes—all in a single day. Even with limited time, you can enjoy a special, memorable experience.",
    },
    Hero: {
      badge: "Quick Escapes",
      startTitle: "Curated",
      HighlightTitle: "One Day",
      EndTitle: "Excursions",
      description:
        "All in a single day. Even with limited time, you can enjoy the unique charm and special experiences that only Sri Lanka has to offer.",
      image: "/ikisaki-images/Tours/galle-fort-oneday-excursion-sri-lanka.webp",
      alt: "Historic ramparts and lively streets of the UNESCO World Heritage Galle Fort during a one-day excursion in Sri Lanka",
    },
  },
  Explorer: {
    filterPackages: "Filter Packages",
    searchPlaceholder: "Search by Keywords...",
    SearchInputPackageLabel: "Package",
    loadMore: "Load More Packages",
    showing: "Showing",
    of: "of",
    packages: "Packages",
    priceFilters: {
      any: "Any price",
      under200: "Under $200",
      "200to300": "$200 - $300",
      over300: "Over $300",
    },
    ratingFilters: {
      any: "All rating",
      up45: "4.5 & up",
      up48: "4.8 & up",
    },
    EmptyState: {
      backgroundText: "Packages",
      title: "no matching Packages",
      searchNoResult: 'Your search for "{query}" returned no Packages.',
      filterNoResult: "No packages match the selected filters.",
      redefine: "Please adjust your trip criteria or reset your filters.",
      resetBtn: "Reset",
      noDataTitle: "No Tours Yet",
      noDataDescription: "We are preparing new tour packages. Please check back soon.",
    },
    Sidebar: {
      categories: "Categories",
      all: "All",
      price: "Price",
      rating: "Rating",
      clearFilter: "Clear Filter",
      clear: "Clear",
      showResults: "Show Results",
      durationDays: "Duration (Days)",
      durationHours: "Duration (Hours)",
    },
  },
  Card: {
    startingFrom: "Starting from",
    details: "Details",
    newBadge: "New",
    save: "Save {discount}%",
    Badges: {
      popular: "Popular",
      discounted: "Discounted",
      new_arrival: "New Arrival",
      featured: "Featured",
    },
  },
} as const;
