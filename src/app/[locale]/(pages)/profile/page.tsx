import { getTranslations } from "next-intl/server";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import { ProfileAccessGate } from "@/components/profile/ProfileAccessGate";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProfilePage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <ProfileAccessGate>
        <ProfileDashboard />
      </ProfileAccessGate>
    </main>
  );
}
