// src/components/tours/Card.tsx
"use client";
import { useCurrency } from "@/context/CurrencyContext";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Button } from "@/components/ui/Button";
import { Star } from "lucide-react";// MapPin
import { FaClock } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { PackageSummary } from "@/services/tours/types";

type PackageCardProps = {
  item: PackageSummary;
  tourType?: "multi" | "one";
};
type BadgeKey = "popular" | "discounted" | "new_arrival" | "featured";

const getBadgeStyles = (type: string) => {
  switch (type) {
    case "popular":
      return "bg-gold text-black";
    case "discounted": // 'sale'
      return "bg-red-600 text-white animate-pulse";
    case "new_arrival": // 'new'
      return "bg-white/10 text-white";
    case "featured":
      return "bg-emerald-600 text-white border border-emerald-400/30";
    default:
      return "bg-white/10 text-white";
  }
};

export function Card({ item, tourType }: PackageCardProps) {
  const t = useTranslations("Tours.Card");
  const { formatPrice } = useCurrency();

  const badgeKey = item.badge as BadgeKey;
  const badgeText =
    badgeKey && [`popular`, `discounted`, `new_arrival`, `featured`].includes(badgeKey)
      ? t(`Badges.${badgeKey}`)
      : item.badge?.replace("_", " ");

  const bookingHref =
    tourType === "one" ? `/booking/one-day-tours/${item.slug}` : `/booking/multi-days-tours/${item.slug}`;

  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111] shadow-2xl transition-all duration-500 hover:border-gold/50">
      <div className="absolute left-3 right-3 top-3 z-30 flex items-center justify-between 3xl:left-5 3xl:right-5 3xl:top-5">
        {/* Main Category/Status Badge */}
        {item.badge && (
          <span
            className={`${getBadgeStyles(item.badge)} rounded-sm px-2 py-2 text-micro 3xl:px-3 3xl:py-1.5 font-bold uppercase tracking-widest`}
          >
            {badgeText}
          </span>
        )}

        {/* Discount Badge */}
        {item.discount && parseFloat(item.discount) > 0 ? (
          <span className="bg-red-600 text-white animate-pulse rounded-sm px-2 py-2 text-micro 3xl:px-3 3xl:py-1.5 font-bold uppercase tracking-widest ml-auto">
            {t("save", { discount: parseFloat(String(item.discount)) })}
          </span>
        ) : null}
      </div>

      <div className="relative h-48 shrink-0 overflow-hidden sm:h-56">
        <LoadingImage
          src={item.heroImage} // Mapped to API field
          alt={item.slug} // Alt text from API
          fill
          sizes="(min-width: 1280px) 25vw, 340px"
          wrapperClassName="w-full h-full"
          className="image-render-visible object-cover opacity-70!  group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-black/40" />
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="mb-1 text-tiny uppercase tracking-[0.2em] font-bold text-gold shrink-0">
              {item.category}
            </span>

            {/* Flex container for Duration and Origin, forcing single line with truncate */}
            <div className="flex items-center gap-3 text-white min-w-0">
              <span className="flex items-center gap-1.5 shrink-0">
                <FaClock className="h-3.5 w-3.5 3xl:h-4 3xl:w-4 text-gold" />
                <span className="text-body-sm font-bold whitespace-nowrap">{item.duration}</span>
              </span>

              {/* {item.origin && (
                <>
                  <span className="h-3 w-px bg-white/30 shrink-0" />
                  <span className="flex min-w-0 items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold 3xl:h-4 3xl:w-4" />
                    <span className="truncate text-body-sm font-bold">{item.origin}</span>
                  </span>
                </>
              )} */}
            </div>
          </div>

          <div className="shrink-0 flex items-center space-x-1 rounded border border-white/10 bg-black/80 px-2 py-1 3xl:px-3 3xl:py-1.5 backdrop-blur-md">
            <Star className="h-3.5 w-3.5 3xl:h-4 3xl:w-4 text-gold" fill="currentColor" />
            <span className="text-body-sm font-bold text-white whitespace-nowrap">
              {item.averageRating > 0 ? item.averageRating.toFixed(1) : t("newBadge")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex grow flex-col p-5 sm:p-6">
        <h4 className="mb-2 text-body-lead font-bold italic text-white capitalize">{item.title}</h4>{" "}
        {/* Mapped to API field */}
        <p className="line-clamp-2 mb-6 3xl:mb-8 grow text-body-sm font-normal leading-relaxed text-slate-200">
          {item.description} {/* Mapped to API field */}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-tiny uppercase leading-none tracking-widest text-slate-300">{t("startingFrom")}</p>
            <p className="mt-1 text-heading-card font-bold text-gold">{formatPrice(item.price)}</p>{" "}
            {/* Mapped to API field */}
          </div>
          <Button variant="details" className="[&_span]:text-tiny!" href={bookingHref}>
            {t("details")}
          </Button>
        </div>
      </div>
    </article>
  );
}
