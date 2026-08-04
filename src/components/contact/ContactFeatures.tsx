"use client";
import { Headphones, Globe, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const contactInfoIcons = [Headphones, Globe, ShieldCheck];

export default function ContactFeatures() {
  const t = useTranslations("ContactPage");
  const featuresArray = t.raw("Features") as { title: string; desc: string }[];

  return (
    <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {featuresArray.map((f, i) => {
        const Icon = contactInfoIcons[i] || Headphones;
        return (
          <div
            key={i}
            className="glass-card flex flex-col items-start rounded-3xl p-8 border border-white/10 transition-all hover:border-gold/30"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
              <Icon className="h-6 w-6 text-gold" />
            </div>
            <h4 className="mb-3 text-lg font-bold text-white">{f.title}</h4>
            <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
          </div>
        );
      })}
    </div>
  );
}