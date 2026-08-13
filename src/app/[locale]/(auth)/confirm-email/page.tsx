import { AccountRecoveryForm } from "@/components/auth/accountRecovery/AccountRecoveryForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth.Metadata.Recovery" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ConfirmEmailPage() {
  return (
    <AuthShell introKey="Recovery">
      <AccountRecoveryForm />
    </AuthShell>
  );
}