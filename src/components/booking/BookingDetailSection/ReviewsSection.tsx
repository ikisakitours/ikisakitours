"use client";

import React from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Link } from "@/lib/i18nNavigation";
import { Button } from "@/components/ui/Button";
import RatingStars from "./RatingStars";
import { useTranslations } from "next-intl";
import { ReviewCard } from "../bookingReviews/ReviewCard";
import { usePackageReviewSummary } from "@/hooks/Booking/packageSummaryReview/usePackageReviewSummary";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";
//Icons
import { Plus, Images, Quote, Star, Camera, PenLine, ArrowRight } from "lucide-react";

type ReviewsSectionProps = {
  tour: {
    id: string;
    slug: string;
    title: string;
  };
  tourType?: "multi" | "one";
};

export default function ReviewsSection({ tour, tourType }: ReviewsSectionProps) {
  const t = useTranslations("Booking.ReviewsSection");
  const tApi = useTranslations("Common.Api");

  const { summary, isLoading, error, refetch } = usePackageReviewSummary(tour.id);
  const reviewsHref =
    tourType === "one"
      ? `/booking/one-day-tours/${tour.slug}/reviews`
      : `/booking/multi-days-tours/${tour.slug}/reviews`;

  // Link to write a review (used by the empty state)

  const galleryAllMomentHref =
    tourType === "one"
      ? `/gallery/${tour.slug}?filter-one-day-tours=all-moments`
      : `/gallery/${tour.slug}?filter-multi-days-tours=all-moments`;

  if (isLoading) {
    return (
      <section id="reviews" className="border-t border-white/5 pt-10 lg:pt-16">
        <div className="relative min-h-87.5 w-full rounded-4xl overflow-hidden flex items-center justify-center">
          <ApiCallLoader text={tApi("loadingReviews")} fullScreen={false} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="reviews" className="border-t border-white/5 pt-10 lg:pt-16">
        <ApiCallError
          message={tApi("contentLoadError")}
          title={tApi("failedToLoad")}
          watermark={tApi("errorWatermark")}
          buttonText={tApi("tryAgain")}
          fullScreen={false}
          onRetry={refetch}
        />
      </section>
    );
  }

  // No reviews yet: show an inviting empty state instead of fake numbers
  if (!summary || summary.totalReviews <= 0) {
    const hints = [
      { Icon: Star, label: t("hintRate") },
      { Icon: PenLine, label: t("hintStory") },
      { Icon: Camera, label: t("hintPhotos") },
    ];

    return (
      <section id="reviews" className="border-t border-white/5 pt-10 lg:pt-16">
        <h2 className="premium-serif mb-8 text-[30px] italic text-white md:text-[36px]">
          {t("title1")} {t("title2")}
        </h2>

        <div className="relative overflow-hidden rounded-4xl border border-gold/15 bg-linear-to-b from-white/4 to-transparent px-6 py-12 text-center md:px-12 md:py-16">
          {/* Soft glow */}
          <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[70px]" />

          {/* Quote badge */}
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
            <Quote className="h-7 w-7 text-gold" strokeWidth={1.5} />
          </div>

          <h3 className="premium-serif relative mb-3 text-heading-sub italic text-white">{t("emptyTitle")}</h3>
          <p className="relative mx-auto mb-8 max-w-md text-body-sm text-slate-400">{t("emptyDescription")} </p>

          {/* Hint chips */}
          <div className="relative mb-10 flex flex-wrap items-center justify-center gap-2.5">
            {hints.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-tiny font-semibold uppercase tracking-widest text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 text-gold" />
                {label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={reviewsHref}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-linear-to-r from-gold-dark via-gold to-gold-light px-8 py-3.5 text-caption font-black uppercase tracking-[0.25em] text-lanka-black shadow-[0_10px_30px_-10px_rgba(197,160,89,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(197,160,89,0.9)] active:scale-95"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            <span className="relative">{t("writeReview")}</span>{" "}
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    );
  }

  // From here on, reviews exist
  const averageRating = summary.averageRating;
  const totalReviews = summary.totalReviews;

  const totalMomentsCount =
    summary.totalImages ?? (summary.randomImageSets ? summary.randomImageSets.flat().length : 0);

  const flatImages = summary.randomImageSets ? summary.randomImageSets.flat() : [];
  const moments = flatImages.slice(0, 5).map((imgUrl, index) => ({
    src: imgUrl,
    alt: `${tour.title} moment ${index + 1}`,
  }));
  const topReviews = summary.topReviews || [];
  const DEFAULT_COUNTRY = "No country send";

  return (
    <section id="reviews" className="border-t border-white/5 pt-10 lg:pt-16">
      <div className="mb-10 lg:mb-14 lg:grid lg:grid-cols-3 lg:gap-14">
        <div>
          <h2 className="premium-serif mb-4 text-[30px] italic text-white md:text-[36px]">
            {t("title1")} <br className="hidden lg:block" />
            {t("title2")}
          </h2>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <RatingStars rating={averageRating} className="text-body" />
            <span className="text-body-lead font-bold text-white">{averageRating.toFixed(1)}/5</span>
            <span className="whitespace-nowrap text-caption font-bold uppercase tracking-widest text-slate-500">
              ({totalReviews} {t("reviews")})
            </span>
          </div>
        </div>

        <div className="mt-8 lg:col-span-2 lg:mt-0">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="text-body-sm font-bold uppercase tracking-widest text-white">{t("guestMoments")}</h3>

            {totalMomentsCount > 0 && (
              <Link
                href={galleryAllMomentHref}
                className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-white"
              >
                <span className="text-caption font-bold uppercase tracking-[0.2em] sm:tracking-[0.2em]">
                  {t("viewAll")}
                </span>

                <div className="inline-flex items-center gap-0.5">
                  <span className="text-caption font-black">{totalMomentsCount}</span>
                  <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={4} />
                </div>
              </Link>
            )}
          </div>

          {moments.length > 0 ? (
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
          ) : (
            <p className="text-body-sm text-slate-400 italic">{t("noMoments")}</p>
          )}
        </div>
      </div>

      {topReviews.length > 0 && (
        <div className="space-y-12">
          {topReviews.slice(0, 2).map((review) => {
            const formattedReview = {
              id: review.id,
              name: review.fullName,
              firstName: review.userSnapshot?.firstName, // 💡 අලුතින් යවනවා
              lastName: review.userSnapshot?.lastName,
              country: review.userSnapshot?.country || DEFAULT_COUNTRY,
              isVerified: review.userSnapshot?.isVerified, // 💡 Added
              isVip: review.userSnapshot?.isVip,
              avatar: review.userSnapshot?.avatarUrl,
              date: new Date(review.createdAt).toLocaleDateString(),
              text: review.experience,
              rating: review.rating,
              photos: review.imageUrls?.map((url) => ({ src: url, alt: review.fullName, title: "" })) || [],
              response: review.adminReply || undefined,
            };

            return (
              <ReviewCard
                key={review.id}
                review={formattedReview as unknown as React.ComponentProps<typeof ReviewCard>["review"]}
                slug={tour.slug}
                tourType={tourType}
              />
            );
          })}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Button variant="explore" className="[&_span]:text-caption! cursor-pointer" href={reviewsHref}>
          {t("showMore")}
        </Button>
      </div>
    </section>
  );
}
