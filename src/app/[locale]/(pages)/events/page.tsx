import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/ui/Hero";
import { EventsBody } from "@/components/Events/EventsBody";
import { allSpecialEventsList, categories } from "@/data/specialEvents";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { useTranslations } from "next-intl";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
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

export default function SpecialEventsPage() {
  return (
    <UserPageLayout>
      <main className="min-h-screen bg-background">
        <TranslatedHero />
        <EventsBody events={allSpecialEventsList} categories={categories} />
        <ContainerLayout>
          <PromoModal />
        </ContainerLayout>
      </main>
    </UserPageLayout>
  );
}
