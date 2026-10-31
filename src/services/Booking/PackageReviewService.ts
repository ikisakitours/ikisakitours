const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export type PackageReviewPayload = {
  userId: string;
  packageId: string;
  packageName: string;
  email: string;
  rating: number; // 1–5
  experience: string;
  images: File[];
};

export const PackageReviewService = {
  submitReview: async (data: PackageReviewPayload) => {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("packageId", data.packageId);
    formData.append("packageName", data.packageName);
    formData.append("email", data.email);
    formData.append("rating", String(data.rating));
    formData.append("experience", data.experience);

    data.images.forEach((image) => {
      formData.append("images", image);
    });

    // Content-Type manually දාන්න එපා, browser එක multipart boundary එක දානවා
    const res = await fetch(`${API_URL}/comments/package-review`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Review submission failed");
    return res.json();
  },
};