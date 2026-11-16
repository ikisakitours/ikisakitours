import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Hero } from "@/components/ui/Hero";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";
import { DestinationsClientWrapper } from "@/components/Destinations/DestinationsClientWrapper";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Destinations.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/destination", locale),
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

export default async function DestinationsPage() {
  const locale = await getLocale();
  const tMeta = await getTranslations({ locale, namespace: "Destinations.Metadata" });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: tMeta("title"), url: `/${locale}/destination` },
  ]);

  return (
    <main className="min-h-screen bg-lanka-dark">
      <JsonLd schema={breadcrumbSchema} />
      <TranslatedHero />
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <DestinationsClientWrapper />
      </Suspense>
      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </main>
  );
}
