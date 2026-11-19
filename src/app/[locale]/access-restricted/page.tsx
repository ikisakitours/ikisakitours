import type { Metadata } from "next";
import { AccessRestricted } from "@/components/access/AccessRestricted";

export const metadata: Metadata = {
  title: "Access Restricted",
  robots: { index: false, follow: false },
};

export default function AccessRestrictedPage() {
  return <AccessRestricted />;
}
