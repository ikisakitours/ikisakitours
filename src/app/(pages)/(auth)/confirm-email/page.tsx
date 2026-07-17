import type { Metadata } from "next";
import { AccountRecoveryForm } from "@/components/auth/accountRecovery/AccountRecoveryForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { accountRecoveryIntro } from "@/data/auth";

export const metadata: Metadata = {
  title: "Account Recovery",
  description: "Request a LankaElite account recovery email.",
};

export default function ConfirmEmailPage() {
  return (
    <AuthShell intro={accountRecoveryIntro}>
      <AccountRecoveryForm />
    </AuthShell>
  );
}
