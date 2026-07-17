import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login/LoginForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { loginIntro } from "@/data/auth";

export const metadata: Metadata = {
  title: "Secure Gateway",
  description: "Sign in to the LankaElite secure travel gateway.",
};

export default function LoginPage() {
  return (
    <AuthShell intro={loginIntro}>
      <LoginForm />
    </AuthShell>
  );
}
