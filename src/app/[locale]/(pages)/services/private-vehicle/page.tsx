import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { PrivateVehicleForm } from "@/components/services/privateVehicle/PrivateVehicleForm";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { privateVehicleHero } from "@/data/privateVehicle";
export const metadata: Metadata = {
  title: "Private Chauffeur Service",
  description:
    "Experience seamless, door-to-door private vehicle transfers in Sri Lanka. Professional chauffeurs, reliable service, and total flexibility for your journey.",
};

export default function TransfersPage() {
  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark">
        <Hero
          image={privateVehicleHero.image}
          altText={privateVehicleHero.alt}
          eyebrow={privateVehicleHero.eyebrow}
          title={privateVehicleHero.title}
          accent={privateVehicleHero.accent}
          strapline={privateVehicleHero.strapline}
        />
        <PrivateVehicleForm />
      </main>
    </UserPageLayout>
  );
}
