"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function MissionVisionSection() {
  const t = useTranslations("AboutPage.MissionVision");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="glass-card rounded-3xl p-8 md:p-10 group hover:border-gold/30 transition-colors duration-300">
        <h3 className="premium-serif text-3xl text-white mb-4 group-hover:text-gold transition-colors">
          {t("missionTitle")}
        </h3>
        <p className="text-foreground/80 text-body leading-relaxed">{t("missionDesc")}</p>
      </div>
      <div className="glass-card rounded-3xl p-8 md:p-10 group hover:border-gold/30 transition-colors duration-300">
        <h3 className="premium-serif text-3xl text-white mb-4 group-hover:text-gold transition-colors">
          {t("visionTitle")}
        </h3>
        <p className="text-foreground/80 text-body leading-relaxed">{t("visionDesc")}</p>
      </div>
    </div>
  );
}
