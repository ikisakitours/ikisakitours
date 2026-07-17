export type LegalDocumentId = "terms" | "privacy" | "booking" | "payment";

export type LegalItem = {
  heading: string;
  body: string;
};

export type LegalDocument = {
  id: LegalDocumentId;
  eyebrow: string;
  title: string;
  items: LegalItem[];
  accent: string;
  lastUpdated: string;
};

export const legalDocuments: LegalDocument[] = [
  {
    id: "terms",
    eyebrow: "MapMate Terms Information",
    title: "Terms of Service",
    accent: "Service",
    lastUpdated: "February 2026",
    items: [
      {
        heading: "01. Booking Policy",
        body: "All safari reservations are subject to availability. A confirmed booking is only valid upon receipt of the full payment and issuance of the Elite Journey ID.",
      },
      {
        heading: "02. Cancellation & Refunds",
        body: "Free cancellations are permitted up to 24 hours before the journey. Cancellations made within 24 hours of the departure time are non-refundable.",
      },
      {
        heading: "03. Guest Conduct",
        body: "Guests must follow all safety instructions provided by the ranger. Elite Safari reserves the right to terminate a journey if conduct endangers wildlife or other guests.",
      },
      {
        heading: "04. Liability Waiver",
        body: "Participants acknowledge the inherent risks of wildlife expeditions. Elite Safari Journeys is not liable for natural delays or weather-related changes.",
      },
      {
        heading: "05. Travel Insurance",
        body: "We strongly recommend that all guests possess valid international travel insurance covering medical emergencies and safari activities.",
      },
      {
        heading: "06. Documentation",
        body: "Guests are responsible for ensuring they have valid passports, visas, and health certificates required for entry into safari zones.",
      },
      {
        heading: "07. Pricing & Taxes",
        body: "All prices are inclusive of local conservation fees unless stated otherwise. Elite Safari reserves the right to adjust pricing due to government tax changes.",
      },
      {
        heading: "08. Force Majeure",
        body: "Elite Safari Journeys is not responsible for failure to perform obligations due to events beyond our control, including natural disasters or civil unrest.",
      },
      {
        heading: "09. Photographic Rights",
        body: "Photos taken by our official photographers during journeys may be used for marketing unless the guest explicitly opts out during booking.",
      },
      {
        heading: "10. Governing Law",
        body: "These terms are governed by the laws of the jurisdiction in which the safari headquarters is registered.",
      },
    ],
  },
  {
    id: "privacy",
    eyebrow: "MapMate Privacy Policy Information",
    title: "Privacy Policy",
    accent: "Policy",
    lastUpdated: "January 2026",
    items: [
      {
        heading: "01. Data Protection",
        body: "We utilize high-level encryption to protect your personal details and payment information. Your data is never sold to third-party luxury vendors.",
      },
      {
        heading: "02. Cookie Usage",
        body: "We use cookies to enhance your browsing experience and provide personalized safari recommendations based on your preferences.",
      },
      {
        heading: "03. Information Collection",
        body: "We collect names, emails, and phone numbers solely for the purpose of booking management and safety communication.",
      },
      {
        heading: "04. Payment Security",
        body: "Transactions are processed via secure, PCI-compliant gateways. Elite Safari does not store full credit card numbers on our local servers.",
      },
      {
        heading: "05. Location Data",
        body: "GPS data may be used during the journey to provide real-time updates on wildlife sightings and ensure guest safety via our tracker apps.",
      },
      {
        heading: "06. Third-Party Links",
        body: "Our site may contain links to luxury partners. We are not responsible for the privacy practices of external websites.",
      },
      {
        heading: "07. Data Retention",
        body: "Personal data is stored only as long as necessary to fulfill booking requirements or comply with legal audit obligations.",
      },
      {
        heading: "08. Guest Rights",
        body: "You have the right to request a copy of your personal data or request its deletion after your journey is completed.",
      },
      {
        heading: "09. Newsletter Opt-out",
        body: "Guests may unsubscribe from our 'Elite Insights' newsletter at any time using the link provided in the email footer.",
      },
      {
        heading: "10. Policy Changes",
        body: "We reserve the right to update this policy. Significant changes will be communicated to guests via the email provided at booking.",
      },
    ],
  },

  {
    id: "booking",
    eyebrow: "MapMate Booking Policy Information",
    title: "Booking Policy",
    accent: "Policy",
    lastUpdated: "March 2026",
    items: [
      {
        heading: "01. Reservation Procedure",
        body: "All reservations for Map Mate experiences must be processed through our official website. A booking is considered 'Pending' until a verification email is received.",
      },
      {
        heading: "02. Group Bookings",
        body: "Bookings for more than 6 guests require prior approval from our concierge team. Special group rates and tailored itineraries will be assigned accordingly.",
      },
      {
        heading: "03. Age Restrictions",
        body: "Certain expeditions require guests to be at least 12 years of age for safety reasons. Please verify specific tour requirements before confirming your booking.",
      },
      {
        heading: "04. Amendment Policy",
        body: "Requests to change dates or guest details must be submitted in writing at least 72 hours before the scheduled departure. Amendments are subject to availability.",
      },
      {
        heading: "05. Elite Journey ID",
        body: "Your Elite Journey ID is your unique access code. Please keep this code secure as it will be required for all check-in procedures and on-site services.",
      },
    ],
  },
  {
    id: "payment",
    eyebrow: "MapMate Payment Policy Information",
    title: "Payment Policy",
    accent: "Policy",
    lastUpdated: "April 2026",
    items: [
      {
        heading: "01. Accepted Payment Methods",
        body: "We securely accept Visa, Mastercard, American Express, and direct wire transfers for high-value corporate bookings.",
      },
      {
        heading: "02. Currency & Exchange",
        body: "All transactions are processed in USD. International guests may be subject to their bank's exchange rates and applicable foreign transaction fees.",
      },
      {
        heading: "03. Payment Security",
        body: "Your payment security is our priority. We utilize 256-bit SSL encryption and Stripe-certified payment gateways to ensure your financial data remains private.",
      },
      {
        heading: "04. Tax Invoicing",
        body: "Digital invoices will be issued immediately upon successful payment. For corporate tax receipts, please contact our finance department with your business details.",
      },
      {
        heading: "05. Refund Processing",
        body: "Approved refunds are processed to the original payment method within 5-10 business days, depending on your financial institution's processing time.",
      },
    ],
  },
];
