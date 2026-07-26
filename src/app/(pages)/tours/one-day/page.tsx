import type { Metadata } from "next";
import { Explorer } from "@/components/tours/Explorer";
import { TourHero } from "@/components/tours/TourHero";
import { oneDayTours, oneDayHeroData } from "@/data/oneDayTours";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

export const metadata: Metadata = {
  title: "One Day Excursions | Heritage Curated Tours",
  description: "Explore MapMate signature one-day excursions and quick escapes across Sri Lanka.",
};

export default function OneDayToursPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <TourHero data={oneDayHeroData} />
        <Explorer packages={oneDayTours} tourType="one"/>
      </UserPageLayout>
    </main>
  );
}
