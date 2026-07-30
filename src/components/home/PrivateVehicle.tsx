"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { featureCards, languageBadges } from "@/data/privateVehicle";
import { privateVehicleContent } from "@/data/home";
import SectionBadge from "@/components/home/Events/SectionBadge";
import { motion } from "framer-motion";
//Icons
import { MessagesSquare, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function PrivateVehicle() {
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
                <Image
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000&auto=format&fit=crop"
                  alt="Luxury Van"
                  width={2000}
                  height={2500}
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-105 sm:aspect-3/4"
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
                      {privateVehicleContent.nativeFriendlyText}
                    </span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-white md:text-sm">
                    &quot;{privateVehicleContent.quote}&quot;
                  </p>
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
                <SectionBadge badge={privateVehicleContent.badge} />
                <h2 className="mb-6 text-3xl font-light leading-[1.2] tracking-tight text-white sm:text-4xl md:mb-8 md:text-5xl xl:text-6xl xl:leading-[1.1]">
                  {privateVehicleContent.titlePart1}
                  <span className="italic text-gold">{privateVehicleContent.titleAccent}</span>
                  <br className="hidden sm:block md:hidden xl:block" />
                  <span className="font-serif">{privateVehicleContent.titlePart2}</span>
                </h2>
                <p className="max-w-none text-sm font-light leading-relaxed text-slate-300 md:text-base xl:text-lg">
                  {privateVehicleContent.description}
                </p>
              </header>

              <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mb-12 md:gap-8">
                {featureCards.map(({ title, description, Icon }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                    className="group rounded-3xl border border-transparent bg-white/1 p-5 transition-colors hover:border-white/5 hover:bg-white/2 sm:bg-transparent md:p-6"
                  >
                    <Icon className="mb-3 h-5 w-5 text-gold md:mb-4 md:h-6 md:w-6" />
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white md:text-xs">
                      {title}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-400 md:text-sm">{description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="flex w-full flex-col items-center justify-start gap-6 sm:flex-row md:gap-8"
              >
                <Button variant="inquire" href="/services/private-vehicle">
                  {privateVehicleContent.hireButtonText}
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
                      {privateVehicleContent.consultText}
                    </span>
                    <span className="mt-1 whitespace-nowrap text-[9px] font-medium text-gold/80 md:text-[11px]">
                      {privateVehicleContent.whatsappText}
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
              {privateVehicleContent.modalTitlePart}
              <span className="italic text-gold"> {privateVehicleContent.modalTitleAccent}</span>
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
                  {privateVehicleContent.modalWhatsapp}
                </span>
              </div>
            </a>
            <a
              href="mailto:info@elitetransfers.lk"
              className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/5"
            >
              <div className="flex items-center gap-4">
                <MessagesSquare className="h-4.5 w-4.5 text-[#c5a059]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {privateVehicleContent.modalEmail}
                </span>
              </div>
            </a>
          </div>
          <p className="mt-8 text-center text-[10px] leading-relaxed text-slate-500 whitespace-pre-line">
            {privateVehicleContent.modalResponseText}
          </p>
        </div>
      </div>
    </>
  );
}
