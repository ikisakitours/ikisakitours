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
import { SpecialEventsSection } from "@/components/home/SpecialEventsSection";

export default function HomePage() {
  return (
    <UserPageLayout>
      <HeroSection />
      <DiscoverySection />
      <ExperienceSection />
      <PrivateVehicle />
      <CustomTourSection />
      <TransfersSection />
      <SpecialEventsSection />
      <ToursSection />
      <JournalPreview />
      <ClientExperiencesSection />
      <HomeContactCTA />
    </UserPageLayout>
  );
}
