"use client";

import { useTranslations } from "next-intl";
import { useFetchSingleBlog } from "@/hooks/blogs/useFetchSingleBlog";
import { ApiCallLoader } from "@/components/ui/ApiCallLoader";
import { ApiCallError } from "@/components/ui/ApiCallError";
import { Hero } from "@/components/ui/Hero";
import { BlogArticle } from "@/components/blog/BlogArticle";

export function SingleBlogClientWrapper({ slug }: { slug: string }) {
  const { data: post, isLoading, error, refetch } = useFetchSingleBlog(slug);
  const tApi = useTranslations("Common.Api");

  if (isLoading) {
    return (
      <div className="bg-lanka-dark pt-20">
        <ApiCallLoader text={tApi("loadingJournals")} fullScreen={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-lanka-dark pt-20">
        <ApiCallError
        message={tApi("contentLoadError")}
          title={tApi("failedToLoad")}
          watermark={tApi("errorWatermark")}
          buttonText={tApi("tryAgain")}
          fullScreen={true}
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!post) return null;

  const heroImage = post.gallery?.[0] || "/images/default-blog.jpg";

  return (
    <>
      <Hero
        image={heroImage}
        altText={post.title}
        eyebrow={post.category}
        title={post.title}
        accent="" 
        strapline={post.summary}
      />
      <BlogArticle post={post} />
    </>
  );
}
