"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import { ShareButton } from "@/components/ui/ShareButton";
import { LikeButton } from "@/components/ui/LikeButton";
type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex min-h-90 flex-col justify-between overflow-hidden rounded-4xl border border-white/5 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/20">
      <div className="premium-serif absolute right-8 top-8 text-6xl font-black text-gold opacity-10 transition-opacity group-hover:opacity-20">
        {post.number}
      </div>

      <div className="relative z-10">
        <div className="mb-6 h-20 w-20 overflow-hidden rounded-2xl border border-gold/20">
          <Image
            src={post.image}
            alt=""
            width={160}
            height={160}
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>
        <div className="mb-4 text-[10px] uppercase tracking-widest text-gold opacity-60">
          {post.category} &bull; {post.readTime}
        </div>
        <h3 className="premium-serif mb-4 text-2xl leading-tight text-white transition-colors group-hover:text-gold md:text-3xl">
          {post.title}
        </h3>
        <p className="line-clamp-3 font-light leading-relaxed text-slate-400">{post.excerpt}</p>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-bold uppercase tracking-[0.2em] text-gold transition-all hover:tracking-[0.3em]"
        >
          Read More
        </Link>
        <div className="flex items-center gap-4">
          <LikeButton initialLikes={post.likes} className="flex items-center gap-2 text-gold" />
          <ShareButton title={post.title} text={post.excerpt} url={`/blog/${post.slug}`} />
        </div>
      </div>
    </article>
  );
}
