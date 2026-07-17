"use client";

import React, { useRef } from "react";
import Link from "next/link";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { transferCards } from "@/data/transfers";
import { Car, ChevronLeft, ChevronRight, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { motion } from "framer-motion";

const serviceIcons = [PlaneLanding, Car, PlaneTakeoff];
const trustBadges = [
  { label: "Fully Insured Fleet", Icon: FaShieldAlt },
  { label: "24/7 Availability", Icon: FaClock },
] as const;

export function TransfersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 280;
      scrollContainerRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="transfers" className="relative overflow-hidden bg-lanka-black py-12 md:py-20 xl:py-20 2xl:py-24 3xl:py-32">
      <div className="absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-gold/5 blur-[120px] 3xl:h-96 3xl:w-96" />
      <div className="absolute right-0 bottom-0 -z-10 h-48 w-48 rounded-full bg-gold/5 blur-[100px] 3xl:h-80 3xl:w-80" />

      <ContainerLayout>
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 text-center md:mb-20 lg:mb-24 3xl:mb-32"
        >
          <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1 3xl:px-6 3xl:py-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold 3xl:text-xs">Chauffeur Service</span>
          </div>
          <h2 className="mb-6 text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl">
            Traveler&apos;s Pick-Up <span className="italic text-gold">&amp;</span> Drop-Off
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-slate-300 md:text-lg 3xl:text-xl 3xl:max-w-3xl">
            Comfortable, safe &amp; reliable transport for Japanese 🇯🇵 , French 🇫🇷 ,Spain 🇪🇸 and English 🇬🇧 travelers anywhere in Sri Lanka.
          </p>
        </motion.div>

        {/* Mobile/Tablet Navigation Buttons (Arrows) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 flex items-center justify-end gap-3 xl:hidden"
        >
          <button onClick={() => scroll("left")} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-gold hover:text-black" aria-label="Scroll left"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => scroll("right")} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-colors hover:border-gold hover:bg-gold hover:text-black" aria-label="Scroll right"><ChevronRight className="h-5 w-5" /></button>
        </motion.div>

        {/* Cards Grid */}
        <div ref={scrollContainerRef} className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto pb-8 no-scrollbar md:gap-8 xl:grid xl:grid-cols-3 xl:pb-0 3xl:gap-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          {transferCards.map(({ title, description, action, href }, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                className="group relative flex min-w-[85%] snap-center flex-col overflow-hidden rounded-3xl border border-white/5 bg-surface p-6 shadow-2xl transition-all duration-500 hover:border-gold/30 sm:min-w-[45%] lg:min-w-[40%] xl:min-w-full sm:p-8 md:p-10 3xl:p-12"
              >
                <div className="absolute -inset-1 bg-linear-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-lanka-black transition-all duration-500 group-hover:scale-105 group-hover:border-gold md:mb-8 md:h-20 md:w-20 3xl:h-24 3xl:w-24">
                    <Icon className="h-6 w-6 text-gold md:h-8 md:w-8 3xl:h-10 3xl:w-10" />
                  </div>
                  <h5 className="mb-4 text-lg font-bold uppercase tracking-[0.15em] text-white md:text-xl lg:text-lg xl:text-xl 3xl:text-2xl">{title}</h5>
                  <p className="mb-8 grow text-sm font-normal leading-relaxed text-slate-400 md:text-base 3xl:text-lg 3xl:mb-12">{description}</p>
                  <Link href={href} className="inline-flex w-fit items-center text-[11px] font-bold uppercase tracking-[0.2em] text-gold transition-all group-hover:translate-x-2 md:text-[12px] 3xl:text-sm">
                    <span className="border-b border-gold/40 pb-1 group-hover:border-gold">{action}</span>
                    <ChevronRight className="ml-3 h-2.5 w-2.5 3xl:h-4 3xl:w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70 md:mt-16 3xl:mt-24"
        >
          {trustBadges.map(({ label, Icon }) => (
            <div key={label} className="flex items-center space-x-3 3xl:space-x-4">
              <Icon className="h-3.5 w-3.5 text-gold 3xl:h-5 3xl:w-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white md:text-[11px] 3xl:text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </ContainerLayout>
    </section>
  );
}