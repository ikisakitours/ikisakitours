import { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import Preloader from "@/components/ui/Preloader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { languages } from "@/data/Languages-CurrencyData";
import ProgressBarProvider from "@/components/ui/ProgressBarProvider";
import { cookies } from "next/headers";
import { CookieConsent } from "@/components/ui/CookieModel/CookieConsent";
import { GlobalCookieModal } from "@/components/ui/CookieModel/GlobalCookieModal";
import IOSZoomFix from "@/components/ui/IOSZoomFix";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AccessGate } from "@/components/access/AccessGate";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { addJaBreaks } from "@/lib/japaneseText";
import { getSeoAlternates } from "@/components/seo/schemas";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700"],
  preload: false,
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  weight: ["400", "600", "700"],
  preload: false,
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RootLayout.Metadata" });

  return {
    // metadataBase: new URL("https://mapmate-sri-lanka.vercel.app"),
    metadataBase: new URL("https://www.ikisakitours.com"),
    icons: {
      icon: [
        { url: "/Layout-Icons/favicon.ico?v=4", sizes: "any" },
        { url: "/Layout-Icons/favicon.png?v=4", type: "image/png", sizes: "180x180" },
      ],
      apple: [{ url: "/Layout-Icons/favicon.png?v=4", sizes: "180x180", type: "image/png" }],
    },
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords:
      locale === "ja"
        ? [
            "スリランカ旅行",
            "スリランカ観光",
            "スリランカ 専用車 チャーター",
            "スリランカ プライベートツアー",
            "スリランカ 専属ドライバー",
            "スリランカ 空港送迎",
            "スリランカ タクシーチャーター",
            "スリランカ 周遊ツアー",
            "スリランカ 日帰りツアー",
            "シギリヤロック 日帰り",
            "スリランカ オーダーメイド旅行",
            "スリランカ 日本語ガイド",
            "IkiSaki Tours",
          ]
        : [
            "Sri Lanka private tours",
            "Sri Lanka private driver",
            "Sri Lanka chauffeur guide",
            "Sri Lanka car charter",
            "Sri Lanka airport transfer",
            "Sri Lanka multi day tours",
            "Sri Lanka day tours",
            "tailor made Sri Lanka holidays",
            "Bespoke Sri Lanka itineraries",
            "Sigiriya day trip",
            "Sri Lanka private taxi service",
            "IkiSaki Tours",
          ],
    alternates: getSeoAlternates("", locale),
    other: {
      google: "notranslate",
    },

    openGraph: {
      title: t("titleDefault"),
      description: t("description"),
      url: `https://www.ikisakitours.com/${locale}`,
      siteName: t("siteName"),
      images: [
        {
          url: "/Layout-Icons/image-600x315.webp",
          width: 600,
          height: 315,
          alt: t("titleDefault"),
        },

        {
          url: "/Layout-Icons/image-400x400.webp",
          width: 400,
          height: 400,
          alt: t("titleDefault"),
        },
      ],

      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("description"),
      images: ["/Layout-Icons/image-600x315.webp"],
    },
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const isSupportedLocale = languages.some((lang) => lang.code.toLowerCase() === locale.toLowerCase());

  if (!isSupportedLocale) {
    notFound();
  }
  const rawMessages = await getMessages();
  const messages = locale.toLowerCase() === "ja" ? addJaBreaks(rawMessages) : rawMessages;
  // const resolvedParams = await params;
  // console.log("🔥 RootLayout resolved locale ->", resolvedParams.locale);
  const cookieStore = await cookies();
  const hasSeenPreloader = cookieStore.has("preloader_seen");

  // ⚠️ Set to true during UI testing so the preloader always shows without clearing cookies.
  // Set to false for normal production behavior.
  // const IS_PRELOADER_TEST_MODE = false;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      translate="no"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${playfair.variable} ${notoSansJP.variable} ${notoSerifJP.variable} h-full scroll-smooth antialiased notranslate`}
    >
      <head>
        <link rel="preload" href="/Layout-Icons/image-600x600.webp" as="image" type="image/webp" fetchPriority="high" />
      </head>
      <body className="min-h-full bg-lanka-dark text-slate-200 notranslate">
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <AuthProvider>
              <CurrencyProvider>
                <AccessGate>
                  {!hasSeenPreloader && <Preloader />}
                  <ProgressBarProvider />
                  <IOSZoomFix />
                  {children}
                  <CookieConsent />
                  <GlobalCookieModal />
                </AccessGate>
              </CurrencyProvider>
            </AuthProvider>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
