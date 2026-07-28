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
import { specialEventContent } from "@/data/specialEvents";

export default function HomePage() {
  const { mode, upcomingTargetDate, eventDetailsHref, normalHref, live, SpecialEvent, upcoming, normal } =
    specialEventContent;

  const currentContent =
    mode === "live" ? live : mode === "SpecialEvent" ? SpecialEvent : mode === "upcoming" ? upcoming : normal;
  const targetLink = mode === "normal" ? normalHref : eventDetailsHref;

  return (
    <UserPageLayout>
      <HeroSection />
      <DiscoverySection />
      <ExperienceSection />
      <PrivateVehicle />
      <CustomTourSection />
      <TransfersSection />
      <SpecialEventsSection
        mode={mode}
        content={currentContent}
        targetLink={targetLink}
        upcomingTargetDate={upcomingTargetDate}
      />
      <ToursSection />
      <JournalPreview />
      <ClientExperiencesSection />
      <HomeContactCTA />
    </UserPageLayout>
  );
}
