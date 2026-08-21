"use client";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { useTranslations } from "next-intl";

export default function ContactIntroCard() {
  const t = useTranslations("ContactPage.IntroCard");

  const SLIDER_DATA = t.raw("slides") as { image: string; alt: string; badge: string; desc: string }[];

  return (
    <div className="glass-card rounded-[2.5rem] p-6 md:p-10 lg:p-12 flex flex-col xl:flex-row items-center gap-10 md:gap-12 xl:gap-16 mb-12 border border-white/10">
      <div className="w-full xl:flex-1 flex flex-col justify-center space-y-5 md:space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 border border-gold/20 w-fit">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gold">{t("badge")}</span>
        </div>

        <h1 className="premium-serif text-heading-section text-white leading-tight">
          {t("titleMain")} <br className="hidden md:block" /> {t("titleBreak")}
        </h1>

        <p className="text-slate-400 text-body leading-relaxed">{t("description")}</p>
      </div>

      <div
        className="relative w-full xl:w-[45%] h-50 md:h-75 xl:h-87.5 border border-white/10 z-10"
        style={{ borderRadius: "32px", overflow: "hidden", transform: "translateZ(0)" }}
      >
        <ImageSlider slides={SLIDER_DATA} showIndicators={true} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
