const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export type PackageReviewPayload = {
  packageId: string;
  packageName: string;
  fullName: string;
  email: string;
  country?: string;
  rating: number;
  experience: string;
  images: File[];
};

export const PackageReviewService = {
  submitReview: async (data: PackageReviewPayload) => {
    const formData = new FormData();
    formData.append("packageId", data.packageId);
    formData.append("packageName", data.packageName);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    if (data.country) formData.append("country", data.country);
    formData.append("rating", String(data.rating));
    formData.append("experience", data.experience);

    data.images.forEach((image) => {
      formData.append("images", image);
    });

    // Do NOT set Content-Type manually, the browser adds the multipart boundary
    const res = await fetch(`${API_URL}/comments/package-review`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Review submission failed");
    return res.json();
  },
};