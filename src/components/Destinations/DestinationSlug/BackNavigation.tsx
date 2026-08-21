"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";

//Icons
import { ArrowLeft } from "lucide-react";

export default function BackNavigation() {
  const t = useTranslations("Destinations.Slug");

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const tourSlug = searchParams.get("tour");

  let backLink = "/destination";
  let backLabel = t("backToDestinations");

  if (from === "map") {
    backLink = "/destination?view=map";
    backLabel = t("backToIslandMap");
  } else if (from === "routeMap") {
    backLabel = t("backToRouteMap");
  } else if (from === "one-day-tours" && tourSlug) {
    backLink = `/booking/one-day-tours/${tourSlug}`;
    backLabel = t("backToTour");
  } else if (from === "multi-days-tours" && tourSlug) {
    backLink = `/booking/multi-days-tours/${tourSlug}`;
    backLabel = t("backToTour");
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
      className="group mb-5 flex w-fit cursor-pointer items-center gap-3 text-caption font-bold uppercase tracking-widest! text-white/60 transition-colors hover:text-gold"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-gold/50 group-hover:bg-gold/10">
        <ArrowLeft strokeWidth={3} size={14} className="text-white transition-colors group-hover:text-gold" />
      </span>
      {backLabel}
    </button>
  );
}
