// src/hooks/blogs/useToggleLike.ts
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";

export function useToggleLike() {
  const handleLikeToggle = async (postId: string, userId: string) => {
    try {
      const response = await fetchBlogServices.toggleLike(postId, userId);
      console.log("❤️ [LIKE TOGGLED]:", response);
      return response;
    } catch (error) {
      console.error("❌ [LIKE ERROR]:", error);
      throw error;
    }
  };

  return { handleLikeToggle };
}
