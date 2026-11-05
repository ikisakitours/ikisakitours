"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ExpandButton from "./ExpandButton";
import { useTranslations } from "next-intl";
import { PackageDetails } from "@/services/Booking/packageDetails/types";

type ActivityDetailsProps = {
  tour: PackageDetails;
};

const perfStyle: React.CSSProperties = {
  willChange: "transform, opacity",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
  transformOrigin: "top",
};

const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth <= 1024;
const perfStiffness = isTablet ? 170 : 120;

const butterySmoothVariants: Variants = {
  initial: { opacity: 0, scaleY: 0.8 },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      bounce: 0,
      damping: 25,
      stiffness: perfStiffness,
      opacity: { ease: "linear", duration: 0.2 },
    },
  },
  exit: { opacity: 0, scaleY: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function ActivityDetails({ tour }: ActivityDetailsProps) {
  const t = useTranslations("Booking.ActivityDetails");
  const [isExpanded, setIsExpanded] = useState(false);

  if (!tour.activityDetails || tour.activityDetails.length === 0) {
    return null;
  }

  const initialItemsCount = 4;
  const hasMultipleItems = tour.activityDetails.length > initialItemsCount;
  const defaultItems = tour.activityDetails.slice(0, initialItemsCount);
  const extraItems = tour.activityDetails.slice(initialItemsCount);

  return (
    <section id="about" className="mb-10 md:mb-14">
      <SectionHeading>{t("title")}</SectionHeading>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-x-10 md:gap-y-12">
        {defaultItems.map((item) => (
          <article key={item.title} className="flex items-start gap-4 md:gap-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
              <Check className="h-3 w-3 text-gold" strokeWidth={3} />
            </span>
            <div>
              <h3 className="mb-1.5 text-body-sm font-bold uppercase tracking-[0.15em] text-white md:tracking-widest">
                {item.title}
              </h3>
              <p className="text-body-sm leading-relaxed text-slate-400 ">{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && hasMultipleItems && (
          <motion.div
            key="extra-activities"
            variants={butterySmoothVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ originY: 0, ...perfStyle }}
            className="overflow-hidden"
          >
            {/* Added top padding to match grid gap without flickering */}
            <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 md:gap-x-10 md:gap-y-12 md:pt-12">
              {extraItems.map((item) => (
                <article key={`extra-${item.title}`} className="flex items-start gap-4 md:gap-5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                    <Check className="h-3 w-3 text-gold" strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-body-sm font-bold uppercase tracking-[0.15em] text-white md:tracking-widest">
                      {item.title}
                    </h3>
                    <p className="text-body-sm leading-relaxed text-slate-400 ">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasMultipleItems && (
        <ExpandButton
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          expandText={t("showAll")}
          collapseText={t("showLess")}
          align="left"
          showBorder={false}
          className="mt-6 px-0!"
        />
      )}
    </section>
  );
}
