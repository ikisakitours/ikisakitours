import React from "react";
import { Star } from "lucide-react";

type RatingStarsProps = {
  rating?: number;
  maxRating?: number;
  className?: string;
  starClassName?: string;
  filledClassName?: string;
  emptyClassName?: string;
};

export function RatingStars({
  rating = 5,
  maxRating = 5,
  className = "flex items-center gap-0.5",
  starClassName = "h-3 w-3 text-gold",
  filledClassName = "fill-current",
  emptyClassName = "opacity-30",
}: RatingStarsProps) {
  const safeRating = Math.round(rating);

  return (
    <div className={className} aria-label={`${rating} out of ${maxRating} stars`}>
      {[...Array(maxRating)].map((_, i) => {
        const isFilled = i < safeRating;

        return <Star key={i} className={`${starClassName} ${isFilled ? filledClassName : emptyClassName}`} />;
      })}
    </div>
  );
}
