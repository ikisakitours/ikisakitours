export default {
  Metadata: {
    title: "Frequently Asked Questions",
    description: "Find quick answers to common questions about your bespoke Sri Lankan journey.",
  },
  Hero: {
    backGroundImage: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=95&w=1600&auto=format&fit=crop",
    altText: "Customer Support and Assistance",
    eyebrow: "SUPPORT & FAQ",
    title: "How can we help you?",
    accent: "help you?",
    strapline: "Find quick answers to common questions about your bespoke Sri Lankan journey.",
  },
  UI: {
    filterButton: "Filter Categories",
    sidebarTitle: "FAQ Categories",
    searchPlaceholder: "Search for a question...",
    searchItemLabel: "Question",
    clearFilter: "Clear Filter",
    loadMore: "Load More Faq",
    showing: "Showing",
    of: "of",
    faqs: "faqs",
  },
  Categories: {
    all: "All",
    "Ticketing & Visa Services": "Ticketing & Visa Services",
    General: "General",
    Booking: "Booking",
    Refunds: "Refunds",
    Tours: "Tours",
    Payments: "Payments",
  },
  EmptyState: {
    backgroundText: "FAQ",
    title: "no questions found",
    buttonText: "Reset Filters",
    descSearchAndCategory:
      'We couldn\'t find any questions matching "{query}" in the "{category}" category. Please clear filters or try another keyword.',
    descSearchOnly: 'We couldn\'t find any questions matching "{query}". Please clear filters or try another keyword.',
    descCategoryOnly: 'We couldn\'t find any questions available in the "{category}" category.',
    descDefault: "No questions found matching your criteria.",
  },
} as const;
