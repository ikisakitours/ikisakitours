import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { Hero } from "@/components/ui/Hero";
import { BlogArticle } from "@/components/blog/BlogArticle";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Story not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-lanka-black">
      <UserPageLayout>

          <Hero
          image={post.image}
          altText={post.altText}
          eyebrow={post.category}
          title={post.title}
          accent={post.accent}
          strapline={post.excerpt}
        />
        <BlogArticle post={post} />
      </UserPageLayout>
    </main>

    
  );
}










  
      
   
