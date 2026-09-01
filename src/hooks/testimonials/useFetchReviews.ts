"use client";
import { useState, useEffect, useCallback } from "react";
import { writeReviewService } from "@/services/testimonials/writeReviewService";
import type { ReviewsResponse } from "@/services/testimonials/types"; // ඔයාගේ Type එක තියෙන තැනට path එක හදන්න

export function useReviews() {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. දත්ත ගෙනෙන ප්‍රධාන Function එක
  const fetchReviews = useCallback(async () => {
    // දැන් අපිට ආයෙත් මේක ඇතුළට setIsLoading(true) දාන්න පුළුවන්. 
    setIsLoading(true);
    setError(null);
    try {
      const response = await writeReviewService.getReviews();
      setData(response);
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load reviews");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Component එක Load වෙද්දී දත්ත ගන්න කොටස
  useEffect(() => {
    // 👇 මේ විදිහට ඇතුළෙන් වෙනම async function එකක් හැදුවම Linter Error එක සම්පූර්ණයෙන්ම නැති වෙනවා.
    const loadData = async () => {
      await fetchReviews();
    };

    loadData();
  }, [fetchReviews]);

  return {
    data,
    isLoading,
    error,
    // වෙනම refetch function එකක් හදන්න ඕනේ නෑ, fetchReviews එකම යවන්න පුළුවන්.
    refetch: fetchReviews, 
  };
}