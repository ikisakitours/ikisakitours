"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SectionHeading from "./SectionHeading";

type DescriptionSectionProps = {
  tour: {
    description: string[];
  };
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

export default function DescriptionSection({ tour }: DescriptionSectionProps) {  const [isExpanded, setIsExpanded] = useState(false);

  const initialParagraphsCount = 3;
  const hasMultipleParagraphs = tour.description.length > initialParagraphsCount;

  const defaultParagraphs = tour.description.slice(0, initialParagraphsCount);
  const extraParagraphs = tour.description.slice(initialParagraphsCount);

  return (
    <section id="description" className="mb-10 md:mb-14 px-1 border-t border-white/5 pt-10 lg:pt-16">
      {/* Spacing & Border added */}
      <SectionHeading>Full description</SectionHeading>
      <div className="text-sm font-light leading-[1.7] text-slate-300 md:text-base md:leading-[1.8] wrap-break-word">
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
