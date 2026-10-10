import type { Metadata } from "next";
import { blogHero } from "@/data/blog";
import { Hero } from "@/components/ui/Hero";
import { BlogClientWrapper } from "@/components/blog/BlogClientWrapper";
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
        width: 600,
        height: 315,
        alt: "IkiSaki Tours Journal",
      },

      {
        url: blogHero.image,
        width: 400,
        height: 400,
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
      <BlogClientWrapper />
    </main>
  );
}
