"use client";

import React from "react";
import { Link, useRouter } from "@/lib/i18nNavigation";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BlogBackButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fromWhere = searchParams?.get("from");
  const t = useTranslations("Blog.Article");

  const backHref = fromWhere === "home" ? "/" : "/blog";
  const backText = fromWhere === "home" ? t("backToHome") : t("backToJournal");

  return (
    <Link
      href={backHref}
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          router.back();
        }
      }}
      className="group flex w-fit cursor-pointer items-center gap-3 text-caption font-bold uppercase tracking-widest! text-white/60 transition-colors hover:text-gold"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-gold/50 group-hover:bg-gold/10">
        <ArrowLeft strokeWidth={3} size={14} className="text-white group-hover:text-gold" />
      </span>
      {backText}
    </Link>
  );
}
