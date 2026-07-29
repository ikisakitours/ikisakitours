import type { Metadata } from "next";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import LegalBody from "@/components/legal/LegalBody";
export const metadata: Metadata = {
  title: "Terms of Service, Privacy, Booking & Payment Policies",
  description: "Review MapMate's comprehensive legal information, including our terms of service, privacy policy, booking terms, and secure payment policies.",
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
