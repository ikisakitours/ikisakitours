"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { bookingTour } from "@/data/booking";
import { BookingNavigation } from "@/components/booking/BookingNavigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Icons
import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";
import {
  ChevronDown,
  ChevronRight,
  Images,
  Plus,
  Camera,
  Check,
  CircleCheck,
  Glasses,
  MapPin,
  ShieldCheck,
  Crown,
  Star,
  Sun,
  WandSparkles,
  Clock,
  Navigation,
  Leaf,
  Zap,
  Utensils,
  Bed,
  X,
  Compass,
} from "lucide-react";

const essentialIcons = {
  camera: Camera,
  glasses: Glasses,
  sun: Sun,
};

type SharedTourProps = {
  tour: typeof bookingTour;
};

// Includes Description Highlights Section Animations
const perfStyle: React.CSSProperties = {
  willChange: "transform, opacity",
  WebkitBackfaceVisibility: "hidden",
  MozBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  transformOrigin: "top",
};

const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth <= 1024;
const perfStiffness = isTablet ? 170 : 120;

const smoothSpringTransition = {
  type: "spring",
  duration: 0.4,
  bounce: 0,
  damping: 25,
  stiffness: perfStiffness,
} as const;

const butterySmoothVariants: Variants = {
  initial: {
    opacity: 0,
    scaleY: 0.8,
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: {
      ...smoothSpringTransition,

      opacity: { ease: "linear", duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0.8,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

function RatingStars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} aria-label="Five star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-3 w-3" fill="currentColor" />
      ))}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="premium-serif mb-6 text-2xl italic text-white md:mb-8 md:text-3xl">{children}</h2>;
}

function CheckBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="group flex items-start gap-3 md:gap-4">
      <FaCircleCheck className="mt-1 h-4 w-4 shrink-0 text-gold" />
      <span className="text-sm font-light leading-relaxed text-slate-200 transition-colors group-hover:text-white md:text-base">
        {children}
      </span>
    </li>
  );
}

function BookingHeader({ tour }: SharedTourProps) {
  return (
    <section id="header" className="mb-8 md:mb-12">
      <SectionLabel>{tour.location}</SectionLabel>

      <h1 className="premium-serif mb-6 text-3xl leading-[1.1] text-white sm:text-4xl md:text-6xl">
        {tour.title} <br className="hidden sm:block" />
        <span className="gold-gradient-text font-light italic">{tour.titleEmphasis}</span>
      </h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-4 border-b border-white/10 pb-8 md:gap-x-6">
        <div className="flex items-center gap-2">
          <RatingStars className="text-[10px]" />
          <span className="ml-1 text-sm font-bold tracking-widest text-white">{tour.rating}</span>
          <span className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gold/50">
            ({tour.reviewCount} reviews)
          </span>
        </div>

        <div className="hidden h-4 w-px bg-white/10 sm:block" />

        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gold/70" />
          <span className="text-[10px] uppercase tracking-widest text-slate-400">
            Provider: <strong className="text-white">{tour.provider}</strong>
          </span>
        </div>
      </div>
    </section>
  );
}

