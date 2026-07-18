import type { Metadata } from "next";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import LegalBody from "@/components/legal/LegalBody";
export const metadata: Metadata = {
  title: "Terms & Privacy",
  description: "Review MapMate terms of service and privacy policy information.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-lanka-dark">
      <UserPageLayout>
        <LegalBody />
      </UserPageLayout>
    </main>
  );
}
