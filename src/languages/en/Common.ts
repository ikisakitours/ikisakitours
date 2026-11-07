export default {
  Api: {
    loadingReviews: "Loading Reviews...",
    loadingJournals: "Loading Journals...",
    loadingDestinations: "Loading Destinations...",
    loadingDestination: "Loading Destination...",
    loadingFaqs: "Loading FAQs...",
    loadingTours: "Loading Tours...",
    loadingTourDetails: "Loading Tour Details...",
    loadingRelatedTours: "Loading Similar Tours...",
    loadingInsights: "Loading Travel Insights...",

    errorWatermark: "ERROR",
    failedToLoad: "Oops! Something went wrong.",
    tryAgain: "Try Again",
    contentLoadError: "We couldn't load the content right now. Please try again.",
  },
  underDevelopment: {
    comingSoon: "login coming soon",
    pleaseContinueEmail: "Please continue with Google or email for now.",
  },

  AccessRestricted: {
    ticketTitle: "Account Status",
    accountHolder: "Account holder",
    emailLabel: "Email",
    mailSubject: "Account access restricted - request for review",
    mailBody:
      "Hello IkiSaki team,\n\nMy account access has been restricted and I would like to understand why and get it resolved.",
    badge: "Access Restricted",
    titlePart1: "Your account access is",
    titleAccent: "currently suspended",
    description:
      "You're signed in, but access to this account has been restricted by our team. If you believe this is a mistake, please contact us and we'll look into it right away.",
    statusLabel: "Restricted",
    reasonNote:
      "Access can be restricted for security, policy or account verification reasons. Our support team can explain the details and help resolve it.",
    referenceLabel: "Account reference",
    referenceHint: "Share this ID with our support team so we can find your account quickly.",
    copy: "Copy",
    copied: "Copied",
    contactSupport: "Contact Support",
    backHome: "Back to Home",
    signOut: "Sign out",
    footerNote: "We're here to help",
  },
} as const;
