import { useTranslations } from "next-intl";
//Icons
import { WandSparkles } from "lucide-react";

export default function TourCustomization() {
  const t = useTranslations("Booking.Customization");
  return (
    <section
      id="Tour-Customization"
      className="glass-card mb-8 flex flex-col gap-4 rounded-4xl border border-white/5 p-6 sm:flex-row sm:items-start md:mb-10 md:gap-6 md:p-8"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold border border-gold/20 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
        <WandSparkles className="h-6 w-6" />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold text-white md:text-xl">{t("title")}</h3>
        <p className="text-sm leading-[1.7] text-slate-300 md:text-[15px]">{t("description")}</p>
      </div>
    </section>
  );
}
