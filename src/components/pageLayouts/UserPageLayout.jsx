import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
export default function UserPageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <SiteHeader />

      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
