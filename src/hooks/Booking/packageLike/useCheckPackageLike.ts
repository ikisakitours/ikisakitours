"use client";

import { useState, useEffect } from "react";
import { packageLikeService } from "@/services/Booking/packageLike/packageLikeService";

export function useCheckPackageLike(packageId?: string, userId?: string) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!packageId || !userId) return;

    let isMounted = true;

    const fetchLikeStatus = async () => {
      try {
        const data = await packageLikeService.checkLike(packageId, userId);
        
        if (isMounted) {
          let likedStatus = false;
          if (typeof data === "object" && data !== null) {
            likedStatus = data.isLiked === true || data.liked === true;
          } else if (typeof data === "boolean") {
            likedStatus = data === true;
          } else if (typeof data === "string") {
            likedStatus = data === "true";
          }

          setIsLiked(likedStatus);
        }
      } catch (error) {
        console.error("Error checking package like:", error);
      }
    };

    fetchLikeStatus();

    return () => {
      isMounted = false;
    };
  }, [packageId, userId]);

  return { isLiked };
}