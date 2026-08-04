import React from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Link } from "@/i18nNavigation";
import { Button } from "@/components/ui/Button";
import RatingStars from "./RatingStars";
//Icons
import { Plus, Images, CircleCheck, Crown } from "lucide-react";
import { FaRegCalendarCheck } from "react-icons/fa6";

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
          <h2 className="premium-serif mb-4 text-3xl italic text-white md:text-4xl">
            Customer <br className="hidden lg:block" />
            Reviews
          </h2>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <RatingStars rating={tour.rating} className="text-sm md:text-base" />
            <span className="text-xl font-bold text-white">{tour.rating}/5</span>
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-slate-500">
              ({tour.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="mt-8 lg:col-span-2 lg:mt-0">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white">Guest Moments</h3>

            <Link
              href={galleryAllMomentHref}
              className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-white"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.2em] md:text-[11px]">
                View all
              </span>

              <div className="inline-flex items-center gap-0.5">
                <span className="text-[10px] font-black sm:text-[11px] md:text-[12px]">{totalMomentsCount}</span>
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
                      <span className="px-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                        View Gallery
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

      <div className="space-y-12">
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
                    <h3 className="wrap-break-word text-sm font-bold leading-tight tracking-wide text-white sm:text-base md:text-xl">
                      {review.name} - {review.country}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-emerald-400">
                        <CircleCheck className="h-3 w-3" />
                        Verified
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-gold">
                        <Crown className="h-3 w-3" />
                        VIP Member
                      </span>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold md:text-xs">
                      <FaRegCalendarCheck className="h-3 w-3 opacity-70" />
                      {review.date}
                    </p>
                  </div>
                </div>
                <RatingStars rating={review.rating} className="text-[12px] md:text-[14px]" />
              </div>

              <p className="mb-6 text-sm font-light italic leading-relaxed text-slate-300 md:text-base">
                {review.text}
              </p>

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
                            <span className="text-[8px] font-bold uppercase text-white">View</span>
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
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-gold md:text-[10px] 3xl:text-xs">
                    Response from MapMate Team
                  </span>
                  <p className="mt-2 wrap-break-word text-xs leading-relaxed text-slate-400 md:text-[13px] 3xl:text-lg">
                    {review.response}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="explore" className="cursor-pointer" href={reviewsHref}>
          Show More Reviews
        </Button>
      </div>
    </section>
  );
}
