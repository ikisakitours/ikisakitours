// messages/en/cookie.ts
export default {
  // CookieConsent component strings
  titlePrefix: "Cookie",
  titleHighlight: "Preferences",
  description:
    "We use cookies to elevate your luxury browsing experience. By continuing to explore MapMate, you agree to our curated cookie settings.",
  wantToCustomize: "Want to customize?",
  managePreferences: "Manage Preferences",
  cookiePolicy: "Cookie Policy",
  acceptAll: "Accept All",

  // CookiePreferenceModal component strings
  modalTitlePrefix: "Privacy",
  modalTitleHighlight: "Preference Center",
  modalDescription:
    "When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. We respect your right to privacy, so you can choose not to allow some types of cookies.",
  manageConsentTitle: "Manage Consent Preferences",
  rejectAll: "Reject All",
  confirmChoices: "Confirm My Choices",

  // CookiePageActions component strings
  pageActionTitle: "Would you like to accept",
  pageActionTitleHighlight: "cookies",
  manageCookiesBtn: "Manage Cookies",
  allAccepted: "All Accepted",
  allRejected: "All Rejected",

  // Categories for Preference Modal
  categories: {
    necessary: {
      title: "Strictly Necessary Cookies",
      badge: "Always Active",
      description:
        "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you.",
    },
    performance: {
      title: "Performance Cookies",
      description:
        "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
    },
    functional: {
      title: "Functional Cookies",
      description:
        "These cookies enable the website to provide enhanced functionality and personalisation, such as remembering your language.",
    },
    targeting: {
      title: "Targeting & Marketing Cookies",
      description:
        "These cookies may be set through our site by our advertising partners to build a profile of your interests.",
    },
  },
} as const;
