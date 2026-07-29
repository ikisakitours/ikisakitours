import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signUp/SignupForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { signupIntro } from "@/data/auth";

export const metadata: Metadata = {
  title: "Create Account | MapMate",
  description:
    "Create a MapMate member account for private travel planning, exclusive tour bookings, and personalized Sri Lankan itineraries.",
};
export default function SignupPage() {
  return (
    <AuthShell intro={signupIntro}>
      <SignupForm />
    </AuthShell>
  );
}