function BookingGallery({ tour }: SharedTourProps) {
  return (
    <section id="gallery" className="mb-10 grid grid-cols-1 gap-3 md:mb-14 md:grid-cols-3 md:gap-4">
      <div className="group relative h-62.5 overflow-hidden rounded-3xl border border-white/5 sm:h-75 md:col-span-2 md:h-87.5 md:rounded-4xl">
        <Image
          src={tour.gallery[0].src}
          alt={tour.gallery[0].alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 760px, 100vw"
          className="image-render-visible object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="grid h-auto grid-cols-2 gap-3 md:h-87.5 md:grid-cols-1 md:grid-rows-2 md:gap-4">
        <div className="group relative h-37.5 overflow-hidden rounded-[1.2rem] border border-white/5 md:h-full md:rounded-3xl">
          <Image
            src={tour.gallery[1].src}
            alt={tour.gallery[1].alt}
            fill
            sizes="(min-width: 1024px) 360px, 50vw"
            className="image-render-visible object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <Link
          href={`/gallery/${tour.slug}?filter=gallery`}
          className="group relative block h-37.5 overflow-hidden rounded-[1.2rem] border border-white/5 md:h-full md:rounded-3xl"
        >
          <Image
            src={tour.gallery[2].src}
            alt={tour.gallery[2].alt}
            fill
            sizes="(min-width: 1024px) 360px, 50vw"
            className="image-render-visible object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/65">
            <Images className="mb-2 text-white" size={28} />
            <span className="px-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white">
              View Gallery
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function StoryBanner({ tour }: SharedTourProps) {
  return (
    <section className="mb-8 rounded-r-xl border-l-[3px] border-gold bg-gold/5 p-4 sm:p-6 md:mb-14 md:rounded-r-3xl md:border-l-4 md:p-8">
      <h2 className="premium-serif mb-3 flex items-center gap-3 text-lg text-white sm:text-xl md:text-2xl">
        <WandSparkles className="h-5 w-5 shrink-0 text-gold" />
        <span>Journey into the Heart of Wildlife Magic</span>
      </h2>
      <p className="text-[12px] font-light italic leading-relaxed tracking-wide text-slate-400 md:text-sm">
        {tour.lead}
      </p>
    </section>
  );
}

function ActivityDetails({ tour }: SharedTourProps) {
  return (
    <section id="about" className="mb-10 md:mb-14">
      <SectionHeading>About this activity</SectionHeading>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-x-10 md:gap-y-12">
        {tour.activityDetails.map((item) => (
          <article key={item.title} className="flex items-start gap-4 md:gap-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
              <Check className="h-3 w-3 text-gold" />
            </span>
            <div>
              <h3 className="mb-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white md:text-sm md:tracking-widest">
                {item.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-400 md:text-xs">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HighlightsSection({ tour }: SharedTourProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const DEFAULT_COUNT = 6;
  const hasMore = tour.highlights.length > DEFAULT_COUNT;

  const defaultHighlights = tour.highlights.slice(0, DEFAULT_COUNT);
  const extraHighlights = tour.highlights.slice(DEFAULT_COUNT);

  return (
    <section id="highlights" className="mb-10 md:mb-14 px-1">
      <h2 className="premium-serif mb-6 border-l-2 border-gold pl-4 text-2xl italic text-white md:mb-8 md:border-l md:pl-6 md:text-3xl">
        Highlights
      </h2>

      <ul className="space-y-4 md:space-y-6">
        {defaultHighlights.map((highlight: string, idx: number) => (
          <CheckBullet key={idx}>{highlight}</CheckBullet>
        ))}
      </ul>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "h-auto" : "h-0"}`}>
        <AnimatePresence initial={false}>
          {isExpanded && hasMore && (
            <motion.div
              key="extra-highlights"
              variants={butterySmoothVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={perfStyle}
            >
              <ul className="space-y-4 pt-4 md:space-y-6 md:pt-6">
                {extraHighlights.map((highlight: string, idx: number) => (
                  <CheckBullet key={`extra-${idx}`}>{highlight}</CheckBullet>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold transition-colors hover:text-white"
        >
          {isExpanded ? "Show Less" : "Show All Highlights"}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </section>
  );
}

function ItinerarySection({ tour }: SharedTourProps) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  const toggleDay = (dayNum: number) => {
    setOpenDay(openDay === dayNum ? null : dayNum);
  };
  type ItineraryDay = {
    day: number;
    title: string;
    travelTime: string;
    locations: string[];
    route: string[];
    details: string[];
    scenicStops?: string[];
    activities?: string[];
    meals: string;
    accommodation: string;
  };
  return (
    <section id="itinerary" className="mb-10 md:mb-14 px-1">
      <SectionHeading>Itinerary & Meeting Point</SectionHeading>

      <div className="mb-8 flex flex-col gap-4">
        {tour.itinerary.map((day: ItineraryDay) => {
          const isOpen = openDay === day.day;

          return (
            <div
              key={day.day}
              className={`flex flex-col overflow-hidden rounded-2xl border transition-colors duration-500 ${
                isOpen ? "border-gold/40 bg-white/5 shadow-xl" : "border-white/10 bg-black/40 hover:border-white/20"
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleDay(day.day)}
                className="relative flex w-full cursor-pointer items-start justify-between py-10 px-4 sm:py-6 sm:px-5 md:py-5 md:px-6 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-4 sm:items-center md:gap-6">
                  <div
                    className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl transition-colors md:h-14 md:w-14 ${
                      isOpen ? "bg-gold text-lanka-black" : "bg-white/10 text-white"
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest md:text-[10px]">Day</span>
                    <span className="text-lg font-black leading-none md:text-xl">{day.day}</span>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-sm font-bold tracking-wide text-white md:text-lg wrap-break-word">
                      {day.title}
                    </h3>

                    <div className="mt-2 flex flex-col items-start gap-2">
                      <span className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 text-[13px] sm:text-[10px] md:text-xs font-medium tracking-wide text-gold whitespace-nowrap">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <span>Travel Time: {day.travelTime}</span>
                      </span>

                      <span className="flex items-center gap-2 text-[13px] sm:text-[10px] md:text-xs font-medium text-slate-300">
                        <MapPin className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                        {day.locations.join(" • ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-4 md:right-6">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 transition-colors ${
                      isOpen ? "bg-gold/20" : ""
                    }`}
                  >
                    <ChevronDown
                      className={`h-5 w-5 text-gold transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </button>

              {/* BUTTERY SMOOTH CSS ACCORDION BODY */}
              <div className={`accordion-content-wrapper ${isOpen ? "is-open" : ""}`}>
                <div className="accordion-content-inner">
                  <div className="mt-2 border-t border-white/5 p-4 pt-0 sm:p-5 md:p-6">
                    <div className="mb-6 flex flex-wrap items-center gap-2 pt-4 border-b border-white/5 pb-6">
                      {day.route.map((loc: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 rounded-full border border-gold/10 bg-gold/5 px-3 py-1.5 text-xs font-semibold text-gold/90">
                            <Navigation className="h-3 w-3" />
                            {loc}
                          </span>
                          {idx < day.route.length - 1 && <ChevronRight className="h-4 w-4 text-slate-500" />}
                        </div>
                      ))}
                    </div>

                    <ul className="relative mb-8 space-y-4 pl-6 before:absolute before:inset-y-2 before:left-1.75 before:w-px before:bg-white/10">
                      {day.details.map((detail: string, idx: number) => (
                        <li
                          key={idx}
                          className="relative text-sm font-light leading-relaxed text-slate-300 wrap-break-word"
                        >
                          <span className="absolute -left-6 top-1.5 h-2 w-2 rounded-full bg-gold ring-4 ring-lanka-black" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {day.scenicStops && day.scenicStops.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                            <Leaf className="h-3.5 w-3.5" /> Scenic Stops
                          </h4>
                          <ul className="space-y-2">
                            {day.scenicStops.map((stop: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 md:text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/50" />
                                {stop}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {day.activities && day.activities.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                            <Zap className="h-3.5 w-3.5" /> Activities
                          </h4>
                          <ul className="space-y-2">
                            {day.activities.map((activity: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 md:text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/50" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-6 border-t border-white/5 mt-6">
                      <div className="rounded-xl border border-white/5 bg-white/5 p-4 md:p-5">
                        <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-slate-500">
                          Meals Included
                        </span>
                        <div className="flex items-center gap-2 text-sm font-bold text-white md:text-base">
                          <Utensils className="h-4 w-4 text-gold" />
                          {day.meals}
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-white/5 p-4 md:p-5">
                        <span className="mb-1 block text-[9px] font-bold uppercase tracking-widest text-slate-500">
                          Accommodation / Hotel
                        </span>
                        <div className="flex items-center gap-2 text-sm font-bold text-white md:text-base">
                          <Bed className="h-4 w-4 text-gold" />
                          {day.accommodation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function IncludesSection({ tour }: SharedTourProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const DEFAULT_COUNT = 8;
  const extraIncludes = tour.includes.slice(DEFAULT_COUNT);
  const extraExcludes = tour.excludes.slice(DEFAULT_COUNT);
  const hasMore = extraIncludes.length > 0 || extraExcludes.length > 0;

  const displayIncludes = tour.includes.slice(0, DEFAULT_COUNT);
  const displayExcludes = tour.excludes.slice(0, DEFAULT_COUNT);

  return (
    <section id="includes" className="glass-card mb-10 rounded-4xl border border-white/5 p-6 md:mb-14 md:p-10">
      <SectionHeading>What&apos;s Included & Excluded</SectionHeading>

      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {/* Included Column */}
        <div className="flex flex-col flex-1">
          <h3 className="mb-6 flex items-center gap-2 text-sm font-bold text-emerald-400 md:text-base">
            <CircleCheck className="h-5 w-5" /> Included
          </h3>
          <ul className="space-y-4">
            {displayIncludes.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-sm font-light leading-relaxed text-slate-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "h-auto" : "h-0"}`}>
            <AnimatePresence initial={false}>
              {isExpanded && extraIncludes.length > 0 && (
                <motion.div
                  key="extra-includes"
                  variants={butterySmoothVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={perfStyle}
                >
                  <ul className="space-y-4 pt-4 border-t border-white/5 mt-4">
                    {extraIncludes.map((item: string, idx: number) => (
                      <li key={`extra-inc-${idx}`} className="flex items-start gap-3 pt-4">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="text-sm font-light leading-relaxed text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Excluded Column */}
        <div className="flex flex-col flex-1 border-t border-white/5 pt-10 md:border-0 md:pt-0">
          <h3 className="mb-6 flex items-center gap-2 text-sm font-bold text-rose-400 md:text-base">
            <X className="h-5 w-5 rounded-full bg-rose-400/10 p-0.5" /> Excluded
          </h3>
          <ul className="space-y-4">
            {displayExcludes.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3">
                <X className="mt-1 h-4 w-4 shrink-0 text-rose-400" />
                <span className="text-sm font-light leading-relaxed text-slate-400">{item}</span>
              </li>
            ))}
          </ul>

          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "h-auto" : "h-0"}`}>
            <AnimatePresence initial={false}>
              {isExpanded && extraExcludes.length > 0 && (
                <motion.div
                  key="extra-excludes"
                  variants={butterySmoothVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={perfStyle}
                >
                  <ul className="space-y-4 pt-4 border-t border-white/5 mt-4">
                    {extraExcludes.map((item: string, idx: number) => (
                      <li key={`extra-exc-${idx}`} className="flex items-start gap-3 pt-4">
                        <X className="mt-1 h-4 w-4 shrink-0 text-rose-400" />
                        <span className="text-sm font-light leading-relaxed text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center border-t border-white/5 pt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold transition-colors hover:text-white"
          >
            {isExpanded ? "Show Less" : "Show All Included & Excluded"}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </section>
  );
}

function DescriptionSection({ tour }: SharedTourProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialParagraphsCount = 3;
  const hasMultipleParagraphs = tour.description.length > initialParagraphsCount;

  const defaultParagraphs = tour.description.slice(0, initialParagraphsCount);
  const extraParagraphs = tour.description.slice(initialParagraphsCount);

  return (
    <section id="description" className="mb-10 md:mb-14 px-1 border-t border-white/5 pt-10 lg:pt-16">
      {" "}
      {/* Spacing & Border added */}
      <SectionHeading>Full description</SectionHeading>
      <div className="text-sm font-light leading-[1.7] text-slate-300 md:text-base md:leading-[1.8] wrap-break-word">
        {" "}
        {/* wrap fixed */}
        <div className="space-y-4 md:space-y-6">
          {defaultParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && hasMultipleParagraphs && (
            <motion.div
              key="extra-description"
              // --- FIX 6: Applied Buttery Smooth Animation & Style ---
              variants={butterySmoothVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ originY: 0, ...perfStyle }}
              className="overflow-hidden"
            >
              {/* Spacing inside animation to prevent measurement flickering */}
              <div className="space-y-4 pt-4 md:space-y-6 md:pt-6">
                {extraParagraphs.map((paragraph, index) => (
                  <p key={`extra-${index}`}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {hasMultipleParagraphs && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold transition-colors hover:text-white"
        >
          {isExpanded ? "Read Less" : "Read More"}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </section>
  );
}

function EssentialsSection({ tour }: SharedTourProps) {
  return (
    <section id="essentials" className="mb-10 md:mb-14">
      <SectionHeading>What to bring</SectionHeading>
      <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8 md:gap-10">
        {tour.essentials.map((item) => {
          const Icon = essentialIcons[item.icon as keyof typeof essentialIcons];

          return (
            <article key={item.label} className="group flex flex-col items-center text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-all group-hover:border-gold/40 md:mb-4 md:h-20 md:w-20">
                <Icon className="h-6 w-6 text-gold/60 md:h-7 md:w-7" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">
                {item.label}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ReviewsSection({ tour }: SharedTourProps) {
  const moments = tour.reviewMoments || [];
  const totalExtraImages = 0;
  const totalMomentsCount = moments.length + totalExtraImages;
  return (
    <section id="reviews" className="border-t border-white/5 pt-10 lg:pt-16">
      <div className="mb-10 lg:mb-14 lg:grid lg:grid-cols-3 lg:gap-14">
        <div>
          <h2 className="premium-serif mb-4 text-3xl italic text-white md:text-4xl">
            Customer <br className="hidden lg:block" />
            Reviews
          </h2>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <RatingStars className="text-xs" />
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
              href={`/gallery/${tour.slug}?filter=moments`}
              className="inline-flex items-center gap-1.5 text-gold transition-colors hover:text-white"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] sm:tracking-[0.2em] md:text-[11px]">
                View all
              </span>

              <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={4} />

              <span className="text-[10px] font-black sm:text-[11px] md:text-[12px]">{totalMomentsCount}</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {moments.map((moment, index) => {
              const isLast = index === moments.length - 1;
              const content = (
                <>
                  <Image
                    src={moment.src}
                    alt={moment.alt}
                    fill
                    sizes={index === 0 ? "(min-width: 1024px) 380px, 90vw" : "180px"}
                    className="image-render-visible object-cover transition-transform duration-500 group-hover:scale-110"
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
                  href={`/gallery/${tour.slug}?filter=moments`}
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
        {tour.reviews.slice(0, 2).map((review) => (
          <article
            key={`${review.name}-${review.date}`}
            className="glass-card rounded-4xl border border-white/5 p-6 md:rounded-[2.5rem] md:p-10"
          >
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
              <div className="flex w-full max-w-full items-center gap-3 sm:gap-4 md:gap-6">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-white/5 shadow-lg sm:h-14 sm:w-14 md:h-16 md:w-16">
                  <span className="text-xs font-bold text-gold sm:text-sm">{review.initials}</span>
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

              <RatingStars className="text-[10px]" />
            </div>

            <p className="mb-6 text-sm font-light italic leading-relaxed text-slate-300 md:text-base">{review.text}</p>

            <div className="no-scrollbar mb-8 flex max-w-full gap-3 overflow-x-auto pb-4">
              {review.photos &&
                review.photos.map((photo, index) => {
                  const isLast = index === review.photos.length - 1;
                  const imgContent = (
                    <>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        title={photo.title}
                        fill
                        sizes="96px"
                        className="image-render-visible object-cover transition-transform duration-500 group-hover:scale-110"
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
                      href={`/gallery/${tour.slug}?filter=review-${review.name.toLowerCase()}`}
                      key={`${photo}-${index}`}
                      className="group relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-24 md:w-24"
                    >
                      {imgContent}
                    </Link>
                  ) : (
                    <div
                      key={`${photo}-${index}`}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-24 md:w-24"
                    >
                      {imgContent}
                    </div>
                  );
                })}
            </div>
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
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="explore" className="cursor-pointer" href={`/booking/${tour.slug}/reviews`}>
          Show More Reviews
        </Button>
      </div>
    </section>
  );
}

function TourCustomization() {
  return (
    <section
      id="Tour-Customization"
      className="glass-card mb-8 flex flex-col gap-4 rounded-4xl border border-white/5 p-6 sm:flex-row sm:items-start md:mb-10 md:gap-6 md:p-8"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold border border-gold/20 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
        <WandSparkles className="h-6 w-6" />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold text-white md:text-xl">Tour Customization</h3>
        <p className="text-sm leading-[1.7] text-slate-300 md:text-[15px]">
          All MapMate tours are fully customizable. The listed package price includes Half Board accommodation
          (Breakfast & Dinner) and entrance tickets for attractions specifically mentioned in the itinerary. Hotels,
          meal plans, attractions, transportation, and included services can be adjusted according to your travel style
          and budget. A revised quotation will be provided for any customization requests.
        </p>
      </div>
    </section>
  );
}

function CoveredCitiesRoute({ destinations }: { destinations: typeof bookingTour.coveredDestinations }) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <section id="Covered-CitiesRoute" className="glass-card mb-6 rounded-4xl border border-white/5 p-6 md:p-8">
      <div className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
        <MapPin className="h-4 w-4" />
        Covered Cities Route
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {destinations.map((dest, idx) => (
          <React.Fragment key={dest.id}>
            {/* City Pill */}
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-5 transition-colors hover:border-gold/30 hover:bg-white/10">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-[11px] font-black text-lanka-black shadow-md">
                {dest.id}
              </span>
              <span className="text-sm font-semibold tracking-wide text-white">{dest.name}</span>
            </div>

            {/* Arrow Separator */}
            {idx < destinations.length - 1 && <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function CoveredDestinations({ destinations }: { destinations: typeof bookingTour.coveredDestinations }) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <section
      id="Covered-Destinations"
      className="glass-card mb-10 rounded-4xl border border-white/5 p-6 md:mb-14 md:p-8"
    >
      <div className="mb-2 flex items-center gap-3 text-lg font-bold text-white md:text-xl">
        <Compass className="h-6 w-6 text-gold" />
        Covered Destinations
      </div>
      <p className="mb-8 text-sm font-light text-slate-400">
        Explore the places you will visit on this tailor-made journey. Click any destination to view details.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-gold/30 hover:bg-white/10 hover:shadow-lg"
          >
            <div className="relative h-21 w-21 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                sizes="84px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-black text-lanka-black z-10 shadow-sm">
                {dest.id}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="mb-1 text-[15px] font-bold tracking-wide text-white transition-colors group-hover:text-gold">
                {dest.name}
              </h4>
              <p className="line-clamp-2 text-[13px] font-light leading-relaxed text-slate-400">{dest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BookingDetailSections({ tour }: SharedTourProps) {
  return (
    <>
      <BookingHeader tour={tour} />
      <BookingGallery tour={tour} />
      <StoryBanner tour={tour} />
      <BookingNavigation />
      <ActivityDetails tour={tour} />
      <hr className="my-14 border-white/5" />
      <HighlightsSection tour={tour} />
      <ItinerarySection tour={tour} />
      <CoveredCitiesRoute destinations={tour.coveredDestinations} />
      <DescriptionSection tour={tour} />
      <hr className="my-14 border-white/5" />
      <IncludesSection tour={tour} />
      <EssentialsSection tour={tour} />
      <TourCustomization />
      <CoveredDestinations destinations={tour.coveredDestinations} />
      <ReviewsSection tour={tour} />
    </>
  );
}
