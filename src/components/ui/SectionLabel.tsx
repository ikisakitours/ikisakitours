type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-6 inline-flex rounded-full border border-gold/20 bg-gold/5 px-4 py-1">
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{children}</span>
    </div>
  );
}
