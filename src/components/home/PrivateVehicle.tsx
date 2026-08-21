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
import { Fuel, MapPinned, Check } from "lucide-react";
import { SiWhatsapp, SiLine } from "react-icons/si";

const featureCardsIcons = [MapPinned, Fuel];

interface PrivateVehicleProps {
  hideImageOnMobile?: boolean;
}

export function PrivateVehicle({ hideImageOnMobile = false }: PrivateVehicleProps) {
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

  const whatsappNumber = "94789187072";
  const defaultMessage = t("appDefaultText");
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
  const lineLink = "https://line.me/ti/p/dcnpathiran";

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
              className={`relative w-full max-w-125 xl:w-5/12 xl:max-w-none ${
                hideImageOnMobile ? "hidden md:block" : ""
              }`}
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
                    <span className="text-tiny font-black uppercase tracking-[0.2em] text-gold">
                      {t("nativeFriendlyText")}
                    </span>
                  </div>
                  <p className="text-body-sm font-medium leading-relaxed text-white">&quot;{t("quote")}&quot;</p>
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
                <p className="max-w-none font-light leading-relaxed  text-slate-300 text-body">{t("description")}</p>
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
                      <h4 className="mb-2 text-body-sm font-bold uppercase tracking-widest text-white">
                        {t(`features.${id}.title`)}
                      </h4>
                      <p className="text-body leading-relaxed text-slate-400">{t(`features.${id}.description`)}</p>
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
                <Button variant="inquire" className="text-caption!" href="/services/private-vehicle">
                  {t("hireButtonText")}
                </Button>
                <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-start">
                  <div className="flex gap-3">
                    {/* 1. WhatsApp Button */}
                    <button
                      type="button"
                      onClick={() => window.open(waLink, "_blank")}
                      className="group flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#25D366]/40 bg-transparent shadow-[0_0_10px_rgba(37,211,102,0.2)] animate-pulse transition-all duration-300 hover:-translate-y-1 hover:animate-none hover:border-[#25D366] hover:bg-[#25D366]/10 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)] md:h-12 md:w-12"
                      aria-label="WhatsApp Contact"
                    >
                      <SiWhatsapp className="h-5 w-5 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#25D366] md:h-5 md:w-5" />
                    </button>

                    {/* 2. Line Button */}
                    <button
                      type="button"
                      onClick={() => window.open(lineLink, "_blank")}
                      className="group flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#00C300]/40 bg-transparent shadow-[0_0_10px_rgba(0,195,0,0.2)] animate-pulse transition-all duration-300 hover:-translate-y-1 hover:animate-none hover:border-[#00C300] hover:bg-[#00C300]/10 hover:shadow-[0_0_15px_rgba(0,195,0,0.5)] md:h-12 md:w-12"
                      aria-label="Line Contact"
                    >
                      <SiLine className="h-5 w-5 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#00C300] md:h-5 md:w-5" />
                    </button>
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="whitespace-nowrap text-caption font-bold uppercase tracking-[0.15em] text-white/80">
                      {t("consultText")}
                    </span>
                    <span className="mt-1 whitespace-nowrap text-caption font-medium text-gold/80">{t("appText")}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </ContainerLayout>
      </section>
    </>
  );
}
