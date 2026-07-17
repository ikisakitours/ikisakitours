import type { Metadata } from "next";
import { TransferBookingForm } from "@/components/services/transfers/TransferBookingForm";
import { Hero } from "@/components/services/Hero";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { transferHero } from "@/data/transfers";

export const metadata: Metadata = {
  title: "Transfers",
  description:
    "Book MapMate airport pick-ups, hotel transfers, and island-wide chauffeur services with live vehicle rates.",
};

export default function TransfersPage() {
  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark">
        <Hero
          image={transferHero.image}
          altText={transferHero.alt}
          eyebrow={transferHero.eyebrow}
          title={transferHero.title}
          accent={transferHero.accent}
          strapline={transferHero.strapline}
        />
        <TransferBookingForm />
      </main>
    </UserPageLayout>
  );
}
