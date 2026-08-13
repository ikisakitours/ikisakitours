"use client";

import type { LegalDocument } from "@/data/legal";
// Icons
import {
  FileText,
  Database,
  Users,
  Shield,
  Globe,
  HelpCircle,
  CheckCircle2,
  Lock,
  Server,
  Fingerprint,
  type LucideIcon,
} from "lucide-react";

// Icon Mapping
const iconMap: Record<string, LucideIcon> = {
  FileText,
  Database,
  Users,
  Shield,
  Globe,
  HelpCircle,
  Lock,
  Server,
  Fingerprint,
};

export function LegalDocumentSection({ document }: { document: LegalDocument }) {
  return (
    <div className="space-y-10 md:space-y-12 animate-fade-in-up w-full">
      {document.sections.map((section, idx) => {
        const SectionIcon = iconMap[section.sectionIcon] || FileText;

        return (
          <section
            key={idx}
            id={`${document.id}-${idx}`}
            className="scroll-mt-32 pb-10 border-b border-white/5 last:border-0 last:pb-0"
          >
            <div className="w-full">
              <div className="mb-5 md:mb-6 flex items-center gap-4">
                <div className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
                  <SectionIcon className="h-4 w-4 md:h-5 md:w-5 text-gold" />
                </div>
                <h2 className="premium-serif text-lg font-bold text-white md:text-xl lg:text-2xl">{section.heading}</h2>
              </div>

              <div className="text-[13.5px] md:text-[14.5px] leading-relaxed text-slate-300">
                {section.type === "paragraph" && (
                  <div className="whitespace-pre-wrap font-light">{section.content}</div>
                )}

                {section.type === "checklist" && (
                  <ul className="space-y-4">
                    {section.subItems?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <p className="font-light">
                          <strong className="font-bold text-white">{item.title}: </strong>
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === "grid" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {section.subItems?.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-xl md:rounded-2xl border border-white/5 bg-white/5 p-4 md:p-5 transition-colors hover:border-gold/30 hover:bg-gold/5"
                      >
                        <h4 className="mb-1.5 md:mb-2 font-bold text-white">{item.title}</h4>
                        <p className="text-[12px] md:text-[13px] font-light text-slate-400">{item.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "icon-list" && (
                  <div className="space-y-4 md:space-y-5">
                    {section.subItems?.map((item, i) => {
                      const ItemIcon = iconMap[item.icon || "Lock"] || Lock;
                      return (
                        <div key={i} className="flex items-start gap-3 md:gap-4">
                          <div className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-white/5 text-gold">
                            <ItemIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                          </div>
                          <div>
                            <h4 className="mb-0.5 md:mb-1 font-bold text-white">{item.title}</h4>
                            <p className="text-[12px] md:text-[13px] font-light text-slate-400">{item.body}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {section.type === "row-list" && (
                  <div>
                    {section.content && <p className="mb-4 md:mb-5 font-light">{section.content}</p>}
                    <div className="overflow-hidden rounded-xl md:rounded-2xl border border-white/5 bg-white/5">
                      {section.subItems?.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 p-3 md:p-4 last:border-0 gap-1 sm:gap-4"
                        >
                          <span className="font-bold text-white">{item.title}</span>
                          <span className="text-[12px] md:text-[13px] text-slate-400 sm:text-right">{item.body}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.type === "contact" && (
                  <div>
                    <p className="mb-4 md:mb-5 font-light">
                      If you have any questions about this policy, please contact us:
                    </p>
                    <div className="grid grid-cols-1 gap-5 md:gap-6 sm:grid-cols-2">
                      {section.subItems?.map((item, i) => (
                        <div key={i}>
                          <h4 className="mb-1 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            {item.title}
                          </h4>
                          <p className="text-[13px] md:text-[14px] font-medium text-gold">{item.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
