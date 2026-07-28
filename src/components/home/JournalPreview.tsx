"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { motion } from "framer-motion";
import { journalPreviewContent } from "@/data/home";
import { blogPosts } from "@/data/blog";
import SectionBadge from "@/components/home/SpecialEvents/SectionBadge";
//icons
import { ArrowRight } from "lucide-react";

export function JournalPreview() {
  return (
    <section id="blog" className="overflow-hidden bg-lanka-black py-12 md:py-20 xl:py-20 2xl:py-24 3xl:py-32">
      <ContainerLayout>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end 3xl:mb-28"
        >
          <div className="max-w-2xl">
            <SectionBadge badge={journalPreviewContent.badge} />
            <h2 className="font-serif text-3xl font-light leading-[1.1] text-white sm:text-5xl md:text-6xl 3xl:text-7xl">
              {journalPreviewContent.titlePart1}{" "}
              <span className="gold-gradient-text italic">{journalPreviewContent.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-md text-base font-light italic leading-relaxed text-slate-400 md:text-lg lg:mb-2 3xl:max-w-xl 3xl:text-xl">
            {journalPreviewContent.subtitle}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:gap-y-16 lg:grid-cols-2 xl:gap-x-20 3xl:gap-x-28 3xl:gap-y-20">
          {blogPosts.slice(0, 4).map((post, index) => (
            <motion.article
              key={post.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="group flex flex-row gap-4 sm:gap-6 md:gap-8 3xl:gap-10"
            >
              <div className="shrink-0 text-3xl font-light text-gold/20 transition-all duration-500 group-hover:-translate-y-2 group-hover:text-gold sm:text-4xl md:text-5xl 3xl:text-6xl">
                {post.number}
              </div>
              <div className="flex flex-col">
                <h4 className="mb-3 text-lg leading-snug text-white transition-colors duration-300 group-hover:text-gold sm:text-xl md:text-2xl 3xl:mb-4 3xl:text-3xl">
                  {post.title}
                </h4>
                <p className="line-clamp-2 mb-4 text-sm font-light italic leading-relaxed text-slate-300 md:text-base 3xl:mb-6 3xl:text-lg">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}?from=home`}
                  className="group/link inline-flex w-fit items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gold 3xl:text-xs"
                >
                  {journalPreviewContent.readMoreText}
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-2 3xl:h-4 3xl:w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mt-16 flex w-full items-center justify-center md:mt-24 3xl:mt-32"
        >
          <Button variant="explore" href="/blog">
            {journalPreviewContent.exploreMoreBtn}
          </Button>
        </motion.div>
      </ContainerLayout>
    </section>
  );
}
