// src/components/ui/ProgressBarProvider.tsx
"use client";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider() {
  return (
    <ProgressBar
      height="3px"
      color="#C5A059" // Gold color
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}