import { LoadingImage } from "@/components/ui/LoadingImage";
import { bookingTour } from "@/data/multiDaysBooking";
import { Link } from "@/lib/i18nNavigation";
import { RatingStars } from "@/components/ui/RatingStars";
import { useTranslations } from "next-intl";
//Icons
import { BsPatchCheck } from "react-icons/bs";

import { Crown, CalendarDays, Images } from "lucide-react";

type ReviewCardProps = {
  review: (typeof bookingTour.reviews)[0];
  slug: string;
  tourType?: "multi" | "one";
};

export function ReviewCard({ review, slug, tourType }: ReviewCardProps) {
  const t = useTranslations("Booking.ReviewCard");
  const rating = review.rating ?? 5;

  const encodedName = encodeURIComponent(review.name.toLowerCase().trim());

  const oneSpecificReviewsGalleryHref =
    tourType === "one"
      ? `/gallery/${slug}?filter-one-day-tours=review-${encodedName}&from=reviews`
      : `/gallery/${slug}?filter-multi-days-tours=review-${encodedName}&from=reviews`;

  return (
    <article className="glass-card rounded-3xl border border-white/5 p-6 md:rounded-[2.5rem] md:p-10 3xl:p-14">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row md:mb-8">
        <div className="flex w-full max-w-full items-center gap-3 sm:gap-4 md:gap-6">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-white/5 shadow-lg sm:h-14 sm:w-14 md:h-16 md:w-16 3xl:h-20 3xl:w-20">
            <span className="text-xs font-bold text-gold 3xl:text-base">{review.initials}</span>

            {review.avatar && typeof review.avatar === "string" && review.avatar.trim() !== "" && (
              <LoadingImage
                src={review.avatar}
                alt={`${review.name} Profile`}
                fill
                sizes="80px"
                className="image-render-visible z-10 object-cover"
                wrapperClassName="!absolute inset-0 z-10 w-full h-full"
                isSmall={true}
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="wrap-break-word text-body-sm font-bold leading-tight tracking-wide text-white">
                {review.name} - {review.country}
              </h3>
              <BsPatchCheck className="h-4 w-4 shrink-0 text-emerald-400" />
              <Crown className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
            </div>
            <p className="mt-2 flex items-center gap-2 text-tiny font-bold uppercase tracking-[0.18em] text-gold opacity-90">
              <CalendarDays className="h-3 w-3 opacity-70 3xl:h-4 3xl:w-4" />
              {review.date}
            </p>
          </div>
        </div>

        <RatingStars rating={rating} starClassName="h-3.5 w-3.5 md:h-4.5 md:w-4.5 3xl:h-5 3xl:w-5 text-gold" />
      </div>

      <p className="mb-6 text-body font-normal italic leading-relaxed text-slate-300 3xl:leading-relaxed">
        &quot;{review.text}&quot;
      </p>

      {review.photos && review.photos.length > 0 && (
        <div className="no-scrollbar mb-8 flex max-w-full gap-3 overflow-x-auto pb-4">
          {review.photos.map((photo, index) => {
            const isLast = index === review.photos.length - 1;
            const imgContent = (
              <>
                <LoadingImage
                  src={photo.src}
                  alt={photo.alt}
                  title={photo.title}
                  fill
                  sizes="96px"
                  watermarkClassName="text-[18px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  wrapperClassName="w-full h-full"
                  className="image-render-visible object-cover group-hover:scale-110"
                />
                {isLast && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/65">
                    <Images className="mb-1 text-white" size={16} />
                    <span className="text-micro font-bold uppercase text-white">{t("view")}</span>
                  </div>
                )}
              </>
            );

            return isLast ? (
              <Link
                href={oneSpecificReviewsGalleryHref}
                key={`photo-${photo.id || index}`}
                className="group relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-24 md:w-24"
              >
                {imgContent}
              </Link>
            ) : (
              <div
                key={`photo-${photo.id || index}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-24 md:w-24"
              >
                {imgContent}
              </div>
            );
          })}
        </div>
      )}

      {review.response && (
        <div className="w-full max-w-full rounded-2xl border-l border-gold/40 bg-white/5 p-4 md:w-fit md:p-5 3xl:p-8">
          <span className="block  text-tiny font-bold uppercase tracking-widest text-gold">
            {t("responseFrom")}
          </span>
          <p className="mt-2 wrap-break-word text-body-sm leading-relaxed text-slate-400">
            {review.response}
          </p>
        </div>
      )}
    </article>
  );
}
