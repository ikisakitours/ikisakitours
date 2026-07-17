import Image from "next/image";
import type { TourPackage } from "@/data/packages";
import { BadgeType } from "@/data/packages";
import { Button } from "@/components/ui/Button";
//Icons
import { Clock, Star } from "lucide-react";

type PackageCardProps = {
  item: TourPackage;
};
const getBadgeStyles = (type: BadgeType) => {
  switch (type) {
    case "popular":
      return "bg-gold text-black";
    case "sale":
      return "bg-red-600 text-white animate-pulse";
    case "new":
      return "bg-white/10 text-white";
    default:
      return "bg-white/10 text-white";
  }
};
export function PackageCard({ item }: PackageCardProps) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl transition-all duration-500 hover:border-gold/50">
     
      {item.badges.length > 0 && (
        <div className="absolute left-3 right-3 top-3 z-30 flex items-center justify-between 3xl:left-5 3xl:right-5 3xl:top-5">
          {item.badges.map((badge) => (
            <span
              key={badge.label}
              className={`${getBadgeStyles(badge.type)} rounded-sm px-2 py-1 text-[8px] 3xl:px-3 3xl:py-1.5 3xl:text-[10px] font-bold uppercase tracking-widest`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}
      <div className="relative h-48 shrink-0 overflow-hidden sm:h-56">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1280px) 25vw, 340px"
          className="image-render-visible object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-black/40" />
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="mb-1 text-[10px] uppercase tracking-[0.2em] font-bold text-gold">
              {item.categoryLabel}
            </span>
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-2.75 w-2.75 text-gold" />
              <span className="text-[11px] font-bold">{item.duration}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 rounded border border-white/10 bg-black/80 px-2 py-1 backdrop-blur-md">
            <Star className="h-2.75 w-2.75 text-gold" fill="currentColor" />
            <span className="text-[11px] font-bold text-white">{item.rating}</span>
          </div>
        </div>
      </div>
      <div className="flex grow flex-col p-5 sm:p-6">
        <h2 className="mb-2 text-lg font-bold italic text-white">{item.title}</h2>
        <p className="mb-6 grow text-sm font-normal leading-relaxed text-slate-200 line-clamp-3">{item.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-[11px] uppercase leading-none tracking-widest text-slate-300">Starting from</p>{" "}
            <p className="mt-1 text-lg font-bold text-gold">{item.price}</p>
          </div>
          <Button variant="details" href={`/booking/${item.slug}`}>
            Details
          </Button>
        </div>
      </div>
    </article>
  );
}
