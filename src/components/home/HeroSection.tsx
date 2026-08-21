"use client";
import Image from "next/image";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { heroStats, heroPopularTags, heroPopularServices, HeroBackGroundImages } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { FaAward } from "react-icons/fa6";
import { motion, Transition } from "framer-motion";
import { OmniSearch } from "./heroSearchField/OmniSearch";
import { useTranslations } from "next-intl";
//Icons
import { Star } from "lucide-react";

const smoothTransition: Transition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
};

export function HeroSection() {
  const t = useTranslations("HomePage.Hero");
  const bgImage = HeroBackGroundImages[0];

  return (
    <header className="relative flex flex-col justify-center text-center bg-[#050505] pt-20 pb-12  sm:py-24 md:py-26 lg:py-28 2xl:py-30 3xl:py-32">
      {/*py-20*/}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <Image
          src={bgImage.url}
          alt={t(`bgImagesAlt.${bgImage.id}`)}
          fill
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="scale-110 object-cover object-center opacity-70 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-r from-lanka-black/90 via-lanka-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-lanka-black via-transparent to-transparent opacity-80" />
      </div>

      <div className="absolute -bottom-0.5 left-0 right-0 z-0 h-1 bg-lanka-dark pointer-events-none" />

      <ContainerLayout className="relative z-10">
        <div className="flex flex-col items-center gap-6 md:gap-10 lg:grid lg:grid-cols-12 lg:gap-12 3xl:gap-16">
          <div className="relative z-50 w-full text-left lg:col-span-7 xl:col-span-8 3xl:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...smoothTransition, delay: 0.1 }}
              style={{ willChange: "transform, opacity" }}
              className="mb-4 flex flex-wrap items-center gap-4 sm:gap-5 md:mb-8 md:gap-6 3xl:mb-12"
            >
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

              <div className="relative z-10 flex items-center space-x-2.5 md:space-x-3">
                <span className="relative flex h-2 w-2 items-center justify-center md:h-2.5 md:w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold md:h-2 md:w-2"></span>
                </span>
                <span className="gold-gradient-text text-caption font-bold uppercase tracking-[0.25em] 3xl:tracking-[0.3em]">
                  {t("content.badge")}
                </span>
              </div>

              <div className="relative z-10 hidden h-4 w-px bg-gold/50 md:mx-5 md:block 3xl:mx-7 3xl:h-5" />

              <div className="relative z-10 flex items-center space-x-2 text-caption uppercase tracking-widest text-foreground/90 md:space-x-3">
                <FaAward className="h-3.5 w-3.5 text-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.6)] md:h-4.5 md:w-4.5 3xl:h-5 3xl:w-5" />
                <span className="pt-px font-medium tracking-[0.15em]">{t("content.award")}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...smoothTransition, delay: 0.2 }}
              style={{ willChange: "transform, opacity" }}
              className="mb-4 font-serif text-heading-hero font-medium leading-[1.1] tracking-tight text-foreground  md:mb-6 3xl:mb-10"
            >
              {t("content.titleMain")}
              <br />
              <span className="mt-1 block pb-2 pr-2 gold-gradient-text font-normal italic md:mt-2 md:pb-4 3xl:pb-6">
                {t("content.titleAccent")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ ...smoothTransition, delay: 0.4 }}
              style={{ willChange: "transform, opacity" }}
              className="mb-6 max-w-lg border-l-2 border-gold/40 pl-4 text-body-lead font-light leading-relaxed text-foreground/90 md:mb-8 md:pl-6 3xl:mb-12 3xl:max-w-4xl 3xl:pl-8"
            >
              {t("content.description")}
              <span className="font-semibold text-foreground"> {t("content.languagesOne")}</span> and
              <span className="font-semibold text-foreground"> {t("content.languagesTwo")}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...smoothTransition, delay: 0.5 }}
              style={{ willChange: "transform, opacity" }}
              className="max-w-2xl 3xl:max-w-4xl"
            >
              <div className="relative z-20">
                <OmniSearch />
              </div>

              {/* 1. Popular Tags - Ultra-Minimal Inline Row */}
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 px-1 sm:mt-4 md:gap-x-4 3xl:mt-5">
                <span className="flex items-center gap-1.5 text-caption font-bold uppercase tracking-[0.2em] text-foreground/40">
                  <span className="h-1 w-1 rounded-full bg-gold/50" /> {/* Tiny subtle dot */}
                  {t("content.popularLabel")}
                </span>
                <div className="hidden h-3 w-px bg-foreground/10 sm:block" />
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  {heroPopularTags.map((tag, idx) => (
                    <Button
                      key={idx}
                      variant="tag"
                      href={tag.href}
                      className="text-caption font-medium text-foreground/60 transition-colors hover:text-gold"
                    >
                      {t(`popularTags.${tag.id}`)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 2. Premium Services - The Luxury Dock Layout */}
              <div className="mt-8 flex flex-col gap-4 sm:mt-10 md:mt-12 md:gap-5 3xl:mt-16">
                {/* Elegant Section Divider */}
                <div className="flex w-full items-center justify-start gap-4 opacity-80">
                  <div className="hidden h-px w-10 bg-linear-to-r from-transparent to-gold/50 sm:block md:w-16 3xl:w-20" />
                  <p className="whitespace-nowrap text-center text-caption font-bold uppercase tracking-[0.25em] text-gold sm:text-left">
                    {t("content.servicesHeading")}
                  </p>
                  <div className="hidden h-px w-10 bg-linear-to-r from-gold/50 to-transparent sm:block md:w-16 3xl:w-20" />
                </div>

                {/* Service Buttons Row */}
                <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 3xl:gap-6">
                  {heroPopularServices.map((service, idx) => (
                    <Button key={idx} variant="service" href={service.href}>
                      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(197,160,89,0.5)_50%,transparent_100%)] transition-all duration-500 group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(241,213,146,1)_50%,transparent_100%)]" />
                      <span className="relative flex h-full w-full items-center justify-center rounded-full bg-surface/90 px-3.5 py-2 backdrop-blur-xl transition-colors duration-500 group-hover:bg-surface/70 md:px-4 md:py-2 3xl:px-5 3xl:py-2.5">
                        <span className="relative z-10 text-body-sm! font-medium tracking-wider text-foreground/80 transition-colors group-hover:text-white">
                          {t(`popularServices.${service.id}`)}
                        </span>
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex w-full flex-row justify-center gap-3 md:gap-4 lg:col-span-5 lg:flex-col lg:items-end xl:col-span-4 3xl:col-span-3 3xl:gap-8">
            {heroStats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.8 + idx * 0.4,
                }}
                style={{ willChange: "opacity" }}
                className="transform-gpu group flex flex-1 flex-col items-center justify-center rounded-xl border border-foreground/10 bg-foreground/10 p-3 text-center transition-all hover:border-gold/30 hover:bg-foreground/20 sm:p-4 md:rounded-2xl md:p-8 lg:w-48 lg:flex-none 3xl:w-64 3xl:p-12"
              >
                <div className="flex items-center gap-1 text-[20px] font-light text-foreground transition-transform group-hover:scale-105 sm:text-xl md:text-3xl 3xl:text-5xl">
                  {stat.value}
                  {stat.id === "TripAdvisor" ? (
                    <Star className="h-3.5 w-3.5 animate-pulse text-gold 3xl:h-6 3xl:w-6" fill="currentColor" />
                  ) : null}
                </div>
                <p
                  className={`mt-1 text-[0.6rem] font-bold uppercase tracking-widest text-foreground/60 md:mt-3 md:text-[0.725rem] 3xl:mt-5 3xl:text-[0.895rem] ${stat.id === "Private" ? "whitespace-nowrap" : ""}`}
                >
                  {t(`stats.${stat.id}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ContainerLayout>
    </header>
  );
}
