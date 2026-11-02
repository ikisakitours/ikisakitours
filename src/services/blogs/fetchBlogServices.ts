// src/services/blogs/fetchBlogServices.ts
import type { BlogPreview, BlogPost } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const fetchBlogServices = {
  getBlogPreviews: async (lang: string = "en", signal?: AbortSignal): Promise<BlogPreview[]> => {
    const res = await fetch(`${API_URL}/blogs/previews?lang=${encodeURIComponent(lang)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal,
    });
    if (!res.ok) throw new Error("Failed to fetch blog previews");
    return res.json();
  },

  getBlogPostBySlug: async (
    slug: string,
    lang: string = "en",
    userId?: string,
    signal?: AbortSignal,
  ): Promise<BlogPost & { isLiked?: boolean }> => {
    const res = await fetch(`${API_URL}/blogs/slug/${slug}?lang=${encodeURIComponent(lang)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal,
    });
    if (!res.ok) throw new Error("Failed to fetch the blog post by slug");
    const blogData = await res.json();

    if (userId && blogData.id) {
      try {
        const viewRes = await fetch(`${API_URL}/blogs/view`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blogId: blogData.id, userId }),
          signal,
        });
        if (viewRes.ok) {
          const viewData = await viewRes.json();
          blogData.isLiked = viewData.isLiked;
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") throw e;
        console.error("User check failed:", e);
      }
    }
    return blogData;
  },

  toggleLike: async (blogId: string, userId: string) => {
    const response = await fetch(`${API_URL}/blogs/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, userId }),
    });
    if (!response.ok) throw new Error("Failed to toggle like");
    return response.json();
  },
};