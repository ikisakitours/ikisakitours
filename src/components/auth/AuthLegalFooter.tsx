// src/components/auth/AuthLegalFooter.tsx
"use client";

import { Link } from "@/i18nNavigation";
import { useTranslations } from "next-intl";

export function AuthLegalFooter() {
  const t = useTranslations("SharedForm.LegalFooter");
  return (
    <div className="mt-6 text-center px-2">
      <p className="text-fluid-xs font-light text-slate-500 leading-relaxed">
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
