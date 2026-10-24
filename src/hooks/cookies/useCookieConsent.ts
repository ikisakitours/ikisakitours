import { useState, useEffect } from "react";
import { usePathname } from "@/lib/i18nNavigation";
import { saveCookiePreferences, declineAllCookies } from "@/utils/cookiesHandle";
import { useAuth } from "@/context/AuthContext";
import { cookieService } from "@/services/cookies/cookieService";

export function useCookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferenceOpen, setIsPreferenceOpen] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  const pathname = usePathname();
  const isLegalPage = pathname.includes("/legal/cookie");
  const { user } = useAuth();

  // 1. Initial Load & Database Check
  useEffect(() => {
    const checkConsent = async () => {
      const hasLocalConsent = document.cookie.split("; ").find((row) => row.startsWith("ikisaki_cookie_consent="));
      if (hasLocalConsent) return;

      if (user?.id) {
        const dbConsent = await cookieService.getConsent(user.id);
        if (dbConsent && dbConsent.preferences) {
          saveCookiePreferences(
            {
              performance: dbConsent.preferences.performance,
              functional: dbConsent.preferences.functional,
              targeting: dbConsent.preferences.targetingAndMarketing,
            },
            "accepted"
          );
          return;
        }
      }

      const showCookieModal = () => setTimeout(() => setIsVisible(true), 1500);

      if (typeof window !== "undefined") {
        const isPreloaderAlreadyDone =
          document.cookie.includes("preloader_seen=true") ||
          (window as Window & { __preloaderDone?: boolean }).__preloaderDone;

        if (isPreloaderAlreadyDone) {
          showCookieModal();
        } else {
          window.addEventListener("preloaderFinished", showCookieModal);
        }
      }
    };

    checkConsent();

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("preloaderFinished", () => setIsVisible(true));
      }
    };
  }, [user?.id]);

  // 2. Menu State & Updates Check
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMenuState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (customEvent.detail.isOpen) {
        clearTimeout(timeoutId);
        setIsHeaderMenuOpen(true);
      } else {
        timeoutId = setTimeout(() => {
          setIsHeaderMenuOpen(false);
        }, 800);
      }
    };
    window.addEventListener("mobileMenuStateChange", handleMenuState);

    const handleCookieUpdate = () => setIsVisible(false);
    window.addEventListener("cookieConsentUpdated", handleCookieUpdate);

    return () => {
      window.removeEventListener("mobileMenuStateChange", handleMenuState);
      window.removeEventListener("cookieConsentUpdated", handleCookieUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  // 3. Handlers
 const handleAccept = async () => {
    const defaultPrefs = { performance: true, functional: true, targeting: true };
    saveCookiePreferences(defaultPrefs, "accepted");
    
    if (user?.id) {
      try {
        await cookieService.saveConsent(user.id, defaultPrefs);
        console.log("✅ Accept All: Cookies successfully saved to DB!");
      } catch (error) {
        console.error("❌ Accept All: Failed to save cookies to DB:", error);
      }
    }

    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setIsVisible(false);
  };

  const handleDecline = async () => {
    declineAllCookies();

    if (user?.id) {
      try {
        await cookieService.saveConsent(user.id, { performance: false, functional: false, targeting: false });
        console.log("✅ Reject All: Cookies successfully saved to DB!");
      } catch (error) {
        console.error("❌ Reject All: Failed to save cookies to DB:", error);
      }
    }

    window.dispatchEvent(new Event("cookieConsentUpdated"));
    setIsVisible(false);
  };

  return {
    isVisible,
    isLegalPage,
    isHeaderMenuOpen,
    isPreferenceOpen,
    setIsPreferenceOpen,
    handleAccept,
    handleDecline,
  };
}