import type { Metadata } from "next";
import { Explorer } from "@/components/tours/Explorer";
import { TourHero } from "@/components/tours/TourHero";
import { packages, MultiDaysHeroData } from "@/data/multiDaysTours";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

export const metadata: Metadata = {
  title: "Heritage Curated Tours",
  description: "Explore MapMate signature heritage, nature, religious, and coastal tour packages across Sri Lanka.",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <TourHero data={MultiDaysHeroData} />
        <Explorer packages={packages} />
      </UserPageLayout>
    </main>
  );
}
