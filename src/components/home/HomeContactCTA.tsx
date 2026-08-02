"use client";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { motion } from "framer-motion";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";
import { contactCtaContent } from "@/data/home";
//Icons
import { MapPin, Sparkles, Star, ArrowRight } from "lucide-react";

export default function HomeContactCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-lanka-dark py-20 md:py-20 xl:py-20 2xl:py-24 3xl:py-32"
    >
      {/* Background Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-150 w-150 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full bg-gold/5 blur-[120px]" />

      {/* Background Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden mt-2">
        <span className="select-none text-[20vw] lg:text-[18vw] 2xl:text-[20vw] font-black uppercase tracking-tighter text-white/2">
          {contactCtaContent.watermark}
        </span>
      </div>

      {/* Reusable Container Layout */}
      <ContainerLayout className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-12 xl:gap-24">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="w-full lg:w-1/2 space-y-10"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                {contactCtaContent.badge}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-serif text-white leading-[1.1] tracking-tight">
              {contactCtaContent.titlePart1} <br />
              <span className="relative mt-2 inline-block">
                <span className="relative z-10 pr-4 font-light italic text-gold">{contactCtaContent.titleAccent}</span>
                <span className="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-2 bg-gold/20"></span>
              </span>
              <br />
              {contactCtaContent.titlePart2}
            </h2>

            <p className="max-w-lg text-lg font-light leading-relaxed text-slate-400 md:text-xl">
              {contactCtaContent.description}
            </p>

            {/* CTA Buttons & Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
              <Button variant="inquire" href="/contact" className="group shrink-0">
                {contactCtaContent.ctaButtonText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
              </Button>

              <div className="flex items-center gap-4 border-l border-white/10 pl-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#050505]">
                      <LoadingImage
                        src={`https://i.pravatar.cc/100?img=${i + 30}`}
                        alt="User"
                        fill
                        isSmall
                        className="object-cover"
                        wrapperClassName="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 text-gold">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-gold" />
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">
                    {contactCtaContent.reviewCountText}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image Composition (Editorial Style) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="relative w-full lg:w-1/2"
          >
            {/* Main Tall Image */}
            <div className="relative z-10 ml-auto aspect-3/4 w-[85%] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl md:w-[75%]">
              <LoadingImage
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=95&w=1400&auto=format&fit=crop"
                alt="Luxury Travel Experience"
                fill
                className="object-cover hover:scale-105"
                wrapperClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#050505]/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Square Image */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="absolute -bottom-10 left-0 z-20 aspect-square w-[45%] overflow-hidden rounded-3xl border-4 border-[#050505] shadow-2xl md:w-[40%]"
            >
              <LoadingImage
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=800&auto=format&fit=crop"
                alt="Detail Shot"
                fill
                className="object-cover"
                wrapperClassName="w-full h-full"
              />
            </motion.div>

            {/* Floating Glassmorphism Badge*/}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              className="absolute -left-1 md:left-28 lg:left-10 2xl:left-18 3xl:left-30 top-10 z-30 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl "
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div className="pr-2">
                  <p className="text-[15px] font-bold text-white">{contactCtaContent.localExpertsText}</p>
                  <p className="mt-0.5 text-[12px] font-bold uppercase tracking-widest gold-gradient-text">
                    {contactCtaContent.supportText}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </ContainerLayout>
    </section>
  );
}
