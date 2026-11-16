import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Hero } from "@/components/ui/Hero";
import { PrivateVehicleForm } from "@/components/services/privateVehicle/PrivateVehicleForm";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.Metadata.PrivateVehicle" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/services/private-vehicle", locale),
  };
}

export default async function PrivateVehiclePage() {
  const locale = await getLocale();
  const tHero = await getTranslations("Services.Hero.PrivateVehicle");
  const tMeta = await getTranslations({ locale, namespace: "Services.Metadata.PrivateVehicle" });

  const serviceType =
    locale === "ja"
      ? "スリランカ専属ドライバー付き専用車チャーターサービス"
      : "Private Chauffeur & Dedicated Vehicle Service across Sri Lanka";

  const serviceSchema = getServiceSchema(
    {
      name: tMeta("title"),
      description: tMeta("description"),
      url: "/services/private-vehicle",
      serviceType,
    },
    locale
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: locale === "ja" ? "サービス" : "Services", url: `/${locale}/services/private-vehicle` },
    { name: tMeta("title"), url: `/${locale}/services/private-vehicle` },
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
      <PrivateVehicleForm />
      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </main>
  );
}
