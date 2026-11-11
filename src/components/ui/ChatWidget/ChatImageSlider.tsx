"use client";
import React from "react";
import { ImageSlider,SlideData } from "@/components/ui/ImageSlider";
import { useTranslations } from "next-intl";

export function ChatImageSlider() {
  const t = useTranslations("ChatWidget");
  const SLIDER_DATA = t.raw("chatWidgetImages") as SlideData[];
  return (
    <div className="relative w-full h-36 sm:h-40 md:h-32 lg:h-28 rounded-2xl overflow-hidden mb-4 border border-gold/30 shadow-md">
      <ImageSlider slides={SLIDER_DATA} showIndicators={true} className="w-full h-full" />
      <div className="absolute inset-0 bg-linear-to-t from-lanka-black/80 via-transparent to-transparent z-10" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
        <span className="premium-serif text-2xl sm:text-3xl font-bold tracking-[0.3em] uppercase text-white/15 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] select-none">
          Iki<span className="text-gold/25">Saki</span>
        </span>
      </div>
    </div>
  );
}
