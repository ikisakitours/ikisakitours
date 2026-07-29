import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordResetForm } from "@/components/auth/passwordResetForm/PasswordResetForm";
import { passwordResetIntro } from "@/data/auth";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new MapMate account password after email verification.",
};

export default function PasswordChangePage() {
  return (
    <AuthShell intro={passwordResetIntro}>
      <PasswordResetForm />
    </AuthShell>
  );
}
