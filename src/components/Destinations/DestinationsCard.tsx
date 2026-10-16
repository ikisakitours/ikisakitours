import React from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import type { DestinationPreview } from "@/services/destinations/types";

type DestinationsCardProps = {
  dest: DestinationPreview;
};

export default function DestinationsCard({ dest }: DestinationsCardProps) {
  const t = useTranslations("Destinations.Card");

  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl transition-all duration-500 hover:border-gold/50">
      <div className="relative h-48 shrink-0 overflow-hidden sm:h-56">
        <LoadingImage
        src={dest.heroImage || "/images/default-destination.jpg"} 
          alt={dest.title} 
          fill
          sizes="(min-width: 1280px) 25vw, 340px"
          wrapperClassName="w-full h-full"
          className="image-render-visible object-cover opacity-70!  group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-black/40" />

        <div className="absolute left-3 right-3 top-3 z-30 flex items-center justify-between 3xl:left-5 3xl:right-5 3xl:top-5">
          <div className="inline-flex items-center gap-1.5 rounded-sm border border-white/10 bg-black/80 px-2.5 py-1.5 backdrop-blur-md">
            <MapPin className="h-3 w-3 text-gold" />
            <span className="font-bold uppercase tracking-widest text-tiny"> {dest.province}</span>
          </div>
        </div>
      </div>

      <div className="flex grow flex-col p-5 sm:p-6">
        <div>
          <h3 className="mb-2 text-heading-card font-bold italic text-white transition-colors group-hover:text-gold">
           {dest.title} 
          </h3>
          <p className="mb-6 grow ine-clamp-2 text-body font-normal leading-relaxed text-slate-400 line-clamp-2">
           {dest.summary}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <span className="text-tiny uppercase leading-none tracking-widest text-slate-300">{t("bestTime")}</span>
            <p className="mt-1 text-body font-bold text-gold">{dest.bestTimeToVisit}</p>
          </div>

          <Button variant="details" className="[&_span]:text-tiny!" href={`/destination/${dest.slug}?from=destination`}>
            {t("details")}
          </Button>
        </div>
      </div>
    </article>
  );
}
