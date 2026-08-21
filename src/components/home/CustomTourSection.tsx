"use client";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import SectionBadge from "@/components/home/Events/SectionBadge";
import { useTranslations } from "next-intl";

export function CustomTourSection() {
  const t = useTranslations("HomePage.Services.CustomTour");

  return (
    <section
      id="custom-tours"
      className="relative overflow-hidden bg-lanka-dark/60 py-12 md:py-20 xl:py-20 2xl:py-24 3xl:py-32"
    >
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-72 w-72 rounded-full bg-gold/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-60 w-60 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <ContainerLayout>
        {/* Modern Asymmetrical Wrapper - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="group relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-linear-to-br from-surface/90 via-lanka-black to-black px-6 py-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:px-12 md:py-20 lg:p-20 2xl:p-24 3xl:p-32"
        >
          {/* Subtle Top Border Gradient Highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />

          {/*Subtle CSS Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

          {/* Giant Faded Watermark Text - Responsive */}
          <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap select-none text-[3.4rem] sm:text-[3.5rem] font-bold leading-none tracking-tighter text-white/2 md:text-[4.8em] lg:text-[6.5rem] xl:text-[7.5rem] 2xl:text-[10.5rem] 3xl:text-[10.5rem]">
            {t("watermark")}
          </div>

          {/* Subtle Glow */}
          <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-[50%] w-[50%] rounded-full bg-gold/10 blur-[120px] 3xl:blur-[160px]" />

          {/* Content Layout: Split Design */}
          <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            {/* Left Side: Typography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="max-w-3xl lg:w-7/12 3xl:max-w-4xl"
            >
              <SectionBadge badge={t("badge")} />
              <h2 className="text-4xl font-light leading-[1.1] text-white sm:text-5xl md:text-6xl 3xl:text-7xl">
                {t("titlePart1")}
                <br />
                <span className="premium-serif italic text-gold">{t("titleAccent")}</span>
                {t("titlePart2")}
              </h2>
            </motion.div>

            {/* Right Side: Description & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-start lg:w-5/12 lg:border-l lg:border-white/10 lg:pl-10 2xl:pl-12 3xl:pl-16"
            >
              <p className="mb-10 font-light leading-relaxed text-foreground/80 text-body">{t("description")}</p>

              <Button variant="inquire" href="services/bespoke-travel" className="text-caption! w-full sm:w-auto">
                {t("ctaText")}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
}