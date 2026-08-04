import { LoginForm } from "@/components/auth/login/LoginForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "Auth.Metadata.Login" });
  return {
    title: t("title"),
    description: t("description"),
  };
}
export default function LoginPage() {
  return (
    <AuthShell introKey="Login">
      <LoginForm />
    </AuthShell>
  );
}
