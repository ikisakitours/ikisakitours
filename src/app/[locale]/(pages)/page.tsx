import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { ClientExperiencesSection } from "@/components/home/ClientExperiencesSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { DiscoverySection } from "@/components/home/DiscoverySection";
import { HeroSection } from "@/components/home/HeroSection";
import { JournalPreview } from "@/components/home/JournalPreview";
import { ToursSection } from "@/components/home/ToursSection";
import { PrivateVehicle } from "@/components/home/PrivateVehicle";
import { TransfersSection } from "@/components/home/TransfersSection";
import { CustomTourSection } from "@/components/home/CustomTourSection";
import HomeContactCTA from "@/components/home/HomeContactCTA";
import JsonLd from "@/components/seo/JsonLd";
import { getTravelAgencySchema, getSeoAlternates } from "@/components/seo/schemas";
// import { SpecialEventsSection } from "@/components/home/EventsSection";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RootLayout.Metadata" });
  return {
    title: t("titleDefault"),
    description: t("description"),
    alternates: getSeoAlternates("", locale),
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const organizationSchema = getTravelAgencySchema(locale);

  return (
    <>
      <JsonLd schema={organizationSchema} />
      {/* 1. Inspiration Phase */}
      <HeroSection />
      <DiscoverySection />
      <ExperienceSection />

      {/* 2. Core Products Phase*/}
      <PrivateVehicle hideImageOnMobile={true} />
      <CustomTourSection />
      <ToursSection />
      <TransfersSection />

      {/* 3. entertainment & Content Phase */}
      {/* <SpecialEventsSection /> */}
      {/* 4. Trust & Content Phase*/}

      <ClientExperiencesSection />
      <JournalPreview />

      {/* 5. Action Phase */}
      <HomeContactCTA hideOnMobile={true} />

      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </>
  );
}
