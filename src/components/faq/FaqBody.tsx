"use client";

import React, { useState, useMemo } from "react";
import { faqData, faqCategories } from "@/data/faqData";
import { Filter } from "lucide-react";
import FaqAccordionList from "@/components/faq/FaqAccordionList";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { SearchInput } from "@/components/ui/SearchInput";

export default function FaqBody() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter FAQs based on Search and Category
  const filteredFaqs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory.toLowerCase() === "all" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqData.length };
    faqData.forEach((faq) => {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    });
    faqCategories.forEach((cat) => {
      if (counts[cat] === undefined) counts[cat] = 0;
    });
    return counts;
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full flex flex-col -mt-24 pb-24">
      {/* Content wrapper using reusable ContainerLayout */}
      <ContainerLayout>
        <div className="mb-16 space-y-8">
          <div className="flex flex-col-reverse justify-between gap-6 lg:flex-row lg:items-center">
            {/* Filter Button */}
            <div className="relative flex justify-start w-full lg:w-auto">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="group flex w-full items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
              >
                <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
                <span className="transition-colors duration-300 group-hover:text-black sm:hidden">
                  Filter Categories
                </span>
                <span className="hidden transition-colors duration-300 group-hover:text-black sm:block">
                  Filter Categories
                </span>
                {activeCategory.toLowerCase() !== "all" && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-[9px] font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-gold">
                    1
                  </span>
                )}
              </button>
            </div>

            {/* Reusable Search Input */}
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for a question..."
              count={filteredFaqs.length}
              itemLabel="Question"
              className="lg:w-96"
            />
          </div>

          <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* FAQ Accordion List */}
        <FaqAccordionList
          filteredFaqs={filteredFaqs}
          openFaqId={openFaqId}
          toggleFaq={toggleFaq}
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          setSearchQuery={setSearchQuery}
          setActiveCategory={setActiveCategory}
        />
      </ContainerLayout>

      {/* Reusable Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={faqCategories}
        selectedCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setOpenFaqId(null);
        }}
        title="FAQ Categories"
        categoryCounts={categoryCounts}
      />
    </section>
  );
}
