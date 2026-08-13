import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { DestinationExplorer } from "@/components/Destinations/DestinationExplorer";
import { destinationsData } from "@/data/destinationData";
import { Hero } from "@/components/ui/Hero";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Destinations.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

// Separate component for Client Translations inside Server Component
function TranslatedHero() {
  const t = useTranslations("Destinations.Hero");
  return (
    <Hero
      image={t("image")}
      altText={t("alt")}
      eyebrow={t("eyebrow")}
      title={t("title")}
      accent={t("accent")}
      strapline={t("strapline")}
    />
  );
}

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <TranslatedHero />
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <DestinationExplorer destinations={destinationsData} />
      </Suspense>
      <ContainerLayout>
        <PromoModal />
      </ContainerLayout>
    </main>
  );
}
