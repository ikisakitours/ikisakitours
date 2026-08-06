import { LoadingImage } from "@/components/ui/LoadingImage";
import { Link } from "@/i18nNavigation";
import { useTranslations } from "next-intl";
//Icons
import { Compass } from "lucide-react";

type DestinationItem = {
  id: number;
  slug: string;
  name: string;
  image: string;
  description: string;
};

type CoveredDestinationsProps = {
  destinations: DestinationItem[];
  tourSlug: string;
  tourType?: "multi" | "one";
};

export default function CoveredDestinations({ destinations, tourSlug, tourType }: CoveredDestinationsProps) {
  const t = useTranslations("Booking.CoveredDestinations");
  if (!destinations || destinations.length === 0) return null;

  return (
    <section
      id="Covered-Destinations"
      className="glass-card mb-10 rounded-4xl border border-white/5 p-6 md:mb-14 md:p-8"
    >
      <div className="mb-2 flex items-center gap-3 text-lg font-bold text-white md:text-xl">
        <Compass className="h-6 w-6 text-gold" />
        {t("title")}
      </div>
      <p className="mb-8 text-sm font-light text-slate-400">{t("description")}</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {destinations.map((dest) => {
          const destinationsHref =
            tourType === "one"
              ? `/destination/${dest.slug}?from=one-day-tours&tour=${tourSlug}`
              : `/destination/${dest.slug}?from=multi-days-tours&tour=${tourSlug}`;

          return (
            <Link
              key={dest.id}
              href={destinationsHref}
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-gold/30 hover:bg-white/10 hover:shadow-lg"
            >
              <div className="relative h-21 w-21 shrink-0 overflow-hidden rounded-xl">
                <LoadingImage
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="84px"
                  watermarkClassName="text-[15px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  wrapperClassName="w-full h-full"
                  className="object-cover group-hover:scale-110"
                />
                <div className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-black text-lanka-black z-10 shadow-sm">
                  {dest.id}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="mb-1 text-[15px] font-bold tracking-wide text-white transition-colors group-hover:text-gold">
                  {dest.name}
                </h4>
                <p className="line-clamp-2 text-[13px] font-light leading-relaxed text-slate-400">{dest.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
