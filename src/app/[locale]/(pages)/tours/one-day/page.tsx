import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Explorer } from "@/components/tours/Explorer";
import { TourHero } from "@/components/tours/TourHero";
import { oneDayTours } from "@/data/oneDayTours";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tours.OneDay.Metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function OneDayToursPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <TourHero namespace="Tours.OneDay" />
      <Explorer packages={oneDayTours} tourType="one" />

      <ContainerLayout>
        <PromoModal />
      </ContainerLayout>
    </main>
  );
}
