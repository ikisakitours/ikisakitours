import React from "react";
import { notFound } from "next/navigation";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { Hero } from "@/components/ui/Hero";
import DestinationsBody from "@/components/Destinations/DestinationSlug/DestinationsBody";
import { destinationsData } from "@/data/destinationData";
import type { Metadata } from "next";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    return {
      title: "Destination Not Found ",
      description: "The requested destination could not be found.",
    };
  }

  return {
    title: `${dest.name} - Travel Guide & Attractions `,
    description: dest.hero.strapline,
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;

  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <Hero
          image={dest.hero.image}
          altText={dest.name}
          eyebrow={dest.hero.eyebrow}
          title={dest.hero.title}
          accent={dest.hero.accent}
          strapline={dest.hero.strapline}
        />

        <DestinationsBody dest={dest} />
      </UserPageLayout>
    </main>
  );
}
