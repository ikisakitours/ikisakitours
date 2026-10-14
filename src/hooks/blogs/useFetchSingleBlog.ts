// src/hooks/blogs/useFetchSingleBlog.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import type { BlogPost } from "@/services/blogs/types";
import { useAuth } from "@/context/AuthContext";

export function useFetchSingleBlog(slug: string) {
  const [data, setData] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const userId = user?.id;

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetchBlogServices.getBlogPostBySlug(slug, userId);
      console.log(`📖 [SINGLE BLOG LOADED - ${slug}]:`, response);
      setData(response);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load blog post");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [slug, userId]);

  const handleRefetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetchPost();
  }, [fetchPost]);

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
    refetch: handleRefetch,
  };
}
