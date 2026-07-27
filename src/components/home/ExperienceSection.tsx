"use client";
import Image from "next/image";
import { experiencePillars } from "@/data/home";
import { experienceSectionContent } from "@/data/home";
import { Button } from "@/components/ui/Button";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { ArrowRight, BadgeCheck, Car, Languages, MapPinned, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const images = [
  { src: "/images/polonnaruwa-185290_1280.webp", alt: "Cultural Guide", className: "" },
  { src: "/images/sri-lanka-334437_1280.webp", alt: "Luxury Travel", className: "mt-8 md:mt-12 xl:mt-16 3xl:mt-24" },
] as const;
const featureIcons = [Languages, BadgeCheck, Car, SlidersHorizontal] as const;

export function ExperienceSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-lanka-black py-28 md:py-20 xl:py-20 2xl:py-24 3xl:py-32"
    >
      <ContainerLayout>
        <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-2 xl:gap-16 2xl:gap-24 3xl:gap-32">
          {/* Images section */}
          <div className="relative order-2 xl:order-1">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              className="mx-auto grid max-w-125 grid-cols-2 gap-4 md:gap-6 xl:max-w-full 3xl:gap-8"
            >
              {images.map((image) => (
                <div
                  key={image.src}
                  className={`group relative aspect-3/4 overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-2xl md:rounded-3xl 3xl:rounded-[2.5rem] ${image.className}`}
                >
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-lanka-dark via-transparent to-transparent" />
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </motion.div>

            {/* Mobile/Tablet Unique Floating Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              className="absolute -bottom-20 left-1/2 z-20 flex w-[90%] max-w-sm -translate-x-1/2 items-center justify-between rounded-2xl border border-gold/30 bg-lanka-black/90 px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl xl:hidden sm:-bottom-8 sm:px-6 sm:py-5"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 sm:h-10 sm:w-10">
                  <MapPinned className="h-4 w-4 text-gold sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-base font-bold leading-none text-foreground sm:text-lg">
                    {experienceSectionContent.floatingStats[0].value}
                  </p>
                  <p className="mt-0.5 text-[7px] uppercase tracking-widest text-gold sm:text-[8px]">
                    {experienceSectionContent.floatingStats[0].mobileLabel}
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-gold/30 sm:h-10" />

              <div className="flex items-center space-x-3">
                <div className="text-2xl font-bold text-gold sm:text-3xl">
                  {experienceSectionContent.floatingStats[1].value}
                </div>
                <p className="text-[7px] font-bold uppercase leading-tight tracking-[0.2em] text-foreground/80 sm:text-[8px]">
                  {experienceSectionContent.floatingStats[1].labelOne}
                  <br />
                  {experienceSectionContent.floatingStats[1].labelTwo}
                </p>
              </div>
            </motion.div>

            {/* Floating Cards - Desktop Only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="absolute -left-6 top-10 z-20 hidden rounded-2xl border border-gold/30 bg-lanka-black p-5 shadow-2xl xl:block xl:-left-12 3xl:-left-16 3xl:top-16 3xl:rounded-3xl 3xl:p-8"
            >
              <div className="flex items-center space-x-4 3xl:space-x-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 3xl:h-14 3xl:w-14">
                  <MapPinned className="h-4.5 w-4.5 text-gold 3xl:h-6 3xl:w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold leading-none text-foreground 3xl:text-2xl">
                    {experienceSectionContent.floatingStats[0].value}
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-widest text-gold 3xl:mt-2 3xl:text-[10px]">
                    {experienceSectionContent.floatingStats[0].label}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="absolute -right-6 bottom-10 z-20 hidden rounded-2xl border border-gold/30 bg-lanka-black p-6 shadow-2xl xl:block xl:-right-12 3xl:-right-16 3xl:bottom-16 3xl:rounded-3xl 3xl:p-10"
            >
              <div className="flex items-center space-x-4 3xl:space-x-6">
                <div className="text-4xl font-bold text-gold 3xl:text-5xl">
                  {experienceSectionContent.floatingStats[1].value}
                </div>
                <div className="h-10 w-px bg-gold/30 3xl:h-14" />
                <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.2em] text-foreground/80 3xl:text-xs">
                  {experienceSectionContent.floatingStats[1].labelOne}
                  <br />
                  {experienceSectionContent.floatingStats[1].labelTwo}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Text section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="order-1 text-center xl:order-2 xl:text-left"
          >
            <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1 3xl:mb-8 3xl:px-6 3xl:py-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold 3xl:text-xs">
                {experienceSectionContent.badge}
              </span>
            </div>
            <h2 className="mb-6 font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl 3xl:mb-10 3xl:text-[5rem]">
              {experienceSectionContent.titlePart1} <br className="hidden xl:block" />
              <span className="mt-1 block pb-2 pr-2 gold-gradient-text font-normal italic md:mt-2 md:pb-4 3xl:pb-6">
                {experienceSectionContent.titleAccent}
              </span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-foreground/80 md:text-lg xl:mx-0 3xl:mb-16 3xl:max-w-4xl 3xl:text-2xl">
              {experienceSectionContent.description}
            </p>

            <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 md:gap-6 xl:grid-cols-1 2xl:grid-cols-2 3xl:gap-8">
              {experiencePillars.map((pillar, index) => {
                const Icon = featureIcons[index];
                const isHighlighted = pillar.title === "Customized";
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                    key={pillar.title}
                    className={`group rounded-2xl p-5 transition-all 3xl:rounded-3xl 3xl:p-8 ${
                      isHighlighted
                        ? "border border-gold/40 bg-gold/5 shadow-[0_0_20px_rgba(197,160,89,0.1)] hover:bg-gold/10"
                        : "border border-foreground/5 bg-foreground/2 hover:bg-foreground/5"
                    }`}
                  >
                    <div className="mb-3 flex items-center space-x-4 3xl:mb-6 3xl:space-x-6">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-surface 3xl:h-14 3xl:w-14 3xl:rounded-2xl ${isHighlighted ? "border border-gold/30" : "border border-foreground/5"}`}
                      >
                        <Icon
                          className={`text-gold ${pillar.title === "Private Fleet" ? "h-3.5 w-3.5 3xl:h-5 3xl:w-5" : "h-4.5 w-4.5 3xl:h-6 3xl:w-6"}`}
                        />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground 3xl:text-base">
                        {pillar.title}
                      </h4>
                    </div>
                    <p
                      className={`${isHighlighted ? "text-foreground/90" : "text-foreground/60"} text-sm font-light leading-relaxed 3xl:text-xl`}
                    >
                      {pillar.description}
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
              className="mt-12 flex flex-col items-center justify-center gap-8 border-t border-foreground/5 pt-8 sm:flex-row xl:justify-start 3xl:mt-20 3xl:gap-12 3xl:pt-12"
            >
              <Button variant="inquire" href="/contact">
                {experienceSectionContent.inquireButtonText}
                <ArrowRight className="ml-3 inline h-3 w-3 transition-transform group-hover:translate-x-2 3xl:h-5 3xl:w-5" />
              </Button>
              <div className="text-center xl:text-left">
                <p className="text-sm font-bold text-foreground 3xl:text-xl">
                  {experienceSectionContent.responseTitle}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-gold/60 3xl:mt-2 3xl:text-sm">
                  {experienceSectionContent.responseSubtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
}
