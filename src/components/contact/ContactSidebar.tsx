"use client";
//Icons
import { SiWhatsapp } from "react-icons/si";
import { Mail, Phone, MapPin, Clock, Headphones } from "lucide-react";
type SidebarProps = {
  data: {
    title: string;
    info: {
      label: string;
      value: string;
    }[];
    whatsapp: {
      title: string;
      buttonText: string;
      href: string;
    };
  };
};
const contactInfoIcons = [Mail, Phone, MapPin, Clock];

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-gold mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

export default function ContactSidebar({ data }: SidebarProps) {
  return (
    <div className="space-y-8 lg:col-span-1">
      <div className="glass-card rounded-3xl p-8">
        <h2 className="premium-serif mb-6 text-xl text-white">{data.title}</h2>
        <div className="space-y-6">
          {data.info.map((item, index) => {
            const Icon = contactInfoIcons[index] || Headphones;
            return <InfoItem key={index} icon={<Icon className="h-5 w-5" />} label={item.label} value={item.value} />;
          })}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950/20 via-lanka-black/90 to-lanka-black p-8 border border-gold/30 shadow-2xl backdrop-blur-xl group/card transition-all duration-500 hover:border-emerald-500/50 hover:bg-emerald-950/30">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover/card:bg-emerald-500/20" />
        <p className="relative z-10 premium-serif mb-5 text-base font-extrabold tracking-wide text-white flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {data.whatsapp.title}
        </p>

        <button
          type="button"
          onClick={() => window.open(data.whatsapp.href, "_blank")}
          className="group mx-auto flex w-full cursor-pointer items-center justify-center gap-4 border-none bg-transparent p-0 text-left sm:w-auto sm:justify-start relative z-10"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner animate-blink-border transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10 group-hover:scale-105 md:h-13 md:w-13">
            <SiWhatsapp className="h-5 w-5 text-emerald-400 transition-colors group-hover:text-gold md:h-6 md:w-6" />
          </div>
          <div className="flex flex-col">
            <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-white md:text-[13px]">
              {data.whatsapp.buttonText}
            </span>
            <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[10px] font-medium text-gold/90 md:text-[12px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping" />
              Online & Ready to Chat —{" "}
              <span className="underline decoration-gold/60 underline-offset-2 transition-colors group-hover:text-gold">
                Click to chat
              </span>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
