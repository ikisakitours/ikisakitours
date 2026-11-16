# 🌴 IkiSaki Tours — Sri Lanka Luxury Travel & Booking Platform

<p align="center">
  <img src="public/images/bg-remove.png" alt="IkiSaki Tours Logo" width="220" />
</p>

<p align="center">
  <strong>Next-Generation Luxury Travel, Private Chauffeur & Bespoke Itinerary Management Platform for Sri Lanka</strong>
</p>

<p align="center">
  <a href="https://www.ikisakitours.com"><strong>Explore Live Website »</strong></a>
  <br />
  <br />
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack--architecture">Tech Stack</a> •
  <a href="#-internationalization-i18n">Internationalization</a> •
  <a href="#-global-seo-architecture">Global SEO</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-folder-structure">Project Structure</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/next--intl-v4-blue?style=for-the-badge" alt="next-intl" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

## 📖 Overview

**IkiSaki Tours** is a modern, full-stack, enterprise-grade travel platform engineered to provide international travelers (with high-intent focus on the **United States, United Kingdom, Europe, Australia, and Japan**) with private, bespoke Sri Lankan journeys.

Built on **Next.js 16 (App Router)** and **React 19**, the platform pairs a luxury black-and-gold visual aesthetic with a robust multi-language localization framework, interactive GIS mapping, and a full-stack SEO suite designed for top search rankings on Google and Yahoo! Japan.

---

## ✨ Key Features

### 🗺️ 1. Tour Explorer & Dynamic Itineraries
- **Multi-Day Journeys & One-Day Excursions:** Dynamic catalog with filtering by category, duration, and price range.
- **Detailed Tour Pages:** Real-time pricing calculations, day-by-day interactive itinerary accordions, inclusions/exclusions, preparation guides ("What to Bring"), and interactive route previews.
- **Customer Moments & Reviews:** Real traveler reviews with verified photo uploads, star rating breakdowns, and dedicated photo gallery views.

### 🚗 2. Premium Chauffeur & Transfer Services
- **Airport & Intercity Transfers:** Fixed-rate, private chauffeur transfers connecting Bandaranaike International Airport (CMB) to Colombo, Galle, Kandy, Sigiriya, and island-wide hotels.
- **Dedicated Private Vehicle Charters:** Luxury sedans, premium SUVs, and passenger vans with certified English and Japanese-speaking chauffeur guides.
- **Bespoke Travel Consultation:** Tailor-made journey planner allowing travelers to craft customized island itineraries with private quotes.

### 📍 3. Interactive Sri Lanka Map & Destination Guides
- **Interactive GIS Map:** Built with `Leaflet` and `react-leaflet`, featuring customized gold pins, province filtering, and Dark/Light visual moods.
- **Curated Destination Guides:** High-resolution galleries, GPS coordinates, best seasons to visit, climatic zones, and regional history.

### 🎭 4. Cultural Events & Festival Showcases
- Coverage of heritage pageants (Kandy Esala Perahera, Vesak, Sinhala & Tamil New Year).
- Integrated live video player support and high-definition event media sliders.

