import type { PackageDetails } from "@/services/Booking/packageDetails/types";
import type { BlogPost } from "@/services/blogs/types";
import type { DestinationFull } from "@/services/destinations/types";
import type { SpecialEventListItem } from "@/data/specialEvents";

const BASE_URL = "https://www.ikisakitours.com";

/**
 * 1. TravelAgency / LocalBusiness Schema
 * Establishes company authority, geo-location in Sri Lanka, contact channels, and social profiles.
 */
export function getTravelAgencySchema(locale: string = "en") {
  const isJa = locale === "ja";
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${BASE_URL}/#organization`,
    name: "Ikisaki Tours",
    alternateName: isJa ? "行き先ツアーズ" : "Ikisaki Tours Sri Lanka",
    url: `${BASE_URL}/${locale}`,
    logo: `${BASE_URL}/images/opengraph-image.png`,
    image: `${BASE_URL}/images/opengraph-image.png`,
    description: isJa
      ? "スリランカのオーダーメイドツアー、日本語対応の専属ドライバーチャーター、空港送迎サービスを提供する旅行会社。"
      : "Premier luxury travel agency specializing in bespoke private chauffeur tours, day trips, and custom itineraries across Sri Lanka.",
    telephone: "+94757972582",
    email: "hello@ikisakitours.com",
    priceRange: "$$",
    currenciesAccepted: "USD, JPY, EUR, GBP, LKR",
    paymentAccepted: "Credit Card, Debit Card, Online Payment",
    address: {
      "@type": "PostalAddress",
      streetAddress: "492/14, Halbarawa Road, Thalahena",
      addressLocality: "Malabe, Colombo",
      addressRegion: "Western Province",
      postalCode: "10115",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.9044,
      longitude: 79.9544,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    sameAs: [
      "https://www.facebook.com/share/1CTWYY8aWz/?mibextid=wwXIfr",
      "https://www.instagram.com/invites/contact/?utm_content=fct2z9y&srtk=13xdne3anuwe4",
    ],
  };
}

/**
 * 2. TouristTrip & Product Schema for Tour Packages
 * Enables rich product and trip cards in Google Search with pricing, availability, and itinerary.
 */
export function getTourSchema(tour: PackageDetails, locale: string = "en") {
  const fullTitle = `${tour.title} ${tour.titleEmphasis || ""}`.trim();
  const tourUrl = `${BASE_URL}/${locale}/booking/${
    tour.type === "oneday" ? "one-day-tours" : "multi-days-tours"
  }/${tour.slug}`;
  const images = Array.isArray(tour.gallery) && tour.gallery.length > 0 ? tour.gallery : [];

  const itineraryItems = Array.isArray(tour.itinerary)
    ? tour.itinerary.map((day) => ({
        "@type": "TouristAttraction",
        name: `Day ${day.day}: ${day.title}`,
        description: day.description || (day.activities && day.activities.join(", ")) || "",
      }))
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    "@id": `${tourUrl}/#tour`,
    name: fullTitle,
    description: tour.leadDescription || tour.description || fullTitle,
    url: tourUrl,
    image: images,
    touristType: ["International Travelers", "Couples", "Families", "Solo Travelers"],
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
      url: tourUrl,
    },
    provider: {
      "@type": "TravelAgency",
      name: "Ikisaki Tours",
      url: `${BASE_URL}/${locale}`,
    },
    ...(itineraryItems && itineraryItems.length > 0 ? { itinerary: itineraryItems } : {}),
  };
}

/**
 * 3. FAQPage Schema
 * Powers collapsible rich snippet accordions directly in Google Search results.
 */
export function getFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * 4. BlogPosting Schema
 * Enables rich story carousels and author attribution in Google Discover and Search.
 */
