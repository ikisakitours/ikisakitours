import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { blogPosts, blogHero } from "@/data/blog";
import { Hero } from "@/components/ui/Hero";

export const metadata: Metadata = {
  title: "Journal",
  description: "Curated Sri Lanka travel stories, guides, and cultural notes from LankaElite.",
  openGraph: {
    title: "Journal | IkiSaki Tours",
    description: "Curated Sri Lanka travel stories, guides, and cultural notes from LankaElite.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: blogHero.image,
        width: 1200,
        height: 630,
        alt: "IkiSaki Tours Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal | IkiSaki Tours",
    description: "Curated Sri Lanka travel stories, guides, and cultural notes from LankaElite.",
    images: [blogHero.image],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-lanka-dark ">
      <Hero
        image={blogHero.image}
        altText={blogHero.eyebrow}
        eyebrow={blogHero.eyebrow}
        title={blogHero.title}
        accent={blogHero.accent}
        strapline={blogHero.strapline}
      />
      <BlogExplorer posts={blogPosts} />
    </main>
  );
}
