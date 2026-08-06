"use client";
import React from "react";
import { useRouter } from "@/i18nNavigation";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export function ReviewsHeader({ slug }: { slug: string }) {
  const router = useRouter();
  const t = useTranslations("Booking.ReviewsHeader");

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(`/booking/${slug}`);
    }
  };

  return (
    <div className="sticky top-17 z-50 mb-10 w-full border-b border-white/10 bg-lanka-black/90 pb-6 pt-6 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-480 flex-row items-start justify-between px-5 sm:px-8 md:items-center md:px-12 lg:px-16 xl:px-24 2xl:px-40 3xl:px-[8%]">
        <div className="flex-1 pr-4">
          <h1 className="premium-serif text-3xl italic text-white md:text-5xl">{t("title")}</h1>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gold md:text-xs md:tracking-[0.3em]">
            {t("subtitle")}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="group flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2 text-white transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 md:ml-4 md:px-6 md:py-3"
        >
          <X className="h-5 w-5 text-gold group-hover:text-white md:h-4 md:w-4" strokeWidth={3} />
          <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-white md:inline">
            {t("close")}
          </span>
        </button>
      </div>
    </div>
  );
}
