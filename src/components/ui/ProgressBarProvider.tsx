// src/components/ui/ProgressBarProvider.tsx
"use client";

import NextTopLoader from "nextjs-toploader";

export default function ProgressBarProvider() {
  return (
    <NextTopLoader
      color="linear-gradient(90deg, #c5a059 0%, #f1d592 50%, #94763a 100%)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={2.8}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="none"
      zIndex={999999}
    />
  );
}
