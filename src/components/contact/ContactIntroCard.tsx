"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type IntroCardProps = {
  data: {
    badge: string;
    titleMain: string;
    titleBreak: string;
    description: string;
    image: string;
    imageAlt: string;
    imageBadge: string;
    imageDesc: string;
  };
};

export default function ContactIntroCard({ data }: IntroCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const SLIDER_IMAGES = [
    data.image,
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=95&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=95&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=95&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [SLIDER_IMAGES.length]);

  return (
    <div className="glass-card rounded-[2.5rem] p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-12 border border-white/10">
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-1.5 border border-gold/20 w-fit">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{data.badge}</span>
        </div>

        <h1 className="premium-serif text-2xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold text-white leading-tight">
          {data.titleMain} <br className="hidden md:block" /> {data.titleBreak}
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm lg:text-base 3xl:text-lg leading-relaxed max-w-lg">
          {data.description}
        </p>
      </div>

      <div
        className="relative w-full md:w-[45%] border border-white/10 z-10"
        style={{ height: "350px", borderRadius: "32px", overflow: "hidden", transform: "translateZ(0)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{ borderRadius: "32px", overflow: "hidden" }}
          >
            <Image
              src={SLIDER_IMAGES[currentIndex]}
              alt={data.imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end bg-linear-to-t from-black via-black/40 to-transparent">
          <p className="text-xs sm:text-sm lg:text-xs 3xl:text-sm font-bold uppercase tracking-widest text-gold drop-shadow-sm mb-1.5">
            {data.imageBadge}
          </p>

          <p className="text-xs sm:text-sm lg:text-xs 3xl:text-sm font-bold text-gray-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-snug">
            {data.imageDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
