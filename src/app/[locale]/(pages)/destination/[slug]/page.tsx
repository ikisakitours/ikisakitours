// src/app/[locale]/(pages)/destination/[slug]/page.tsx

import type { Metadata } from "next";
import { Suspense } from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";
import { DestinationSlugClientWrapper } from "@/components/Destinations/DestinationSlugClientWrapper";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const dest = await fetchDestinationServices.getDestinationBySlug(slug);
    return {
      title: `${dest.title} Travel Guide & Attractions`,
      description: dest.summary,
    };
  } catch {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-lanka-dark">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <DestinationSlugClientWrapper slug={slug} />
      </Suspense>
      
      <ContainerLayout>
        <PromoModal />
      </ContainerLayout>
    </main>
  );
}