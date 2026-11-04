import type { Metadata } from "next";
import { AccessRestricted } from "@/components/access/AccessRestricted";
import { AccessGate } from "@/components/access/AccessGate";
import { AuthProvider } from "@/context/AuthContext";
export const metadata: Metadata = {
  title: "Access Restricted",
  robots: { index: false, follow: false },
};

export default function AccessRestrictedPage() {
  return (
  <AuthProvider>
  <AccessGate>
      <AccessRestricted />
      </AccessGate>
</AuthProvider>
  );
}