import { getTranslations } from "next-intl/server";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProfilePage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <ProfileDashboard />
    </main>
  );
}
