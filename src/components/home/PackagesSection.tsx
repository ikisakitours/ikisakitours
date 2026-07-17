"use client";

import Image from "next/image";
import { packages, BadgeType } from "@/data/packages";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FaClock } from "react-icons/fa6";
import { motion } from "framer-motion";

const getBadgeStyles = (type: BadgeType) => {
  switch (type) {
    case "popular": return "bg-gold text-black";
    case "sale": return "bg-red-600 text-white animate-pulse";
    case "new": return "bg-white/10 text-white";
    default: return "bg-white/10 text-white";
  }
};

export function PackagesSection() {
  return (
    <section id="packages" className="bg-background py-12 md:py-20 xl:py-20 2xl:py-24 3xl:py-32">
      <ContainerLayout>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 text-center md:mb-20 3xl:mb-28"
        >
          <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1 3xl:px-6 3xl:py-2">
            <span className="text-[10px] 3xl:text-xs font-bold uppercase tracking-[0.3em] text-gold">Exclusive Itineraries</span>
          </div>
          <h2 className="premium-serif text-3xl font-light leading-tight text-white sm:text-5xl md:text-6xl 3xl:text-7xl">
            Curated <span className="gold-gradient-text italic">Tour Packages</span>
          </h2>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 3xl:gap-10">
          {packages.slice(0, 4).map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="glass-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 transition-all duration-500 hover:border-gold/50"
            >
              {/* Badges */}
              {item.badges.length > 0 && (
                <div className="absolute left-3 right-3 top-3 z-30 flex items-center justify-between 3xl:left-5 3xl:right-5 3xl:top-5">
                  {item.badges.map((badge) => (
                    <span key={badge.label} className={`${getBadgeStyles(badge.type)} rounded-sm px-2 py-1 text-[8px] 3xl:px-3 3xl:py-1.5 3xl:text-[10px] font-bold uppercase tracking-widest`}>
                      {badge.label}
                    </span>
                  ))}
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 shrink-0 overflow-hidden sm:h-56 3xl:h-72">
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1280px) 25vw, 100vw" className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-black/40" />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between 3xl:bottom-6 3xl:left-6 3xl:right-6">
                  <div className="flex flex-col">
                    <span className="mb-1 text-[10px] 3xl:text-xs uppercase tracking-[0.2em] font-bold text-gold">{item.categoryLabel}</span>
                    <div className="flex items-center space-x-2 text-white">
                      <FaClock className="h-3 w-3 3xl:h-4 3xl:w-4 text-gold" />
                      <span className="text-[11px] 3xl:text-sm font-bold">{item.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 rounded border border-white/10 bg-black/80 px-2 py-1 3xl:px-3 3xl:py-1.5 backdrop-blur-md">
                    <Star className="h-3 w-3 3xl:h-4 3xl:w-4 text-gold" fill="currentColor" />
                    <span className="text-[11px] 3xl:text-sm font-bold text-white">{item.rating}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex grow flex-col p-5 sm:p-6 3xl:p-8">
                <h4 className="mb-2 text-lg 3xl:text-2xl font-bold italic text-white">{item.title}</h4>
                <p className="line-clamp-3 mb-6 3xl:mb-8 grow text-sm 3xl:text-base font-normal leading-relaxed text-slate-200">{item.description}</p>
                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <p className="text-[11px] uppercase leading-none tracking-widest text-slate-300">Starting from</p>
                    <p className="mt-1 text-lg font-bold text-gold">{item.price}</p>
                  </div>
                  <Button variant="details" href={`/booking/${item.slug}`}>Details</Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mt-16 flex w-full items-center justify-center md:mt-20 3xl:mt-32"
        >
          <Button variant="explore" href="/packages">Visit Our Full Package Page</Button>
        </motion.div>
      </ContainerLayout>
    </section>
  );
}