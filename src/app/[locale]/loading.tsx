import React from "react";
import { useTranslations } from "next-intl";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";

export default function Loading() {
  const t = useTranslations("Common.Api");
  return <ApiCallLoader fullScreen={true} text={t("loading")} />;
}
