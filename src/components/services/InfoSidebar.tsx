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
        {/* Header Section */}
        <div className="mb-6">
          <h3 className="premium-serif text-xl text-white">
            {titleBase} <span className="italic text-gold">{titleAccent}</span>
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{subtitle}</p>
        </div>

        {/* Features List */}
        <div className="space-y-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex gap-4 rounded-2xl border border-white/5 bg-white/2 p-4 transition-colors hover:bg-white/4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{feature.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info Box */}
        <div className="mt-8 rounded-xl border border-gold/20 bg-gold/5 p-4 text-center">
          <FooterIcon className="mx-auto mb-2 h-5 w-5 text-gold" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{footerTitle}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{footerDescription}</p>
        </div>
      </div>
    </aside>
  );
}
