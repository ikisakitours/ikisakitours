"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function TawkToChat() {
  const pathname = usePathname();

  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    // Preloader එකේ 9000ms + 1200ms exit animation එකට සරිලන සේ තත්පර 10.2ක් ලබාදීම
    const timer = setTimeout(() => {
      setIsPreloaderDone(true);
    }, 10200);

    return () => clearTimeout(timer);
  }, []);

  const hiddenRoutes = ["/login", "/signup", "/password-change", "/confirm-email"];
  const isHidden = hiddenRoutes.includes(pathname);

  if (isHidden || !isPreloaderDone) {
    return null;
  }

  return (
    <Script id="tawk-to" strategy="lazyOnload">
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
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
