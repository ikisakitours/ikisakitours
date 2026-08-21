"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function Trademark() {
  const t = useTranslations("AboutPage.Trademark");
  const currentYear = new Date().getFullYear();

  return (
    <div className="rounded-3xl bg-lanka-black border border-white/5 p-8 md:p-10 text-caption text-slate-500 leading-relaxed text-center space-y-6">
      {/* Top Corporate Branding Line */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-400 font-medium">
        <span className="text-white text-body tracking-wide">Map Mate™</span>
        <span className="hidden sm:inline text-gold/40">•</span>
        <span className="text-caption text-slate-400 tracking-wider uppercase">{t("tagline")}</span>
      </div>

      {/* Legal Ownership Statement */}
      <p className="max-w-3xl mx-auto text-caption text-slate-500 leading-relaxed">
        {t("statement")} <strong className="text-white font-medium text-body-sm">{t("company")}</strong> © {currentYear}
        . {t("rights")}
      </p>

      {/* Distinct Professional Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5 max-w-2xl mx-auto text-left">
        {/* General Support Desk */}
        <div className="rounded-2xl border border-white/5 bg-white/2 p-4 flex flex-col justify-between space-y-2 transition-colors hover:border-gold/20">
          <div>
            <span className="text-caption font-bold tracking-[0.2em] uppercase text-gold block mb-1">
              {t("generalTitle")}
            </span>
            <p className="text-caption text-slate-400 leading-normal">{t("generalDesc")}</p>
          </div>
          <a
            href={`mailto:${t("email")}`}
            className="text-white hover:text-gold font-medium tracking-wide transition-colors text-body-sm inline-flex items-center gap-1.5 pt-2"
          >
            <span>{t("email")}</span>
          </a>
        </div>

        {/* Corporate Legal Desk */}
        <div className="rounded-2xl border border-white/5 bg-white/2 p-4 flex flex-col justify-between space-y-2 transition-colors hover:border-gold/20">
          <div>
            <span className="text-caption font-bold tracking-[0.2em] uppercase text-gold block mb-1">
              {t("legalTitle")}
            </span>
            <p className="text-caption text-slate-400 leading-normal">{t("inquiry")}</p>
          </div>
          <a
            href={`mailto:${t("legalEmail")}`}
            className="text-white hover:text-gold font-medium tracking-wide transition-colors text-body-sm inline-flex items-center gap-1.5 pt-2"
          >
            <span>{t("legalEmail")}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
