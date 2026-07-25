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
    <div className="flex items-center gap-3 sm:gap-6">
      <div className="hidden xl:block">
        {/* Desktop */}
        <LikeButton
          initialLikes={initialLikes}
          showLabel={true}
          className="group inline-flex w-full items-center justify-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 transition-all duration-300 hover:scale-105 hover:border-gold/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(197,160,89,0.15)] active:scale-95"
          iconClassName="w-5 h-5 lg:w-5 lg:h-5"
          countClassName="text-[14px] lg:text-[14px]"
          labelClassName="text-[12px] lg:text-[12px]"
        />
      </div>

      <div className="block xl:hidden">
        {/* Mobile */}
        <LikeButton
          initialLikes={initialLikes}
          showLabel={false}
          className="group inline-flex items-center justify-center gap-2 p-2 transition-all duration-300 hover:scale-110 active:scale-95"
          iconClassName="w-5.5 h-5.5 sm:w-5.5 sm:h-5.5"
          countClassName="text-[14px] sm:text-[14px]"
        />
      </div>

      {/* 3. Share Section */}
      <div className="flex items-center gap-4">
        <span className="hidden xl:inline-block text-[12px] lg:text-[12px] font-bold uppercase tracking-[0.2em] text-gold">
          Share Story
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-slate-400 transition-all hover:scale-110 hover:text-gold sm:h-11 sm:w-11 xl:border-white/10 xl:hover:border-gold">
          <ShareButton
            title={postTitle}
            text={`Check out this story: ${postTitle}`}
            url={`/blog/${postSlug}`}
            iconClassName="w-5 h-5 lg:w-5 lg:h-5"
          />
        </div>
      </div>
    </div>
  );
}
