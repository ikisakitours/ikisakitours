import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Explorer } from "@/components/tours/Explorer";
import { TourHero } from "@/components/tours/TourHero";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tours.MultiDay.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/tours/multi-days", locale),
  };
}

export default async function MultiDayToursPage() {
  const locale = await getLocale();
  const tMeta = await getTranslations({ locale, namespace: "Tours.MultiDay.Metadata" });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: tMeta("title"), url: `/${locale}/tours/multi-days` },
  ]);

  return (
    <main className="min-h-screen bg-lanka-dark">
      <JsonLd schema={breadcrumbSchema} />
      <TourHero namespace="Tours.MultiDay" />
      <Explorer tourType="multi" />

      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </main>
  );
}
