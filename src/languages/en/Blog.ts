export default {
  Metadata: {
    title: "Journal",
    description:
      "IkiSaki Tours brings you a curated selection of information for your trip to Sri Lanka. Through travel guides, insights into local culture, World Heritage sites, and breathtaking scenic spots, discover the charm of Sri Lanka and plan your own unique and unforgettable journey.",
   //new
      notFoundTitle: "Story not found",
  },
  Hero: {
    eyebrow: "The Journal",
    title: "The Art of ",
    accent: "Discovering Us",
    strapline:
      "Discover the culture, history, and hidden charms of Sri Lanka. Find tips to help you plan an extraordinary trip.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2400",
    alt: "Vintage map of Sri Lanka with a classic compass",
  },
  Explorer: {
    filterCategories: "Filter Categories",
    filter: "Filter",
    searchPlaceholder: "Search articles...",
    loadMore: "See more articles",
    showing: "Showing",
    of: "of",
    stories: "Stories",
    articleSingular: "Article",
    Sidebar: {
      all: "All",
      clearFilter: "Clear Filter",
      categories: "Categories",
      sortByDate: "Sort by Date",
      newestFirst: "Newest First",
      oldestFirst: "Oldest First",
      readTime: "Reading Time",
      allReadTimes: "All Times",
      showResults: "Show Results",
    },
    EmptyState: {
      backgroundText: "Journal",
      title: "no articles found",
      searchNoResult: 'Your search for "{query}" returned no articles.',
      filterNoResult: "Your selected category ({category}) returned no articles.",
      searchAndFilterNoResult: 'Your search for "{query}" in category "{category}" returned no articles.',
      redefine: "Please change your search criteria or reset the filters.",
      resetBtn: "Reset",
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
    visualGlimpse: "Image Collection",
    viewGallery: "View Gallery",
    moreArticles: "More Articles",
    shareStory: "Share Story",
    lovedThis: "Loved this",
    Pending: {
      backgroundText: "Pending",
      title: "Content Coming Soon",
      description: "This article is currently in preparation. Please wait a little longer until it is published.",
    },
  },
} as const;
