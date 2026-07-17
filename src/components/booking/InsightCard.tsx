import React from "react";
import Link from "next/link";
import Image from "next/image";
//Icon
import { ArrowRight } from "lucide-react";

export type InsightType = {
  category: string;
  label: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
};

export default function InsightCard({ item }: { item: InsightType }) {
  return (
    <Link
      href={`/blog/${item.slug}`}
      className="glass-card group flex flex-col min-w-[85vw] snap-center overflow-hidden rounded-4xl border border-white/5 transition-all duration-700 hover:border-gold/40 sm:min-w-[45vw] xl:min-w-0"
    >
      <div className="relative h-48 shrink-0 overflow-hidden">
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full border border-gold/40 bg-black/80 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gold backdrop-blur-md">
            {item.category}
          </span>
        </div>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1280px) 380px, 85vw"
          className="image-render-visible object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex grow flex-col p-6">
        <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gold">{item.label}</div>
        <h4 className="premium-serif mb-3 text-xl font-bold leading-tight text-white">{item.title}</h4>
        <p className="mb-6 line-clamp-2 text-sm font-light text-slate-400">{item.excerpt}</p>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5">
          <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-gold transition-all duration-300 group-hover:gap-5 group-hover:text-white">
            Read Article
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
