import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { blogPosts, blogHero } from "@/data/blog";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { Hero } from "@/components/ui/Hero";
import { getTranslations, setRequestLocale } from "next-intl/server";

type BlogPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const metadata: Metadata = {
  title: "Journal",
  description: "Curated Sri Lanka travel stories, guides, and cultural notes from LankaElite.",
  openGraph: {
    title: "Journal | MapMate",
    description: "Curated Sri Lanka travel stories, guides, and cultural notes from LankaElite.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: blogHero.image,
        width: 1200,
        height: 630,
        alt: "MapMate Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal | MapMate",
    description: "Curated Sri Lanka travel stories, guides, and cultural notes from LankaElite.",
    images: [blogHero.image],
  },
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 🔥 2. async component එකක් ඇතුලේ await දාලා getTranslations පාවිච්චි කරන්න 
  const t = await getTranslations("Blog.Hero");

  return (
    <main className="min-h-screen bg-lanka-dark ">
      <UserPageLayout>
        <Hero
          image={t("image")}
          altText={t("alt")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("accent")}
          strapline={t("strapline")}
        />
        <BlogExplorer posts={blogPosts} />
      </UserPageLayout>
    </main>
  );
}
