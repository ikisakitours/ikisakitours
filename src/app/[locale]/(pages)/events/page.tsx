import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Hero } from "@/components/ui/Hero";
import { EventsBody } from "@/components/Events/EventsBody";
import { allSpecialEventsList, categories } from "@/data/specialEvents";
import { useTranslations } from "next-intl";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: getSeoAlternates("/events", locale),
  };
}

function TranslatedHero() {
  const t = useTranslations("Events.Hero");
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

export default async function SpecialEventsPage() {
  const locale = await getLocale();
  const tMeta = await getTranslations({ locale, namespace: "Events.Metadata" });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: tMeta("title"), url: `/${locale}/events` },
  ]);

  return (
    <main className="min-h-screen bg-background">
      <JsonLd schema={breadcrumbSchema} />
      <TranslatedHero />
      <EventsBody events={allSpecialEventsList} categories={categories} />
      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </main>
  );
}
