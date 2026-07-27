"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: {
      hideWidget: () => void;
      showWidget: () => void;
    };
  }
}

export default function TawkToChat() {
  const pathname = usePathname();
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    //  5000ms + 1200ms
    const timer = setTimeout(() => {
      setIsPreloaderDone(true);
    }, 6200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMenuStateChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const isMenuOpen = customEvent.detail?.isOpen;

      if (window.Tawk_API) {
        if (isMenuOpen) {
          window.Tawk_API.hideWidget();
        } else {
          setTimeout(() => {
            window.Tawk_API?.showWidget();
          }, 800);
        }
      }
    };

    window.addEventListener("mobileMenuStateChange", handleMenuStateChange);

    return () => {
      window.removeEventListener("mobileMenuStateChange", handleMenuStateChange);
    };
  }, []);

  const hiddenRoutes = ["/login", "/signup", "/password-change", "/confirm-email"];
  const isHidden = hiddenRoutes.includes(pathname);

  useEffect(() => {
    if (isPreloaderDone && window.Tawk_API) {
      if (isHidden) {
        window.Tawk_API.hideWidget();
      } else {
        window.Tawk_API.showWidget();
      }
    }
  }, [isHidden, isPreloaderDone]);

  if (isHidden || !isPreloaderDone) {
    return null;
  }

  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`(function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/6a61fe0339cd571d47f5d6a8/1ju7cgg9t';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  );
}
