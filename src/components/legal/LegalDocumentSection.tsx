import type { LegalDocument, LegalDocumentId } from "@/data/legal";
//Icons
import { FileText, ShieldCheck, CalendarCheck, CreditCard, type LucideIcon } from "lucide-react";

const documentIcons = {
  terms: FileText,
  privacy: ShieldCheck,
  booking: CalendarCheck,
  payment: CreditCard,
} satisfies Record<LegalDocumentId, LucideIcon>;

type LegalDocumentSectionProps = {
  document: LegalDocument;
};

export function LegalDocumentSection({ document }: LegalDocumentSectionProps) {
  const Icon = documentIcons[document.id];

  return (
    <section id={document.id} className="scroll-mt-32">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
          <Icon className="h-4 w-4 text-gold" />
        </div>
        <h2 className="premium-serif text-xl font-bold text-white md:text-2xl">{document.title}</h2>
      </div>

      <div className="h-auto no-scrollbar space-y-6 border-l border-white/5 pl-5 pr-2 text-sm leading-relaxed text-slate-300 md:pl-6 md:pr-4 md:text-base">
        {document.items.map((item) => (
          <article key={item.heading}>
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gold md:text-xs">
              {item.heading}
            </h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
