import React from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Link } from "@/lib/i18nNavigation";
import { Button } from "@/components/ui/Button";
import RatingStars from "./RatingStars";
import { useTranslations } from "next-intl";
import { ReviewCard } from "../bookingReviews/ReviewCard";

//Icons
// import { BsPatchCheck } from "react-icons/bs";
// import { Plus, Images, Crown, CalendarDays } from "lucide-react";
import { Plus, Images } from "lucide-react";

type ReviewPhoto = {
  src: string;
  alt: string;
  title: string;
};

type ReviewItem = {
  name: string;
  country: string;
  language?: string;
  initials: string;
  date: string;
  text: string;
  rating?: number | string;
  avatar?: string;
  photos?: ReviewPhoto[];
  response?: string;
};

type MomentItem = {
  src: string;
  alt: string;
};

type ReviewsSectionProps = {
  tour: {
    slug: string;
    rating: string | number;
    reviewCount: number;
    reviewMoments?: MomentItem[];
    reviews: ReviewItem[];
  };
  tourType?: "multi" | "one";
};

export default function ReviewsSection({ tour, tourType }: ReviewsSectionProps) {
  const t = useTranslations("Booking.ReviewsSection");
  // const tCard = useTranslations("Booking.ReviewCard");

  const reviewsHref =
    tourType === "one"
      ? `/booking/one-day-tours/${tour.slug}/reviews`
      : `/booking/multi-days-tours/${tour.slug}/reviews`;

  const galleryAllMomentHref =
    tourType === "one"
      ? `/gallery/${tour.slug}?filter-one-day-tours=all-moments`
      : `/gallery/${tour.slug}?filter-multi-days-tours=all-moments`;

  const moments = tour.reviewMoments || [];
  const totalExtraImages = 0;
  const totalMomentsCount = moments.length + totalExtraImages;
  const displayTestimonials = tour.reviews.filter((t) => (t.rating ?? 5) === 5).slice(0, 3);

  return (
    <section id="reviews" className="border-t border-white/5 pt-10 lg:pt-16">
      <div className="mb-10 lg:mb-14 lg:grid lg:grid-cols-3 lg:gap-14">
        <div>
          <h2 className="premium-serif mb-4 text-[30px] italic text-white md:text-[36px]">
            {t("title1")} <br className="hidden lg:block" />
            {t("title2")}
          </h2>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <RatingStars rating={tour.rating} className="text-body" />
            <span className="text-body-lead font-bold text-white">{tour.rating}/5</span>
            <span className="whitespace-nowrap text-caption font-bold uppercase tracking-widest text-slate-500">
              ({tour.reviewCount} {t("reviews")})
            </span>
          </div>
        </div>

        <div className="mt-8 lg:col-span-2 lg:mt-0">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="text-body-sm font-bold uppercase tracking-widest text-white">{t("guestMoments")}</h3>

            <Link
              href={galleryAllMomentHref}
              className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-white"
            >
              <span className="text-caption font-bold uppercase tracking-[0.2em]  sm:tracking-[0.2em]">
                {t("viewAll")}
              </span>

              <div className="inline-flex items-center gap-0.5">
                <span className="text-caption font-black">{totalMomentsCount}</span>
                <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={4} />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {moments.map((moment, index) => {
              const isLast = index === moments.length - 1;
              const content = (
                <>
                  <LoadingImage
                    src={moment.src}
                    alt={moment.alt}
                    fill
                    sizes={index === 0 ? "(min-width: 1024px) 380px, 90vw" : "180px"}
                    watermarkClassName="text-[20px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    wrapperClassName="w-full h-full"
                    className="image-render-visible object-cover group-hover:scale-110"
                  />
                  {isLast ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/65">
                      <Images className="mb-2 text-white" size={28} />
                      <span className="px-2 text-center text-micro font-bold uppercase tracking-[0.2em] text-white">
                        {t("viewGallery")}
                      </span>
                    </div>
                  ) : null}
                </>
              );

              return isLast ? (
                <Link
                  href={galleryAllMomentHref}
                  key={`${moment.src}-${index}`}
                  className={`group relative block overflow-hidden border border-white/5 ${
                    index === 0 ? "col-span-2 row-span-2 h-48 rounded-3xl md:h-52" : "h-22.5 rounded-xl md:h-25"
                  }`}
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={`${moment.src}-${index}`}
                  className={`group relative overflow-hidden border border-white/5 ${
                    index === 0 ? "col-span-2 row-span-2 h-48 rounded-3xl md:h-52" : "h-22.5 rounded-xl md:h-25"
                  }`}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="space-y-12">
        {displayTestimonials.slice(0, 2).map((review) => {
          const photosArray = review.photos || [];

          const encodedName = encodeURIComponent(review.name.toLowerCase().trim());
          const specificReviewsGalleryHref =
            tourType === "one"
              ? `/gallery/${tour.slug}?filter-one-day-tours=review-${encodedName}`
              : `/gallery/${tour.slug}?filter-multi-days-tours=review-${encodedName}`;

          return (
            <article
              key={`${review.name}-${review.date}`}
              className="glass-card rounded-4xl border border-white/5 p-6 md:rounded-[2.5rem] md:p-10"
            >
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
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
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="wrap-break-word text-body-sm font-bold leading-tight tracking-wide text-white">
                          {review.name} - {review.country}
                        </h3>
                        <BsPatchCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                        <Crown className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                      </div>
                      <p className="flex items-center gap-2 text-caption font-bold uppercase tracking-[0.18em] text-gold">
                        <CalendarDays className="h-3 w-3 opacity-70 shrink-0" />
                        {review.date}
                      </p>
                    </div>
                  </div>
                </div>
                <RatingStars rating={review.rating} className="text-[13px] md:text-[15px]" />
              </div>

              <p className="mb-6 text-body font-normal italic leading-relaxed text-slate-300"> &quot;{review.text}&quot;</p>

              {photosArray.length > 0 && (
                <div className="no-scrollbar mb-8 flex max-w-full gap-3 overflow-x-auto pb-4">
                  {photosArray.map((photo, index) => {
                    const isLast = index === photosArray.length - 1;
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
                            <span className="text-micro font-bold uppercase text-white">{tCard("view")}</span>
                          </div>
                        )}
                      </>
                    );

                    return isLast ? (
                      <Link
                        href={specificReviewsGalleryHref}
                        key={`${photo.src}-${index}`}
                        className="group relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-24 md:w-24"
                      >
                        {imgContent}
                      </Link>
                    ) : (
                      <div
                        key={`${photo.src}-${index}`}
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
                  <span className="block text-tiny font-bold uppercase tracking-widest text-gold">
                    {tCard("responseFrom")}
                  </span>

                  <p className="mt-2 wrap-break-word text-body-sm font-normal  leading-relaxed text-slate-400">
                    {review.response}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div> */}

      <div className="space-y-12">
        {displayTestimonials.slice(0, 2).map((review) => (
          <ReviewCard
            key={`${review.name}-${review.date}`}
            review={review as unknown as React.ComponentProps<typeof ReviewCard>["review"]}
            slug={tour.slug}
            tourType={tourType}
          />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button variant="explore" className="[&_span]:text-caption! cursor-pointer" href={reviewsHref}>
          {t("showMore")}
        </Button>
      </div>
    </section>
  );
}
