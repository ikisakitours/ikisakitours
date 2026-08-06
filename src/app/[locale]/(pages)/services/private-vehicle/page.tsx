import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/ui/Hero";
import { PrivateVehicleForm } from "@/components/services/privateVehicle/PrivateVehicleForm";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.Metadata.PrivateVehicle" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function PrivateVehiclePage() {
  const t = useTranslations("Services.Hero.PrivateVehicle");

  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark">
        <Hero
          image={t("image")}
          altText={t("alt")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          strapline={t("strapline")}
        />
        <PrivateVehicleForm />
        <ContainerLayout>
          <PromoModal />
        </ContainerLayout>
      </main>
    </UserPageLayout>
  );
}
