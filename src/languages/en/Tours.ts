export default {
  MultiDay: {
    Metadata: {
      title: "Heritage Curated Tours",
      description: "Explore IkiSaki signature heritage, nature, religious, and coastal tour packages across Sri Lanka.",
    },
    Hero: {
      badge: "Bespoke Itineraries",
      startTitle: "Signature",
      HighlightTitle: "Heritage",
      EndTitle: "Collection",
      description: "Exclusive access to Sri Lanka's hidden wonders with elite multi-lingual guidance.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2400",
      alt: "Scenic mountain train journey through Sri Lankan tea country",
    },
  },
  OneDay: {
    Metadata: {
      title: "One Day Excursions | Heritage Curated Tours",
      description: "Explore IkiSaki signature one-day excursions and quick escapes across Sri Lanka.",
    },
    Hero: {
      badge: "Quick Escapes",
      startTitle: "Curated",
      HighlightTitle: "One Day",
      EndTitle: "Excursions",
      description:
        "Experience the magic of Sri Lanka in a single day. Perfect for short stays, spontaneous adventures, and quick getaways.",
      image: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&q=80&w=2400",
      alt: "Scenic mountain train journey through Sri Lankan tea country",
    },
  },
  Explorer: {
    filterPackages: "Filter Packages",
    searchPlaceholder: "Search by destination...",
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
      any: "Any rating",
      up45: "4.5 & up",
      up48: "4.8 & up",
    },
    EmptyState: {
      backgroundText: "Journeys",
      title: "no matching journeys",
      searchNoResult: 'Your search for "{query}" returned no destinations.',
      filterNoResult: "Your selected filters returned no destinations.",
      redefine: "Please redefine your travel criteria or reset filters.",
      resetBtn: "Reset Exploration",
    },
    Sidebar: {
      categories: "Categories",
      all: "All",
      price: "Price",
      rating: "Rating",
      clearFilter: "Clear Filter",
      clear: "Clear",
      showResults: "Show Results",
    },
  },
  Card: {
    startingFrom: "Starting from",
    details: "Details",
  },
} as const;
