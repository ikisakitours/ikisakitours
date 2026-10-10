// src/services/blogs/fetchBlogServices.ts

import type { BlogPreview, BlogPost } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const fetchBlogServices = {
  // 1. Get all blog previews for the cards
  getBlogPreviews: async (): Promise<BlogPreview[]> => {
    const res = await fetch(`${API_URL}/blogs/previews`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch blog previews");
    return res.json();
  },

  // 2. Get a single detailed blog post by slug
  getBlogPostBySlug: async (slug: string): Promise<BlogPost> => {
    const res = await fetch(`${API_URL}/blogs/slug/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch the blog post");
    return res.json();
  },

  toggleLike: async (id: string, action: "like" | "unlike") => {
    try {
      const response = await fetch(`${API_URL}/blogs/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) throw new Error("Failed to toggle like");
      return await response.json();
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  },
};