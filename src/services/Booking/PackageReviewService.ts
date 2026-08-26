const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const PackageReviewService = {
  submitReview: async (data: {
    fullName: string;
    email: string;
    country: string;
    rating: number;
    experience: string;
    images: File[];
  }) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("rating", data.rating.toString());
    formData.append("experience", data.experience);

    data.images.forEach((image) => {
      formData.append("images", image);
    });

    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Review submission failed");
    return res.json();
  },
};