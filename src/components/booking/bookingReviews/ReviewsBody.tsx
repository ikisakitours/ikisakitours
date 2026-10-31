"use client";
import React, { useState, useMemo, useEffect, useRef, useTransition } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { ReviewsHeader } from "@/components/booking/bookingReviews/ReviewsHeader";
import { Cta } from "@/components/booking/bookingReviews/Cta";
import { ReviewCard } from "@/components/booking/bookingReviews/ReviewCard";
import { ReviewForm } from "@/components/booking/bookingReviews/ReviewForm";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { EmptyState } from "@/components/ui/EmptyState";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";
import { usePackageDetails } from "@/hooks/Booking/packageDetails/usePackageDetails";
import { usePackageReviews } from "@/hooks/Booking/packageAllReview/useFetchAllPackageReviews";
import { loadBookingReviewDraft } from "@/utils/bookingReviewDraft";
//Icons
import { Filter } from "lucide-react";

type ReviewsBodyProps = { slug: string; tourType?: "multi" | "one" };
const INITIAL_COUNT = 4;
const DEFAULT_COUNTRY = "No country send"; // fallback until the API sends `country`

export default function ReviewsBody({ slug, tourType }: ReviewsBodyProps) {
  const t = useTranslations("Booking.ReviewsBody");
  const tSidebar = useTranslations("Testimonials.Explorer");
  const tApi = useTranslations("Common.Api");

  const { tour, isLoading: tourLoading, error: tourError, isNotFound, refetch: refetchTour } = usePackageDetails(slug);
  const {
    reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = usePackageReviews(tour?.id);

  const isLoading = tourLoading || (!!tour && reviewsLoading);
  const error = tourError || reviewsError;
  const refetch = () => {
    if (tourError || !tour) refetchTour();
    else refetchReviews();
  };

  const [showForm, setShowForm] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [rating, setRating] = useState<string | number>("all");
  const [sortDate, setSortDate] = useState<"newest" | "oldest">("newest");
  const [restoredDraft, setRestoredDraft] = useState(false);
  const [, startTransition] = useTransition();
  const hasScrolledRef = useRef(false);
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const dynamicCountries = useMemo(() => {
    const unique = Array.from(new Set(reviews.map((r) => r.userSnapshot?.country || DEFAULT_COUNTRY)));
    return ["all", ...unique];
  }, [reviews]);

  // 💡 Count reviews per country
  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicCountries.forEach((c) => {
      counts[c] =
        c === "all" ? reviews.length : reviews.filter((r) => (r.userSnapshot?.country || DEFAULT_COUNTRY) === c).length;
    });
    return counts;
  }, [reviews, dynamicCountries]);

  // 💡 Filter by country and rating
  const filteredReviews = useMemo(() => {
    let result = [...reviews];

    if (countryFilter !== "all") {
      result = result.filter((r) => (r.userSnapshot?.country || DEFAULT_COUNTRY) === countryFilter);
    }
    if (rating !== "all") {
      result = result.filter((r) => r.rating === Number(rating));
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortDate === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [reviews, countryFilter, rating, sortDate]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReviews.length;

  const activeFilterCount = (countryFilter !== "all" ? 1 : 0) + (rating !== "all" ? 1 : 0);

  // Restore the review form after returning from login
  useEffect(() => {
    const id = setTimeout(() => {
      if (loadBookingReviewDraft(slug)) {
        setShowForm(true);
        setRestoredDraft(true);
      }
    }, 0);
    return () => clearTimeout(id);
  }, [slug]);

  useEffect(() => {
    if (!restoredDraft || hasScrolledRef.current) return;
    hasScrolledRef.current = true;

    const id = setTimeout(() => {
      const target = document.getElementById("write-review-anchor");
      if (target) {
        const headerOffset = 130;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 600);
    return () => clearTimeout(id);
  }, [restoredDraft]);

  if (isLoading) {
    return <ApiCallLoader fullScreen={true} text={tApi("loadingReviews")} />;
  }

  if (isNotFound) {
    notFound();
  }

  if (error || !tour) {
    return (
      <ApiCallError
        message={tApi("contentLoadError")}
        title={tApi("failedToLoad")}
        watermark={tApi("errorWatermark")}
        buttonText={tApi("tryAgain")}
        fullScreen={true}
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <ReviewsHeader slug={tour.slug} />
      <ContainerLayout className="min-h-screen py-24 md:py-32">
        <div className="animate-fade-in-up">
          {!showForm && (
            <>
              <Cta onShareClick={() => setShowForm(true)} />

              <div className="mb-8 mt-16 flex items-center justify-between gap-4">
                <h2 className="premium-serif text-[26px] italic text-white md:text-[30px]">{t("title")}</h2>

                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="group flex items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-6 py-3 text-caption! font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:px-8 sm:py-3.5"
                >
                  <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
                  <span className="transition-colors duration-300 group-hover:text-black sm:hidden">
                    {tSidebar("filter")}
                  </span>
                  <span className="hidden transition-colors duration-300 group-hover:text-black sm:block">
                    {tSidebar("filterLanguages")}
                  </span>
                  {activeFilterCount > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-micro font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a]">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="space-y-8 md:space-y-12 3xl:space-y-16">
                {visibleReviews.length > 0 ? (
                  visibleReviews.map((review) => {
                    const formattedReview = {
                      id: review.id,
                      name: review.fullName,
                      firstName: review.userSnapshot?.firstName, // 💡 අලුතින් යවනවා
                      lastName: review.userSnapshot?.lastName,
                      country: review.userSnapshot?.country || DEFAULT_COUNTRY,
                      isVerified: review.userSnapshot?.isVerified, // 💡 Added
                      isVip: review.userSnapshot?.isVip, // 💡 Added
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
                  })
                ) : (
                  <div className="py-10">
                    <EmptyState
                      backgroundText={t("EmptyState.backgroundText")}
                      title={t("EmptyState.title")}
                      description={t("EmptyState.description")}
                      buttonText={t("EmptyState.clearBtn")}
                      onAction={() => {
                        setCountryFilter("all");
                        setRating("all");
                        setSortDate("newest");
                        setVisibleCount(INITIAL_COUNT);
                      }}
                    />
                  </div>
                )}
              </div>

              {visibleReviews.length > 0 && (
                <div className="mt-8 flex flex-col items-center md:mt-14">
                  {hasMore && (
                    <Button
                      type="button"
                      variant="explore"
                      onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
                      className="w-full max-w-75 justify-center sm:w-auto [&_span]:text-caption!"
                    >
                      {t("loadMore")}
                    </Button>
                  )}
                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-px w-8 bg-gold/20" />
                    <p className="whitespace-nowrap text-tiny font-medium uppercase tracking-[0.2em] text-slate-500">
                      {t("showing")} <span className="text-gold">{visibleReviews.length}</span> {t("of")}{" "}
                      <span className="text-white">{filteredReviews.length}</span> {t("stories")}
                    </p>
                    <div className="h-px w-8 bg-gold/20" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {showForm && <ReviewForm slug={tour.slug} tour={tour} onBack={() => setShowForm(false)} />}

        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={dynamicCountries}
          selectedCategory={countryFilter}
          onSelectCategory={(country) =>
            startTransition(() => {
              setCountryFilter(country);
              setVisibleCount(INITIAL_COUNT);
            })
          }
          title={tSidebar("filterLanguages")}
          categoryCounts={countryCounts}
          clearFilterText={tSidebar("Sidebar.clearFilter")}
          categoryLabels={{ all: tSidebar("Sidebar.all") }}
          selectedRating={rating}
          onSelectRating={(val) =>
            startTransition(() => {
              setRating(val);
              setVisibleCount(INITIAL_COUNT);
            })
          }
          selectedSort={sortDate}
          onSelectSort={(val) =>
            startTransition(() => {
              setSortDate(val);
              setVisibleCount(INITIAL_COUNT);
            })
          }
          totalResults={filteredReviews.length}
          labels={{
            categories: tSidebar("Sidebar.filterCountries"),
            rating: tSidebar("Sidebar.rating"),
            allRatings: tSidebar("Sidebar.allRatings"),
            stars: tSidebar("Sidebar.stars"),
            sortByDate: tSidebar("Sidebar.sortByDate"),
            newestFirst: tSidebar("Sidebar.newestFirst"),
            oldestFirst: tSidebar("Sidebar.oldestFirst"),
            showResults: tSidebar("Sidebar.showResults"),
          }}
        />
      </ContainerLayout>
    </>
  );
}
