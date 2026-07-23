import React from "react";

interface MissionVisionProps {
  mission: { title: string; description: string };
  vision: { title: string; description: string };
}

export default function MissionVisionSection({ mission, vision }: MissionVisionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="glass-card rounded-3xl p-8 md:p-10 group hover:border-gold/30 transition-colors duration-300">
        <h3 className="premium-serif text-2xl text-white mb-4 group-hover:text-gold transition-colors">
          {mission.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{mission.description}</p>
      </div>
      <div className="glass-card rounded-3xl p-8 md:p-10 group hover:border-gold/30 transition-colors duration-300">
        <h3 className="premium-serif text-2xl text-white mb-4 group-hover:text-gold transition-colors">
          {vision.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{vision.description}</p>
      </div>
    </div>
  );
}
