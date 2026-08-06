import React from "react";
import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useTranslations } from "next-intl";

type ActivityItem = {
  title: string;
  description: string;
};

type ActivityDetailsProps = {
  tour: {
    activityDetails: ActivityItem[];
  };
};
export default function ActivityDetails({ tour }: ActivityDetailsProps) {
  const t = useTranslations("Booking.ActivityDetails");

  return (
    <section id="about" className="mb-10 md:mb-14">
      <SectionHeading>{t("title")}</SectionHeading>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-x-10 md:gap-y-12">
        {tour.activityDetails.map((item) => (
          <article key={item.title} className="flex items-start gap-4 md:gap-5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
              <Check className="h-3 w-3 text-gold" />
            </span>
            <div>
              <h3 className="mb-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white md:text-sm md:tracking-widest">
                {item.title}
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-400 md:text-xs">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
