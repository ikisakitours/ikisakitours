import { SignupForm } from "@/components/auth/signUp/SignupForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Auth.Metadata.Signup" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function SignupPage() {
  return (
    <AuthShell introKey="Signup">
      <SignupForm />
    </AuthShell>
  );
}
