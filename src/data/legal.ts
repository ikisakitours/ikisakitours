export type SectionType = "paragraph" | "checklist" | "grid" | "icon-list" | "row-list" | "contact";

export type LegalSubItem = {
  title?: string;
  body: string;
  icon?: string;
};

export type LegalSection = {
  heading: string;
  sectionIcon: string;
  type: SectionType;
  content?: string;
  subItems?: LegalSubItem[];
};

export type LegalDocumentId = "terms" | "privacy" | "booking" | "payment" | "cookie";

export type LegalDocument = {
  id: LegalDocumentId;
  eyebrow: string;
  title: string;
  accent: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const legalDocuments: LegalDocument[] = [
  // ==========================================
  // 1. TERMS OF SERVICE
  // ==========================================
  {
    id: "terms",
    eyebrow: "IkiSaki Terms Information",
    title: "Terms of Service",
    accent: "Service",
    lastUpdated: "February 2026",
    sections: [
      {
        heading: "Booking & Cancellations",
        sectionIcon: "FileText",
        type: "checklist",
        subItems: [
          {
            title: "Booking Policy",
            body: "All safari reservations are subject to availability. A confirmed booking is only valid upon receipt of the full payment and issuance of the Elite Journey ID.",
          },
          {
            title: "Cancellation & Refunds",
            body: "Free cancellations are permitted up to 24 hours before the journey. Cancellations made within 24 hours of the departure time are non-refundable.",
          },
        ],
      },
      {
        heading: "Guest Responsibilities",
        sectionIcon: "Users",
        type: "grid",
        subItems: [
          {
            title: "Guest Conduct",
            body: "Guests must follow all safety instructions provided by the ranger. Elite Safari reserves the right to terminate a journey if conduct endangers wildlife or other guests.",
          },
          {
            title: "Documentation",
            body: "Guests are responsible for ensuring they have valid passports, visas, and health certificates required for entry into safari zones.",
          },
          {
            title: "Travel Insurance",
            body: "We strongly recommend that all guests possess valid international travel insurance covering medical emergencies and safari activities.",
          },
        ],
      },
      {
        heading: "Financials & Legalities",
        sectionIcon: "Shield",
        type: "icon-list",
        subItems: [
          {
            icon: "Database",
            title: "Pricing & Taxes",
            body: "All prices are inclusive of local conservation fees unless stated otherwise. Elite Safari reserves the right to adjust pricing due to government tax changes.",
          },
          {
            icon: "Shield",
            title: "Liability Waiver",
            body: "Participants acknowledge the inherent risks of wildlife expeditions. Elite Safari Journeys is not liable for natural delays or weather-related changes.",
          },
          {
            icon: "Globe",
            title: "Force Majeure",
            body: "Elite Safari Journeys is not responsible for failure to perform obligations due to events beyond our control, including natural disasters or civil unrest.",
          },
        ],
      },
      {
        heading: "Media & Jurisdiction",
        sectionIcon: "FileText",
        type: "row-list",
        subItems: [
          {
            title: "Photographic Rights",
            body: "Photos taken by our photographers may be used for marketing unless opted out.",
          },
          {
            title: "Governing Law",
            body: "These terms are governed by the laws of the registered safari headquarters.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // 2. PRIVACY POLICY
  // ==========================================
  {
    id: "privacy",
    eyebrow: "IkiSaki Privacy Policy Information",
    title: "Privacy Policy",
    accent: "Policy",
    lastUpdated: "January 2026",
    sections: [
      {
        heading: "Introduction",
        sectionIcon: "FileText",
        type: "paragraph",
        content:
          'IkiSaki Luxury ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.\n\nBy using our services, you agree to the collection and use of information in accordance with this policy.',
      },
      {
        heading: "Information We Collect",
        sectionIcon: "Database",
        type: "checklist",
        subItems: [
          {
            title: "Personal Identification",
            body: "Full name, date of birth, nationality, email address, and phone/contact number.",
          },
          {
            title: "Travel Documents",
            body: "Passport number and passport expiry date (required for booking confirmations).",
          },
          { title: "Health & Preferences", body: "Food allergies, medical conditions, mobility assistance needs." },
        ],
      },
      {
        heading: "How We Use Your Information",
        sectionIcon: "Users",
        type: "grid",
        subItems: [
          {
            title: "Service Delivery",
            body: "Process bookings, provide customer support, and deliver travel services.",
          },
          { title: "Personalization", body: "Customize content and recommendations based on your preferences." },
          { title: "Communication", body: "Send booking confirmations, updates, and promotional offers." },
          { title: "Analytics", body: "Improve our services and website functionality." },
        ],
      },
      {
        heading: "Data Protection & Security",
        sectionIcon: "Shield",
        type: "icon-list",
        subItems: [
          {
            icon: "Lock",
            title: "Encryption",
            body: "All sensitive data is encrypted using industry-standard SSL/TLS protocols.",
          },
          {
            icon: "Server",
            title: "Secure Storage",
            body: "Data is stored on secure servers with regular security audits.",
          },
        ],
      },
      {
        heading: "Questions About This Policy?",
        sectionIcon: "HelpCircle",
        type: "contact",
        subItems: [
          { title: "Email", body: "hello@ikisakitours.com" },
          { title: "Phone", body: "+94 11 234 5678" },
          { title: "Response Time", body: "Within 48 hours" },
        ],
      },
    ],
  },

  // ==========================================
  // 3. BOOKING POLICY
  // ==========================================
  {
    id: "booking",
    eyebrow: "IkiSaki Booking Policy Information",
    title: "Booking Policy",
    accent: "Policy",
    lastUpdated: "March 2026",
    sections: [
      {
        heading: "General Procedures",
        sectionIcon: "FileText",
        type: "paragraph",
        content:
          "All reservations for Iki Saki experiences must be processed through our official website. A booking is considered 'Pending' until a verification email is received and the initial deposit is confirmed.",
      },
      {
        heading: "Special Bookings & Requirements",
        sectionIcon: "Users",
        type: "grid",
        subItems: [
          {
            title: "Group Bookings",
            body: "Bookings for more than 6 guests require prior approval from our concierge team. Special group rates will be assigned accordingly.",
          },
          {
            title: "Age Restrictions",
            body: "Certain expeditions require guests to be at least 12 years of age for safety reasons. Please verify tour requirements.",
          },
        ],
      },
      {
        heading: "Modifications & Access",
        sectionIcon: "Shield",
        type: "icon-list",
        subItems: [
          {
            icon: "FileText",
            title: "Amendment Policy",
            body: "Requests to change dates or guest details must be submitted in writing at least 72 hours before departure.",
          },
          {
            icon: "Fingerprint",
            title: "Elite Journey ID",
            body: "Your unique access code. Keep this code secure as it will be required for all check-in procedures.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // 4. PAYMENT POLICY
  // ==========================================
  {
    id: "payment",
    eyebrow: "IkiSaki Payment Policy Information",
    title: "Payment Policy",
    accent: "Policy",
    lastUpdated: "April 2026",
    sections: [
      {
        heading: "Accepted Methods & Currency",
        sectionIcon: "Database",
        type: "row-list",
        content: "We offer secure and flexible payment options for all our luxury expeditions.",
        subItems: [
          { title: "Payment Methods", body: "Visa, Mastercard, Amex, and Direct Wire Transfer" },
          { title: "Currency", body: "All transactions are processed in USD" },
        ],
      },
      {
        heading: "Security Measures",
        sectionIcon: "Lock",
        type: "icon-list",
        subItems: [
          {
            icon: "Lock",
            title: "Payment Security",
            body: "We utilize 256-bit SSL encryption and Stripe-certified payment gateways to ensure your financial data remains private.",
          },
        ],
      },
      {
        heading: "Invoicing & Refunds",
        sectionIcon: "FileText",
        type: "grid",
        subItems: [
          {
            title: "Tax Invoicing",
            body: "Digital invoices will be issued immediately upon successful payment. Contact finance for corporate receipts.",
          },
          {
            title: "Refund Processing",
            body: "Approved refunds are processed to the original payment method within 5-10 business days.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // 5. COOKIE POLICY
  // ==========================================
  {
    id: "cookie",
    eyebrow: "IkiSaki Cookie Policy Information",
    title: "Cookie Policy",
    accent: "Policy",
    lastUpdated: "May 2026",
    sections: [
      {
        heading: "What Are Cookies",
        sectionIcon: "Globe",
        type: "paragraph",
        content:
          "Cookies are small data files stored on your browser by our website to remember your preferences, ensure security, and improve your overall luxury browsing experience.",
      },
      {
        heading: "Information Collected Automatically",
        sectionIcon: "Database",
        type: "checklist",
        subItems: [
          {
            title: "Device & Browser Data",
            body: "IP address, browser type, device brand/model, and operating system.",
          },
          { title: "Usage Metrics", body: "Website usage metrics, page views, click pathways, and session durations." },
          { title: "Preferences", body: "Language settings, preloader states, and UI theme choices." },
        ],
      },
      {
        heading: "Types of Cookies We Use",
        sectionIcon: "Server",
        type: "row-list",
        subItems: [
          {
            title: "Essential Cookies",
            body: "Strictly necessary to provide core functionalities (e.g., security, routing).",
          },
          { title: "Analytics & Performance", body: "Helps us track visitor counts and improve page performance." },
          { title: "Marketing Cookies", body: "Used to deliver relevant advertisements and track ad performance." },
        ],
      },
      {
        heading: "How We Use Cookie Data",
        sectionIcon: "Users",
        type: "grid",
        subItems: [
          {
            title: "Service Delivery",
            body: "Ensure secure logins, process bookings smoothly, and maintain site stability.",
          },
          {
            title: "Personalization",
            body: "Customize content, language preferences, and recommendations based on your behavior.",
          },
          {
            title: "Analytics",
            body: "Improve our services, understand user journeys, and optimize website functionality.",
          },
          { title: "Marketing", body: "Deliver personalized luxury travel offers through our advertising partners." },
        ],
      },
      {
        heading: "Data Protection & Security",
        sectionIcon: "Shield",
        type: "icon-list",
        subItems: [
          {
            icon: "Lock",
            title: "Encryption",
            body: "All cookie data containing sensitive identifiers is encrypted using industry-standard SSL/TLS protocols.",
          },
          {
            icon: "Server",
            title: "Secure Storage",
            body: "Cookie preference logs are stored on secure servers with regular security audits.",
          },
          {
            icon: "Fingerprint",
            title: "Access Control",
            body: "Strictly limited internal access to any identifiable analytics data.",
          },
        ],
      },
      {
        heading: "Managing Your Rights",
        sectionIcon: "CheckCircle2",
        type: "grid",
        subItems: [
          {
            title: "Browser Control",
            body: "You can configure your browser to reject all cookies or notify you when a cookie is set.",
          },
          {
            title: "Opt-out Options",
            body: "Use our Cookie Preferences tool or third-party opt-out extensions to block non-essential tracking.",
          },
          {
            title: "Data Deletion",
            body: "You can clear your browser cache at any time to remove all stored IkiSaki cookies.",
          },
        ],
      },
      {
        heading: "Questions About This Policy?",
        sectionIcon: "HelpCircle",
        type: "contact",
        subItems: [
          { title: "Email", body: "hello@ikisakitours.com" },
          { title: "Phone", body: "+94 11 234 5678" },
          { title: "Response Time", body: "Within 48 hours" },
        ],
      },
    ],
  },
];
