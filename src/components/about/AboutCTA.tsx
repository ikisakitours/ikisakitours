"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutCTA() {
  const t = useTranslations("AboutPage.CTA");

  return (
    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#030303] p-8 sm:p-12 md:p-20 text-center md:text-left border border-gold/40 shadow-[0_40px_100px_rgba(0,0,0,0.98)]">
      <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-gold/70" />
      <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-gold/70" />
      <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-gold/70" />
      <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-gold/70" />

      {/* 2. Top & Bottom Royal Ornamental Lines */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2/3 max-w-lg h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2/3 max-w-lg h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" />

      {/* 3. Ancient Radial Gold Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Background Watermark Text */}
      <div className="absolute inset-0 top-3 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="premium-serif text-[53px] sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[11rem] font-extrabold uppercase tracking-widest text-gold/6 whitespace-nowrap translate-y-12 md:translate-y-0">
          {t("watermark")}
        </span>
      </div>

      {/* Layout Grid / Flex Structure (Unique Content Flow) */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center md:items-start space-y-8 py-4">
        {/* Top Header Row: Badge with Side Line Art */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-between border-b border-gold/20 pb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm bg-[#0a0a0a] border border-gold/40 shadow-[0_4px_20px_rgba(0,0,0,0.8)] relative">
            <div className="absolute inset-1 border border-gold/20 pointer-events-none rounded-2xs" />

            <span className="text-gold text-caption">✦</span>

            <span className="text-caption font-serif font-bold uppercase tracking-[0.25em] text-gold whitespace-nowrap">
              {t("badge")}
            </span>

            <span className="text-gold text-caption">✦</span>
          </div>

          <span className="text-gold/60 font-serif text-body-sm tracking-[0.3em] uppercase hidden md:inline-block">
            ✦ Ceylon Heritage ✦
          </span>
        </div>

        {/* Main Title & Description (Editorial Layout) */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="premium-serif text-3xl sm:text-4xl md:text-[40px]  text-white tracking-wide font-normal leading-[1.2]">
            {t("title")}
          </h2>

          <p className="text-slate-300 text-body leading-relaxed max-w-2xl font-light">{t("description")}</p>
        </div>

        {/* Action Button Section (Aligned with Editorial Theme) */}
        <div className="pt-2 w-full flex justify-center md:justify-end!">
          <Link
            href="/services/bespoke-travel"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#0a0a0a] border border-gold/60 rounded-xl overflow-hidden transition-all duration-500 hover:border-gold shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(197,160,89,0.35)]"
          >
            {/* Background Hover Shimmer Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-gold/0 via-gold/15 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full" />

            {/* Inner Thin Border for Royal Stamp Look */}
            <div className="absolute inset-1.5 border border-gold/30 rounded-lg pointer-events-none transition-colors duration-300 group-hover:border-gold/60" />

            {/* Button Text */}
            <span className="relative z-10 font-serif text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-gold transition-transform duration-300 group-hover:scale-105">
              {t("buttonText")}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
