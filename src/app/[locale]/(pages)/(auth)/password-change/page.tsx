import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordResetForm } from "@/components/auth/passwordResetForm/PasswordResetForm";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth.Metadata.Reset" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function PasswordChangePage() {
  return (
    <AuthShell introKey="Reset">
      <PasswordResetForm />
    </AuthShell>
  );
}