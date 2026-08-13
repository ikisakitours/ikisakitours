import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Explorer } from "@/components/tours/Explorer";
import { TourHero } from "@/components/tours/TourHero";
import { packages } from "@/data/multiDaysTours";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tours.MultiDay.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function MultiDayToursPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <TourHero namespace="Tours.MultiDay" />
      <Explorer packages={packages} tourType="multi" />

      <ContainerLayout>
        <PromoModal />
      </ContainerLayout>
    </main>
  );
}
