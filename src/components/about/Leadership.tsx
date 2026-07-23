import React from "react";
import Image from "next/image";

interface LeadershipProps {
  data: {
    title: string;
    name: string;
    role: string;
    bio: string;
  };
}

export default function Leadership({ data }: LeadershipProps) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col items-center text-center">
      <h2 className="premium-serif text-3xl text-white mb-10">{data.title}</h2>

      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gold/30 mb-6 relative group">
        <Image
          src="https://i.pravatar.cc/150?u=yuki-tanaka"
          alt={data.name}
          fill
          sizes="112px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <h3 className="text-xl font-bold text-white mb-1">{data.name}</h3>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-6">{data.role}</span>
      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">{data.bio}</p>
    </div>
  );
}
