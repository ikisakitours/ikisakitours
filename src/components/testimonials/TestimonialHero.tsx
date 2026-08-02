import { testimonialHeroData, testimonials } from "@/data/testimonials";
import StatCard from "./StatCard";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import EyeBrow from "@/components/ui/EyeBrow";

//Ratings
const totalReviews = testimonials.length;
const reviewCountDisplay =
  totalReviews >= 1000 ? `${(totalReviews / 1000).toFixed(1).replace(".0", "")}k+` : `${totalReviews}+`;
const totalRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0);
const averageScore = testimonials.length > 0 ? (totalRating / testimonials.length).toFixed(1) : "0.0";

const testimonialStats = [
  { value: "99%", label: "Success", featured: false },
  { value: "24/7", label: "Support", featured: false },
  { value: reviewCountDisplay, label: "Reviews", featured: false },
  { value: averageScore, label: "Rating", featured: true },
] as const;

export function TestimonialHero() {
  return (
    <header className="relative overflow-hidden border-b border-white/5 pt-20 sm:pt-24 md:pt-26 lg:pt-28 2xl:pt-30 3xl:pt-32 pb-12 sm:pb-16 md:pb-18 lg:pb-20 2xl:pb-22 3xl:pb-24">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(197,160,89,0.08),transparent_28%,transparent_72%,rgba(197,160,89,0.05))]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

      <ContainerLayout className="relative z-10">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-8 lg:gap-16 xl:gap-24">
          <div className="max-w-2xl text-center xl:text-left">
            <EyeBrow eyebrow={testimonialHeroData.badge} />

            <h1 className="premium-serif mb-6 text-5xl leading-[1.08] tracking-tight text-white md:mb-8 md:text-8xl">
              {testimonialHeroData.titleStart} <br />
              <span className="gold-gradient-text italic">{testimonialHeroData.titleHighlight}</span>
            </h1>

            <p className="mx-auto max-w-lg text-base font-light leading-relaxed text-slate-400 md:text-xl xl:mx-0">
              {testimonialHeroData.description}
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
