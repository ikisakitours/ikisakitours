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

  // 3. FILTERING LOGIC
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
    <section id="blog" className="py-20 md:py-28 xl:py-20 2xl:py-32 3xl:py-40">
      <ContainerLayout>
        {/* Header Section */}
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/20 bg-gold/5 px-4 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">The Journal</span>
            </div>
            <h1 className="premium-serif text-4xl font-light leading-[1.1] text-white sm:text-6xl">
              Curated <span className="gold-gradient-text italic">Experiences</span>
            </h1>
          </div>

          <div className="w-full md:max-w-md lg:w-96">
            <SearchInput
              value={query}
              onChange={(val) => {
                setQuery(val);
                setVisibleCount(INITIAL_COUNT);
              }}
              placeholder="Search articles..."
              count={filteredPosts.length}
              itemLabel="Article"
              className="lg:w-112.5"
            />
          </div>
        </div>

        {/* Categories Trigger Button */}
        <div className="relative mb-12 flex justify-start sm:justify-end">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="group flex w-full items-center justify-center gap-3 rounded-full border border-gold/30 bg-[#0a0a0a] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-gold shadow-[0_10px_30px_rgba(197,160,89,0.1)] transition-all duration-300 hover:border-gold hover:bg-gold sm:w-auto"
          >
            <Filter className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
            <span className="transition-colors duration-300 group-hover:text-black">Filter Categories</span>

            {category !== "all" && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold/20 text-[9px] font-black text-gold transition-all duration-300 group-hover:bg-[#0a0a0a] group-hover:text-gold">
                1
              </span>
            )}
          </button>
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
            description="We couldn't find any articles matching your search or selected category."
            buttonText="Clear Filters"
            onAction={() => {
              setQuery("");
              selectCategory("all");
            }}
          />
        )}

        {/* Footer/Load More */}
        <div className="mt-20 flex flex-col items-center md:mt-24">
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