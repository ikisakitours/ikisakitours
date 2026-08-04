"use client";
import React from "react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { useTranslations } from "next-intl";

export default function Leadership() {
  const t = useTranslations("AboutPage.Leadership");

  return (
    <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col items-center text-center">
      <h2 className="premium-serif text-3xl text-white mb-10">{t("title")}</h2>

      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gold/30 mb-6 relative group">
        <LoadingImage
          src="https://i.pravatar.cc/150?u=yuki-tanaka"
          alt={t("name")}
          fill
          sizes="112px"
          className="object-cover opacity-70!  group-hover:scale-110"
          wrapperClassName="w-full h-full"
          watermarkClassName="text-[15px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <h3 className="text-xl font-bold text-white mb-1">{t("name")}</h3>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">{t("role")}</span>
      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">{t("bio")}</p>
    </div>
  );
}