// src/app/[locale]/(pages)/destination/[slug]/page.tsx

import type { Metadata } from "next";
import { Suspense } from "react";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";
import { DestinationSlugClientWrapper } from "@/components/Destinations/DestinationSlugClientWrapper";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import { getTranslations, getLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { getTouristDestinationSchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";

type DestinationPageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Destinations.Metadata" });
  try {
    const dest = await fetchDestinationServices.getDestinationBySlug(slug, locale);
    return {
      title: t("slugTitle", { destinationName: dest.title }),
      description: dest.summary,
      alternates: getSeoAlternates(`/destination/${slug}`, locale),
    };
  } catch {
    return {
      title: t("slugNotFoundTitle"),
      description: t("slugNotFoundDesc"),
      alternates: getSeoAlternates(`/destination/${slug}`, locale),
    };
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const locale = await getLocale();

  let schemas: Array<Record<string, unknown>> = [];
  try {
    const dest = await fetchDestinationServices.getDestinationBySlug(slug, locale).catch(() => null);
    if (dest) {
      schemas.push(getTouristDestinationSchema(dest, locale));
      schemas.push(
        getBreadcrumbSchema([
          { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
          { name: locale === "ja" ? "観光スポット" : "Destinations", url: `/${locale}/destination` },
          { name: dest.title, url: `/${locale}/destination/${slug}` },
        ])
      );
    }
  } catch {
    // Graceful fallback
  }

  return (
    <main className="min-h-screen bg-lanka-dark">
      {schemas.length > 0 && <JsonLd schema={schemas} />}
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <DestinationSlugClientWrapper slug={slug} />
      </Suspense>

      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </main>
  );
}
