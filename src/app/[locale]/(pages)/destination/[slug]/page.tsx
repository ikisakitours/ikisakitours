// src/app/[locale]/(pages)/destination/[slug]/page.tsx

import type { Metadata } from "next";
import { Suspense } from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";
import { DestinationSlugClientWrapper } from "@/components/Destinations/DestinationSlugClientWrapper";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import { getTranslations } from "next-intl/server";

type DestinationPageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Destinations.Metadata" });
  try {
    const dest = await fetchDestinationServices.getDestinationBySlug(slug);
    return {
      title: t("slugTitle", { destinationName: dest.title }),
      description: dest.summary,
    };
  } catch {
    return {
      title: t("slugNotFoundTitle"),
      description: t("slugNotFoundDesc"),
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
