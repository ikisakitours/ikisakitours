"use client";

import SectionHeading from "./SectionHeading";
import { useTranslations } from "next-intl";

// Icons
import { Sun, Footprints, Umbrella, Check } from "lucide-react";
import { GiWaterBottle, GiSocks, GiBilledCap } from "react-icons/gi";

const iconMap: Record<string, React.ElementType> = {
  "Water Bottle": GiWaterBottle,
  Sunscreen: Sun,
  Cap: GiBilledCap,
  "Walking Shoes": Footprints,
  "Temple Socks": GiSocks,
  Umbrella: Umbrella,
};

const essentialKeys = ["Water Bottle", "Sunscreen", "Cap", "Walking Shoes", "Temple Socks", "Umbrella"];

export default function EssentialsSection() {
  const t = useTranslations("Booking.Essentials");

  return (
    <section id="essentials" className="mb-10 md:mb-14">
      <SectionHeading>{t("title")}</SectionHeading>

      <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8 md:gap-10">
        {essentialKeys.map((key) => {
          const Icon = iconMap[key] || Check;

          return (
            <article key={key} className="group flex flex-col items-center text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-all group-hover:border-gold/40 md:mb-4 md:h-20 md:w-20">
                <Icon className="h-6 w-6 text-gold/60 md:h-7 md:w-7" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">
                {t(`items.${key}`)}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