### 📰 5. Travel Journal & Local Insights (Blog)
- Comprehensive guides on Sri Lanka visa policies (ETA), packing tips, currency exchange, cultural etiquette, and Ayurvedic wellness.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Turbo-powered server-side rendering (SSR), static site generation (SSG), and API routes. |
| **UI Library** | [React 19](https://react.dev/) | Utilizing modern React primitives, concurrent rendering, and server components. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Cutting-edge utility engine with custom design tokens (Gold gradient, Lanka Black, Glassmorphism). |
| **Typography** | Google Fonts | `Playfair Display` (Luxury serif display) & `Plus Jakarta Sans` (Clean geometric sans). |
| **Localization** | [`next-intl`](https://next-intl-docs.vercel.app/) + [`budoux`](https://github.com/google/budoux) | Multi-locale routing (`en`, `ja`) paired with machine learning-based Japanese phrase segmentation. |
| **Motion & UX** | [Framer Motion](https://www.framer.com/motion/) | Cinematic scroll reveals, interactive micro-interactions, and smooth page transitions. |
| **Mapping** | [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/) | Lightweight, touch-friendly interactive vector maps with custom markers. |
| **Type Safety** | [TypeScript 5](https://www.typescriptlang.org/) | Strictly typed component props, services, API contracts, and schema definitions. |
| **Deployment** | [Vercel](https://vercel.com/) | Edge caching, continuous deployment, automated builds, and serverless compute. |

---

## 🌐 Internationalization (i18n)

IkiSaki Tours is built from the ground up for true multilingual operation:

- **Supported Locales:**
  - `en` — English (Global / Western travelers: US, UK, EU, AU).
  - `ja` — Japanese (Targeted for Japanese inbound tourism).
- **Subpath Routing:** Clean locale paths (`/en/...`, `/ja/...`).
- **BudouX Japanese Typography:** Integrates Google's BudouX word segmenter to eliminate unnatural Japanese line breaks across mobile and tablet screens.
- **Localized Dictionaries:** Centralized modular dictionaries under `src/languages/{locale}/`:
  - `HomePage.ts`, `Tours.ts`, `Booking.ts`, `Destinations.ts`, `Services.ts`, `Blog.ts`, `Events.ts`, `AboutPage.ts`, `ContactPage.ts`, `FaqPage.ts`, `Footer.ts`, `SiteHeader.ts`.

---

## 🚀 Global SEO Architecture

The platform implements a comprehensive **5-Pillar Enterprise SEO Master System** aligned with Google's Search Quality Rater guidelines:

```mermaid
flowchart LR
    A["Pillar 1<br/>Technical Core<br/>(Robots & Sitemap)"] --> B["Pillar 2<br/>Structured Data<br/>(Schema.org JSON-LD)"]
    B --> C["Pillar 3<br/>Multilingual<br/>(Hreflang & Canonicals)"]
    C --> D["Pillar 4<br/>Keyword Matrix<br/>(EN & JA Intent)"]
    D --> E["Pillar 5<br/>Image SEO<br/>(Google Image Search)"]
```

1. **Technical SEO Core:**
   - Universal `robots.ts` crawler directives with private/auth path isolation.
   - Dynamic `sitemap.ts` (`/sitemap.xml`) generating canonical entries with `withTimeout` safety guards for all static pages, dynamic tours, reviews, blog stories, destinations, and events.
2. **Schema.org Rich Snippets (JSON-LD):**
   - `TravelAgency` & `LocalBusiness` authority graph.
   - `TouristTrip` & `Product` / `Offer` schema for tour packages with USD pricing and availability.
   - `FAQPage` schema enabling interactive search dropdowns.
   - `TouristDestination`, `BlogPosting`, `Service`, `Event`, and `BreadcrumbList`.
3. **Multi-Language Canonicals & Hreflang:**
   - Absolute canonical links and `languages` alternates (`en`, `ja`, and `x-default`) on every public route.
4. **Targeted International Keywords:**
   - Researched search intent keywords tailored for both Western Google searches and Google Japan (`google.co.jp`) / Yahoo! Japan queries (`スリランカ旅行`, `専用車 チャーター`, `専属ドライバー`, `空港送迎`).
5. **Google Image Search Optimization:**
   - Rich, descriptive, localized `alt` texts dynamically injected via `useTranslations` (preventing any language-mixing).
   - Global fallback safety within `LoadingImage` component.

---

## 📂 Project Structure

```text
ikisakitours/
├── public/                       # Static public assets (brand images, icons, logos)
├── src/
│   ├── app/                      # Next.js 16 App Router
│   │   ├── [locale]/             # Localized routes
│   │   │   ├── (pages)/          # Core public pages (Home, About, Contact, Tours, etc.)
│   │   │   │   ├── booking/      # Multi-day and one-day booking details & reviews
│   │   │   │   ├── destination/  # Destination hub and dynamic [slug] pages
│   │   │   │   ├── services/     # Transfers, Chauffeur, Bespoke Travel
│   │   │   │   ├── blog/         # Travel journal and individual articles
│   │   │   │   └── events/       # Cultural events & festival pages
│   │   │   ├── gallery/          # Full-screen photo galleries (Tours & Destinations)
│   │   │   └── layout.tsx        # Localized RootLayout with fonts, i18n & metadataBase
│   │   ├── robots.ts             # Dynamic Robots.txt definition
│   │   └── sitemap.ts            # Dynamic XML Sitemap generator
│   ├── components/               # Modular UI components
│   │   ├── booking/              # Itinerary, pricing cards, reviews, destination badges
│   │   ├── Destinations/         # Destination cards, visual gallery, interactive map
│   │   ├── home/                 # Hero slider, experience highlights, vehicle fleet
│   │   ├── layout/               # Header navigation, currency selector, footer
│   │   ├── seo/                  # JsonLd renderer and Schema.org builder functions
│   │   └── ui/                   # Reusable components (LoadingImage, Button, Modal, etc.)
│   ├── data/                     # Local fallback datasets and event definitions
│   ├── hooks/                    # Custom React hooks (currency, navigation, scroll)
│   ├── languages/                # Dictionary files for English (en) and Japanese (ja)
│   ├── lib/                      # Helper libraries, navigation wrappers, i18n configs
│   └── services/                 # API service layer for packages, reviews, destinations, blogs
├── SEO_BLUEPRINT.md              # Global Master SEO Specification
├── next.config.ts                # Next.js & Turbopack configurations
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript compiler configurations
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js:** `v20.x` or later recommended
- **Package Manager:** `pnpm` (recommended), `npm`, or `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/ikisakitours/ikisakitours.git
cd ikisakitours
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=https://www.ikisakitours.com
NEXT_PUBLIC_API_BASE_URL=https://your-api-endpoint.com/api
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Verification
```bash
# Type check without emitting files
npx tsc --noEmit

# Create optimized production build
pnpm build

# Start production server
pnpm start
```

---

## 🚢 Deployment

The project is optimized for zero-config deployment on [Vercel](https://vercel.com):

1. Connect the GitHub repository `ikisakitours/ikisakitours` to Vercel.
2. Select Framework Preset: **Next.js**.
3. Configure environment variables in the Vercel dashboard.
4. Deploy — Vercel will automatically build the localized application, optimize static pages, and generate dynamic sitemaps.

---

## 📄 License & Attribution

Copyright © 2026 **IkiSaki Tours (Pvt) Ltd**. All rights reserved.  
Designed and engineered for luxury travel experiences across Sri Lanka.
