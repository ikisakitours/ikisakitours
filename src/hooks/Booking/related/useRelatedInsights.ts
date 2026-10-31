import { useMemo } from "react";
import { useFetchBlogPreviews } from "@/hooks/blogs/useFetchBlogPreviews";
import { mapBlogToInsight } from "./relatedMappers";

export function useRelatedInsights(max = 4) {
const { data, isLoading, error, refetch } = useFetchBlogPreviews();

  const insights = useMemo(() => {
    if (!data) return [];
    return [...data]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, max)
      .map(mapBlogToInsight);
  }, [data, max]);

return { insights, isLoading, error, refetch };}