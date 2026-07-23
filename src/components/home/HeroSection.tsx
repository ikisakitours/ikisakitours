"use client";

import Image from "next/image";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { heroStats, heroPopularTags, heroPopularServices } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { FaAward } from "react-icons/fa6";
import { motion, Transition } from "framer-motion";
//Icons
import { ArrowRight, Search, Star, Car, Compass, Route, Check } from "lucide-react";
const serviceIcons = [Car, Compass, Route];

const smoothTransition: Transition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1],
};

export function HeroSection() {
  return (
    <header className="relative flex min-h-130 items-center justify-center overflow-hidden px-4 pb-32 pt-36 text-center md:min-h-155 md:pt-44">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sander-traa-bfdshIHD5Y4-unsplash.webp"
          alt="Sri Lanka Luxury"
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-70 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-r from-lanka-black/90 via-lanka-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-lanka-black via-transparent to-transparent opacity-80" />
      </div>

      <ContainerLayout className="relative z-10">
        <div className="flex flex-col items-center gap-6 md:gap-10 lg:grid lg:grid-cols-12 lg:gap-12 3xl:gap-16">
          <div className="w-full text-left lg:col-span-7 xl:col-span-8 3xl:col-span-9">
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
                  The Gold Standard of Travel
                </span>
              </div>
              <div className="flex items-center space-x-2 border-l border-foreground/20 pl-4 text-[0.625rem] uppercase tracking-widest text-foreground/50 md:text-[0.6875rem] 3xl:pl-6 3xl:text-sm">
                <FaAward className="h-3 w-3 text-gold 3xl:h-5 3xl:w-5" />
                <span>Travel+Leisure 2026</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...smoothTransition, delay: 0.2 }}
              style={{ willChange: "transform, opacity" }}
              className="mb-4 font-serif text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl md:mb-6 md:text-6xl lg:text-7xl xl:text-8xl 3xl:mb-10 3xl:text-[8rem]"
            >
              Sri Lanka <br />
              <span className="mt-1 block pb-2 pr-2 gold-gradient-text font-normal italic md:mt-2 md:pb-4 3xl:pb-6">
                Beyond the Map
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ ...smoothTransition, delay: 0.4 }}
              style={{ willChange: "transform, opacity" }}
              className="mb-6 max-w-lg border-l-2 border-gold/40 pl-4 text-sm font-light leading-relaxed text-foreground/90 sm:text-base md:mb-8 md:pl-6 md:text-xl lg:text-2xl 3xl:mb-12 3xl:max-w-4xl 3xl:pl-8 3xl:text-3xl"
            >
              Elite personalized tours with master guides in
              <span className="font-semibold text-foreground"> Japanese, French, Spanish</span> and
              <span className="font-semibold text-foreground"> English.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...smoothTransition, delay: 0.5 }}
              style={{ willChange: "transform, opacity" }}
              className="max-w-2xl 3xl:max-w-4xl"
            >
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gold/20 opacity-0 blur-lg transition duration-700 group-hover:opacity-100" />
                <div className="relative flex items-center rounded-xl border border-foreground/10 bg-lanka-black/60 p-1 shadow-2xl backdrop-blur-2xl md:rounded-2xl md:p-1.5 3xl:rounded-3xl 3xl:p-2">
                  <div className="flex flex-1 items-center px-2 md:px-5 3xl:px-8">
                    <Search className="h-3 w-3 shrink-0 text-gold md:h-5 md:w-5 3xl:h-8 3xl:w-8" />
                    <input
                      type="text"
                      placeholder="Where to explore?"
                      className="w-full bg-transparent p-2.5 text-sm font-light text-foreground outline-none placeholder:text-foreground/50 md:p-4 md:text-base 3xl:p-6 3xl:text-2xl"
                    />
                  </div>
                  <Button type="button" variant="primary" className="3xl:px-12 3xl:py-6 3xl:text-lg 3xl:rounded-2xl">
                    <span className="hidden sm:block">Start Journey</span>
                    <ArrowRight className="h-4 w-4 sm:hidden 3xl:h-6 3xl:w-6" />
                  </Button>
                </div>
              </div>

              <div className="ml-1 mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 3xl:mt-6 3xl:gap-x-6">
                <span className="text-[0.6875rem] uppercase tracking-wider text-foreground/40 3xl:text-base">
                  Popular:
                </span>
                {heroPopularTags.map((tag, idx) => (
                  <Button key={idx} variant="tag" href={tag.href} className="3xl:text-base 3xl:pb-1">
                    {tag.label}
                  </Button>
                ))}
              </div>

              {/* HORIZONTAL SCROLL FIX: Added w-full max-w-full overflow-hidden */}
              <div className="mt-8 flex w-full max-w-full flex-col gap-4 border-t border-foreground/10 pt-6 sm:mt-10 md:mt-12 md:gap-5 3xl:mt-16 3xl:pt-10 overflow-hidden">
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-foreground/50 md:text-xs 3xl:text-base">
                  Discover Our Popular Services
                </p>
                <div className="flex w-full flex-wrap items-center gap-3 sm:gap-4 3xl:gap-6">
                  {heroPopularServices.map((service, idx) => {
                    const Icon = serviceIcons[idx] || Check;
                    return (
                      // Added relative overflow-hidden shrink-0 to prevent blur bleed and squishing
                      <Button
                        key={idx}
                        variant="service"
                        href={service.href}
                        className="relative overflow-hidden shrink-0 3xl:px-8 3xl:py-4"
                      >
                        <div className="absolute inset-0 rounded-full bg-gold/15 animate-pulse blur-sm" />
                        <Icon className="relative z-10 h-4 w-4 text-gold transition-colors group-hover:text-gold-light md:h-5 md:w-5 3xl:h-8 3xl:w-8" />
                        <span className="relative z-10 text-xs font-semibold tracking-wide text-foreground/90 transition-colors group-hover:text-white md:text-sm 3xl:text-lg">
                          {service.label}
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
                key={stat.label}
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
                  {stat.label === "TripAdvisor" ? (
                    <Star className="h-3.5 w-3.5 animate-pulse text-gold 3xl:h-6 3xl:w-6" fill="currentColor" />
                  ) : null}
                </div>
                <p
                  className={`mt-1 text-[0.4375rem] font-bold uppercase tracking-widest text-foreground/60 md:mt-3 md:text-[0.625rem] 3xl:mt-5 3xl:text-sm ${stat.label === "Private" ? "whitespace-nowrap" : ""}`}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ContainerLayout>
    </header>
  );
}
