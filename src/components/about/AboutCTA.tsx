import React from "react";
import { Button } from "@/components/ui/Button";

export default function AboutCTA() {
  return (
    <div className="relative rounded-3xl overflow-hidden glass-card p-10 md:p-16 text-center border border-gold/30">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-gold/10 via-transparent to-gold/10 pointer-events-none" />

      {/* Background Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="premium-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-widest text-white/2 whitespace-nowrap translate-y-12 md:translate-y-0">
          Map Mate
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">START YOUR ADVENTURE</span>
        <h2 className="premium-serif text-3xl md:text-4xl text-white">Ready to Experience the Real Sri Lanka?</h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Let’s craft a custom itinerary tailored exclusively for you. Connect with our travel designers today.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Button variant="inquire" className="px-8" href="/services/bespoke-travel">
            Plan Your Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
