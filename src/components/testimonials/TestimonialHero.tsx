import { testimonials } from "@/data/testimonials";
import StatCard from "./StatCard";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import EyeBrow from "@/components/ui/EyeBrow";
import { useTranslations } from "next-intl";

export function TestimonialHero() {
  const t = useTranslations("Testimonials.Hero");

  const totalReviews = testimonials.length;
  const reviewCountDisplay =
    totalReviews >= 1000 ? `${(totalReviews / 1000).toFixed(1).replace(".0", "")}k+` : `${totalReviews}+`;
  const totalRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0);
  const averageScore = testimonials.length > 0 ? (totalRating / testimonials.length).toFixed(1) : "0.0";

  const testimonialStats = [
    { value: "99%", label: t("stats.success"), featured: false },
    { value: "24/7", label: t("stats.support"), featured: false },
    { value: reviewCountDisplay, label: t("stats.reviews"), featured: false },
    { value: averageScore, label: t("stats.rating"), featured: true },
  ];

  return (
    <header className="relative overflow-hidden border-b border-white/5 pt-28 sm:pt-30 md:pt-34 lg:pt-28 2xl:pt-30 3xl:pt-32 pb-12 sm:pb-16 md:pb-18 lg:pb-20 2xl:pb-22 3xl:pb-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(197,160,89,0.08),transparent_28%,transparent_72%,rgba(197,160,89,0.05))]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

      <ContainerLayout className="relative z-10">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-3 lg:gap-16 xl:gap-24">
          <div className="max-w-2xl text-center xl:text-left">
            <EyeBrow eyebrow={t("badge")} />

            <h1 className="premium-serif mb-6 text-heading-hero leading-[1.08] tracking-tight text-white">
              {t("titleStart")}
              <span className="hidden sm:inline">
                <br />
              </span>
              <span className="gold-gradient-text italic ml-2 md:ml-0!">{t("titleHighlight")}</span>
            </h1>

            <p className="mx-auto max-w-lg text-body-lead font-light leading-relaxed text-slate-400 xl:mx-0">
              {t("description")}
            </p>
          </div>

          <div className="w-full max-w-md">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 pt-8 md:space-y-6 xl:pt-12">
                {testimonialStats.slice(0, 2).map((item) => (
                  <StatCard key={item.label} value={item.value} label={item.label} />
                ))}
              </div>
              <div className="space-y-4 md:space-y-6">
                {testimonialStats.slice(2).map((item) => (
                  <StatCard key={item.label} value={item.value} label={item.label} featured={item.featured} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContainerLayout>
    </header>
  );
}
