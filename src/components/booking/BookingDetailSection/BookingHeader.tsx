"use client";

import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShieldCheck } from "lucide-react";
import RatingStars from "./RatingStars";
import { useTranslations } from "next-intl";
import { PackageDetails } from "@/services/Booking/packageDetails/types";
import { usePackageReviewSummary } from "@/hooks/Booking/packageSummaryReview/usePackageReviewSummary";
// Icon
import { Star } from "lucide-react";

type BookingHeaderProps = {
  tour: PackageDetails;
};

// ⭐ Title එක ඇතුළේ titleEmphasis වචන ටික Gold gradient කරන Helper එක
function renderHighlightedTitle(title: string, highlight?: string) {
  if (!highlight || !title.toLowerCase().includes(highlight.toLowerCase())) {
    return title;
  }
  // Highlight විය යුතු වචන අනුව Title එක split කරනවා
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = title.split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className="gold-gradient-text font-light italic">
        {part}
      </span>
    ) : (
      part
    )
  );
}
export default function BookingHeader({ tour }: BookingHeaderProps) {
  const t = useTranslations("Booking.Header");
  const tCard = useTranslations("Tours.Card");

  const { summary } = usePackageReviewSummary(tour.id);


  const rating = summary ? summary.averageRating : 0;
  const reviewCount = summary ? summary.totalReviews : 0;
  const label = tour.type === "oneday" ? t("labelOneDay") : t("labelMultiDay");
  return (
    <section id="header" className="mb-8 md:mb-12">
      <SectionLabel>{label}</SectionLabel>
         <h1 className="premium-serif mb-6 text-heading-section leading-[1.1] text-white">
        {renderHighlightedTitle(tour.title, tour.titleEmphasis)}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-4 border-b border-white/10 pb-8 md:gap-x-6">
        {/* 1. Rating Section */}
        <div className="flex items-center gap-2">
          {rating > 0 ? (
            <>
              <RatingStars rating={rating} className="text-body-lead" />
              <span className="ml-1 text-body font-bold tracking-widest text-white">{rating.toFixed(1)}</span>
              <span className="ml-1 text-caption font-bold uppercase tracking-widest text-gold/50">
                ({reviewCount} {t("reviews")})
              </span>
            </>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-linear-to-r from-gold/15 via-gold/5 to-transparent px-4 py-1.5 shadow-[0_0_20px_-6px_rgba(197,160,89,0.5)]">
              <Star className="h-3.5 w-3.5 text-gold" fill="currentColor" strokeWidth={1.5} />
              <span className="text-tiny font-bold uppercase tracking-[0.25em] text-gold">{tCard("newBadge")}</span>
            </span>
          )}
        </div>

        <div className="hidden h-4 w-px bg-white/10 sm:block" />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ShieldCheck className="h-4.5 w-4.5 md:h-5 md:w-5 text-gold/70" />
          <span className="text-caption uppercase tracking-widest text-slate-400">
            {t("provider")} <strong className="text-white">{tour.provider}</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
