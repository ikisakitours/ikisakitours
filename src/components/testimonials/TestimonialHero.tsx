import { testimonialStats, testimonialHeroData } from "@/data/testimonials";
import StatCard from "./StatCard";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout"; 

export function TestimonialHero() {
  return (
    <header className="relative overflow-hidden border-b border-white/5 pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(197,160,89,0.08),transparent_28%,transparent_72%,rgba(197,160,89,0.05))]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

      <ContainerLayout className="relative z-10">
        
        <div className="flex flex-col items-center justify-between gap-12 xl:flex-row xl:gap-24">
          <div className="max-w-2xl text-center xl:text-left">
            <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1 md:mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{testimonialHeroData.badge}</span>
            </div>

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