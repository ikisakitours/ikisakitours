import type { Metadata } from "next";
import { BespokeForm } from "@/components/services/bespoke/BespokeForm";
import { Hero } from "@/components/ui/Hero";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { bespokeHero } from "@/data/bespokeTravel";
export const metadata: Metadata = {
  title: "Bespoke Journey Concierge",
  description:
    "Reserve a private vehicle and multilingual chauffeur concierge for a bespoke Sri Lanka travel experience.",
};

export default function TransfersPage() {
  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark">
        <Hero
          image={bespokeHero.image}
          altText={bespokeHero.alt}
          eyebrow={bespokeHero.eyebrow}
          title={bespokeHero.title}
          accent={bespokeHero.accent}
          strapline={bespokeHero.strapline}
        />
        <BespokeForm />
      </main>
    </UserPageLayout>
  );
}
