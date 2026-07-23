import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { type Destination } from "@/data/destinationData";
import { Button } from "@/components/ui/Button";

type DestinationsCardProps = {
  dest: Destination;
};

export default function DestinationsCard({ dest }: DestinationsCardProps) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl transition-all duration-500 hover:border-gold/50">
      {/* Image Container */}
      <div className="relative h-48 shrink-0 overflow-hidden sm:h-56">
        <Image
          src={dest.hero.image}
          alt={dest.name}
          fill
          sizes="(min-width: 1280px) 25vw, 340px"
          className="image-render-visible object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-black/40" />

        {/* Location Badge */}
        <div className="absolute left-3 right-3 top-3 z-30 flex items-center justify-between 3xl:left-5 3xl:right-5 3xl:top-5">
          <div className="inline-flex items-center gap-1.5 rounded-sm border border-white/10 bg-black/80 px-2.5 py-1 backdrop-blur-md">
            <MapPin className="h-2.75 w-2.75 text-gold" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-white 3xl:text-[10px]">Sri Lanka</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex grow flex-col p-5 sm:p-6">
        <div>
          <h3 className="mb-2 text-lg font-bold italic text-white transition-colors group-hover:text-gold">
            {dest.name}
          </h3>
          <p className="mb-6 grow text-sm font-normal leading-relaxed text-slate-200 line-clamp-3">
            {dest.hero.strapline}
          </p>
        </div>

        {/* Vertically Centered Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <span className="text-[11px] uppercase leading-none tracking-widest text-slate-300">Best Time</span>
            <p className="mt-1 text-xs font-bold text-gold">{dest.guide.bestTime}</p>
          </div>

          <Button variant="details" href={`/destination/${dest.slug}?from=destination`}>
            Details
          </Button>
        </div>
      </div>
    </article>
  );
}
