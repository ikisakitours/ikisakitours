"use client";

import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { destinations, discoveryContent } from "@/data/home";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useInView,
} from "framer-motion";

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) setWidth(ref.current.offsetWidth);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);
  return width;
}

export function DiscoverySection() {
  const baseVelocity = -50;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const copyRef = useRef<HTMLDivElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const [isInteracting, setIsInteracting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastTouchX = useRef(0);
  const isInView = useInView(sectionRef, { once: false });

  function wrap(min: number, max: number, v: number) {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
  }

  const x = useTransform(baseX, (v) => (copyWidth === 0 ? "0px" : `${wrap(-copyWidth, 0, v)}px`));
  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    if (!isInView || isInteracting) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleWheel = (e: WheelEvent) => {
      if (isInteracting) {
        e.preventDefault();
        const moveAmount = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        baseX.set(baseX.get() - moveAmount * 1.5);
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      setIsInteracting(true);
      lastTouchX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].clientX;
      baseX.set(baseX.get() + (touchX - lastTouchX.current) * 2);
      lastTouchX.current = touchX;
    };
    const handleTouchEnd = () => setIsInteracting(false);

    section.addEventListener("wheel", handleWheel, { passive: false });
    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchmove", handleTouchMove, { passive: true });
    section.addEventListener("touchend", handleTouchEnd);
    return () => {
      section.removeEventListener("wheel", handleWheel);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);
    };
  }, [baseX, isInteracting]);

  const trackItems = (
    <div className="flex items-center whitespace-nowrap py-10 shrink-0">
      {destinations.map((destination) => (
        <div key={destination.number} className="group/item flex cursor-pointer items-center">
          <span className="mx-12 font-mono text-sm tracking-tighter text-gold/40">{destination.number}</span>
          <span className="text-2xl font-light uppercase tracking-[0.3em] text-white/70 transition-all duration-500 group-hover/item:text-gold md:text-3xl">
            {destination.name}
          </span>
        </div>
      ))}
    </div>
  );

  const numCopies = 6;
  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <div key={i} ref={i === 0 ? copyRef : null} className="shrink-0 flex items-center">
        {trackItems}
      </div>,
    );
  }

  return (
    <section
      id="discovery"
      ref={sectionRef}
      className="overflow-hidden border-y border-white/5 bg-lanka-dark py-12 md:py-20 xl:py-20 2xl:py-24 3xl:py-32"
    >
      <ContainerLayout className="mb-10">
        <div id="destinations" className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="w-full lg:max-w-2xl"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.5em] text-gold">Discovery</p>
            <h3 className="mb-4 text-2xl font-light italic leading-tight text-white md:text-3xl lg:text-4xl">
            {discoveryContent.titleOne} <span className="text-gold"> {discoveryContent.titleTwo}</span>
            </h3>

            <div className="group relative mb-4 mt-6 pl-6 md:pl-8">
              <div className="absolute bottom-0 left-0 top-0 w-px bg-linear-to-b from-gold via-gold/20 to-transparent" />
              <p className="text-sm font-light leading-relaxed tracking-wide text-slate-300 md:text-base">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/90">
                 {discoveryContent.subheading}
                </span>
              {discoveryContent.descriptionPart1}
                <span className="relative inline transition-colors duration-500 group-hover:text-gold">
                  <span className="inline text-lg font-bold italic tracking-normal text-white md:text-xl">
                  {discoveryContent.highlightText}
                  </span>
                  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold/30 transition-transform duration-700 group-hover:scale-x-100" />
                </span>
                <span className="ml-1 inline opacity-70">{discoveryContent.descriptionPart2}</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="flex shrink-0 flex-col items-start lg:items-end"
          >
            <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-slate-200">{discoveryContent.status}</div>
            <div className="h-px w-24 bg-gold/30 md:w-32" />
          </motion.div>
        </div>
      </ContainerLayout>

      {/* Marquee Animation Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="group/discovery relative flex overflow-x-hidden border-y border-white/5 bg-white/1 backdrop-blur-sm"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
      >
        <motion.div
          className="flex whitespace-nowrap items-center"
          style={{ x, willChange: "transform", WebkitFontSmoothing: "antialiased" }}
        >
          {spans}
        </motion.div>
      </motion.div>
    </section>
  );
}
