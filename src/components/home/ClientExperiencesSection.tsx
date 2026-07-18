"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/data/testimonials";
import { WriteReviewForm } from "@/components/ui/WriteReviewForm";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Quote, Star, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

function Stars({ className, count = 5 }: { className: string; count?: number }) {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${className} ${index < count ? "" : "opacity-20"}`}
          fill={index < count ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export function ClientExperiencesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isWritingReview, setIsWritingReview] = useState(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
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
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-center md:text-left"
          >
            <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Client Experiences</span>
            </div>
            <h2 className="font-serif text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Voices of
              <span className="bg-[linear-gradient(to_right,#d4af37,#fbe106,#c5a028)] bg-clip-text font-normal italic text-transparent pl-3">
                MapMate
              </span>
            </h2>
          </motion.div>

          {!isWritingReview && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="flex shrink-0 items-center space-x-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="border-r border-white/10 pr-6 text-center">
                <div className="text-4xl font-light leading-none text-white">{averageScore}</div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gold">Average Score</div>
              </div>
              <div>
                <div className="mb-3">
                  <Stars className="h-3.5 w-3.5 text-gold" count={starCount} />
                </div>
                <p className="text-xs font-light tracking-wide text-slate-400">
                  Based on <span className="font-bold text-white">{reviewCountDisplay}</span> global reviews
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
                    <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={3} />
                    BACK TO REVIEWS
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isWritingReview && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1], // Fluid "Out Expo" ease
              }}
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
        {isWritingReview ? (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1], 
            }}
          >
            <WriteReviewForm />
          </motion.div>
        ) : (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-12 scrollbar-none [-ms-overflow-style:none] sm:gap-6 md:gap-8 xl:grid xl:grid-cols-3 xl:overflow-visible xl:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.slice(0, 3).map((testimonial) => (
                <motion.article
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ willChange: "transform, opacity" }}
                  key={testimonial.name}
                  className="group relative flex w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-white/10 bg-[#111] p-6 transition-colors duration-500 hover:border-gold/30 sm:w-[60%] md:w-[45%] lg:w-[40%] md:p-8 xl:w-auto xl:min-w-0"
                >
                  <div className="grow">
                    <div className="mb-6 flex items-start justify-between md:mb-8">
                      <Quote className="h-7 w-7 text-gold/30 md:h-8 md:w-8" fill="currentColor" />
                      <span className="rounded border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {testimonial.language}
                      </span>
                    </div>
                    <div className="mb-4 md:mb-6">
                      <Stars className="h-2.5 w-2.5 text-gold" />
                    </div>
                    <p className="mb-8 text-base font-light italic leading-relaxed text-slate-300 md:mb-10 md:text-lg">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="mt-auto flex items-start gap-4 border-t border-white/5 pt-6 sm:items-center">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#c5a059]/30 bg-white/5 shadow-lg sm:h-12 sm:w-12">
                      {testimonial.avatar ? (
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          sizes="(max-width: 768px) 40px, 48px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-[10px] font-bold uppercase text-[#c5a059] sm:text-xs">
                          {testimonial.initials}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h6 className="truncate text-xs font-bold uppercase tracking-widest text-white sm:text-sm">
                            {testimonial.name}
                          </h6>
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.2em] text-[#c5a059]/60 sm:text-[10px]">
                          <CalendarCheck className="h-2.5 w-2.5 opacity-80" />
                          <span>{testimonial.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="mt-12 flex justify-center md:mt-20"
            >
              <Button variant="explore" href="/testimonials">
                Explore More Testimonials
              </Button>
            </motion.div>
          </div>
        )}
      </ContainerLayout>
    </section>
  );
}
