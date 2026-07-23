import React from "react";
//Icons
import { Star } from "lucide-react";
export default function RatingStars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} aria-label="Five star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-3 w-3" fill="currentColor" />
      ))}
    </span>
  );
}
