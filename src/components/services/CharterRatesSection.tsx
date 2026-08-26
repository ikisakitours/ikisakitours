"use client";

import React from "react";
import { Info, CheckCircle2, ArrowUpCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function CharterRatesSection() {
  const t = useTranslations("Services.CharterRates");
  const notes = t.raw("notes") as string[];

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full mt-8 mb-8 bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col xl:flex-row gap-10 xl:gap-16">
        {/* Left Side: Explanation & Highlight */}
        <div className="xl:w-1/3 flex flex-col gap-6">
          <div>
            <h2 className="text-heading-sub font-bold text-white premium-serif mb-4">
              {t("titleBase")} <span className="text-gold">{t("titleAccent")}</span>
            </h2>
            <p className="text-body-sm text-slate-300 leading-relaxed mb-4">
              <strong className="text-white text-body">{t("subtitleStrong")}</strong>
              <br />
              <br />
              {t("subtitle")}
            </p>
          </div>

          {/* Most Popular Highlight Card */}
          <div className="relative bg-gold/3 border border-gold/30 rounded-xl p-6 mt-2 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 blur-2xl rounded-full" />
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-caption font-extrabold text-gold tracking-widest uppercase">
                {t("popularBadge")}
              </span>
            </div>
            <h3 className="text-heading-sub-sm text-white font-bold mb-2">{t("popularTitle")}</h3>
            <p className="text-body-sm text-slate-400">{t("popularDesc")}</p>
          </div>
        </div>

        {/* Right Side: Important Notes */}
        <div className="xl:w-2/3 flex flex-col pt-8 xl:pt-0 xl:pl-12 border-t xl:border-t-0 xl:border-l border-white/10 mt-2 xl:mt-0">
          <div className="flex items-center gap-2.5 mb-6">
            <Info className="w-5 h-5 text-gold" />
            <h4 className="text-body font-bold text-white tracking-wide">{t("notesTitle")}</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
            {notes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <CheckCircle2 className="w-4.5 h-4.5 text-gold/40 mt-0.75 shrink-0 group-hover:text-gold transition-colors duration-300" />
                <p className="text-body-sm text-slate-300 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col items-center text-center">
        <button
          onClick={scrollToForm}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-[#050505] rounded-xl font-bold text-body-sm whitespace-nowrap transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_25px_rgba(197,160,89,0.4)] hover:-translate-y-1"
        >
          {t("ctaButton")}
          <ArrowUpCircle className="w-5 h-5 shrink-0 transition-transform" />
        </button>
        <p className="text-tiny text-slate-400 mt-4 max-w-md mx-auto">{t("ctaDesc")}</p>
      </div>
    </section>
  );
}
