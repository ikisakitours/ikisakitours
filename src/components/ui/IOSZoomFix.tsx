'use client';

import { useDisableIOSZoom } from '@/hooks/useDisableIOSZoom'; 

export default function IOSZoomFix() {
  useDisableIOSZoom();
  return null; 
}