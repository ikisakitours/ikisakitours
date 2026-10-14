"use client";

import { useState } from "react";
import { AuthRequiredModal } from "@/components/ui/AuthRequiredModal";
import { useAuth } from "@/context/AuthContext";
//Icon
import { Heart } from "lucide-react";

interface LikeButtonProps {
  initialLikes: number;
  initialIsLiked?: boolean;
  className?: string;
  showLabel?: boolean;
  lovedLabel?: string;
  iconClassName?: string;
  countClassName?: string;
  labelClassName?: string;
  iconSize?: number;
  onToggle?: (isLiked: boolean) => Promise<void>;
}

export function LikeButton({
  initialLikes,
  initialIsLiked = false,
  className,
  showLabel = false,
  lovedLabel = "Loved this",
  iconClassName,
  countClassName,
  labelClassName,
  iconSize,
  onToggle,
}: LikeButtonProps) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const [prevIsLikedProp, setPrevIsLikedProp] = useState(initialIsLiked);
  const [prevLikesProp, setPrevLikesProp] = useState(initialLikes);

  if (initialIsLiked !== prevIsLikedProp || initialLikes !== prevLikesProp) {
    setIsLiked(initialIsLiked);
    setLikesCount(initialLikes);
    setPrevIsLikedProp(initialIsLiked);
    setPrevLikesProp(initialLikes);
  }

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // console.log("User not logged in, opening modal...");
      setShowAuthModal(true);
      return;
    }
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount((prev) => (newLikedState ? prev + 1 : Math.max(prev - 1, 0)));

    if (onToggle) {
      try {
        await onToggle(newLikedState);
      } catch (error) {
        console.error("Failed to toggle like status:", error);
        setIsLiked(!newLikedState);
        setLikesCount((prev) => (!newLikedState ? prev + 1 : Math.max(prev - 1, 0)));
      }
    }
  };

  return (
    <>
      <button type="button" aria-pressed={isLiked} onClick={handleLikeClick} className={className}>
        <Heart
          size={iconSize || (showLabel ? 20 : 18)}
          className={`transition-all duration-300 ${
            isLiked ? "text-gold" : "text-white/25 group-hover:text-gold hover:text-gold"
          } ${iconClassName || ""}`}
          fill={isLiked ? "#c5a059" : "none"}
        />
        <span
          className={`${showLabel ? "text-sm font-bold text-slate-400" : "text-[10px] font-bold text-slate-400"} ${countClassName || ""}`}
        >
          {likesCount.toLocaleString()}
        </span>
        {showLabel && (
          <span
            className={`text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-white ${labelClassName || ""}`}
          >
            {lovedLabel}
          </span>
        )}
      </button>

      <AuthRequiredModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
