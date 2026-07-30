import React from "react";
import { ImageSlider } from "@/components/ui/ImageSlider";

interface SpecialEventsImageSliderProps {
  images: string[];
  titleAccent: string;
  targetLink: string;
}

export function EventsImageSlider({ images, titleAccent, targetLink }: SpecialEventsImageSliderProps) {
  const imagesList =
    images && images.length > 0
      ? images
      : ["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=95&w=1600&auto=format&fit=crop"];

  return (
    <ImageSlider
      images={imagesList}
      altText={titleAccent}
      href={targetLink}
      showIndicators={true}
      className="h-full w-full"
    />
  );
}
