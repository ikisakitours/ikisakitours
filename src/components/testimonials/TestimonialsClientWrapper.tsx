"use client";

import { useReviews } from "@/hooks/testimonials/useFetchReviews";
import { TestimonialHero } from "./TestimonialHero";
import { TestimonialExplorer } from "./TestimonialExplorer";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";
export function TestimonialsClientWrapper() {
  const { data, isLoading, error, refetch } = useReviews();

  if (isLoading) {
    return <ApiCallLoader text="Loading Reviews..." fullScreen={true} />;
  }

  if (error) {
    return (
      <ApiCallError
        message={error}
        fullScreen={true}
        onRetry={refetch} 
      />
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen bg-lanka-dark">
      <TestimonialHero totalComments={data.totalComments} averageRating={data.averageRating} />

      <TestimonialExplorer comments={data.comments} />
    </main>
  );
}
