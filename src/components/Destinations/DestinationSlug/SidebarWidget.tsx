import React from "react";
import { Compass, Info } from "lucide-react";
import { Destination } from "@/data/destinationData";
import { useTranslations } from "next-intl";
type Props = {
  name: string;
  guide: Destination["guide"];
};

export default function SidebarWidget({ name, guide }: Props) {
  const t = useTranslations("Destinations.Slug");
  return (
    <aside className="flex w-full flex-col gap-6 lg:mx-auto lg:max-w-2xl xl:mx-0 xl:max-w-none xl:col-span-4 xl:sticky xl:top-32">
      <div className="glass-card rounded-4xl border border-white/5 p-6 md:p-8">
        {/* Guide Header */}
        <div className="mb-8 flex flex-col items-center justify-center rounded-2xl bg-white/5 py-6 text-center">
          <Compass className="mb-3 h-8 w-8 text-gold" strokeWidth={1.5} />
          <h3 className="text-heading-card font-bold text-white">{t("destinationGuide")}</h3>
          <p className="mt-1 text-caption font-medium text-slate-400">{t("guideSubtitle")}</p>
        </div>

        {/* Details List */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-white/5 py-4">
            <span className="text-body-sm font-medium text-slate-400">Best Time to Visit</span>
            <span className="text-right text-body-sm font-bold text-white">{guide.bestTime}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 py-4">
            <span className="text-body-sm font-medium text-slate-400">Climate</span>
            <span className="text-right text-body-sm font-bold text-white">{guide.climate}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 py-4">
            <span className="text-body-sm font-medium text-slate-400">Primary Languages</span>
            <span className="text-right text-body-sm font-bold text-white">{guide.languages}</span>
          </div>
          <div className="flex items-center justify-between py-4">
            <span className="text-body-sm font-medium text-slate-400">Local Currency</span>
            <span className="text-right text-body-sm font-bold text-white">{guide.currency}</span>
          </div>
        </div>
      </div>

      {/* Info / Warning Box */}
      <div className="flex items-start gap-4 rounded-2xl border border-gold/20 bg-gold/5 p-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
        <p className="text-body-sm leading-relaxed text-slate-300">{t("personalizedNote", { name: name })}</p>
      </div>
    </aside>
  );
}
