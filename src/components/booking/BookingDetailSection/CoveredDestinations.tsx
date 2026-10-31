"use client";

import React from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Link } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
import { DestinationSummary } from "@/services/Booking/packageDetails/types";
import { useFetchDestinationMapData } from "@/hooks/destinations/useFetchDestinationMapData";
//Icons
import { Compass } from "lucide-react";

type CoveredDestinationsProps = {
  destinations: DestinationSummary[];
  tourSlug: string;
  tourType?: "multi" | "one";
};

export default function CoveredDestinations({ destinations, tourSlug, tourType }: CoveredDestinationsProps) {
  const t = useTranslations("Booking.CoveredDestinations");

  const { data: allMapDestinations } = useFetchDestinationMapData();

  if (!destinations || destinations.length === 0) return null;

  return (
    <section
      id="Covered-Destinations"
      className="glass-card mb-10 rounded-4xl border border-white/5 p-6 md:mb-14 md:p-8"
    >
      <div className="mb-2 flex items-center gap-3 text-heading-card font-bold text-white">
        <Compass className="h-6 w-6 text-gold" />
        {t("title")}
      </div>
      <p className="mb-8 text-body-sm font-light text-slate-400">{t("description")}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {destinations.map((dest, index) => {
          const fullDestData = allMapDestinations?.find((item) => item.slug === dest.slug || item.id === dest.id);

          const title = fullDestData?.title || dest.slug || "";
          const summary = fullDestData?.summary || "";
          const heroImage = fullDestData?.heroImage || "";
          const destSlug = dest.slug || fullDestData?.slug || "";

          const destinationsHref =
            tourType === "one"
              ? `/destination/${destSlug}?from=one-day-tours&tour=${tourSlug}`
              : `/destination/${destSlug}?from=multi-days-tours&tour=${tourSlug}`;

          return (
            <Link
              key={dest.id || index}
              href={destinationsHref}
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-gold/30 hover:bg-white/10 hover:shadow-lg"
            >
              <div className="relative h-21 w-21 shrink-0 overflow-hidden rounded-xl">
                <LoadingImage
                  src={heroImage}
                  alt={title}
                  fill
                  sizes="84px"
                  watermarkClassName="text-[15px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  wrapperClassName="w-full h-full"
                  className="object-cover group-hover:scale-110"
                />
                <div className="absolute left-1.5 top-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold text-caption font-black text-lanka-black z-10 shadow-sm">
                  {index + 1}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="mb-1 uppercase text-body font-bold tracking-wide text-white transition-colors group-hover:text-gold">
                  {title.replace(/-/g, " ")}
                </h4>
                <p className="line-clamp-2 text-body-sm font-light leading-relaxed text-slate-400">{summary}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
