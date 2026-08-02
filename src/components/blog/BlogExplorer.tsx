"use client";

import { useMemo, useState, useTransition } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { type BlogPost } from "@/data/blog";
import { Button } from "@/components/ui/Button";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput } from "@/components/ui/SearchInput";
import { Filter } from "lucide-react";

type BlogExplorerProps = {
  posts: BlogPost[];
};

const INITIAL_COUNT = 6;

export function BlogExplorer({ posts }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [, startTransition] = useTransition();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dynamicCategories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(posts.map((post) => post.category)));
    return ["all", ...uniqueCategories];
  }, [posts]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    dynamicCategories.forEach((cat) => {
      if (cat === "all") {
        counts[cat] = posts.length;
      } else {
        counts[cat] = posts.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, [posts, dynamicCategories]);

  // FILTERING LOGIC
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, posts, query]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visiblePosts.length < filteredPosts.length;

  function selectCategory(nextCategory: string) {
    startTransition(() => {
      setCategory(nextCategory);
      setVisibleCount(INITIAL_COUNT);
    });
  }

  return (
    <section id="blog" className="pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <ContainerLayout>
        {/* Search Bar & Categories Trigger Button Section */}
        <div className="mb-12 md:mb-16 xl:mb-16 2xl:mb-20 3xl:mb-24 space-y-8">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="relative flex shrink-0 justify-start">
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="group flex w-full items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
              >
                <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
                <span className="transition-colors duration-300 group-hover:text-black sm:hidden">Filter</span>
                <span className="hidden transition-colors duration-300 group-hover:text-black sm:block">
                  Filter Categories
                </span>

                {category !== "all" && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-[9px] font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-gold">
                    1
                  </span>
                )}
              </button>
            </div>

            {/* Search Input */}

            <SearchInput
              value={query}
              onChange={(val) => {
                setQuery(val);
                setVisibleCount(INITIAL_COUNT);
              }}
              placeholder="Search articles..."
              count={filteredPosts.length}
              itemLabel="Article"
              className="md:w-72 lg:w-96"
            />
          </div>

          <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Reusable Category Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={dynamicCategories}
          selectedCategory={category}
          onSelectCategory={selectCategory}
          title="Filter Journal"
          categoryCounts={categoryCounts}
        />

        {/* Blog Posts Grid */}
        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {visiblePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            backgroundText="Journal"
            title="no articles found"
            description={
              <>
                {query.trim() !== "" ? (
                  <>
                    Your search for <span className="text-gold font-bold">&quot;{query}&quot;</span> returned no
                    articles.
                  </>
                ) : (
                  <>
                    Your selected category (<span className="text-gold font-bold">{category}</span>) returned no
                    articles.
                  </>
                )}
                <br />
                Please redefine your search or reset filters.
              </>
            }
            buttonText="Reset Exploration"
            onAction={() => {
              setQuery("");
              selectCategory("all");
            }}
          />
        )}

        {/* Footer/Load More */}
        <div className="mt-10 flex flex-col items-center md:mt-14">
          {hasMore ? (
            <Button
              type="button"
              variant="explore"
              onClick={() => setVisibleCount((count) => count + INITIAL_COUNT)}
              className="w-full max-w-75 justify-center sm:w-auto"
            >
              Load More Experiences
            </Button>
          ) : null}

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-8 bg-gold/20" />
            <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Showing <span className="text-gold">{visiblePosts.length}</span> of{" "}
              <span className="text-white">{filteredPosts.length}</span> Stories
            </p>
            <div className="h-px w-8 bg-gold/20" />
          </div>
        </div>
      </ContainerLayout>
    </section>
  );
}
