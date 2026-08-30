// src/components/auth/AuthLegalFooter.tsx
"use client";

import { Link } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";

export function AuthLegalFooter() {
  const t = useTranslations("SharedForm.LegalFooter");
  return (
    <div className="mt-8 pt-6 text-center px-8 md:px-12 border-t border-gold/10 relative">
      {/* Top tiny gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

      <p className="text-[13px] font-light text-foreground/80 leading-relaxed">
        {" "}
        {t("prefix")}{" "}
        <Link href="/legal/terms" className="text-gold underline underline-offset-4 hover:text-white font-medium">
          {t("terms")}
        </Link>
        <span className="text-slate-300 font-normal"> , </span>
        <Link href="/legal/privacy" className="text-gold underline underline-offset-4 hover:text-white font-medium">
          {t("privacy")}
        </Link>{" "}
        {t("and")}{" "}
        <Link href="/legal/cookies" className="text-gold underline underline-offset-4 hover:text-white font-medium">
          {t("cookie")}
        </Link>
        {t("suffix")}
      </p>
    </div>
  );
}
