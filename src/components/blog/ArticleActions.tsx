"use client";

import { LikeButton } from "@/components/ui/LikeButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { useTranslations } from "next-intl";

type ArticleActionsProps = {
  initialLikes: number;
  postTitle: string;
  postSlug: string;
};

export function ArticleActions({ initialLikes, postTitle, postSlug }: ArticleActionsProps) {
  const t = useTranslations("Blog.Article");

  return (
    <div className="flex items-center gap-3 sm:gap-6">
      <div className="hidden xl:block">
        {/* Desktop */}
        <LikeButton
          initialLikes={initialLikes}
          showLabel={true}
          lovedLabel={t("lovedThis")}
          className="group inline-flex w-full items-center justify-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 transition-all duration-300 hover:scale-105 hover:border-gold/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(197,160,89,0.15)] active:scale-95"
          iconClassName="w-5 h-5 lg:w-5 lg:h-5"
          countClassName="text-body-sm!"
          labelClassName="text-caption!"
          iconSize={21}
        />
      </div>

      <div className="block xl:hidden">
        {/* Mobile */}
        <LikeButton
          initialLikes={initialLikes}
          showLabel={false}
          lovedLabel={t("lovedThis")}
          className="group inline-flex items-center justify-center gap-2 p-2 transition-all duration-300 hover:scale-110 active:scale-95"
          iconClassName="w-5.5 h-5.5 sm:w-5.5 sm:h-5.5"
          countClassName="text-body-sm!"
          iconSize={21}
        />
      </div>

      {/* 3. Share Section */}
      <div className="flex items-center gap-4">
        <span className="hidden xl:inline-block text-caption font-bold uppercase tracking-[0.2em] text-gold">
          {t("shareStory")}
        </span>

        <div className="group flex h-8 w-10 items-center justify-center rounded-full border border-transparent text-slate-400 transition-all hover:scale-110 hover:text-gold sm:h-10 sm:w-10 xl:border-white/10 xl:hover:border-gold">
          <ShareButton
            iconSize={21}
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
