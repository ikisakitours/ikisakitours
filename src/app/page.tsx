import { ClientExperiencesSection } from "@/components/home/ClientExperiencesSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { DiscoverySection } from "@/components/home/DiscoverySection";
import { HeroSection } from "@/components/home/HeroSection";
import { JournalPreview } from "@/components/home/JournalPreview";
import { PackagesSection } from "@/components/home/PackagesSection";
import { PrivateVehicle } from "@/components/home/PrivateVehicle";
import { TransfersSection } from "@/components/home/TransfersSection";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

import { CustomTourSection } from "@/components/home/CustomTourSection";
import HomeContactCTA from "@/components/home/HomeContactCTA";
export default function HomePage() {
  return (
    <UserPageLayout>
      <HeroSection />
      <DiscoverySection />
      <ExperienceSection />
      <PrivateVehicle />
      <CustomTourSection />
      <TransfersSection />
      <PackagesSection />
      <JournalPreview />
      <ClientExperiencesSection />
      <HomeContactCTA />
    </UserPageLayout>
  );
}
