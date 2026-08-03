import type { Metadata } from "next";
import { DestinationExplorer } from "@/components/Destinations/DestinationExplorer";
import { destinationsHero, destinationsData } from "@/data/destinationData";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { Hero } from "@/components/ui/Hero";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore the most breathtaking cities, cultural landmarks, and hidden gems across Sri Lanka.",
};

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <Hero
          image={destinationsHero.image}
          altText={destinationsHero.title}
          eyebrow={destinationsHero.eyebrow}
          title={destinationsHero.title}
          accent={destinationsHero.accent}
          strapline={destinationsHero.strapline}
        />

        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <DestinationExplorer destinations={destinationsData} />
        </Suspense>
      </UserPageLayout>
    </main>
  );
}
