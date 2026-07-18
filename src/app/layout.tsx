import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";

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

export const metadata = {
  title: {
    default: "MapMate | Premium Sri Lanka Private Tours",
    template: "%s | MapMate",
  },
  description:
    "Premium private tours, transfers, travel packages, and multilingual concierge experiences across Sri Lanka.",

  openGraph: {
    title: "MapMate | Premium Sri Lanka Private Tours",
    description:
      "Premium private tours, transfers, travel packages, and multilingual concierge experiences across Sri Lanka.",
    url: "https://map-mate-tours.vercel.app",
    siteName: "MapMate",
    images: [
      {
        url: "https://map-mate-tours.vercel.app/images/logo-re.jpeg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MapMate | Premium Sri Lanka Private Tours",
    description:
      "Premium private tours, transfers, travel packages, and multilingual concierge experiences across Sri Lanka.",
    images: ["https://map-mate-tours.vercel.app/images/logo-re.jpeg"],
  },

  icons: {
    icon: "https://map-mate-tours.vercel.app/images/tab.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-lanka-dark text-slate-200">
        {/* <Preloader /> */}
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
