import { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
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
  const isSupportedLocale = languages.some((lang) => lang.code.toLowerCase() === locale.toLowerCase());

  if (!isSupportedLocale) {
    notFound();
  }
  const messages = await getMessages();
  const resolvedParams = await params;
  console.log("🔥 RootLayout resolved locale ->", resolvedParams.locale);
  const cookieStore = await cookies();
  const hasSeenPreloader = cookieStore.has("preloader_seen");
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
          {!hasSeenPreloader && <Preloader />}
          <ProgressBarProvider />
          {children}
          <Toaster
            position="top-right"
            offset={30}
            className="max-md:inset-x-0! max-md:w-full! max-md:flex! max-md:justify-center! max-md:top-6! z-9999"
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  "flex items-center gap-3.5 py-3 px-5 !w-fit max-md:!w-fit max-w-[85vw] max-md:!mx-auto bg-lanka-black/95 backdrop-blur-xl rounded-full border border-gold/50 shadow-[0_8px_30px_rgb(0,0,0,0.8),_0_0_15px_rgba(197,160,89,0.2)] transition-all duration-300",
                title: "text-[14.5px] font-medium text-slate-100 font-sans tracking-wide",
                description: "text-[13px] text-slate-400 font-sans",
                icon: "text-gold flex-shrink-0 w-5 h-5 drop-shadow-[0_0_8px_rgba(197,160,89,0.4)]",
                actionButton:
                  "bg-gold text-lanka-black text-[12.5px] font-semibold rounded-full px-4 py-1.5 ml-2 hover:bg-gold-light transition-colors",
                cancelButton:
                  "bg-surface text-slate-300 text-[12.5px] font-medium rounded-full px-4 py-1.5 ml-2 border border-white/10 hover:bg-white/5 transition-colors",
              },
            }}
          />
          <CookieConsent />
          <GlobalCookieModal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
