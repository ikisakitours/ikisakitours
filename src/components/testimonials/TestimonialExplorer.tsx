"use client";

import { useMemo, useState, useTransition } from "react";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { type Testimonial } from "@/data/testimonials";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { WriteReviewForm } from "@/components/ui/WriteReviewForm";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRouter } from "next/navigation";
//Icons
import { Filter } from "lucide-react";

type TestimonialExplorerProps = {
  testimonials: Testimonial[];
};

const INITIAL_COUNT = 3;

export function TestimonialExplorer({ testimonials }: TestimonialExplorerProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [, startTransition] = useTransition();

  const dynamicLanguages = useMemo(() => {
    const uniqueLanguages = Array.from(new Set(testimonials.map((t) => t.language)));
    return ["all", ...uniqueLanguages];
  }, [testimonials]);

  const languageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicLanguages.forEach((lang) => {
      if (lang === "all") {
        counts[lang] = testimonials.length;
      } else {
        counts[lang] = testimonials.filter((t) => t.language === lang).length;
      }
    });
    return counts;
  }, [testimonials, dynamicLanguages]);

  // 3. FILTERING LOGIC
  const filteredTestimonials = useMemo(() => {
    if (language === "all") {
      return testimonials;
    }
    return testimonials.filter((testimonial) => testimonial.language === language);
  }, [language, testimonials]);

  const [isWritingReview, setIsWritingReview] = useState(false);
  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);
  const hasMore = visibleTestimonials.length < filteredTestimonials.length;

  function selectLanguage(nextLanguage: string) {
    startTransition(() => {
      setLanguage(nextLanguage);
      setVisibleCount(INITIAL_COUNT);
    });
  }

  return (
    <section className="py-12 md:py-16 xl:py-16 2xl:py-20 3xl:py-24 ">
      <ContainerLayout>
        {/* Languages Filter Trigger Button */}
        <div className="mb-12 md:mb-16 xl:mb-16 2xl:mb-20 3xl:mb-24 flex w-full items-center justify-between gap-3">
          <div className="relative h-15 flex items-center">
            <AnimatePresence mode="wait">
              {!isWritingReview ? (
                <motion.div
                  key="leave-mark"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  <Button variant="shine" onClick={() => setIsWritingReview(true)}>
                    Leave Your Mark
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="back-reviews"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  <Button variant="reviewTag" onClick={() => setIsWritingReview(false)}>
                    <ArrowLeft className="h-4 w-4" strokeWidth={3} />
                    BACK TO REVIEWS
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {!isWritingReview && (
            <div className="relative flex justify-end">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="group flex items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
              >
                <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />

                <span className="transition-colors duration-300 group-hover:text-black sm:hidden">Filter</span>

                <span className="hidden transition-colors duration-300 group-hover:text-black sm:block">
                  Filter Languages
                </span>

                {language !== "all" && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-[9px] font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-gold">
                    1
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {isWritingReview ? (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1], 
            }}
            className="mt-12"
          >
            <WriteReviewForm />
          </motion.div>
        ) : (
          <>
            {/* Testimonials Grid */}
            {visibleTestimonials.length > 0 ? (
              <div id="testimonial-grid" className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
                {visibleTestimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            ) : (
              <EmptyState
                backgroundText="Testimonials"
                title="no testimonials found"
                description="We currently don't have any testimonials to display."
                buttonText="Go Back"
                onAction={() => router.push("/")}
              />
            )}

            {/* Pagination / Load More */}
            <div className="mt-10 flex flex-col items-center md:mt-14">
              {hasMore && (
                <Button
                  type="button"
                  variant="explore"
                  onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}
                >
                  Load More Experiences
                </Button>
              )}
              <div className="mt-8 flex items-center gap-3">
                <div className="h-px w-8 bg-gold/20" />
                <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                  Showing <span className="text-gold">{visibleTestimonials.length}</span> of
                  <span className="text-white">{filteredTestimonials.length}</span> Journals
                </p>
                <div className="h-px w-8 bg-gold/20" />
              </div>
            </div>
          </>
        )}
      </ContainerLayout>

      {/* Reusable Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={dynamicLanguages}
        selectedCategory={language}
        onSelectCategory={selectLanguage}
        title="Filter Languages"
        categoryCounts={languageCounts}
      />
    </section>
  );
}
