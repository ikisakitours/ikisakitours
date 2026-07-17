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
  description:
    "Premium private tours, transfers, travel packages, and multilingual concierge experiences across Sri Lanka.",
  icons: {
    icon: "/images/bg-remove.png",
  },
  title: {
    default: "MapMate | Premium Sri Lanka Private Tours",
    template: "%s | MapMate",
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
        <Preloader />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
