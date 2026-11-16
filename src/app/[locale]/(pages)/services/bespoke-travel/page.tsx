import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { BespokeForm } from "@/components/services/bespoke/BespokeForm";
import { Hero } from "@/components/ui/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Services.Metadata.Bespoke" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/services/bespoke-travel", locale),
  };
}

export default async function BespokePage() {
  const locale = await getLocale();
  const tHero = await getTranslations("Services.Hero.Bespoke");
  const tMeta = await getTranslations({ locale, namespace: "Services.Metadata.Bespoke" });

  const serviceType =
    locale === "ja"
      ? "スリランカ オーダーメイド旅行・プライベートツアー手配"
      : "Custom Tour Itinerary & Tailor-Made Private Journeys in Sri Lanka";

  const serviceSchema = getServiceSchema(
    {
      name: tMeta("title"),
      description: tMeta("description"),
      url: "/services/bespoke-travel",
      serviceType,
    },
    locale
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: locale === "ja" ? "サービス" : "Services", url: `/${locale}/services/bespoke-travel` },
    { name: tMeta("title"), url: `/${locale}/services/bespoke-travel` },
  ]);

  return (
    <main className="min-h-screen bg-lanka-dark">
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
      <Hero
        image={tHero("image")}
        altText={tHero("alt")}
        eyebrow={tHero("eyebrow")}
        title={tHero("title")}
        accent={tHero("accent")}
        strapline={tHero("strapline")}
      />
      <BespokeForm />

      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </main>
  );
}
