"use client";

import React from "react";

interface PromoGraphicProps {
  discountAmount: string;
  discountType: string;
  t: (key: string) => string;
}

export const PromoGraphic = ({ discountAmount, discountType, t }: PromoGraphicProps) => {
  return (
    <div className="w-full md:w-5/12 bg-[#050505] relative p-8 flex flex-col items-center justify-center overflow-hidden min-h-65 md:min-h-full border-b md:border-b-0 md:border-r border-gold/20">
      <div className="absolute inset-0 bg-linear-to-tr from-gold/20 via-transparent to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gold/15 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative w-full h-full flex items-center justify-center scale-95 sm:scale-100">
        <div className="absolute -top-4 -left-2 w-32 h-20 bg-gold/10 border border-gold/30 rounded-xl transform -rotate-12 backdrop-blur-md shadow-2xl flex items-center justify-between px-3 opacity-60">
          <div className="w-3 h-3 rounded-full bg-black/40" />
          <div className="w-3 h-3 rounded-full bg-black/40" />
        </div>
        <div className="absolute -bottom-6 -right-2 w-36 h-22 bg-gold/20 border border-gold/40 rounded-xl transform rotate-12 backdrop-blur-md shadow-2xl flex flex-col justify-between p-2 opacity-70">
          <div className="w-full h-1.5 bg-gold/30 rounded-full" />
          <div className="w-full h-1.5 bg-gold/30 rounded-full" />
        </div>

        <div className="relative z-10 w-52 sm:w-60 bg-linear-to-br from-gold via-gold-dark to-[#997935] p-6 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] transform -rotate-6 hover:rotate-0 transition-transform duration-500 border border-white/20 text-lanka-black flex flex-col justify-between overflow-hidden">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050505] border-r border-gold/30" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#050505] border-l border-gold/30" />
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest opacity-80 border-b border-black/10 pb-2">
            <span>{t("badge")}</span>
            <span className="font-mono">{t("tag")}</span>
          </div>
          <div className="py-4 text-center">
            <h3 className="text-5xl font-black tracking-tighter drop-shadow-sm">{discountAmount}</h3>
            <span className="text-xl font-bold uppercase tracking-[0.2em] block leading-none mt-1">{discountType}</span>
          </div>
          <div className="border-t border-dashed border-black/20 pt-2 text-center">
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-90 block">{t("bottomText")}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-lg bg-black/60 border border-gold/30 backdrop-blur-md text-[10px] text-gold uppercase tracking-wider font-bold shadow-lg">
        {t("floatingTag")}
      </div>
    </div>
  );
};
