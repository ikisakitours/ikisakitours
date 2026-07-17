import React from 'react';

type StatCardProps = {
  featured?: boolean;
  label: string;
  value: string;
};

export default function StatCard({ featured, label, value }: StatCardProps) {
  return (
    <div
      className={`group flex flex-col items-center rounded-4xl border p-6 text-center backdrop-blur-md transition-all duration-500 hover:border-gold/50 md:p-8 ${
        featured ? "border-gold/20 bg-gold/5" : "border-white/5 bg-white/3"
      }`}
    >
      <div
        className={`premium-serif mb-2 text-3xl transition-colors md:text-4xl ${
          featured ? "text-gold" : "text-white group-hover:text-gold"
        }`}
      >
        {value}
      </div>
      <div className="text-[9px] font-bold uppercase tracking-widest text-gold">
        {label}
      </div>
    </div>
  );
}