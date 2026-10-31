"use client";

import React from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShieldCheck } from "lucide-react";
import RatingStars from "./RatingStars";
import { useTranslations } from "next-intl";
import { PackageDetails } from "@/services/Booking/packageDetails/types";
import { usePackageReviewSummary } from "@/hooks/Booking/packageSummaryReview/usePackageReviewSummary";

type BookingHeaderProps = {
  tour: PackageDetails;
};

export default function BookingHeader({ tour }: BookingHeaderProps) {
  const t = useTranslations("Booking.Header");

  const { summary } = usePackageReviewSummary(tour.id);

  const location = tour.origin || "Sri Lanka";

  const rating = summary ? summary.averageRating : 0;
  const reviewCount = summary ? summary.totalReviews : 0;

  return (
    <section id="header" className="mb-8 md:mb-12">
      <SectionLabel>{location}</SectionLabel>
      <h1 className="premium-serif mb-6 text-heading-section leading-[1.1] text-white">
        {tour.title} <br className="hidden sm:block" />
        <span className="gold-gradient-text font-light italic">{tour.titleEmphasis}</span>
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-4 border-b border-white/10 pb-8 md:gap-x-6">
        {/* 1. Rating Section */}
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} className="text-body-lead" />
          <span className="ml-1 text-body font-bold tracking-widest text-white">{rating.toFixed(1)}</span>
          <span className="ml-1 text-caption font-bold uppercase tracking-widest text-gold/50">
            ({reviewCount} {t("reviews")})
          </span>
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
