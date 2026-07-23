import React from "react";

interface CoreValueItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface CoreValuesProps {
  data: CoreValueItem[];
}

export default function CoreValues({ data }: CoreValuesProps) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-12">
      <h2 className="premium-serif text-center text-3xl text-white mb-10">Our Core Values</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((value) => {
          const Icon = value.icon;
          return (
            <div
              key={value.id}
              className="flex flex-col items-center text-center space-y-4 p-4 rounded-2xl hover:bg-white/2 transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold tracking-wide">{value.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{value.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
