"use client";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Link } from "@/lib/i18nNavigation";
import { ShareButton } from "@/components/ui/ShareButton";
import { useTranslations } from "next-intl";
import type { BlogPreview } from "@/services/blogs/types";
import { Heart } from "lucide-react";

type BlogCardProps = {
  post: BlogPreview;
  index: number;
};
export function BlogCard({ post, index }: BlogCardProps) {
  const t = useTranslations("Blog.Card");
  const displayNumber = (index + 1).toString().padStart(2, "0");

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group relative flex min-h-90 flex-col justify-between overflow-hidden rounded-4xl border border-white/5 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/20">
      <div className="premium-serif absolute right-8 top-8 text-6xl font-black text-gold opacity-10 transition-opacity group-hover:opacity-20">
        {displayNumber}
      </div>

      <div className="relative z-10">
        <div className="mb-6 h-20 w-20 overflow-hidden rounded-2xl border border-gold/20">
          <LoadingImage
            src={post.previewImage || "/images/default-blog.jpg"}
            alt={post.title}
            width={160}
            height={160}
            watermarkClassName="text-[15px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            wrapperClassName="w-full h-full"
            className="h-full w-full object-cover grayscale  group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>

        <div className="mb-5 flex items-center justify-between text-caption uppercase tracking-widest text-gold">
          <span className="text-caption uppercase tracking-widest text-gold opacity-60">{post.category}</span>

          <div className="flex items-center gap-2 opacity-60">
            <span>{formattedDate}</span>
            <span className="text-white/30 text-xs">&bull;</span>
          </div>
        </div>

        <h3 className="premium-serif mb-4 text-heading-sub leading-tight text-white transition-colors group-hover:text-gold">
          {post.title}
        </h3>
        <p className="line-clamp-2 font-normal text-body leading-relaxed text-foreground/80 mb-8">{post.summary}</p>

        <div className="flex items-center justify-between text-caption font-bold uppercase tracking-widest text-slate-400/70 transition-colors group-hover:text-slate-400">
          <span>{post.readTime}</span>
          <span className="text-gold/70">By {post.author}</span>
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/10 pt-6">
        <Link
          href={`/blog/${post.slug}`}
          className="text-caption font-bold uppercase tracking-[0.2em] text-gold transition-all hover:tracking-[0.3em]"
        >
          {t("readMore")}
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2" title={`${post.likes} people loved this`}>
            <Heart
              size={21}
              className="fill-gold text-gold transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 group-hover:-rotate-12"
            />
            <span className="text-body-sm font-bold text-slate-500 transition-colors group-hover:text-slate-300">
              {post.likes.toLocaleString()}
            </span>
          </div>
          <ShareButton iconSize={21} title={post.title} text={post.summary} url={`/blog/${post.slug}`} />
        </div>
      </div>
    </article>
  );
}
