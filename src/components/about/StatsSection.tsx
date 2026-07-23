import React from "react";

interface StatsProps {
  data: { label: string; value: string }[];
}

export default function StatsSection({ data }: StatsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {data.map((stat, index) => (
        <div
          key={index}
          className="group relative glass-card rounded-3xl p-6 md:p-8 text-center flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 w-[47%] md:w-[31%] lg:w-[23%] min-w-37.5"
        >
          {/* Top Gold Accent Line on Hover */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />

          <div className="relative z-10 space-y-2">
            <h3 className="premium-serif text-3xl md:text-4xl lg:text-5xl text-gold font-bold tracking-tight drop-shadow-md">
              {stat.value}
            </h3>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
