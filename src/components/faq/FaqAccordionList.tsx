"use client";

import React from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useTranslations } from "next-intl";
//Icons
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

interface FaqAccordionListProps {
  filteredFaqs: FaqItem[];
  openFaqId: string | null;
  toggleFaq: (id: string) => void;
  searchQuery: string;
  activeCategory: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
}

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

export default function FaqAccordionList({
  filteredFaqs,
  openFaqId,
  toggleFaq,
  searchQuery,
  activeCategory,
  setSearchQuery,
  setActiveCategory,
}: FaqAccordionListProps) {
  const t = useTranslations("FaqPage");
  const getEmptyDescription = () => {
    const hasSearch = searchQuery.trim().length > 0;
    const hasCategory = activeCategory.toLowerCase() !== "all";
    const translatedCategory = t(`Categories.${activeCategory}`);
    if (hasSearch && hasCategory) {
      return t("EmptyState.descSearchAndCategory", { query: searchQuery, category: translatedCategory });
    } else if (hasSearch) {
      return t("EmptyState.descSearchOnly", { query: searchQuery });
    } else if (hasCategory) {
      return t("EmptyState.descCategoryOnly", { category: translatedCategory });
    }
    return t("EmptyState.descDefault");
  };

  return (
    <div className="space-y-4">
      {filteredFaqs.length === 0 ? (
        <EmptyState
          backgroundText={t("EmptyState.backgroundText")}
          title={t("EmptyState.title")}
          description={getEmptyDescription()}
          buttonText={t("EmptyState.buttonText")}
          onAction={() => {
            setSearchQuery("");
            setActiveCategory("all");
          }}
        />
      ) : (
        filteredFaqs.map((faq) => {
          const isOpen = openFaqId === faq.id;

          return (
            <div
              key={faq.id}
              className={`glass-card rounded-3xl transition-all duration-300 ${isOpen ? "border-gold/30 bg-white/6" : "hover:bg-white/4"}`}
            >
              {/* Header / Trigger */}
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left outline-none"
              >
                <div className="flex flex-col gap-1 pr-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                    {t(`Categories.${faq.category}`)}
                  </span>
                  <h3 className={`text-base font-medium transition-colors ${isOpen ? "text-white" : "text-slate-200"}`}>
                    {faq.question}
                  </h3>
                </div>

                {/* Icon */}
                <div
                  className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${isOpen ? "border-gold/40 bg-gold/10 text-gold" : "border-white/10 text-slate-400"}`}
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {/* Framer Motion Animation Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="faq-answer"
                    variants={butterySmoothVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ originY: 0, ...perfStyle }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-sm text-slate-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}
    </div>
  );
}
