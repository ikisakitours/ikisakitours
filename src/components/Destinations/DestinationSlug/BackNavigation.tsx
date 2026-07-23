"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BackNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const tourSlug = searchParams.get("tour");

  let backLink = "/destination";
  let backLabel = "Back to Destinations";

  if (from === "map") {
    backLink = "/destination?view=map";
    backLabel = "Back to Island Map";
  } else if (from === "routeMap") {
    backLabel = "Back to Route Map";
  } else if (from === "package" && tourSlug) {
    backLink = `/booking/${tourSlug}`;
    backLabel = "Back to Tour";
  }

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();

    if (from === "map") {
      router.push(backLink);
    } else if (window.history.length > 2) {
      router.back();
    } else {
      router.push(backLink);
    }
  };

  return (
    <button
      onClick={handleNavigation}
      className="group mb-8 inline-flex cursor-pointer items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold transition-colors hover:text-white"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {backLabel}
    </button>
  );
}