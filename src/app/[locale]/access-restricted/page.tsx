"use client";

import dynamic from "next/dynamic";

const AccessRestricted = dynamic(
  () => import("@/components/access/AccessRestricted").then((mod) => mod.AccessRestricted),
  { ssr: false }
);

export default function AccessRestrictedPage() {
  return <AccessRestricted />;
}
