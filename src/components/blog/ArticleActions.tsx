"use client";

import { LikeButton } from "@/components/ui/LikeButton";
import { ShareButton } from "@/components/ui/ShareButton";

type ArticleActionsProps = {
  initialLikes: number;
  postTitle: string;
  postSlug: string;
};

export function ArticleActions({ initialLikes, postTitle, postSlug }: ArticleActionsProps) {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
      {/* Like Button */}
      <LikeButton
        initialLikes={initialLikes}
        showLabel={true}
        className="group inline-flex w-full items-center justify-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 transition-all duration-300 hover:scale-105 hover:border-gold/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(197,160,89,0.15)] active:scale-95 md:w-auto"
      />

      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Share Story</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:scale-110 hover:border-gold hover:text-gold">
          <ShareButton title={postTitle} text={`Check out this story: ${postTitle}`} url={`/blog/${postSlug}`} />
        </div>
      </div>
    </div>
  );
}
