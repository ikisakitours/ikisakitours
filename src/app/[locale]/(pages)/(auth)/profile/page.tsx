import { getTranslations } from "next-intl/server";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "ProfilePage.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ProfilePage() {
  return (
    <UserPageLayout>
      <ProfileDashboard />
    </UserPageLayout>
  );
}
