import { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";
import Preloader from "@/components/ui/Preloader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

// import TawkToChat from "@/components/ui/TawkToChat";

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
    metadataBase: new URL("https://mapmate-sri-lanka.vercel.app"),

    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    other: {
      google: "notranslate",
    },

    openGraph: {
      title: t("titleDefault"),
      description: t("description"),
      url: "/",
      siteName: t("siteName"),
      images: [
        {
          url: "/images/opengraph-image.png",
          width: 1200,
          height: 630,
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
      images: ["/images/opengraph-image.png"],
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

  const messages = await getMessages();
  const resolvedParams = await params;
  console.log("🔥 RootLayout resolved locale ->", resolvedParams.locale);
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      translate="no"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${playfair.variable} h-full scroll-smooth antialiased not-translate`}
    >
      <body className="min-h-full bg-lanka-dark text-slate-200">
        <NextIntlClientProvider messages={messages}>
          {/* <Preloader /> */}
          {/* <TawkToChat /> */}
          {children}
          <Toaster position="top-center" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
