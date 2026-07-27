"use client";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { customTourContent } from "@/data/home";

export function CustomTourSection() {
  return (
    <section
      id="custom-tours"
      className="relative overflow-hidden bg-lanka-black pt-12 md:pt-20 xl:pt-20 2xl:pt-24 3xl:pt-32"
    >
      <ContainerLayout>
        {/* Modern Asymmetrical Wrapper - Animated */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-linear-to-br from-surface/80 to-lanka-black px-6 py-16 md:px-12 md:py-20 lg:p-20 2xl:p-24 3xl:p-32"
        >
          {/*Subtle CSS Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

          {/* Giant Faded Watermark Text - Responsive */}
          <div className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap select-none text-[3.5rem] font-bold leading-none tracking-tighter text-white/3 min-[400px]:text-[4.2rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[13rem] 2xl:text-[16rem] 3xl:text-[20rem]">
          {customTourContent.watermark}
          </div>

          {/* Subtle Glow */}
          <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-[50%] w-[50%] rounded-full bg-gold/10 blur-[120px] 3xl:blur-[160px]" />

          {/* Content Layout: Split Design */}
          <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            {/* Left Side: Typography */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="max-w-3xl lg:w-7/12 3xl:max-w-4xl"
            >
              <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1 3xl:px-6 3xl:py-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold 3xl:text-xs">
                 {customTourContent.badge}
                </span>
              </div>

              <h2 className="text-4xl font-light leading-[1.1] text-white sm:text-5xl md:text-6xl 3xl:text-7xl">
                {customTourContent.titlePart1} <br />
                <span className="premium-serif italic text-gold">{customTourContent.titleAccent}</span> {customTourContent.titlePart2}
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
              <p className="mb-10 font-light leading-relaxed text-slate-400 md:text-lg 3xl:mb-12 3xl:text-xl">
               {customTourContent.description}
              </p>

              <Button variant="inquire" href="services/bespoke-travel" className="w-full sm:w-auto">
               {customTourContent.ctaText}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </ContainerLayout>
    </section>
  );
}