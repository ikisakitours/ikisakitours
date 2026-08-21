export default {
  Metadata: {
    title: "Journal",
    description: "Curated Sri Lanka travel stories, guides, and cultural notes from LankaElite.",
  },
  Hero: {
    eyebrow: "The Journal",
    title: "Curated ",
    accent: "Experiences",
    strapline: "Travel stories, cultural notes, and guides from the heart of Sri Lanka.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2400",
    alt: "Vintage map of Sri Lanka with a classic compass",
  },
  Explorer: {
    filterCategories: "Filter Categories",
    filter: "Filter",
    searchPlaceholder: "Search articles...",
    loadMore: "Load More Experiences",
    showing: "Showing",
    of: "of",
    stories: "Stories",
    articleSingular: "Article",
    Sidebar: {
      all: "All",
      clearFilter: "Clear Filter",
    },
    EmptyState: {
      backgroundText: "Journal",
      title: "no articles found",
      searchNoResult: 'Your search for "{query}" returned no articles.',
      filterNoResult: "Your selected category ({category}) returned no articles.",
      searchAndFilterNoResult: 'Your search for "{query}" in category "{category}" returned no articles.',
      redefine: "Please redefine your search or reset filters.",
      resetBtn: "Reset Exploration",
    },
  },
  Card: {
    readMore: "Read More",
    lovedThis: "Loved this",
  },
  Article: {
    backToHome: "Back To Home",
    backToJournal: "Back To Journal",
    published: "Published",
    readingTime: "Reading Time",
    visualGlimpse: "Visual Glimpse",
    viewGallery: "View Gallery",
    moreArticles: "More Articles",
    shareStory: "Share Story",
    lovedThis: "Loved this",
    Pending: {
      backgroundText: "Pending",
      title: "Content Coming Soon",
      description:
        "We are currently crafting this article's story. Please check back shortly to explore the complete experience.",
    },
  },
} as const;
