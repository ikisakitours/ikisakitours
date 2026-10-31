import React from "react";

export type SidebarFeature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type InfoSidebarProps = {
  titleBase: string;
  titleAccent: string;
  subtitle: string;
  features: SidebarFeature[];
  footerIcon: React.ElementType;
  footerTitle: string;
  footerDescription: string;
};

export function InfoSidebar({
  titleBase,
  titleAccent,
  subtitle,
  features,
  footerIcon: FooterIcon,
  footerTitle,
  footerDescription,
}: InfoSidebarProps) {
  return (
    <aside className="xl:sticky xl:top-32 xl:col-span-4">
      <div className="glass-card overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/85 p-6 shadow-2xl backdrop-blur-3xl md:p-8">
        {/* Header */}
        <div className="mb-7">
          <h3 className="premium-serif text-heading-sub text-white">
            {titleBase} <span className="italic text-gold">{titleAccent}</span>
          </h3>
          <div className="mt-3 h-px w-12 bg-linear-to-r from-gold/70 to-transparent" />
          <p className="mt-4 text-body-sm leading-relaxed text-slate-400">{subtitle}</p>
        </div>

        {/* Features */}
        <ul>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <li
                key={idx}
                className="group relative border-t border-white/10 py-6 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="premium-serif text-body italic text-gold/80">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className="h-5 w-5 text-slate-500 transition-colors duration-300 group-hover:text-gold"
                    strokeWidth={1.5}
                  />
                </div>

                <h4 className="text-caption font-bold uppercase tracking-[0.25em] text-white">{feature.title}</h4>
                <p className="mt-2 text-body-sm leading-relaxed text-slate-400">{feature.description}</p>

                {/* hover accent line */}
                <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-linear-to-r from-gold to-transparent transition-all duration-500 group-hover:w-full group-first:hidden" />
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="relative mt-8 border-t border-gold/30 pt-6">
          {/* gold accent on the divider */}
          <span className="pointer-events-none absolute -top-px left-0 h-px w-12 bg-gold" />

          <div className="flex items-center gap-3">
            <FooterIcon className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
            <p className="text-caption font-bold uppercase tracking-[0.25em] text-gold">{footerTitle}</p>
          </div>
          <p className="mt-3 text-body-sm leading-relaxed text-slate-400">{footerDescription}</p>
        </div>
      </div>
    </aside>
  );
}
