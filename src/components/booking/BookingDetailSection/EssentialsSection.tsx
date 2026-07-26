import SectionHeading from "./SectionHeading";
//Icons
import { Camera, Glasses, Sun, Footprints, Check } from "lucide-react";
import { BsBackpack4Fill } from "react-icons/bs";
import { GiWaterBottle } from "react-icons/gi";

type EssentialItem = {
  label: string;
};

type EssentialsSectionProps = {
  tour: {
    essentials: EssentialItem[];
  };
};
const essentialIcons = [Camera, Glasses, Sun, BsBackpack4Fill, GiWaterBottle, Footprints];

export default function EssentialsSection({ tour }: EssentialsSectionProps) {
  return (
    <section id="essentials" className="mb-10 md:mb-14">
      <SectionHeading>What to bring</SectionHeading>
      <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8 md:gap-10">
        {tour.essentials.map((item, idx) => {
          const Icon = essentialIcons[idx] || Check;
          return (
            <article key={item.label} className="group flex flex-col items-center text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/5 transition-all group-hover:border-gold/40 md:mb-4 md:h-20 md:w-20">
                <Icon className="h-6 w-6 text-gold/60 md:h-7 md:w-7" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 md:text-[10px]">
                {item.label}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
