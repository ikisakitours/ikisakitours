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
            className="glass-card relative flex flex-col items-start rounded-3xl p-8 border border-white/10 transition-all hover:border-gold/30"
          >
            <div className="flex items-center gap-6 mb-4 w-full">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/10">
                <Icon className="h-5.5 w-5.5 text-gold" />
              </div>
              <h4 className="text-body-lead font-bold text-white">{f.title}</h4>
            </div>
            <p className="text-left text-body leading-relaxed text-slate-400 w-full">{f.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
