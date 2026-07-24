import React from "react";
import { Star } from "lucide-react";

type RatingStarsProps = {
  rating?: number | string;
  className?: string; 
};

export default function RatingStars({ rating = 5, className = "" }: RatingStarsProps) {
  const numericRating = typeof rating === "string" ? parseFloat(rating) : rating;
  
  const safeRating = Math.round(numericRating || 5);

  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} aria-label={`${safeRating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-[1em] w-[1em] ${index < safeRating ? "fill-current" : "opacity-30"}`} 
        />
      ))}
    </span>
  );
}