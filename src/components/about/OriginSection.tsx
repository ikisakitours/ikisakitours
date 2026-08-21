"use client";
import React from "react";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { useTranslations } from "next-intl";

export default function OriginSection() {
  const t = useTranslations("AboutPage.Origin");

  const SLIDER_DATA = t.raw("slides") as { image: string; alt: string; badge: string; desc: string }[];

  return (
    <div className="glass-card rounded-[2.5rem] p-6 md:p-10 lg:p-12 flex flex-col xl:flex-row items-center gap-10 md:gap-12 xl:gap-16 border border-white/10">
      <div className="w-full xl:flex-1 flex flex-col justify-center space-y-5 md:space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0a0a0a]/90 border border-gold/40 shadow-[0_4px_15px_rgba(0,0,0,0.6)] relative overflow-hidden group w-fit">
          <div className="absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="text-gold text-tiny">✦</span>
          <span className="text-caption font-serif font-bold uppercase tracking-[0.35em] text-gold">{t("badge")}</span>
          <span className="text-gold text-tiny">✦</span>
        </div>

        <h2 className="premium-serif text-heading-section text-white leading-tight">{t("title")}</h2>

        <div className="space-y-4 text-foreground/80  text-body leading-relaxed">
          <p>{t("description1")}</p>
          <p>{t("description2")}</p>
        </div>
      </div>

      {/* Image Slider */}
      <div
        className="relative w-full xl:w-[45%] h-50 md:h-75 xl:h-87.5 border border-white/10 z-10"
        style={{ borderRadius: "32px", overflow: "hidden", transform: "translateZ(0)" }}
      >
        <ImageSlider slides={SLIDER_DATA} showIndicators={true} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
