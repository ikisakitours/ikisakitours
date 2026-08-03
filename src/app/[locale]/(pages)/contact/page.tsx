import React from "react";
import ContactBody from "@/components/contact/ContactBody";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description: "Reach out to MapMate for any inquiries, tour planning assistance, or support regarding your trip to Sri Lanka.",
};

export default function ContactPage() {
  return (
    <UserPageLayout>
      <ContactBody />
    </UserPageLayout>
  );
}
