"use client";
import React, { useState, useMemo } from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { ReviewsHeader } from "@/components/booking/bookingReviews/ReviewsHeader";
import { Cta } from "@/components/booking/bookingReviews/Cta";
import { ReviewCard } from "@/components/booking/bookingReviews/ReviewCard";
import { ReviewForm } from "@/components/booking/bookingReviews/ReviewForm";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import CustomSelect from "@/components/ui/CustomSelect";
import { bookingTour } from "@/data/multiDaysBooking";
import { useTranslations } from "next-intl";
import { ListFilter, ArrowUpDown } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

type ReviewsBodyProps = { tour: typeof bookingTour; tourType?: "multi" | "one" };
const INITIAL_COUNT = 4;

export default function ReviewsBody({ tour, tourType }: ReviewsBodyProps) {
  const t = useTranslations("Booking.ReviewsBody");
  const sortAll = t("sortAll");
  const sortHighest = t("sortHighest");
  const sortLowest = t("sortLowest");
  const SORT_OPTIONS = [sortAll, sortHighest, sortLowest];

  const [showForm, setShowForm] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<string>(sortAll);

  const { categories, categoryCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    const uniqueCats = new Set<string>();

    tour.reviews.forEach((review) => {
      const cat = review.language;
      if (cat) {
        uniqueCats.add(cat);
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    counts["all"] = tour.reviews.length;

    return {
      categories: ["all", ...Array.from(uniqueCats)],
      categoryCounts: counts,
    };
  }, [tour.reviews]);

  const filteredAndSortedReviews = useMemo(() => {
    let result = tour.reviews;
    if (selectedCategory !== "all") result = result.filter((r) => r.language === selectedCategory);
    result = [...result].sort((a, b) => {
      if (sortOrder === sortAll) return 0;
      const ratingA = a.rating ?? 5;
      const ratingB = b.rating ?? 5;
      if (sortOrder === sortHighest) return ratingB - ratingA;
      else if (sortOrder === sortLowest) return ratingA - ratingB;
      return 0;
    });
    return result;
  }, [tour.reviews, selectedCategory, sortOrder, sortAll, sortHighest, sortLowest]);

  const visibleReviews = filteredAndSortedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedReviews.length;
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <>
      <ReviewsHeader slug={tour.slug} />
      <ContainerLayout className="min-h-screen py-24 md:py-32">
        <div className="animate-fade-in-up">
          {!showForm && (
            <>
              <Cta onShareClick={() => setShowForm(true)} />
              <div className="mb-8 mt-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="premium-serif text-[26px] italic text-white md:text-[30px]">{t("title")}</h2>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                  <div
                    className={`w-full sm:w-52 rounded-xl transition-all duration-300 ${
                      sortOrder !== sortAll
                        ? "shadow-[0_10px_30px_rgba(197,160,89,0.1)] [&>div>div:first-child]:border-gold/30! [&>div>div:first-child]:bg-[#0a0a0a]! [&>div>div:first-child_span]:text-gold!"
                        : ""
                    }`}
                  >
                    <CustomSelect
                      value={sortOrder}
                      onChange={(val) => {
                        setSortOrder(val);
                        setVisibleCount(INITIAL_COUNT);
                      }}
                      options={SORT_OPTIONS}
                      icon={
                        <ArrowUpDown
                          className="h-4 w-4 text-gold transition-all duration-300 shrink-0"
                          strokeWidth={3}
                        />
                      }
                    />
                  </div>
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className={`group flex w-full sm:w-52 items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300 ${selectedCategory !== "all" ? "border-gold/30 bg-[#0a0a0a] shadow-[0_10px_30px_rgba(197,160,89,0.1)] hover:border-gold hover:bg-gold" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"}`}
                  >
                    <div className="flex items-center gap-3">
                      <ListFilter
                        className={`h-4 w-4 transition-all duration-300 group-hover:scale-110 ${selectedCategory !== "all" ? "text-gold group-hover:text-black!" : "text-gold"}`}
                        strokeWidth={3}
                      />
                      <span
                        className={`text-body-sm transition-colors duration-300 ${selectedCategory !== "all" ? "text-gold group-hover:text-black!" : "text-white group-hover:text-gold"}`}
                      >
                        {t("filterLanguage")}
                      </span>
                    </div>
                    {selectedCategory !== "all" && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-micro font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-gold!">
                        1
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-8 md:space-y-12 3xl:space-y-16">
                {visibleReviews.length > 0 ? (
                  visibleReviews.map((review, index) => (
                    <ReviewCard key={index} review={review} slug={tour.slug} tourType={tourType} />
                  ))
                ) : (
                  <div className="py-10">
                    <EmptyState
                      backgroundText={t("EmptyState.backgroundText")}
                      title={t("EmptyState.title")}
                      description={t("EmptyState.description")}
                      buttonText={t("EmptyState.clearBtn")}
                      onAction={() => {
                        setSelectedCategory("all");
                        setSortOrder(sortAll);
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
                      <span className="text-white">{filteredAndSortedReviews.length}</span> {t("stories")}
                    </p>
                    <div className="h-px w-8 bg-gold/20" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {showForm && <ReviewForm onBack={() => setShowForm(false)} />}

        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          title={t("filterLanguage")}
          categories={categories}
          categoryCounts={categoryCounts}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          clearFilterText={t("Sidebar.clearFilter")}
          categoryLabels={{ all: t("Sidebar.all") }}
        />
      </ContainerLayout>
    </>
  );
}
