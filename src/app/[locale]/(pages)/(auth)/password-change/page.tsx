import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordResetForm } from "@/components/auth/passwordResetForm/PasswordResetForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
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