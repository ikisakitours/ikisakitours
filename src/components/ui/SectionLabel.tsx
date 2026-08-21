type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    // <div className="mb-6 inline-flex rounded-full border border-gold/20 bg-gold/5 px-4 py-1">
    //   <span className="text-caption font-bold uppercase tracking-[0.3em] text-gold">{children}</span>
    // </div>

    <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0a0a0a]/90 border border-gold/40 shadow-[0_4px_15px_rgba(0,0,0,0.6)] relative overflow-hidden group w-fit">
      <div className="absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="text-gold text-tiny">✦</span>
      <span className="text-caption font-serif font-bold uppercase tracking-[0.35em] text-gold">{children}</span>
      <span className="text-gold text-tiny">✦</span>
    </div>
  );
}
