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
    eyebrow: "IkiSaki Tours Terms & Conditions",
    title: "Terms of Service",
    accent: "Service",
    lastUpdated: "November 2026",
    sections: [
      // 01. INTRODUCTION
      {
        heading: "Introduction & Acceptance of Terms",
        sectionIcon: "FileText",
        type: "paragraph",
        content:
          "Welcome to IkiSaki Tours. These Terms of Service govern your access to and use of our website, booking services, private transportation, customized travel experiences and related services in Sri Lanka.\n\nIkiSaki Tours (Pvt) Ltd, referred to as 'IkiSaki Tours', 'we', 'our' or 'us', provides travel and transportation arrangements designed to make exploring Sri Lanka comfortable, convenient and enjoyable.\n\nBy accessing our website, submitting a booking request, confirming a reservation or using any of our services, you acknowledge that you have read and understood these Terms of Service and agree to the conditions applicable to your booking.\n\nIf you do not agree with these terms, please refrain from making a reservation or using our services. These terms should be read together with our Booking Policy, Payment Policy, Cancellation Policy and Privacy Policy.",
      },

      // 02. SCOPE OF SERVICES
      {
        heading: "Our Services",
        sectionIcon: "Compass",
        type: "grid",
        subItems: [
          {
            title: "Private Charter Services",
            body: "We provide private vehicle transportation with professional drivers for sightseeing, local journeys, intercity travel, multi-day trips and island-wide transportation throughout Sri Lanka. Services are arranged according to the agreed vehicle category, route, duration and booking conditions.",
          },
          {
            title: "Custom-made Tours",
            body: "We assist customers in creating personalized travel itineraries based on their destinations, interests, schedules and budgets. Customized arrangements may include transportation, sightseeing, accommodation coordination, activities and other travel-related services as specified in the confirmed quotation.",
          },
          {
            title: "Airport Pick-up & Drop-off",
            body: "We arrange transportation to and from Bandaranaike International Airport and other agreed airports or locations in Sri Lanka. Airport transfers are coordinated according to the confirmed flight details, meeting arrangements and destination.",
          },
          {
            title: "Hotel & Intercity Transfers",
            body: "We provide private transportation between hotels, resorts, cities, tourist destinations and other agreed locations. All transfer arrangements are subject to the confirmed route, vehicle availability and applicable service conditions.",
          },
        ],
      },

      // 03. BOOKINGS
      {
        heading: "Bookings & Reservations",
        sectionIcon: "CalendarCheck",
        type: "checklist",
        subItems: [
          {
            title: "Booking Requests",
            body: "Customers may request our services through the official IkiSaki Tours website or designated communication channels. All booking requests are subject to availability, review and acceptance by our team.",
          },
          {
            title: "Confirmation Requirements",
            body: "A booking request, quotation or preliminary discussion does not constitute a confirmed reservation. A booking becomes confirmed after the customer accepts the final arrangements, completes the required payment where applicable and receives written confirmation from IkiSaki Tours.",
          },
          {
            title: "Booking Reference",
            body: "Confirmed reservations may be assigned a unique booking reference. Customers should retain this reference and provide it when contacting us regarding their reservation, payment, itinerary or transportation arrangements.",
          },
          {
            title: "Accurate Booking Information",
            body: "Customers are responsible for providing accurate information, including names, contact details, travel dates, passenger numbers, flight details, accommodation addresses and luggage requirements.",
          },
          {
            title: "Special Requests",
            body: "Special requests should be communicated before confirmation. We will make reasonable efforts to accommodate them, but requests are not guaranteed unless specifically accepted in writing.",
          },
        ],
      },

      // 04. PRICING
      {
        heading: "Pricing, Quotations & Inclusions",
        sectionIcon: "Receipt",
        type: "icon-list",
        subItems: [
          {
            icon: "FileText",
            title: "Confirmed Quotations",
            body: "The quotation provided by IkiSaki Tours will identify the agreed services, applicable charges, travel arrangements and relevant inclusions and exclusions. Customers should review and approve the quotation before proceeding with payment.",
          },
          {
            icon: "CheckCircle",
            title: "Included Services",
            body: "Only services expressly listed in the confirmed quotation or booking confirmation are included in the agreed price. The exact inclusions may differ between private charters, airport transfers and customized tour packages.",
          },
          {
            icon: "CircleDollarSign",
            title: "Excluded Expenses",
            body: "Unless expressly included in writing, the quoted price does not cover hotel accommodation, meals, attraction entrance tickets, safari fees, train tickets, optional activities, personal purchases, tips or other independent expenses.",
          },
          {
            icon: "RefreshCw",
            title: "Additional Charges",
            body: "Additional destinations, extended service hours, extra kilometres, waiting time, vehicle upgrades, itinerary changes or other services requested beyond the confirmed arrangements may incur additional charges. Any applicable additional costs will be communicated for customer approval.",
          },
          {
            icon: "Landmark",
            title: "Taxes & Government Fees",
            body: "Applicable government taxes, mandatory fees and other charges will be reflected in the quotation where known. Any relevant changes imposed by authorities after confirmation will be communicated and handled in accordance with applicable law and the agreed booking conditions.",
          },
        ],
      },

      // 05. PRIVATE CHARTERS
      {
        heading: "Private Charter & Transportation Conditions",
        sectionIcon: "CarFront",
        type: "grid",
        subItems: [
          {
            title: "Vehicle Category",
            body: "The vehicle category or agreed vehicle type will be identified in the quotation or booking confirmation. Vehicle allocation depends on passenger numbers, luggage requirements, route conditions and availability.",
          },
          {
            title: "Passenger Capacity",
            body: "Customers must provide the correct number of passengers, including children and infants. Each vehicle has a maximum passenger capacity, and we will not knowingly arrange transportation beyond the permitted capacity.",
          },
          {
            title: "Luggage Requirements",
            body: "Customers should provide accurate luggage quantities and approximate sizes before confirming their booking. If luggage exceeds the practical capacity of the selected vehicle, an alternative vehicle or additional transportation may be required at an additional cost.",
          },
          {
            title: "Service Duration",
            body: "Daily operating hours, service duration, departure times and any included waiting periods will be specified in the quotation. Additional hours or waiting time beyond the agreed arrangements may be charged separately.",
          },
          {
            title: "Travel Distance & Routes",
            body: "Transportation will be provided according to the agreed itinerary or route. Additional kilometres, destinations, detours or route changes may affect the final service charge.",
          },
          {
            title: "Driver Accommodation",
            body: "For multi-day journeys requiring overnight stays outside the driver's normal operating area, driver accommodation or an applicable overnight allowance may be included in the quotation or charged separately as agreed.",
          },
          {
            title: "Vehicle Substitution",
            body: "If the confirmed vehicle becomes unavailable due to an unexpected operational issue, we will make reasonable efforts to arrange a comparable alternative. Customers will be informed of any material changes, and any necessary price adjustment will be discussed before proceeding.",
          },
        ],
      },

      // 06. CUSTOM TOURS
      {
        heading: "Custom-made Tours & Itinerary Conditions",
        sectionIcon: "Map",
        type: "checklist",
        subItems: [
          {
            title: "Personalized Travel Planning",
            body: "Custom-made tours are developed according to individual customer preferences, available travel dates, destinations, interests and agreed budgets. The final itinerary will be shared for review and confirmation before the journey.",
          },
          {
            title: "Flexible Itineraries",
            body: "Customers may request changes to destinations, sightseeing stops, departure times and activities. Flexibility depends on available time, distance, road conditions, opening hours, supplier availability and operational feasibility.",
          },
          {
            title: "Changes During the Journey",
            body: "Reasonable itinerary adjustments may be accommodated where possible. However, additional destinations, significant detours, extended waiting periods or changes to previously confirmed arrangements may involve extra costs.",
          },
          {
            title: "Attraction Availability",
            body: "Opening hours, entrance conditions, visitor restrictions, permits and activity availability are determined by the relevant attraction or operator and may change without prior notice.",
          },
          {
            title: "Optional Activities",
            body: "Safari experiences, boat trips, train journeys, adventure activities, cultural performances and other optional experiences are subject to availability, applicable supplier conditions and any additional charges.",
          },
          {
            title: "Travel Time Estimates",
            body: "Travel durations and arrival times provided in itineraries are estimates. Actual journey times may vary due to traffic, weather, road conditions, public events and other circumstances.",
          },
        ],
      },

      // 07. AIRPORT TRANSFERS
      {
        heading: "Airport Pick-up, Drop-off & Hotel Transfers",
        sectionIcon: "Plane",
        type: "icon-list",
        subItems: [
          {
            icon: "PlaneLanding",
            title: "Flight Information",
            body: "Customers must provide accurate airline details, flight numbers, scheduled arrival or departure times and relevant contact information. Changes to flight schedules should be communicated to us as soon as possible.",
          },
          {
            icon: "MapPin",
            title: "Airport Meeting Point",
            body: "The agreed airport meeting point and driver coordination instructions will be communicated before arrival. Customers should follow the provided instructions and contact our team if they experience difficulty locating their driver.",
          },
          {
            icon: "Clock",
            title: "Waiting Time",
            body: "Any included airport or hotel waiting period will be specified in the confirmed quotation. Extended waiting time, delays unrelated to the original arrangement or additional waiting requested by the customer may incur extra charges.",
          },
          {
            icon: "RefreshCw",
            title: "Flight Delays & Changes",
            body: "We will make reasonable efforts to accommodate flight delays or schedule changes when accurate updated information is provided. Revised arrangements are subject to driver availability, operational feasibility and additional costs where applicable.",
          },
          {
            icon: "Phone",
            title: "Customer Communication",
            body: "Customers should keep their contact numbers accessible after landing and during the agreed pick-up period. If a customer cannot locate the driver, they should contact the designated support number before leaving the meeting area.",
          },
          {
            icon: "AlertTriangle",
            title: "Missed Flights & No-shows",
            body: "If a customer misses a flight, provides incorrect flight information or fails to attend the agreed pick-up location without notifying us, the original transfer may need to be rearranged. Additional charges or cancellation conditions may apply.",
          },
        ],
      },

      // 08. MODIFICATIONS
      {
        heading: "Booking Amendments & Changes",
        sectionIcon: "RefreshCw",
        type: "checklist",
        subItems: [
          {
            title: "Amendment Requests",
            body: "Requests to change travel dates, destinations, passenger numbers, pick-up locations, accommodation arrangements or other booking details should be submitted through our official communication channels.",
          },
          {
            title: "Advance Notice",
            body: "Customers should request amendments as early as possible, preferably at least 72 hours before the scheduled service. Certain supplier reservations or last-minute arrangements may require longer notice.",
          },
          {
            title: "Availability & Charges",
            body: "All requested amendments are subject to availability and acceptance by IkiSaki Tours. Additional transportation, supplier, accommodation or administrative costs may apply where relevant.",
          },
          {
            title: "Written Approval",
            body: "A requested amendment is not effective until it has been reviewed and confirmed in writing by IkiSaki Tours. Until confirmation is received, the original booking arrangements remain applicable.",
          },
        ],
      },

      // 09. CANCELLATIONS
      {
        heading: "Cancellations & Refunds",
        sectionIcon: "CalendarX",
        type: "paragraph",
        content:
          "Customers wishing to cancel a confirmed booking must notify IkiSaki Tours through an official communication channel. Cancellation charges, refund eligibility, deadlines and applicable supplier conditions will be determined according to our separate Cancellation Policy and the conditions stated in the confirmed quotation.\n\nCertain third-party services, including hotels, attraction tickets, train reservations, safari operators and other prepaid activities, may have separate cancellation conditions. These conditions will be communicated where applicable.\n\nFor further information, please refer to our Cancellation & Refund Policy and Payment Policy.",
      },

      // 10. CUSTOMER RESPONSIBILITIES
      {
        heading: "Customer Responsibilities",
        sectionIcon: "Users",
        type: "grid",
        subItems: [
          {
            title: "Travel Documents",
            body: "Customers are responsible for obtaining and maintaining valid passports, visas, travel authorizations, permits and other documents required for entry into Sri Lanka and participation in their planned activities.",
          },
          {
            title: "Accurate Information",
            body: "Customers must provide accurate passenger, contact, accommodation, flight and itinerary information and promptly inform us of any changes that may affect the booked services.",
          },
          {
            title: "Punctuality",
            body: "Customers should be ready at the agreed departure or pick-up time. Late arrivals may affect the itinerary, remaining service duration and other scheduled arrangements.",
          },
          {
            title: "Respectful Behaviour",
            body: "Customers must behave respectfully towards drivers, guides, other service providers, local communities, cultural and religious sites, wildlife and other travellers.",
          },
          {
            title: "Personal Belongings",
            body: "Customers are responsible for their passports, cash, electronic devices, valuables and personal belongings. Please check the vehicle and accommodation before departure or check-out.",
          },
          {
            title: "Prohibited Conduct",
            body: "Illegal activities, dangerous behaviour, harassment, violence, deliberate damage to vehicles or property, and conduct that places others at risk will not be accepted. Relevant services may be suspended where reasonably necessary and lawful.",
          },
        ],
      },

      // 11. SAFETY
      {
        heading: "Passenger Safety & Transportation Standards",
        sectionIcon: "ShieldCheck",
        type: "icon-list",
        subItems: [
          {
            icon: "Shield",
            title: "Safety Instructions",
            body: "Customers must follow reasonable safety instructions provided by their driver, guide or activity operator. Seat belts must be worn where provided and required by law.",
          },
          {
            icon: "Baby",
            title: "Children & Child Seats",
            body: "Customers travelling with children should inform us of their ages and child-seat requirements before booking. Child seats and other special equipment are subject to availability and must be arranged in advance.",
          },
          {
            icon: "Car",
            title: "Safe Vehicle Use",
            body: "Customers must not interfere with vehicle operation, driver concentration or safety equipment. Drivers may refuse unsafe or unlawful requests, including dangerous driving or unauthorized route arrangements.",
          },
          {
            icon: "HeartPulse",
            title: "Medical & Accessibility Requirements",
            body: "Customers should inform us of relevant assistance requirements that may affect transportation or participation in booked activities. We will assess reasonable arrangements where possible.",
          },
          {
            icon: "AlertCircle",
            title: "Emergencies",
            body: "In an emergency, customers should follow the instructions of relevant authorities and emergency service providers. Our team will provide reasonable coordination assistance where possible.",
          },
        ],
      },

      // 12. THIRD PARTY SERVICES
      {
        heading: "Third-party Suppliers & External Services",
        sectionIcon: "Handshake",
        type: "paragraph",
        content:
          "Certain travel arrangements may involve independent third-party suppliers, including hotels, restaurants, safari operators, activity providers, attractions, train services, boat operators and other travel-related businesses.\n\nWhere IkiSaki Tours arranges or coordinates such services, the relevant supplier may have its own booking, payment, safety, availability, amendment and cancellation conditions.\n\nUnless expressly stated otherwise, independent suppliers remain responsible for the direct provision of their own services. We will make reasonable efforts to coordinate arrangements and communicate relevant information, but cannot guarantee services or decisions controlled entirely by independent providers.\n\nAny supplier-specific conditions that materially affect a customer's booking should be communicated where reasonably available.",
      },

      // 13. INSURANCE
      {
        heading: "Travel Insurance & Personal Protection",
        sectionIcon: "Umbrella",
        type: "checklist",
        subItems: [
          {
            title: "Travel Insurance Recommendation",
            body: "We strongly recommend that customers obtain suitable international travel insurance covering medical emergencies, personal accidents, travel disruptions, baggage loss and activities included in their itinerary.",
          },
          {
            title: "Activity Coverage",
            body: "Customers should verify that their insurance covers any optional or adventure activities they intend to participate in, including safari experiences, water activities and other recreational excursions.",
          },
          {
            title: "Personal Medical Needs",
            body: "Customers are responsible for assessing their own ability to participate in planned activities and carrying any necessary personal medication or medical supplies.",
          },
          {
            title: "Insurance Responsibility",
            body: "Travel insurance is not automatically included in our quotations unless expressly stated in writing. Customers should confirm their own coverage before travelling.",
          },
        ],
      },

      // 14. SERVICE INTERRUPTIONS
      {
        heading: "Delays, Changes & Unforeseen Circumstances",
        sectionIcon: "CloudSun",
        type: "paragraph",
        content:
          "Travel within Sri Lanka may be affected by traffic congestion, adverse weather, road closures, public demonstrations, government restrictions, attraction closures, infrastructure conditions and other unexpected events.\n\nWe will make reasonable efforts to inform customers of significant disruptions and suggest practical alternatives where possible. Changes to routes, departure times, destinations or activities may be necessary to protect customer safety or maintain operational feasibility.\n\nAny additional costs resulting from revised arrangements will be communicated and agreed where practicable before the revised service is provided.",
      },

      // 15. LIABILITY
      {
        heading: "Liability & Limitations",
        sectionIcon: "Shield",
        type: "icon-list",
        subItems: [
          {
            icon: "Car",
            title: "Transportation & Road Conditions",
            body: "We take reasonable care in coordinating transportation services. However, traffic, road conditions, accidents involving other road users, unexpected vehicle problems and circumstances outside our reasonable control may affect travel schedules.",
          },
          {
            icon: "Building",
            title: "Third-party Services",
            body: "We are not responsible for the independent acts or omissions of third-party suppliers to the extent permitted by applicable law. This does not exclude any responsibility that IkiSaki Tours may have for its own acts, omissions or contractual obligations.",
          },
          {
            icon: "Package",
            title: "Personal Property",
            body: "Customers should take reasonable care of their personal belongings. Any reported loss or damage should be brought to our attention as soon as possible so that we can assist with enquiries where appropriate.",
          },
          {
            icon: "Scale",
            title: "Legal Limitations",
            body: "Nothing in these Terms of Service excludes or limits liability where such exclusion or limitation is prohibited by applicable law, including liability arising from negligence, fraud, wilful misconduct or other non-excludable legal obligations.",
          },
          {
            icon: "FileCheck",
            title: "Reasonable Remedies",
            body: "Where a confirmed service cannot be provided as agreed due to circumstances for which IkiSaki Tours is responsible, we will seek to offer an appropriate remedy in accordance with the booking conditions and applicable law.",
          },
        ],
      },

      // 16. FORCE MAJEURE
      {
        heading: "Force Majeure",
        sectionIcon: "Globe",
        type: "paragraph",
        content:
          "IkiSaki Tours shall not be considered in breach of its obligations to the extent that performance is prevented or materially affected by events beyond its reasonable control. Such events may include natural disasters, floods, severe weather, epidemics, public health emergencies, war, terrorism, civil unrest, government restrictions, strikes, major infrastructure failures or other comparable circumstances.\n\nWhere such circumstances affect a confirmed booking, we will make reasonable efforts to communicate with customers and discuss available alternatives, rescheduling or other appropriate arrangements. Any refund or additional payment will be handled in accordance with the applicable booking conditions and relevant law.",
      },

      // 17. PHOTOGRAPHY
      {
        heading: "Photography, Videos & Marketing",
        sectionIcon: "Camera",
        type: "paragraph",
        content:
          "Customers may take photographs and videos during their journeys, subject to applicable laws, attraction rules, privacy considerations and the rights of other individuals.\n\nIkiSaki Tours will not use identifiable customer photographs, videos, testimonials or other personal media for promotional or marketing purposes without obtaining the customer's appropriate permission, unless another lawful basis applies.\n\nCustomers who provide testimonials or media for publication may contact us regarding their permission and any applicable withdrawal requests.",
      },

      // 18. PRIVACY
      {
        heading: "Privacy & Personal Information",
        sectionIcon: "Lock",
        type: "paragraph",
        content:
          "We collect and process customer information where necessary to manage bookings, coordinate transportation, arrange travel services, communicate with customers and meet applicable legal obligations.\n\nPersonal information may be shared with relevant drivers, guides, hotels, activity providers, payment processors and other service partners where reasonably necessary to fulfil a confirmed booking.\n\nWe take reasonable steps to protect personal information and handle it in accordance with our Privacy Policy and applicable data protection laws.\n\nFor further information about the collection, use, retention and protection of personal data, please refer to our Privacy Policy.",
      },

      // 19. COMPLAINTS
      {
        heading: "Customer Support & Complaints",
        sectionIcon: "Headset",
        type: "checklist",
        subItems: [
          {
            title: "Reporting an Issue",
            body: "Customers should inform our team as soon as reasonably possible if they experience a problem with a confirmed service. Early communication helps us investigate the matter and identify possible solutions.",
          },
          {
            title: "Complaint Information",
            body: "When submitting a complaint, please include your booking reference, travel date, a description of the issue and any relevant supporting information.",
          },
          {
            title: "Review & Resolution",
            body: "We will review complaints fairly and make reasonable efforts to respond and resolve concerns through our customer support channels.",
          },
        ],
      },

      // 20. GOVERNING LAW
      {
        heading: "Governing Law & Dispute Resolution",
        sectionIcon: "Scale",
        type: "paragraph",
        content:
          "These Terms of Service shall be governed by and interpreted in accordance with the laws of Sri Lanka, subject to applicable mandatory consumer protection and other legal requirements.\n\nCustomers and IkiSaki Tours are encouraged to make reasonable efforts to resolve any disagreement through direct communication before pursuing formal legal proceedings.\n\nNothing in this section prevents either party from exercising rights or remedies available under applicable law.",
      },

      // 21. CHANGES TO TERMS
      {
        heading: "Changes to These Terms",
        sectionIcon: "RefreshCw",
        type: "paragraph",
        content:
          "IkiSaki Tours may update these Terms of Service from time to time to reflect changes in our services, business operations, legal requirements or customer arrangements.\n\nThe latest version will be published on our official website together with its applicable revision date. Changes will generally apply to future bookings. Any material change affecting an already confirmed booking will be handled in accordance with the agreed booking conditions and applicable law.",
      },

      // 22. CONTACT
      {
        heading: "Contact IkiSaki Tours",
        sectionIcon: "Mail",
        type: "contact",
        subItems: [
          {
            title: "Company",
            body: "IkiSaki Tours (Pvt) Ltd",
          },
          {
            title: "Email",
            body: "hello@ikisakitours.com",
          },
          {
            title: "Website",
            body: "https://www.ikisakitours.com",
          },
          {
            title: "Location",
            body: "Sri Lanka",
          },
          {
            title: "Customer Support",
            body: "For questions regarding these Terms of Service, bookings, transportation arrangements or other travel services, please contact us through our official communication channels.",
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
    eyebrow: "Your Privacy Matters",
    title: "Privacy Policy",
    accent: "Privacy",
    lastUpdated: "November 2026",
    sections: [
      {
        heading: "Introduction",
        sectionIcon: "FileText",
        type: "paragraph",
        content:
          'IkiSaki Tours (Pvt) Ltd ("IkiSaki Tours", "we", "our" or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store and share information when you visit our website, contact us or use our travel services. By using our website or making a booking, you acknowledge that you have read this Privacy Policy.',
      },
      {
        heading: "Information We Collect",
        sectionIcon: "Database",
        type: "checklist",
        subItems: [
          {
            title: "Personal Information",
            body: "Your name, email address, telephone number, nationality and other contact details provided when making an enquiry or booking.",
          },
          {
            title: "Travel and Booking Information",
            body: "Travel dates, flight numbers, arrival and departure times, hotel details, passenger numbers, pick-up and drop-off locations, destinations and itinerary preferences.",
          },
          {
            title: "Special Requirements",
            body: "Information you voluntarily provide about dietary requirements, allergies, accessibility needs or other arrangements necessary to provide your requested travel services.",
          },
          {
            title: "Payment Information",
            body: "Payment status, transaction references and relevant billing details required to process and confirm your booking. Payments may be handled by third-party payment providers.",
          },
          {
            title: "Communication Information",
            body: "Messages, enquiries, feedback, reviews and other communications you send through our website, email, telephone or messaging platforms.",
          },
          {
            title: "Technical Information",
            body: "Information such as your IP address, browser type, device information, pages visited and website usage data, depending on the technologies used on our website.",
          },
        ],
      },
      {
        heading: "How We Collect Your Information",
        sectionIcon: "ClipboardList",
        type: "paragraph",
        content:
          "We collect personal information directly from you when you submit an enquiry, request a quotation, make a booking, contact our team, subscribe to updates or provide feedback. We may also receive relevant information from someone making a booking on your behalf, travel partners involved in your arrangements, payment providers or website technologies such as cookies. Anyone providing information about another traveller should have the authority to share that information.",
      },
      {
        heading: "How We Use Your Information",
        sectionIcon: "Target",
        type: "grid",
        subItems: [
          {
            title: "Booking and Reservation Management",
            body: "To receive booking requests, prepare quotations, confirm reservations and manage your travel arrangements.",
          },
          {
            title: "Private Charter Services",
            body: "To arrange private vehicles, drivers, routes, pick-up locations, travel schedules and transportation services throughout Sri Lanka.",
          },
          {
            title: "Custom-made Tours",
            body: "To understand your travel interests, prepare personalised itineraries and coordinate requested destinations, activities and travel arrangements.",
          },
          {
            title: "Airport and Hotel Transfers",
            body: "To coordinate airport pick-ups, airport drop-offs, hotel transfers, flight-related arrangements and other transportation requirements.",
          },
          {
            title: "Customer Support",
            body: "To respond to enquiries, provide booking confirmations, communicate itinerary updates and assist you before, during and after your journey.",
          },
          {
            title: "Payments and Administration",
            body: "To verify payments, issue receipts, manage refunds, maintain business records and handle payment-related enquiries.",
          },
          {
            title: "Website Improvement",
            body: "To understand how visitors use our website, improve its functionality, identify technical problems and enhance the customer experience.",
          },
          {
            title: "Marketing and Promotions",
            body: "To send travel updates, promotional offers and relevant information where you have subscribed or where such communication is otherwise permitted.",
          },
        ],
      },
      {
        heading: "Sharing Your Information",
        sectionIcon: "Share2",
        type: "paragraph",
        content:
          "IkiSaki Tours does not sell your personal information. We may share relevant information with trusted service providers and business partners only when reasonably necessary to arrange your booking, provide our services, process payments, operate our website or comply with applicable legal requirements.",
      },
      {
        heading: "Third-Party Service Providers",
        sectionIcon: "Users",
        type: "checklist",
        subItems: [
          {
            title: "Drivers and Transportation Providers",
            body: "Relevant contact details, passenger information, pick-up locations and itinerary details may be shared with the driver or transportation provider assigned to your booking.",
          },
          {
            title: "Hotels and Accommodation Providers",
            body: "Where accommodation arrangements are requested, relevant guest and booking information may be shared with the selected accommodation provider.",
          },
          {
            title: "Tour and Activity Providers",
            body: "Information necessary to arrange agreed excursions, activities, attractions and other travel services may be shared with the relevant providers.",
          },
          {
            title: "Payment Providers",
            body: "Payment-related information may be processed by banks, payment gateways and other financial service providers to complete or verify transactions.",
          },
          {
            title: "Website and Technology Providers",
            body: "Website hosting, maintenance, email, analytics and other technology providers may process limited information when providing services to us.",
          },
          {
            title: "Government and Legal Authorities",
            body: "We may disclose information when required by applicable law, a valid legal request or a competent authority, or when reasonably necessary to protect safety and legal rights.",
          },
        ],
      },
      {
        heading: "Payment Security",
        sectionIcon: "CreditCard",
        type: "paragraph",
        content:
          "Payments for IkiSaki Tours services may be processed through banks, payment gateways or other authorised payment providers. These providers may collect and process payment information under their own privacy and security policies. We do not intend to store complete payment card numbers or card security codes. Customers should use only the official payment instructions provided by IkiSaki Tours when making payments.",
      },
      {
        heading: "Cookies and Website Technologies",
        sectionIcon: "Cookie",
        type: "paragraph",
        content:
          "Our website may use cookies and similar technologies to support essential website functions, remember preferences, understand website traffic and improve the visitor experience. Third-party services integrated into our website may also use cookies or similar technologies. Where required, non-essential cookies will be used in accordance with your consent preferences. You can manage cookies through your browser settings, although disabling certain cookies may affect website functionality. Please refer to our Cookie Policy for further information.",
      },
      {
        heading: "International Data Transfers",
        sectionIcon: "Globe",
        type: "paragraph",
        content:
          "As we serve international travellers, some service providers or technology systems used for our website and customer communications may operate outside Sri Lanka. Where personal information is transferred internationally, we will take reasonable steps to ensure that such transfers are handled in accordance with applicable data protection requirements and appropriate safeguards.",
      },
      {
        heading: "Data Storage and Security",
        sectionIcon: "ShieldCheck",
        type: "paragraph",
        content:
          "We take reasonable organisational and technical measures designed to protect personal information against unauthorised access, loss, misuse, alteration or disclosure. Access to customer information should be limited to individuals who need it to provide or manage the requested services. However, no electronic transmission or storage system can be guaranteed to be completely secure.",
      },
      {
        heading: "Data Retention",
        sectionIcon: "Archive",
        type: "paragraph",
        content:
          "We retain personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected. This may include completing bookings, providing customer support, maintaining financial and business records, handling complaints, resolving disputes and meeting applicable legal obligations. When information is no longer required, we will take reasonable steps to delete it, anonymise it or securely dispose of it, subject to any applicable legal retention requirements.",
      },
      {
        heading: "Your Privacy Rights",
        sectionIcon: "UserRoundCheck",
        type: "checklist",
        subItems: [
          { title: "Data Access", body: "Request information about the personal data we hold about you." },
          { title: "Correction", body: "Request correction of inaccurate or incomplete personal information." },
          { title: "Deletion", body: "Request deletion of personal information where applicable." },
          { title: "Consent Withdrawal", body: "Withdraw consent where processing is based on your consent." },
          { title: "Preferences", body: "Update your contact details and communication preferences." },
          { title: "Marketing Opt-Out", body: "Opt out of promotional and marketing communications." },
          { title: "Support & Inquiries", body: "Raise a concern or submit a privacy-related request." },
        ],
      },
      {
        heading: "Marketing Communications",
        sectionIcon: "Mail",
        type: "paragraph",
        content:
          "If you subscribe to our newsletter or choose to receive promotional communications, we may use your contact details to send travel updates, service announcements and special offers. You may unsubscribe at any time using the instructions provided in the communication or by contacting us at hello@ikisakitours.com. Opting out of marketing communications will not prevent us from sending essential messages relating to an existing enquiry, booking, payment or travel service.",
      },
      {
        heading: "Children's Privacy",
        sectionIcon: "UsersRound",
        type: "paragraph",
        content:
          "Our website and travel services are intended to be arranged by adults. Where a booking includes children, relevant information should be provided by a parent, legal guardian or authorised adult and should be limited to what is necessary to arrange the requested service safely. We do not knowingly collect children's personal information for independent marketing purposes.",
      },
      {
        heading: "Third-Party Websites",
        sectionIcon: "ExternalLink",
        type: "paragraph",
        content:
          "Our website may contain links to external websites, booking platforms, social media services, maps or other third-party services. These websites operate independently and may have their own privacy policies and terms. IkiSaki Tours is not responsible for the privacy practices, content or security of external websites. We encourage you to review their privacy policies before sharing personal information.",
      },
      {
        heading: "Legal Compliance",
        sectionIcon: "Scale",
        type: "paragraph",
        content:
          "We may collect, use, retain or disclose personal information when reasonably necessary to comply with applicable laws and regulations, maintain business and financial records, respond to lawful requests, prevent fraud, protect our customers and business, or establish, exercise or defend legal claims. We handle personal information in accordance with applicable data protection requirements in Sri Lanka.",
      },
      {
        heading: "Changes to This Privacy Policy",
        sectionIcon: "RefreshCw",
        type: "paragraph",
        content:
          "IkiSaki Tours may update this Privacy Policy from time to time to reflect changes in our services, website features, business operations or applicable legal requirements. Any revised version will be published on this page with an updated 'Last Updated' date. We encourage customers and website visitors to review this page periodically.",
      },

      {
        heading: "Customer Support & Booking Assistance",
        sectionIcon: "Headset",
        type: "contact",
        subItems: [
          {
            title: "Email",
            body: "hello@ikisakitours.com",
          },
          {
            title: "WhatsApp / Phone",
            body: "+94 75 797 2582",
          },
          {
            title: "Website",
            body: "www.ikisakitours.com",
          },
          {
            title: "Support",
            body: "For booking enquiries, itinerary changes, transfer coordination or assistance with an existing reservation, please contact our team through the official communication channels.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // 3. BOOKING POLICY
  // ==========================================
  {
    id: "booking",
    eyebrow: "IkiSaki Tours Booking Information",
    title: "Booking Policy",
    accent: "Policy",
    lastUpdated: "November 2026",
    sections: [
      {
        heading: "Booking Procedures",
        sectionIcon: "CalendarCheck",
        type: "paragraph",
        content:
          "At IkiSaki Tours, we aim to make planning and booking your Sri Lanka journey simple, transparent and convenient. Customers can submit booking requests through our official website or contact our team through our designated communication channels. Every request is reviewed individually, and all arrangements are subject to availability and confirmation.\n\nA booking request or quotation does not automatically guarantee a reservation. Your booking becomes confirmed only after you have accepted the final quotation and itinerary, completed the required advance payment where applicable, and received written booking confirmation from IkiSaki Tours.",
      },
      {
        heading: "Our Booking Services",
        sectionIcon: "Compass",
        type: "grid",
        subItems: [
          {
            title: "Private Charter Services",
            body: "Reserve a private vehicle with a professional driver for local transportation, intercity journeys, sightseeing and island-wide travel. The agreed vehicle category, passenger capacity, service duration, route and applicable charges will be specified in your quotation.",
          },
          {
            title: "Custom-made Tours",
            body: "Create a personalized Sri Lanka itinerary based on your destinations, interests, travel dates and preferred experiences. Routes, sightseeing stops, accommodation arrangements and activities can be discussed and adjusted before confirmation, subject to availability and additional costs where applicable.",
          },
          {
            title: "Airport & Hotel Transfers",
            body: "Arrange airport pick-ups, airport drop-offs and hotel-to-hotel transportation. Please provide accurate flight details, arrival times, hotel addresses, passenger numbers and luggage information to help us coordinate your transfer.",
          },
        ],
      },
      {
        heading: "Booking Confirmation",
        sectionIcon: "FileCheck",
        type: "checklist",
        subItems: [
          {
            title: "Booking Request",
            body: "Submit your preferred service, travel dates, destinations, number of passengers and other relevant requirements through our official contact channels.",
          },
          {
            title: "Quotation & Itinerary",
            body: "We will review your requirements and provide a quotation outlining the proposed services, itinerary where applicable, vehicle arrangements, inclusions, exclusions and payment conditions.",
          },
          {
            title: "Customer Approval",
            body: "Please carefully review the quotation and itinerary before confirming. Any incorrect information, missing requirements or special requests should be communicated before payment.",
          },
          {
            title: "Advance Payment",
            body: "If an advance payment or deposit is required, the amount and payment deadline will be stated in your quotation or payment instructions. Certain bookings may require full advance payment.",
          },
          {
            title: "Written Confirmation",
            body: "Once the required payment and arrangements have been verified, we will issue a booking confirmation containing your booking reference and relevant service details. Please retain this confirmation for future communication.",
          },
        ],
      },
      {
        heading: "Information Required for Booking",
        sectionIcon: "ClipboardList",
        type: "grid",
        subItems: [
          {
            title: "Customer Details",
            body: "Full name, email address and contact number, including an international country code where applicable.",
          },
          {
            title: "Travel Details",
            body: "Arrival and departure dates, travel dates, flight information where relevant, pick-up and drop-off locations, and hotel details.",
          },
          {
            title: "Passenger Information",
            body: "Number of adults and children, children's ages where relevant, luggage quantity and approximate luggage sizes.",
          },
          {
            title: "Special Requirements",
            body: "Child seats, mobility assistance, dietary considerations relevant to arranged activities, preferred vehicle arrangements and other requests should be communicated in advance.",
          },
        ],
      },
      {
        heading: "Private Charter Booking Conditions",
        sectionIcon: "CarFront",
        type: "icon-list",
        subItems: [
          {
            icon: "Route",
            title: "Routes & Travel Distance",
            body: "The agreed service route, estimated distance and travel duration will be described in your quotation where applicable. Additional destinations, route changes or kilometres beyond the agreed arrangements may incur extra charges.",
          },
          {
            icon: "Clock",
            title: "Service Duration & Waiting Time",
            body: "The daily service hours, departure arrangements and any included waiting time will be specified in your quotation. Extended service hours, additional waiting or overnight arrangements may involve additional charges.",
          },
          {
            icon: "Users",
            title: "Passenger Capacity",
            body: "Each vehicle has a specified passenger and luggage capacity. Customers must provide accurate passenger and luggage details before confirmation. We reserve the right to arrange a suitable alternative vehicle if the requested vehicle cannot safely accommodate the confirmed requirements, subject to customer approval.",
          },
          {
            icon: "Car",
            title: "Vehicle Arrangements",
            body: "The vehicle category or agreed vehicle type will be stated in your confirmation. If the original vehicle becomes unavailable due to an unexpected operational issue, we will make reasonable efforts to arrange a comparable alternative and inform you.",
          },
        ],
      },
      {
        heading: "Custom-made Tour Arrangements",
        sectionIcon: "Map",
        type: "checklist",
        subItems: [
          {
            title: "Personalized Itineraries",
            body: "Every custom-made tour is planned according to the customer's preferences, available travel time and agreed budget. The final itinerary will be provided for review before confirmation.",
          },
          {
            title: "Itinerary Adjustments",
            body: "Customers may request changes to destinations, sightseeing stops, departure times and activities before the tour. Once confirmed, changes are subject to availability, operational feasibility and any additional costs.",
          },
          {
            title: "Included & Excluded Services",
            body: "Only the services specifically listed in the confirmed quotation are included. Accommodation, meals, entrance tickets, safari fees, train tickets, activities, personal expenses and other services are excluded unless expressly stated.",
          },
          {
            title: "Third-party Reservations",
            body: "Hotels, attractions, safari experiences, restaurants, train journeys and other external services may have their own booking conditions, availability restrictions and cancellation charges.",
          },
        ],
      },
      {
        heading: "Airport Pick-up & Drop-off Bookings",
        sectionIcon: "Plane",
        type: "icon-list",
        subItems: [
          {
            icon: "PlaneLanding",
            title: "Flight Information",
            body: "Customers must provide accurate airline, flight number, arrival date and scheduled arrival time. Any changes to flight details should be communicated to us as soon as possible.",
          },
          {
            icon: "MapPin",
            title: "Meeting & Pick-up Arrangements",
            body: "The designated airport meeting point, hotel pick-up location and relevant contact information will be communicated before the transfer.",
          },
          {
            icon: "Clock",
            title: "Flight Delays",
            body: "We will make reasonable efforts to coordinate airport pick-ups when flight schedules change. Waiting time, extended delays, overnight changes or additional arrangements may be subject to the conditions stated in your quotation.",
          },
          {
            icon: "Phone",
            title: "Contact During Arrival",
            body: "Customers should keep their mobile phones accessible after landing and contact our team if they experience difficulties locating their driver or meeting point.",
          },
        ],
      },
      {
        heading: "Group Bookings & Special Requirements",
        sectionIcon: "Users",
        type: "grid",
        subItems: [
          {
            title: "Group Reservations",
            body: "Group bookings are assessed according to passenger numbers, vehicle availability, luggage requirements and the nature of the requested service. Multiple vehicles or special arrangements may require a separate quotation.",
          },
          {
            title: "Children & Infants",
            body: "Customers travelling with children must inform us of their ages and any child-seat requirements before confirmation. Special equipment is subject to availability and should be agreed in advance.",
          },
          {
            title: "Accessibility",
            body: "Please inform us of mobility assistance requirements or other accessibility needs before booking so that we can assess suitable arrangements.",
          },
          {
            title: "Special Requests",
            body: "We will make reasonable efforts to accommodate special requests. However, unless specifically confirmed in writing, requests cannot be guaranteed.",
          },
        ],
      },
      {
        heading: "Booking Changes & Amendments",
        sectionIcon: "RefreshCw",
        type: "checklist",
        subItems: [
          {
            title: "Modification Requests",
            body: "All requests to change travel dates, passenger information, pick-up locations, routes, accommodation or other confirmed arrangements should be submitted in writing through our official contact channels.",
          },
          {
            title: "Availability & Additional Charges",
            body: "Requested changes are subject to availability and operational feasibility. Additional kilometres, extended service hours, replacement vehicles, supplier charges or changes in accommodation rates may increase the original quotation.",
          },
          {
            title: "Amendment Confirmation",
            body: "A requested modification is not confirmed until IkiSaki Tours has reviewed and accepted the change in writing. Customers should continue to follow the original confirmed arrangements until the amendment is approved.",
          },
        ],
      },
      {
        heading: "Cancellation & No-show Conditions",
        sectionIcon: "CalendarX",
        type: "icon-list",
        subItems: [
          {
            icon: "XCircle",
            title: "Customer Cancellations",
            body: "Customers wishing to cancel a confirmed booking must notify IkiSaki Tours in writing. Applicable cancellation charges, refund eligibility and supplier costs will be determined according to the Cancellation Policy and the conditions provided in the confirmed quotation.",
          },
          {
            icon: "Clock",
            title: "Late Arrivals & No-shows",
            body: "Customers should be ready at the agreed pick-up time. Failure to appear, unavailability at the agreed meeting point or failure to respond to reasonable contact attempts may be treated as a no-show and may result in additional charges or loss of the booked service.",
          },
          {
            icon: "AlertCircle",
            title: "Flight Cancellations & Disruptions",
            body: "If a flight is cancelled, rescheduled or significantly delayed, customers should inform us immediately. We will review available alternatives and any additional supplier or operational costs before confirming revised arrangements.",
          },
        ],
      },
      {
        heading: "Travel Responsibilities & Service Conditions",
        sectionIcon: "ShieldCheck",
        type: "grid",
        subItems: [
          {
            title: "Accurate Information",
            body: "Customers are responsible for providing correct booking information, including passenger details, flight information, contact details and travel requirements.",
          },
          {
            title: "Travel Documents",
            body: "Customers are responsible for holding valid passports, visas or travel authorizations, entry permits and any other documents required for their journey.",
          },
          {
            title: "Personal Belongings",
            body: "Customers should take reasonable care of their valuables, travel documents and personal belongings during transportation and sightseeing.",
          },
          {
            title: "Respectful Conduct",
            body: "All customers are expected to behave respectfully towards drivers, guides, service providers, local communities, cultural sites and other travellers.",
          },
        ],
      },
      {
        heading: "Changes Due to Unforeseen Circumstances",
        sectionIcon: "CloudSun",
        type: "paragraph",
        content:
          "Road closures, traffic congestion, adverse weather, public events, government restrictions, safety concerns and other circumstances beyond our reasonable control may affect the original itinerary or transportation arrangements. In such situations, IkiSaki Tours will make reasonable efforts to communicate the situation and suggest suitable alternatives. Additional costs, where applicable, will be discussed before revised arrangements are accepted.",
      },
      {
        heading: "Customer Support & Booking Assistance",
        sectionIcon: "Headset",
        type: "contact",
        subItems: [
          {
            title: "Email",
            body: "hello@ikisakitours.com",
          },
          {
            title: "WhatsApp / Phone",
            body: "+94 75 797 2582",
          },
          {
            title: "Website",
            body: "www.ikisakitours.com",
          },
          {
            title: "Support",
            body: "For booking enquiries, itinerary changes, transfer coordination or assistance with an existing reservation, please contact our team through the official communication channels.",
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
    eyebrow: "IkiSaki Tours Payment Information",
    title: "Payment Policy",
    accent: "Policy",
    lastUpdated: "November 2026",
    sections: [
      {
        heading: "Payment Overview",
        sectionIcon: "Wallet",
        type: "paragraph",
        content:
          "IkiSaki Tours aims to provide a clear and convenient payment process for customers booking private charters, custom-made tours, airport transfers and other travel services in Sri Lanka.\n\nAll prices, payment requirements, applicable currencies, deposit amounts and payment deadlines will be communicated in the quotation, invoice or official payment instructions provided for your booking. Customers are encouraged to review all payment details before completing a transaction.\n\nA quotation or booking request does not create a confirmed reservation. Your booking will be confirmed after the required payment has been received and the relevant arrangements have been acknowledged by IkiSaki Tours in writing.",
      },
      {
        heading: "Accepted Payment Methods & Currency",
        sectionIcon: "CreditCard",
        type: "row-list",
        content:
          "Available payment options will be specified in your quotation or official payment instructions. Payment methods may vary depending on the booking, payment provider and transaction requirements.",
        subItems: [
          {
            title: "Credit & Debit Cards",
            body: "Visa, Mastercard and American Express payments may be accepted through the available authorized online payment gateway or official payment link, where offered.",
          },
          {
            title: "Bank Transfers",
            body: "Direct bank transfers or international wire transfers may be accepted using the official bank account details provided by IkiSaki Tours. Customers should follow the payment reference and transfer instructions supplied with their invoice.",
          },
          {
            title: "Payment Currency",
            body: "Unless otherwise agreed in writing, quotations and payments are processed in United States Dollars (USD). Where another currency is accepted, the applicable amount and conversion basis will be communicated before payment.",
          },
          {
            title: "Other Payment Arrangements",
            body: "Any alternative payment method or locally arranged payment must be approved by IkiSaki Tours in advance. Customers should not transfer money to personal accounts or unauthorized payment recipients.",
          },
        ],
      },
      {
        heading: "Deposits & Advance Payments",
        sectionIcon: "CalendarCheck",
        type: "checklist",
        subItems: [
          {
            title: "Advance Deposit",
            body: "Certain bookings require an advance deposit to secure the requested travel dates, vehicle allocation, driver arrangements and reservations with third-party suppliers. The required deposit amount will be stated in the individual quotation or invoice.",
          },
          {
            title: "Deposit Requirements",
            body: "The deposit percentage or fixed amount may vary according to the type of service, total booking value, travel dates, duration, supplier requirements and time remaining before departure.",
          },
          {
            title: "Deposit Confirmation",
            body: "An advance payment is considered received once the funds have been successfully credited to the designated payment account or confirmed by the authorized payment provider.",
          },
          {
            title: "Booking Security",
            body: "Payment of the required deposit alone does not guarantee that every third-party reservation has been completed. Written booking confirmation will identify the services and arrangements successfully confirmed.",
          },
          {
            title: "Last-minute Reservations",
            body: "Bookings made close to the departure date may require full advance payment or an alternative payment arrangement depending on availability and supplier requirements.",
          },
        ],
      },
      {
        heading: "Remaining Balance & Payment Deadlines",
        sectionIcon: "Receipt",
        type: "icon-list",
        subItems: [
          {
            icon: "CalendarClock",
            title: "Balance Payment",
            body: "The outstanding balance must be paid by the date specified in your quotation or invoice. Depending on the service and booking arrangements, payment may be required before arrival, before the commencement of the service or at another agreed stage.",
          },
          {
            icon: "FileText",
            title: "Payment Schedule",
            body: "For multi-day tours, private charters and customized travel arrangements, the payment schedule will be provided with the final quotation. Customers should check whether accommodation, tickets or other supplier reservations require earlier payment.",
          },
          {
            icon: "AlertCircle",
            title: "Overdue Payments",
            body: "If the required payment is not received by the stated deadline, IkiSaki Tours may contact the customer to request payment confirmation or discuss an alternative arrangement. If payment remains outstanding, reservations or services may be suspended or cancelled in accordance with the booking conditions and applicable cancellation terms.",
          },
          {
            icon: "CheckCircle",
            title: "Payment Confirmation",
            body: "Customers should retain transaction receipts and payment references until the booking has been fully settled. A payment confirmation or receipt will be provided once the transaction has been verified.",
          },
        ],
      },
      {
        heading: "Service-specific Payment Arrangements",
        sectionIcon: "BriefcaseBusiness",
        type: "grid",
        subItems: [
          {
            title: "Private Charter Services",
            body: "Charter charges will be calculated according to the agreed vehicle category, travel distance or service duration and the specific inclusions in your quotation. Additional kilometres, waiting time, overtime, route changes, parking, tolls or other applicable charges will be explained in the agreed pricing conditions.",
          },
          {
            title: "Custom-made Tours",
            body: "Customized tour payments may include transportation, driver services, accommodation arrangements, meals, attraction tickets and other activities where specifically included. Advance payments may be required to secure hotel rooms, train tickets, safari reservations or other third-party services.",
          },
          {
            title: "Airport & Hotel Transfers",
            body: "Airport pick-up, airport drop-off and hotel transfer charges will be stated in the confirmed quotation. Additional waiting time, changes to the destination, extended stops or changes to the original transfer arrangements may result in additional charges.",
          },
        ],
      },
      {
        heading: "Pricing, Taxes & Additional Charges",
        sectionIcon: "Calculator",
        type: "checklist",
        subItems: [
          {
            title: "Quotation Accuracy",
            body: "The confirmed quotation will identify the agreed price and the services included. Customers should review all inclusions and exclusions before making payment.",
          },
          {
            title: "Government Taxes & Fees",
            body: "Applicable taxes, government charges and mandatory fees will be identified in the quotation where known. If a government-imposed charge changes after confirmation, any applicable adjustment will be communicated with an explanation.",
          },
          {
            title: "Additional Services",
            body: "Requests for extra destinations, additional travel distance, extended driver hours, vehicle upgrades, additional passengers or optional activities may involve extra charges. Any additional cost should be agreed before the extra service is provided.",
          },
          {
            title: "Third-party Expenses",
            body: "Hotel upgrades, attraction entrance tickets, safari fees, train tickets, meals, activity charges and other supplier expenses are payable according to the confirmed quotation and the relevant supplier's conditions.",
          },
          {
            title: "Personal Expenses",
            body: "Tips, shopping, personal purchases, optional activities and other personal expenses are excluded unless expressly included in the confirmed booking.",
          },
        ],
      },
      {
        heading: "International Payments & Bank Charges",
        sectionIcon: "Globe",
        type: "icon-list",
        subItems: [
          {
            icon: "ArrowLeftRight",
            title: "Currency Conversion",
            body: "If your bank or card provider processes a payment in a currency different from your account's billing currency, the final amount charged may differ due to exchange rates and conversion fees applied by your financial institution.",
          },
          {
            icon: "Landmark",
            title: "International Bank Transfers",
            body: "Customers making international bank transfers are responsible for checking any applicable sending-bank, intermediary-bank and receiving-bank fees. Unless otherwise agreed, the invoiced amount must be received in full.",
          },
          {
            icon: "Receipt",
            title: "Proof of Payment",
            body: "For bank transfers, customers may be asked to provide a transfer receipt or transaction reference to help identify and verify the payment. A transfer instruction or screenshot alone does not constitute confirmation that funds have been received.",
          },
          {
            icon: "ShieldCheck",
            title: "Authorized Payment Accounts",
            body: "Payments should only be made to the bank account, payment gateway or payment link officially communicated by IkiSaki Tours. Customers should contact us through our verified contact details if they receive unexpected or changed payment instructions.",
          },
        ],
      },
      {
        heading: "Payment Security",
        sectionIcon: "Lock",
        type: "icon-list",
        subItems: [
          {
            icon: "CreditCard",
            title: "Secure Card Transactions",
            body: "Where online card payments are available, transactions are handled through the designated payment provider. Cardholders should review the payment page and verify that the payment recipient and transaction amount are correct before authorizing payment.",
          },
          {
            icon: "Eye",
            title: "Financial Information",
            body: "Customers should not send full card numbers, card security codes, online banking passwords or one-time verification codes through email, WhatsApp or other messaging channels.",
          },
          {
            icon: "Shield",
            title: "Fraud Prevention",
            body: "IkiSaki Tours will not request online banking passwords or one-time card authentication codes. Customers should contact us immediately if they suspect fraudulent payment instructions or unauthorized transactions relating to a booking.",
          },
        ],
      },
      {
        heading: "Invoices & Payment Receipts",
        sectionIcon: "FileText",
        type: "checklist",
        subItems: [
          {
            title: "Booking Invoice",
            body: "A booking invoice or payment request will identify the customer, booking reference, agreed services, total amount, payment currency and applicable payment instructions.",
          },
          {
            title: "Payment Receipt",
            body: "A payment receipt or confirmation will be issued after the relevant payment has been successfully verified.",
          },
          {
            title: "Outstanding Balance",
            body: "Where an advance deposit has been received, the outstanding balance and its payment deadline will be communicated to the customer.",
          },
          {
            title: "Corporate Invoices",
            body: "Customers requiring a company invoice or specific billing information should provide the relevant details when making their booking request or before the invoice is issued.",
          },
        ],
      },
      {
        heading: "Cancellation, Refunds & Payment Reversals",
        sectionIcon: "RefreshCcw",
        type: "icon-list",
        subItems: [
          {
            icon: "CalendarX",
            title: "Cancellation Conditions",
            body: "All cancellations are governed by the applicable Cancellation Policy, Terms of Service and any specific supplier conditions communicated in the confirmed quotation.",
          },
          {
            icon: "Wallet",
            title: "Deposit Refunds",
            body: "The refundable or non-refundable status of an advance payment depends on the applicable cancellation conditions, services already arranged and any non-recoverable third-party expenses disclosed for the booking.",
          },
          {
            icon: "RotateCcw",
            title: "Refund Method",
            body: "Approved refunds will normally be returned through the original payment method where possible. If the original method cannot receive the refund, an alternative arrangement may be agreed with the customer.",
          },
          {
            icon: "Clock",
            title: "Refund Processing Time",
            body: "IkiSaki Tours will initiate an approved refund within the processing period communicated to the customer. The time taken for funds to appear in the customer's account may depend on the payment provider, bank and international banking procedures.",
          },
          {
            icon: "AlertTriangle",
            title: "Bank & Gateway Deductions",
            body: "Any applicable non-refundable payment processing fees, transfer charges or currency conversion costs will be disclosed and handled in accordance with the applicable law and the confirmed booking conditions.",
          },
          {
            icon: "Building",
            title: "Third-party Refunds",
            body: "Where a booking includes hotels, tickets, activities or other independent suppliers, refunds may be subject to their individual cancellation and reimbursement procedures.",
          },
        ],
      },
      {
        heading: "Failed, Duplicate & Disputed Transactions",
        sectionIcon: "AlertCircle",
        type: "grid",
        subItems: [
          {
            title: "Failed Payments",
            body: "If a payment is declined or unsuccessful, customers should check with their bank or payment provider and contact our team for an alternative authorized payment method.",
          },
          {
            title: "Duplicate Transactions",
            body: "If a customer believes they have been charged more than once for the same booking, they should contact us with the transaction references so that the payments can be investigated.",
          },
          {
            title: "Incorrect Payment Amount",
            body: "Any suspected incorrect charge should be reported promptly with the relevant invoice and transaction details.",
          },
          {
            title: "Payment Disputes",
            body: "Customers are encouraged to contact IkiSaki Tours first to resolve billing questions or payment discrepancies. This does not affect any statutory rights or available remedies.",
          },
        ],
      },
      {
        heading: "Payment Assistance & Contact",
        sectionIcon: "Headset",
        type: "contact",
        subItems: [
          {
            title: "Email",
            body: "hello@ikisakitours.com",
          },
          {
            title: "WhatsApp / Phone",
            body: "+94 75 797 2582",
          },
          {
            title: "Website",
            body: "www.ikisakitours.com",
          },
          {
            title: "Assistance",
            body: "For questions about quotations, deposits, outstanding balances, bank transfers, payment confirmations or refunds, please contact our team and include your booking reference where available.",
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
