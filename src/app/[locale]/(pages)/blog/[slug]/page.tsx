import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import { Hero } from "@/components/ui/Hero";
import { BlogArticle } from "@/components/blog/BlogArticle";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";
import { setRequestLocale } from "next-intl/server";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  setRequestLocale(locale);
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Story not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.altText || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <UserPageLayout>
      <main className="min-h-screen bg-lanka-dark">
        <Hero
          image={post.image}
          altText={post.altText}
          eyebrow={post.category}
          title={post.title}
          accent={post.accent}
          strapline={post.excerpt}
        />
          <BlogArticle post={post} />
        <ContainerLayout>
          <PromoModal />
        </ContainerLayout>
      </main>
    </UserPageLayout>
  );
}
