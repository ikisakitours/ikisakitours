import { ClientExperiencesSection } from "@/components/home/ClientExperiencesSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { DiscoverySection } from "@/components/home/DiscoverySection";
import { HeroSection } from "@/components/home/HeroSection";
import { JournalPreview } from "@/components/home/JournalPreview";
import { ToursSection } from "@/components/home/ToursSection";
import { PrivateVehicle } from "@/components/home/PrivateVehicle";
import { TransfersSection } from "@/components/home/TransfersSection";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { CustomTourSection } from "@/components/home/CustomTourSection";
import HomeContactCTA from "@/components/home/HomeContactCTA";
import { SpecialEventsSection } from "@/components/home/EventsSection";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";

export default function HomePage() {
  return (
    <UserPageLayout>
      {/* 1. Inspiration Phase */}
      <HeroSection />
      <DiscoverySection />
      <ExperienceSection />

      {/* 2. Core Products Phase*/}
      <ToursSection />
      <CustomTourSection />
      <PrivateVehicle />
      <TransfersSection />

      {/* 3. entertainment & Content Phase */}
      <SpecialEventsSection />
      {/* 4. Trust & Content Phase*/}

      <ClientExperiencesSection />
      <JournalPreview />

      {/* 5. Action Phase */}
      <HomeContactCTA />
      
      <ContainerLayout>
        <PromoModal />
      </ContainerLayout>
    </UserPageLayout>
  );
}
