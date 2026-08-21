"use client";

import { useRef, useState, useEffect } from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/data/testimonials";
import { WriteReviewForm } from "@/components/ui/WriteReviewForm";
import { motion, AnimatePresence } from "framer-motion";
import { RatingStars } from "@/components/ui/RatingStars";
import SectionBadge from "@/components/home/Events/SectionBadge";
import { useTranslations } from "next-intl";

//Icons
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";

export function ClientExperiencesSection() {
  const t = useTranslations("HomePage.ClientExperiences");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isWritingReview, setIsWritingReview] = useState(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 280;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  //Ratings
  const totalReviews = testimonials.length;

  const totalRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0);

  const averageScore = testimonials.length > 0 ? (totalRating / testimonials.length).toFixed(1) : "0.0";

  const reviewCountDisplay =
    totalReviews >= 1000 ? `${(totalReviews / 1000).toFixed(1).replace(".0", "")}k+` : `${totalReviews}+`;

  const starCount = Math.round(Number(averageScore));

  const displayTestimonials = testimonials.filter((t) => (t.rating ?? 3) === 5).slice(0, 3);

  const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-lanka-dark py-12 md:py-20 xl:py-20 2xl:py-24 3xl:py-32"
    >
      <div className="absolute right-0 top-0 -z-10 h-75 w-75 rounded-full bg-gold/5 blur-[120px] md:h-125 md:w-125" />

      <ContainerLayout>
        {/*Header Area*/}
        <div className="mb-10 flex flex-col items-center justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="text-center md:text-left"
          >
            <SectionBadge badge={t("badge")} />
            <h2 className="premium-serif  font-light leading-tight text-white text-heading-section">
              {t("titlePart1")}
              <span className=" gold-gradient-text font-normal italic pl-3">{t("titleAccent")}</span>
            </h2>
          </motion.div>

          {!isWritingReview && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
              className="flex shrink-0 items-center space-x-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="border-r border-white/10 pr-6 text-center">
                <div className="text-4xl font-light leading-none text-white">{averageScore}</div>
                <div className="mt-2 text-tiny font-bold uppercase tracking-widest text-gold">{t("avgScoreLabel")}</div>
              </div>
              <div>
                <div className="mb-3">
                  <RatingStars rating={starCount} starClassName="h-3.5 w-3.5 text-gold" />
                </div>
                <p className="text-caption font-light tracking-wide text-slate-400">
                  {t("basedOnText")}
                  <span className="mx-1 font-bold text-white">{reviewCountDisplay}</span>
                  {t("globalReviewsText")}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/*Action Buttons & Controls*/}
        <div className="mb-6 md:mb-8 lg:mb-10 2xl:mb-12 flex w-full items-center justify-between gap-3">
          <div className="relative h-15 flex items-center">
            <AnimatePresence mode="wait">
              {!isWritingReview ? (
                <motion.div
                  key="leave-mark"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: smoothEase }}
                >
                  <Button variant="shine" className="[&_span]:text-tiny!" onClick={() => setIsWritingReview(true)}>
                    {t("leaveMarkBtn")}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="back-reviews"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: smoothEase }}
                >
                  <Button variant="reviewTag" className="[&_span]:text-tiny!" onClick={() => setIsWritingReview(false)}>
                    <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={3} />
                    {t("backReviewsBtn")}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isWritingReview && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="flex items-center justify-end gap-3 xl:hidden"
            >
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all 
                ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:border-gold hover:bg-gold hover:text-black cursor-pointer"}`}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all 
                ${!canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:border-gold hover:bg-gold hover:text-black cursor-pointer"}`}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </div>

        {/*Main Content Area*/}
        <AnimatePresence mode="wait">
          {isWritingReview ? (
            <motion.div
              key="review-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              style={{ willChange: "transform, opacity" }}
            >
              <WriteReviewForm />
            </motion.div>
          ) : (
            <motion.div
              key="testimonials-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              style={{ willChange: "transform, opacity" }}
              className="relative"
              onAnimationComplete={() => checkScrollPosition()}
            >
              <div
                ref={scrollContainerRef}
                onScroll={checkScrollPosition}
                className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scrollbar-none [-ms-overflow-style:none] sm:gap-6 md:gap-8 xl:grid xl:grid-cols-3 xl:overflow-visible xl:pb-0 [&::-webkit-scrollbar]:hidden"
              >
                {displayTestimonials.map((testimonial) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, ease: smoothEase }}
                    style={{ willChange: "transform, opacity" }}
                    key={testimonial.name}
                    className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-[45%] lg:w-[40%] xl:w-auto xl:min-w-0"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
                style={{ willChange: "transform, opacity" }}
                className="mt-16 flex justify-center md:mt-20 3xl:mt-32"
              >
                <Button variant="explore" className="[&_span]:text-caption!" href="/testimonials">
                  {t("exploreMoreTestimonialsBtn")}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ContainerLayout>
    </section>
  );
}
