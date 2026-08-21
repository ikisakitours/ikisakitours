import { NotFoundUI } from "@/components/ui/NotFoundUI";
import { useTranslations } from "next-intl";
export default function LocalizedNotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505]">
     <NotFoundUI 
        badgeText={t("NotFoundPage.badge")}
        oopsText ={t("NotFoundPage.oops")}
        title={t("NotFoundPage.title")}
        description={t("NotFoundPage.description")}
        backButtonText={t("NotFoundPage.backButton")}
        homeButtonText={t("NotFoundPage.homeButton")}
        fallbackLocale="en"
      />
    </div>
  );
}