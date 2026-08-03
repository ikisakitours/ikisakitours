"use client";

import { LoadingImage } from "@/components/ui/LoadingImage";
import { useEffect, useState } from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { languageBadges } from "@/data/privateVehicle";
import { privateVehicleImagesData, featureCardsData } from "@/data/home";
import SectionBadge from "@/components/home/Events/SectionBadge";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
//Icons
import { MessagesSquare, X } from "lucide-react";
import { Fuel, MapPinned, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
const featureCardsIcons = [MapPinned, Fuel];

export function PrivateVehicle() {
  const t = useTranslations("HomePage.Services.PrivateVehicle");
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isContactOpen ? "hidden" : "";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsContactOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isContactOpen]);

  return (
    <>
      <section
        id="private-Vehicle-Hire"
        className="relative overflow-hidden bg-lanka-dark py-12 md:py-20 xl:py-20 2xl:py-24 3xl:py-32"
      >
        <div className="pointer-events-none absolute -left-20 top-1/4 h-75 w-75 rounded-full bg-gold/10 blur-[100px] md:h-100 md:w-100 md:blur-[120px]" />

        <ContainerLayout>
          <div className="flex flex-col-reverse items-center gap-12 md:gap-16 xl:flex-row xl:gap-24">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-125 xl:w-5/12 xl:max-w-none"
            >
              <div className="relative z-10 overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:rounded-[2.5rem]">
                <LoadingImage
                  src={privateVehicleImagesData[0].src}
                  alt={t("imagesAlt.luxuryVan")}
                  width={2000}
                  height={2500}
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  className="aspect-4/5  sm:aspect-3/4 w-full object-cover  hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:bottom-6 md:left-6 md:right-6 md:rounded-3xl md:p-6">
                  <div className="mb-2 flex items-center gap-3 md:mb-3 md:gap-4">
                    <div className="flex -space-x-2">
                      {languageBadges.map((badge, index) => (
                        <span
                          key={badge}
                          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#050505] text-[8px] font-bold text-white md:h-8 md:w-8 md:text-[10px] ${index % 2 === 0 ? "bg-slate-800" : "bg-slate-700"}`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gold md:text-[9px]">
                      {t("nativeFriendlyText")}
                    </span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-white md:text-sm">&quot;{t("quote")}&quot;</p>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-tr-3xl border-r-2 border-t-2 border-gold/30 md:-right-6 md:-top-6 md:h-32 md:w-32 md:rounded-tr-[3rem]" />
              <div className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rounded-bl-3xl border-b-2 border-l-2 border-gold/30 md:-bottom-6 md:-left-6 md:h-32 md:w-32 md:rounded-bl-[3rem]" />
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="w-full text-left xl:w-7/12"
            >
              <header className="mb-8 md:mb-10 text-left">
                <SectionBadge badge={t("badge")} />
                <h2 className="mb-6 text-3xl font-light leading-[1.2] tracking-tight text-white sm:text-4xl md:mb-8 md:text-5xl xl:text-6xl xl:leading-[1.1]">
                  {t("titlePart1")}
                  <span className="italic text-gold">{t("titleAccent")}</span>
                  <br className="hidden sm:block md:hidden xl:block" />
                  <span className="font-serif">{t("titlePart2")}</span>
                </h2>
                <p className="max-w-none text-sm font-light leading-relaxed text-slate-300 md:text-base xl:text-lg">
                  {t("description")}
                </p>
              </header>

              <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mb-12 md:gap-8">
                {featureCardsData.map(({ id }, index) => {
                  const Icon = featureCardsIcons[index] || Check;
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                      className="group rounded-3xl border border-transparent bg-white/1 p-5 transition-colors hover:border-white/5 hover:bg-white/2 sm:bg-transparent md:p-6"
                    >
                      <Icon className="mb-3 h-5 w-5 text-gold md:mb-4 md:h-6 md:w-6" />
                      <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white md:text-xs">
                        {t(`features.${id}.title`)}
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-400 md:text-sm">
                        {t(`features.${id}.description`)}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="flex w-full flex-col items-center justify-start gap-6 sm:flex-row md:gap-8"
              >
                <Button variant="inquire" href="/services/private-vehicle">
                  {t("hireButtonText")}
                </Button>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="group flex w-full cursor-pointer items-center justify-center gap-4 border-none bg-transparent p-0 text-left sm:w-auto sm:justify-start"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 animate-blink-border transition-all duration-300 group-hover:border-gold group-hover:bg-gold/5 md:h-12 md:w-12">
                    <SiWhatsapp className="h-4 w-4 text-white transition-colors group-hover:text-gold md:h-5 md:w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 transition-colors group-hover:text-white md:text-[12px]">
                      {t("consultText")}
                    </span>
                    <span className="mt-1 whitespace-nowrap text-[9px] font-medium text-gold/80 md:text-[11px]">
                      {t("whatsappText")}
                    </span>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </ContainerLayout>
      </section>

      {/* Modal - Kept Original */}
      <div
        id="contact-modal"
        className={`fixed inset-0 z-100 items-center justify-center p-4 ${isContactOpen ? "flex" : "hidden"}`}
        aria-hidden={!isContactOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={() => setIsContactOpen(false)}
        />
        <div className="relative w-full max-w-sm rounded-[2.5rem] border border-white/10 bg-[#111] p-8 shadow-2xl animate-[fade-in-up_0.3s_ease_both]">
          {/* Modal content unchanged */}
          <button
            type="button"
            onClick={() => setIsContactOpen(false)}
            className="absolute right-6 top-6 text-slate-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
              <MessagesSquare className="h-5 w-5 text-gold" />
            </div>
            <h3 className="text-lg font-light tracking-tight text-white">
              {t("model.modalTitlePart")}
              <span className="italic text-gold"> {t("model.modalTitleAccent")}</span>
            </h3>
          </div>
          <div className="space-y-3">
            <a
              href="https://wa.me/94789187072"
              className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 hover:border-emerald-500/50 hover:bg-emerald-500/5"
            >
              <div className="flex items-center gap-4">
                <SiWhatsapp className="h-5 w-5 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {t("model.modalWhatsapp")}
                </span>
              </div>
            </a>
            <a
              href="mailto:info@elitetransfers.lk"
              className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/5"
            >
              <div className="flex items-center gap-4">
                <MessagesSquare className="h-4.5 w-4.5 text-[#c5a059]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">{t("model.modalEmail")}</span>
              </div>
            </a>
          </div>
          <p className="mt-8 text-center text-[10px] leading-relaxed text-slate-500 whitespace-pre-line">
            {t("model.modalResponseText")}
          </p>
        </div>
      </div>
    </>
  );
}
