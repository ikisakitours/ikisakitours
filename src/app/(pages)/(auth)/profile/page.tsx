import type { Metadata } from "next";
import { ProfileDashboard } from "@/components/profile/ProfileDashboard";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage LankaElite profile details, account security, and privacy settings.",
};

export default function ProfilePage() {
  return (
   
      <UserPageLayout>
        <ProfileDashboard />
      </UserPageLayout>

  );
}
