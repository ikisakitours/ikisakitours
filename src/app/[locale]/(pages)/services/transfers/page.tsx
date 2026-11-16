import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { TransferBookingForm } from "@/components/services/transfers/TransferBookingForm";
import { Hero } from "@/components/ui/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.Metadata.Transfers" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/services/transfers", locale),
  };
}

export default async function TransfersPage() {
  const locale = await getLocale();
  const tHero = await getTranslations("Services.Hero.Transfers");
  const tMeta = await getTranslations({ locale, namespace: "Services.Metadata.Transfers" });

  const serviceType =
    locale === "ja"
      ? "スリランカ空港送迎・都市間プライベート送迎サービス"
      : "Airport Arrival, Departure & Intercity Private Transfers in Sri Lanka";

  const serviceSchema = getServiceSchema(
    {
      name: tMeta("title"),
      description: tMeta("description"),
      url: "/services/transfers",
      serviceType,
    },
    locale
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: locale === "ja" ? "サービス" : "Services", url: `/${locale}/services/transfers` },
    { name: tMeta("title"), url: `/${locale}/services/transfers` },
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
      <TransferBookingForm />
      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </main>
  );
}
