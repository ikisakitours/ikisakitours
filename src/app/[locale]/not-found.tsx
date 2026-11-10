"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/lib/i18nNavigation";
import { NotFoundUI } from "@/components/ui/NotFoundUI";

// "ja" -> "日本語", "en" -> "English"
const languageOptions = routing.locales.map((code) => ({
  code,
  label: new Intl.DisplayNames([code], { type: "language" }).of(code) ?? code,
}));

function getUnsupportedLanguage(pathname: string, locale: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  const locales = routing.locales as readonly string[];

  const candidate = locales.includes(segments[0]) ? segments[1] : segments[0];
  if (!candidate) return null;

  if (!/^[a-z]{2}(-[a-zA-Z]{2})?$/.test(candidate)) return null;
  if (locales.includes(candidate)) return null;

  try {
    const name = new Intl.DisplayNames([locale], { type: "language" }).of(candidate);
    if (!name || name.toLowerCase() === candidate.toLowerCase()) return null;
    return name;
  } catch {
    return null;
  }
}

export default function LocalizedNotFound() {
  const t = useTranslations("NotFoundPage");
  const locale = useLocale();
  const pathname = usePathname();

  const unsupportedLanguage = getUnsupportedLanguage(pathname, locale);

  if (unsupportedLanguage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <NotFoundUI
          code="🌐"
          badgeText={t("NotFoundPage.unsupportedBadge")}
          oopsText={t("NotFoundPage.unsupportedOops")}
          title={t("NotFoundPage.unsupportedTitle")}
          description={t("NotFoundPage.unsupportedDescription", { language: unsupportedLanguage })}
          backButtonText={t("NotFoundPage.backButton")}
          languages={languageOptions}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505]">
      <NotFoundUI
        badgeText={t("NotFoundPage.badge")}
        oopsText={t("NotFoundPage.oops")}
        title={t("NotFoundPage.title")}
        description={t("NotFoundPage.description")}
        backButtonText={t("NotFoundPage.backButton")}
        homeButtonText={t("NotFoundPage.homeButton")}
        fallbackLocale={locale}
      />
    </div>
  );
}
