"use client";

import { useState } from "react";
//Icon
import { Heart } from "lucide-react";

interface LikeButtonProps {
  initialLikes: number;
  className?: string;
  showLabel?: boolean;
}

export function LikeButton({ initialLikes, className, showLabel = false }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const totalLikes = initialLikes + (isLiked ? 1 : 0);

  return (
    <button
      type="button"
      aria-pressed={isLiked}
      onClick={(e) => {
        e.preventDefault();
        setIsLiked((prev) => !prev);
      }}
      className={className}
    >
      <Heart
        size={showLabel ? 20 : 18}
        className={`transition-all duration-300 ${
          isLiked ? "text-gold" : "text-white/25 group-hover:text-gold hover:text-gold"
        }`}
        fill={isLiked ? "#c5a059" : "none"}
      />
      <span className={showLabel ? "text-sm font-bold text-gold" : "text-[10px] font-bold text-slate-400"}>
        {totalLikes.toLocaleString()}
      </span>
      {showLabel && (
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-white">
          Loved this
        </span>
      )}
    </button>
  );
}
