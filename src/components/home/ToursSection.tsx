"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { packages } from "@/data/multiDaysTours";
import { oneDayTours } from "@/data/oneDayTours";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { toursSectionContent } from "@/data/home";
import { motion, AnimatePresence } from "framer-motion";
import SectionBadge from "@/components/home/Events/SectionBadge";
//Icons
import { FaClock } from "react-icons/fa6";
import { Star } from "lucide-react";

const getBadgeStyles = (type: string) => {
  switch (type) {
    case "popular":
      return "bg-gold text-black";
    case "sale":
      return "bg-red-600 text-white animate-pulse";
    case "new":
      return "bg-white/10 text-white";
    default:
      return "bg-white/10 text-white";
  }
};

export function ToursSection() {
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<"multi" | "one">(
    pathname && pathname.includes("one-day") ? "one" : "multi",
  );

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (pathname && pathname.includes("one-day")) {
      setActiveTab("one");
    } else if (pathname && pathname.includes("multi-days")) {
      setActiveTab("multi");
    }
  }

  useEffect(() => {
    const handleTabSwitch = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === "tours-one") setActiveTab("one");
      if (customEvent.detail === "tours-multi") setActiveTab("multi");
    };

    window.addEventListener("tourTabChange", handleTabSwitch);
    return () => window.removeEventListener("tourTabChange", handleTabSwitch);
  }, []);

  const currentPackages = activeTab === "multi" ? packages : oneDayTours;
  const displayPackages = [...currentPackages].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, 4);

  return (
    <section id="tours" className="bg-background py-12 md:py-20 xl:py-20 2xl:py-24 3xl:py-32">
      <ContainerLayout>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-10 text-center md:mb-14 3xl:mb-20"
        >
          <SectionBadge badge={toursSectionContent.badge} />
          <h2 className="premium-serif text-3xl font-light leading-tight text-white sm:text-5xl md:text-6xl 3xl:text-7xl">
            {toursSectionContent.titlePart1}
            <span className="gold-gradient-text italic">{toursSectionContent.titleAccent}</span>
          </h2>
        </motion.div>

        {/* Toggle Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4 md:mb-20 3xl:mb-28 px-2"
        >
          <Button
            variant="shine"
            onClick={() => setActiveTab("multi")}
            className={`whitespace-nowrap px-3! py-2.5! sm:px-5! sm:py-3! lg:px-7! lg:py-3.5! transition-all duration-300 [&_span]:text-[8.5px]! sm:[&_span]:text-[10px]! lg:[&_span]:text-[9px]! xl:[&_span]:text-[10px]! ${
              activeTab === "multi"
                ? "bg-gold! border-gold! shadow-[0_0_20px_rgba(197,160,89,0.4)] [&_span]:text-black!"
                : "border-white/20 hover:border-gold/50 hover:bg-gold/10 [&_span]:text-white/70! hover:[&_span]:text-white!"
            }`}
          >
            {toursSectionContent.multiDayBtn}
          </Button>
          <Button
            variant="shine"
            onClick={() => setActiveTab("one")}
            className={`whitespace-nowrap px-3! py-2.5! sm:px-5! sm:py-3! lg:px-7! lg:py-3.5! transition-all duration-300 [&_span]:text-[8.5px]! sm:[&_span]:text-[10px]! lg:[&_span]:text-[9px]! xl:[&_span]:text-[10px]! ${
              activeTab === "one"
                ? "bg-gold! border-gold! shadow-[0_0_20px_rgba(197,160,89,0.4)] [&_span]:text-black!"
                : "border-white/20 hover:border-gold/50 hover:bg-gold/10 [&_span]:text-white/70! hover:[&_span]:text-white!"
            }`}
          >
            {toursSectionContent.oneDayBtn}
          </Button>
        </motion.div>

        {/* Grid Layout with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 3xl:gap-10"
          >
            {displayPackages.map((item, index) => (
              <motion.article
                // key={item.slug}
                key={`${item.slug}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                className="glass-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 transition-all duration-500 hover:border-gold/50"
              >
                {/* Badges */}
                {item.badges.length > 0 && (
                  <div className="absolute left-3 right-3 top-3 z-30 flex items-center justify-between 3xl:left-5 3xl:right-5 3xl:top-5">
                    {item.badges.map((badge) => (
                      <span
                        key={badge.label}
                        className={`${getBadgeStyles(badge.type)} rounded-sm px-2 py-1 text-[8px] 3xl:px-3 3xl:py-1.5 3xl:text-[10px] font-bold uppercase tracking-widest`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 shrink-0 overflow-hidden sm:h-56 3xl:h-72">
                  <LoadingImage
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 25vw, 100vw"
                    className="object-cover opacity-70!  group-hover:scale-110"
                    wrapperClassName="w-full h-full" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/40" />
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between 3xl:bottom-6 3xl:left-6 3xl:right-6">
                    <div className="flex flex-col">
                      <span className="mb-1 text-[10px] 3xl:text-xs uppercase tracking-[0.2em] font-bold text-gold">
                        {item.categoryLabel}
                      </span>
                      <div className="flex items-center space-x-2 text-white">
                        <FaClock className="h-3.5 w-3.5 3xl:h-4 3xl:w-4 text-gold" />
                        <span className="text-[12px] 3xl:text-sm font-bold">{item.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 rounded border border-white/10 bg-black/80 px-2 py-1 3xl:px-3 3xl:py-1.5 backdrop-blur-md">
                      <Star className="h-3.5 w-3.5 3xl:h-4 3xl:w-4 text-gold" fill="currentColor" />
                      <span className="text-[12px] 3xl:text-sm font-bold text-white">{item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex grow flex-col p-5 sm:p-6 3xl:p-8">
                  <h4 className="mb-2 text-[17px] 3xl:text-2xl font-bold italic text-white">{item.title}</h4>
                  <p className="line-clamp-2 mb-6 3xl:mb-8 grow text-[13px] 3xl:text-base font-normal leading-relaxed text-slate-200">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <div>
                      <p className="text-[11px] uppercase leading-none tracking-widest text-slate-300">Starting from</p>
                      <p className="mt-1 text-lg font-bold text-gold">{item.price}</p>
                    </div>
                    <Button
                      variant="details"
                      href={
                        activeTab === "multi"
                          ? `/booking/multi-days-tours/${item.slug}`
                          : `/booking/one-day-tours/${item.slug}`
                      }
                    >
                      {toursSectionContent.detailsBtnText}
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mt-16 flex w-full items-center justify-center md:mt-20 3xl:mt-32"
        >
          <Button variant="explore" href={activeTab === "multi" ? "/tours/multi-days" : "/tours/one-day"}>
            {activeTab === "multi" ? toursSectionContent.visitAllMultiText : toursSectionContent.viewAllOneText}
          </Button>
        </motion.div>
      </ContainerLayout>
    </section>
  );
}
