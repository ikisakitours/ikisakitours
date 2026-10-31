"use client";
import { useMemo } from "react";
import { Link } from "@/lib/i18nNavigation";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { RatingStars } from "@/components/ui/RatingStars";
import { useTranslations } from "next-intl";
import { usePackageSummaries } from "@/hooks/tours/usePackageSummaries";
import { useReviews } from "@/hooks/testimonials/useFetchReviews";
import { mapPackageToRecommendation } from "@/hooks/Booking/related/relatedMappers";
import RecommendationCard from "@/components/booking/RelatedBookingSections/RecommendationCard";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";

//Icons
import { BsPatchCheck } from "react-icons/bs";
import { CalendarCheck, Crown, MessageCircleHeart, ArrowRight } from "lucide-react";

type CrossPromotionSectionProps = {
  tourType?: "multi" | "one";
};

export function CrossPromotionSection({ tourType = "multi" }: CrossPromotionSectionProps) {
  const tCross = useTranslations("Services.CrossPromotion");
  const tApi = useTranslations("Common.Api");
  const tCard = useTranslations("Tours.Card");

  const apiType = tourType === "one" ? "oneday" : "multiday";
  const toursHref = tourType === "one" ? "/tours/one-day" : "/tours/multi-days";

  // ---------- Packages ----------
  const {
    packages,
    isLoading: pkgLoading,
    error: pkgError,
    refetch: refetchPackages,
  } = usePackageSummaries(apiType, 8);

  const displayPackages = useMemo(
    () =>
      [...packages]
        .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
        .slice(0, 4)
        .map((p) => mapPackageToRecommendation(p, tourType, tCard("newBadge"))),
    [packages, tourType, tCard],
  );

  // ---------- Testimonials ----------
  const { data: reviewData, isLoading: revLoading, error: revError, refetch: refetchReviews } = useReviews();

  const displayTestimonials = useMemo(
    () =>
      (reviewData?.comments ?? [])
        .filter((r) => r.isPubliclyVisible && (r.rating ?? 0) >= 4 && r.content?.trim())
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        .slice(0, 4),
    [reviewData],
  );
  return (
    <section className="mt-16 border-t border-white/5 pt-16">
      {/* ================= Packages ================= */}
      {pkgLoading && (
        <div className="relative mb-16 flex min-h-75 items-center justify-center">
          <ApiCallLoader text={tApi("loadingTours")} fullScreen={false} />
        </div>
      )}

      {!pkgLoading && pkgError && (
        <div className="mb-16">
          <ApiCallError
            message={tApi("contentLoadError")}
            title={tApi("failedToLoad")}
            watermark={tApi("errorWatermark")}
            buttonText={tApi("tryAgain")}
            fullScreen={false}
            onRetry={refetchPackages}
          />
        </div>
      )}

      {!pkgLoading && !pkgError && displayPackages.length > 0 && (
        <div className="mb-16">
          <div className="relative mb-8 flex items-center justify-between overflow-hidden py-2">
            <h2 className="premium-serif z-10 -mt-2 flex items-center bg-[#080808] pr-4 text-3xl text-white">
              {tCross("discoverMore")}
            </h2>
            <Link
              href={toursHref}
              className="z-10 flex items-center gap-2 bg-[#080808] pl-4 text-body-sm font-bold uppercase tracking-widest text-gold transition-colors hover:text-white"
            >
              <span> {tCross("viewAll")} </span>
              <span className="flex items-center justify-center bg-[#080808] pl-1">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayPackages.map((item, index) => (
              <div key={item.slug} className={index === 3 ? "hidden md:block xl:hidden" : "block"}>
                <RecommendationCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= Testimonials ================= */}
      {revLoading && (
        <div className="relative flex min-h-75 items-center justify-center">
          <ApiCallLoader text={tApi("loadingReviews")} fullScreen={false} />
        </div>
      )}

      {!revLoading && revError && (
        <ApiCallError
          message={tApi("contentLoadError")}
          title={tApi("failedToLoad")}
          watermark={tApi("errorWatermark")}
          buttonText={tApi("tryAgain")}
          fullScreen={false}
          onRetry={refetchReviews}
        />
      )}

      {!revLoading && !revError && displayTestimonials.length > 0 && (
        <div>
          <div className="relative mb-8 flex items-center justify-between overflow-hidden py-2">
            <h2 className="premium-serif z-10 -mt-2 flex items-center bg-[#080808] pr-4 text-3xl text-white">
              {tCross("discoverMore")}
            </h2>
            <Link
              href="/testimonials"
              className="z-10 flex items-center gap-2 bg-[#080808] pl-4 text-body-sm font-bold uppercase tracking-widest text-gold transition-colors hover:text-white"
            >
              <span> {tCross("readMore")} </span>
              <span className="flex items-center justify-center bg-[#080808] pl-1">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayTestimonials.map((review, index) => {
              const initials =
                review.firstName && review.lastName
                  ? `${review.firstName.charAt(0)}\u2009${review.lastName.charAt(0)}`.toUpperCase()
                  : review.authorName?.charAt(0).toUpperCase() || "U";

              return (
                <div
                  key={review.id}
                  className={`group flex-col justify-between rounded-2xl border border-white/5 bg-[#0a0a0a]/50 p-6 shadow-lg transition-all duration-500 hover:border-gold/30 hover:bg-white/2 hover:shadow-gold/5 ${
                    index === 3 ? "hidden md:flex xl:hidden" : "flex"
                  }`}
                >
                  <div className="mb-5 flex items-start justify-between">
                    <MessageCircleHeart className="h-6 w-6 text-gold/70 transition-colors duration-300 group-hover:text-gold" />
                    <RatingStars rating={review.rating ?? 5} starClassName="h-3.5 w-3.5 text-gold" />
                  </div>

                  <p className="mb-6 line-clamp-4 grow text-body italic leading-relaxed text-slate-300">
                    &quot;{review.content}&quot;
                  </p>

                  <div className="flex w-full items-center gap-4 border-t border-white/5 pt-6">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-white/5 shadow-lg sm:h-14 sm:w-14">
                      <span className="text-xs font-bold uppercase text-gold sm:text-sm">{initials}</span>
                      {review.avatarUrl && review.avatarUrl.trim() !== "" && (
                        <LoadingImage
                          src={review.avatarUrl}
                          alt={`${review.authorName} profile photo`}
                          fill
                          sizes="(max-width: 640px) 48px, 56px"
                          className="object-cover"
                          wrapperClassName="!absolute inset-0 z-10 w-full h-full"
                          isSmall={true}
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="truncate text-caption font-bold uppercase tracking-widest text-white">
                            {review.authorName}
                          </h3>
                          {review.isVerified && <BsPatchCheck className="h-4 w-4 shrink-0 text-emerald-400" />}
                          {review.isVip && <Crown className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />}
                        </div>

                        <div className="flex items-center gap-2 text-tiny font-medium uppercase tracking-[0.2em] text-gold/60">
                          <CalendarCheck className="h-3 w-3 opacity-80" />
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
