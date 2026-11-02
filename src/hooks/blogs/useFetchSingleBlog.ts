// src/hooks/blogs/useFetchSingleBlog.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import type { BlogPost } from "@/services/blogs/types";
import { useAuth } from "@/context/AuthContext";

interface PostState {
  key: string; 
  slug: string;
  data: BlogPost | null;
  error: string | null;
}

export function useFetchSingleBlog(slug: string) {
  const locale = useLocale();
  const { user } = useAuth();
  const userId = user?.id;

  const [state, setState] = useState<PostState | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  const requestKey = `${slug}:${locale}:${userId ?? "guest"}:${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();

    fetchBlogServices
      .getBlogPostBySlug(slug, locale, userId, controller.signal)
      .then((response) => {
        console.log(`📖 [SINGLE BLOG LOADED - ${slug} - ${locale}]:`, response);
        setState({ key: requestKey, slug, data: response, error: null });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error(err);
        setState({
          key: requestKey,
          slug,
          data: null,
          error: err instanceof Error ? err.message : "Failed to load blog post",
        });
      });

    return () => controller.abort();
  }, [slug, locale, userId, requestKey]);

  const refetch = useCallback(() => setReloadCount((c) => c + 1), []);

  const isCurrent = state?.key === requestKey;
  const isLoading = !isCurrent;
  const data = state && state.slug === slug ? state.data : null;
  const error = isCurrent ? state.error : null;

  return { data, isLoading, error, refetch };
}