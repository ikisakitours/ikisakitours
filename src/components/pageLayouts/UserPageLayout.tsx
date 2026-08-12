"use client";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingWidgets } from "@/components/ui/FloatingWidgets";

export default function UserPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <SiteHeader />

      <main className="flex-1 w-full">{children}</main>

      <Footer />

      <FloatingWidgets />
    </div>
  );
}