export function getBlogPostSchema(post: BlogPost, locale: string = "en") {
  const blogUrl = `${BASE_URL}/${locale}/blog/${post.slug}`;
  const images = Array.isArray(post.gallery) && post.gallery.length > 0 ? post.gallery : [];

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${blogUrl}/#article`,
    headline: post.title,
    description: post.summary,
    url: blogUrl,
    image: images,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    inLanguage: locale === "ja" ? "ja-JP" : "en-US",
    author: {
      "@type": "Person",
      name: post.author || "Ikisaki Tours Editorial Team",
    },
    publisher: {
      "@type": "TravelAgency",
      name: "Ikisaki Tours",
      url: `${BASE_URL}/${locale}`,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/opengraph-image.png`,
      },
    },
  };
}

/**
 * 5. BreadcrumbList Schema
 * Clarifies site hierarchy and displays breadcrumbs in Google Search snippets.
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * 6. TouristDestination Schema
 * Identifies Sri Lankan destinations with exact GPS coordinates, province, photos, and highlights.
 */
export function getTouristDestinationSchema(dest: DestinationFull, locale: string = "en") {
  const destUrl = `${BASE_URL}/${locale}/destination/${dest.slug}`;
  const images = Array.isArray(dest.images) && dest.images.length > 0 ? dest.images : [];

  return {
    "@context": "https://schema.org",
    "@type": ["TouristDestination", "Place"],
    "@id": `${destUrl}/#destination`,
    name: dest.title,
    description: dest.summary || dest.description,
    url: destUrl,
    image: images,
    ...(dest.coordinates?.lat && dest.coordinates?.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: dest.coordinates.lat,
            longitude: dest.coordinates.lng,
          },
        }
      : {}),
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${dest.province} Province, Sri Lanka`,
    },
    touristType: ["International Travelers", "Cultural Tourists", "Eco Tourists", "Adventure Travelers"],
  };
}

/**
 * 7. Service Schema (Bespoke Travel, Private Chauffeur, Airport Transfers)
 * Powers Google Rich Results for specialized travel and chauffeur services.
 */
export function getServiceSchema(
  service: {
    name: string;
    description: string;
    url: string;
    serviceType: string;
  },
  locale: string = "en"
) {
  const serviceUrl = `${BASE_URL}/${locale}${service.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}/#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: serviceUrl,
    provider: {
      "@type": "TravelAgency",
      name: "Ikisaki Tours",
      url: `${BASE_URL}/${locale}`,
    },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    termsOfService: `${BASE_URL}/${locale}/legal/terms`,
  };
}

/**
 * 8. Special Event Schema
 * Highlights festivals and cultural events with dates, location, and organizer.
 */
export function getEventSchema(event: SpecialEventListItem, locale: string = "en") {
  const eventUrl = `${BASE_URL}/${locale}/events/${event.slug}`;
  const images = Array.isArray(event.images) && event.images.length > 0 ? event.images : [event.image].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${eventUrl}/#event`,
    name: event.title,
    description: event.description,
    url: eventUrl,
    image: images,
    startDate: event.date || "2026-08-01",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.eventLocation || "Sri Lanka",
      address: {
        "@type": "PostalAddress",
        addressCountry: "LK",
      },
    },
    organizer: {
      "@type": "TravelAgency",
      name: "Ikisaki Tours",
      url: `${BASE_URL}/${locale}`,
    },
  };
}

/**
 * 9. ContactPage Schema
 */
export function getContactPageSchema(locale: string = "en") {
  const isJa = locale === "ja";
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: isJa ? "お問い合わせ | 行き先ツアーズ" : "Contact Us | Ikisaki Tours Sri Lanka",
    url: `${BASE_URL}/${locale}/contact`,
    mainEntity: getTravelAgencySchema(locale),
  };
}

/**
 * 10. Multi-Language Hreflang & Canonical URL Alternates
 * Produces absolute URLs for Google search across en, ja, and x-default.
 */
export function getSeoAlternates(path: string, locale: string) {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return {
    canonical: `${BASE_URL}/${locale}${cleanPath}`,
    languages: {
      en: `${BASE_URL}/en${cleanPath}`,
      ja: `${BASE_URL}/ja${cleanPath}`,
      "x-default": `${BASE_URL}/en${cleanPath}`,
    },
  };
}


