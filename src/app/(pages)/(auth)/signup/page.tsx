import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signUp/SignupForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { signupIntro } from "@/data/auth";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a LankaElite member account for private travel planning.",
};

export default function SignupPage() {
  return (
    <AuthShell intro={signupIntro}>
      <SignupForm />
    </AuthShell>
  );
}
