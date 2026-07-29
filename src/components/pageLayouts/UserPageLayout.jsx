import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";

import { ChatWidget } from "@/components/ui/ChatWidget";
export default function UserPageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <SiteHeader />

      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-150 flex flex-col items-center gap-4 pointer-events-none">
        <div className="pointer-events-auto">
          <BackToTop />
        </div>

        <div className="pointer-events-auto">
          <ChatWidget />
        </div>
      </div>
    </div>
  );
}
