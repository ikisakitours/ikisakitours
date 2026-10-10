// src/hooks/blogs/useFetchSingleBlog.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import type { BlogPost } from "@/services/blogs/types";

export function useFetchSingleBlog(slug: string) {
  const [data, setData] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!slug) return; 
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchBlogServices.getBlogPostBySlug(slug);
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load the blog post");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    const loadPostData = async () => {
      await fetchPost();
    };

    loadPostData();
  }, [fetchPost]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchPost,
  };
}
