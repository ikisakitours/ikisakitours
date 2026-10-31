import { packageLikeService } from "@/services/Booking/packageLike/packageLikeService";

export function useTogglePackageLike() {
  const handlePackageLikeToggle = async (packageId: string, userId: string) => {
    try {
      const response = await packageLikeService.toggleLike(packageId, userId);
      console.log("❤️ [LIKE Package TOGGLED]:", response);
    } catch (error) {
      console.error("❌ Package like toggle failed", error);
      throw error;
    }
  };

  return { handlePackageLikeToggle };
}
