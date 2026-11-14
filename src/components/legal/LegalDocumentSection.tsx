"use client";

import type { LegalDocumentContent } from "@/services/legal/types";
import { LEGAL_ICON_MAP } from "@/components/legal/LEGAL_ICON_MAP";
import { FileText, CheckCircle2, Mail, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function LegalDocumentSection({ document }: { document: LegalDocumentContent }) {
  const t = useTranslations("LegalPage.LegalPage");

  return (
    <div className="space-y-10 md:space-y-12 animate-fade-in-up w-full">
      {document.sections.map((section, idx) => {
        const SectionIcon: LucideIcon =
          (section.sectionIcon && LEGAL_ICON_MAP[section.sectionIcon]) || FileText;

        return (
          <section
            key={idx}
            id={`${document.id}-${idx}`}
            className="scroll-mt-32 pb-10 border-b border-white/5 last:border-0 last:pb-0"
          >
            <div className="w-full">
              {/* ── Section Header ── */}
              <div className="mb-5 md:mb-6 flex items-start gap-4">
                <div className="shrink-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold -mt-1 md:-mt-1.5">
                  <SectionIcon className="h-5 w-5 text-gold" />
                </div>

                {/* Heading */}
                <h2 className="premium-serif text-heading-card font-bold text-white">
                  {section.heading}
                </h2>
              </div>

              {/* ── Section Content ── */}
              <div className="text-body leading-relaxed text-slate-300">
                {/* 1. Paragraph */}
                {section.type === "paragraph" && (
                  <div className="whitespace-pre-wrap font-light">{section.content}</div>
                )}

                {/* 2. Checklist */}
                {section.type === "checklist" && (
                  <ul className="space-y-4">
                    {section.subItems
                      ?.filter((item) => item.title || item.body)
                      .map((item, i) => (
                        <li key={i} className="flex items-start gap-3 ml-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <p className="font-light text-body">
                            {item.title && (
                              <strong className="font-bold text-white">{item.title}: </strong>
                            )}
                            {item.body}
                          </p>
                        </li>
                      ))}
                  </ul>
                )}

                {/* 3. Card Grid */}
                {section.type === "grid" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {section.subItems
                      ?.filter((item) => item.title || item.body)
                      .map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl md:rounded-2xl border border-white/5 bg-white/5 p-4 md:p-5 transition-colors hover:border-gold/30 hover:bg-gold/5"
                        >
                          {item.title && (
                            <h4 className="mb-1.5 md:mb-2 font-bold text-body text-white">
                              {item.title}
                            </h4>
                          )}
                          <p className="text-body font-light text-slate-400">{item.body}</p>
                        </div>
                      ))}
                  </div>
                )}

                {/* 4. Icon List */}
                {section.type === "icon-list" && (
                  <div className="space-y-4 md:space-y-5">
                    {section.subItems
                      ?.filter((item) => item.title || item.body)
                      .map((item, i) => {
                        const ItemIcon: LucideIcon =
                          (item.icon && LEGAL_ICON_MAP[item.icon]) || CheckCircle2;
                        return (
                          <div key={i} className="flex items-start gap-3 md:gap-4">
                            <div className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-white/5 text-gold">
                              <ItemIcon className="h-4 w-4 md:h-4.5 md:w-4.5" />
                            </div>
                            <div>
                              {item.title && (
                                <h4 className="mb-0.5 md:mb-1 font-bold text-body text-white">
                                  {item.title}
                                </h4>
                              )}
                              <p className="text-body font-light text-slate-400">{item.body}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* 5. Row List */}
                {section.type === "row-list" && (
                  <div>
                    {section.content && (
                      <p className="mb-4 md:mb-5 text-body font-light">{section.content}</p>
                    )}
                    <div className="overflow-hidden rounded-xl md:rounded-2xl border border-white/5 bg-white/5">
                      {section.subItems?.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 p-3 md:p-4 last:border-0 gap-1 sm:gap-4"
                        >
                          <span className="font-bold text-body text-white">{item.title}</span>
                          <span className="text-body text-slate-400 sm:text-right">{item.body}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Contact Details */}
                {section.type === "contact" && (
                  <div>
                    <p className="text-body mb-6 font-light text-slate-300">
                      {t("contactPrompt")}
                    </p>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {section.subItems
                        ?.filter((item) => item.title || item.body)
                        .map((item, i) => {
                          const ItemIcon: LucideIcon =
                            (item.icon && LEGAL_ICON_MAP[item.icon]) || Mail;
                          const isWide = (item.body?.length || 0) > 50;

                          return (
                            <div
                              key={i}
                              className={`flex items-start gap-4 ${
                                isWide ? "sm:col-span-2 lg:col-span-3" : ""
                              }`}
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gold">
                                <ItemIcon className="h-5 w-5" />
                              </div>

                              <div className="flex flex-col gap-1 w-full">
                                <h4 className="text-caption font-bold uppercase tracking-widest text-slate-400">
                                  {item.title}
                                </h4>
                                <p className="text-body-sm font-medium text-gold wrap-break-word">
                                  {item.body}
                                </p>
                              </div>
                            </div>
                          );
                        })}
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