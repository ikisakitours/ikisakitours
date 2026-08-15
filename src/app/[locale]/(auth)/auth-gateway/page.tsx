import React from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AuthGatewayForm } from "@/components/auth/AuthGateway/AuthGatewayForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Auth.Metadata.Gateway" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AuthGateway() {
  return (
    <AuthShell introKey="Gateway">
      <AuthGatewayForm />
    </AuthShell>
  );
}
