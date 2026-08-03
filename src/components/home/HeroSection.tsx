"use client";
import { Fragment } from "react/jsx-runtime";
import Image from "next/image";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { heroStats, heroPopularTags, heroPopularServices, HeroBackGroundImages } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { FaAward } from "react-icons/fa6";
import { motion, Transition } from "framer-motion";
import { OmniSearch } from "./heroSearchField/OmniSearch";
import { useTranslations } from "next-intl";
//Icons
import { Star, Car, Compass, Route, Check } from "lucide-react";
const serviceIcons = [Car, Compass, Route];

const smoothTransition: Transition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
};

export function HeroSection() {
  const t = useTranslations("HomePage.Hero");
  return (
    <header className="relative flex flex-col justify-center text-center bg-[#050505] pt-20 pb-12  sm:py-24 md:py-26 lg:py-28 2xl:py-30 3xl:py-32">
      {/*py-20*/}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        {HeroBackGroundImages.map((image) => (
          <Fragment key={image.id}>
            <Image
              src={image.mobileUrl}
              alt={t(`bgImagesAlt.${image.id}Mobile`)}
              fill
              priority
              quality={100}
              sizes="(max-width: 640px) 100vw, 0vw"
              className="block sm:hidden scale-110 object-cover object-center opacity-70 animate-slow-zoom"
            />

            <Image
              src={image.desktopUrl}
              alt={t(`bgImagesAlt.${image.id}Desktop`)}
              fill
              priority
              quality={100}
              sizes="(max-width: 640px) 0vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 1536px) 100vw, 100vw"
              className="hidden sm:block scale-110 object-cover object-center opacity-70 animate-slow-zoom"
            />
          </Fragment>
        ))}
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
              <div className="inline-flex items-center space-x-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 backdrop-blur-md md:space-x-3 md:px-4 md:py-2 3xl:px-6 3xl:py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse md:h-2 md:w-2 3xl:h-3 3xl:w-3" />
                <span className="text-[0.5rem] font-bold uppercase tracking-[0.2em] text-gold md:text-[0.625rem] md:tracking-[0.4em] 3xl:text-sm">
                  {t("content.badge")}
                </span>
              </div>
              <div className="flex items-center space-x-2 border-l border-foreground/20 pl-4 text-[0.625rem] uppercase tracking-widest text-foreground/50 md:text-[0.6875rem] 3xl:pl-6 3xl:text-sm">
                <FaAward className="h-3 w-3 text-gold 3xl:h-5 3xl:w-5" />
                <span>{t("content.award")}</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...smoothTransition, delay: 0.2 }}
              style={{ willChange: "transform, opacity" }}
              className="mb-4 font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl md:mb-6 md:text-6xl lg:text-7xl xl:text-8xl 3xl:mb-10 3xl:text-[8rem]"
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
              className="mb-6 max-w-lg border-l-2 border-gold/40 pl-4 text-sm font-light leading-relaxed text-foreground/90 sm:text-base md:mb-8 md:pl-6 md:text-xl lg:text-2xl 3xl:mb-12 3xl:max-w-4xl 3xl:pl-8 3xl:text-3xl"
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
              <OmniSearch />

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 3xl:mt-6 3xl:gap-x-6">
                <span className="text-[0.6875rem] uppercase tracking-wider text-foreground/40 3xl:text-base">
                  {t("content.popularLabel")}
                </span>
                {heroPopularTags.map((tag, idx) => (
                  <Button key={idx} variant="tag" href={tag.href} className="3xl:text-base 3xl:pb-1">
                    {t(`popularTags.${tag.id}`)}
                  </Button>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-foreground/10 pt-6 sm:mt-10 md:mt-12 md:gap-5 3xl:mt-16 3xl:pt-10">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-foreground/50 md:text-xs 3xl:text-base">
                  {t("content.servicesHeading")}
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 3xl:gap-6">
                  {heroPopularServices.map((service, idx) => {
                    const Icon = serviceIcons[idx] || Check;
                    return (
                      <Button
                        key={idx}
                        variant="service"
                        href={service.href}
                        className="relative overflow-hidden shrink-0 3xl:px-8 3xl:py-4"
                      >
                        <div className="absolute inset-0 rounded-full bg-gold/15 animate-pulse blur-sm" />
                        <Icon className="relative z-10 h-4 w-4 text-gold transition-colors group-hover:text-gold-light md:h-5 md:w-5 3xl:h-8 3xl:w-8" />
                        <span className="relative z-10 text-xs font-semibold tracking-wide text-foreground/90 transition-colors group-hover:text-white md:text-sm 3xl:text-lg">
                          {t(`popularServices.${service.id}`)}
                        </span>
                      </Button>
                    );
                  })}
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
                <div className="flex items-center gap-1 text-lg font-light text-foreground transition-transform group-hover:scale-105 sm:text-xl md:text-3xl 3xl:text-5xl">
                  {stat.value}
                  {stat.id === "TripAdvisor" ? (
                    <Star className="h-3.5 w-3.5 animate-pulse text-gold 3xl:h-6 3xl:w-6" fill="currentColor" />
                  ) : null}
                </div>
                <p
                  className={`mt-1 text-[0.4375rem] font-bold uppercase tracking-widest text-foreground/60 md:mt-3 md:text-[0.625rem] 3xl:mt-5 3xl:text-sm ${stat.id === "Private" ? "whitespace-nowrap" : ""}`}
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
