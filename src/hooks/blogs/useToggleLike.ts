import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";

export function useToggleLike() {
  const handleLikeToggle = async (postId: string, isLiked: boolean) => {
    try {
      const action = isLiked ? "like" : "unlike";
      await fetchBlogServices.toggleLike(postId, action);
    } catch (error) {
      console.error("Like update failed:", error);
      throw error;
    }
  };

  return { handleLikeToggle };
}
