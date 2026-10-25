import type { Metadata } from "next";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import { SingleBlogClientWrapper } from "@/components/blog/SingleBlogClientWrapper";
import { getTranslations } from "next-intl/server";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("Journal.Metadata");
  try {
    const post = await fetchBlogServices.getBlogPostBySlug(slug);
    const heroImage = post.gallery?.[0] || "/images/default-blog.jpg";

    return {
      title: post.title,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        url: `/blog/${post.slug}`,
        type: "article",
        images: [
          {
            url: heroImage,
            width: 600,
            height: 315,
            alt: post.title,
          },

          { url: heroImage, width: 400, height: 400, alt: post.title },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.summary,
        images: [heroImage],
      },
    };
  } catch (error) {
    console.error(`Failed to fetch metadata for blog slug: ${slug}`, error);
    return {
      title: t("notFoundTitle"),
    };
  }
}

// Main Page එක
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-lanka-dark">
      <SingleBlogClientWrapper slug={slug} />
    </main>
  );
}
