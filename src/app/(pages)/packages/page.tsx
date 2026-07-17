import type { Metadata } from "next";
import { PackageExplorer } from "@/components/packages/PackageExplorer";
import { PackageHero } from "@/components/packages/PackageHero";
import { packages } from "@/data/packages";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

export const metadata: Metadata = {
  title: "Heritage Curated Tours",
  description: "Explore MapMate signature heritage, nature, religious, and coastal tour packages across Sri Lanka.",
};

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <PackageHero />
        <PackageExplorer packages={packages} />
      </UserPageLayout>
    </main>
  );
}
