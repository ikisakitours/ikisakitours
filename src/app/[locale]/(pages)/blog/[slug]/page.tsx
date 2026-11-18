import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { fetchBlogServices } from "@/services/blogs/fetchBlogServices";
import { SingleBlogClientWrapper } from "@/components/blog/SingleBlogClientWrapper";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { getBlogPostSchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("Journal.Metadata");
  try {
    const post = await fetchBlogServices.getBlogPostBySlug(slug, locale);
    const heroImage = post.gallery?.[0] || "/images/default-blog.jpg";

    return {
      title: post.title,
      description: post.summary,
      alternates: getSeoAlternates(`/blog/${post.slug}`, locale),
      openGraph: {
        title: post.title,
        description: post.summary,
        url: `/${locale}/blog/${post.slug}`,
        locale: locale === "ja" ? "ja_JP" : "en_US",
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
  const locale = await getLocale();

  const schemas: Array<Record<string, unknown>> = [];
  try {
    const post = await fetchBlogServices.getBlogPostBySlug(slug, locale).catch(() => null);
    if (post) {
      schemas.push(getBlogPostSchema(post, locale));
      schemas.push(
        getBreadcrumbSchema([
          { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
          { name: locale === "ja" ? "ジャーナル" : "Journal", url: `/${locale}/blog` },
          { name: post.title, url: `/${locale}/blog/${slug}` },
        ])
      );
    }
  } catch {
    // Graceful fallback
  }

  return (
    <main className="min-h-screen bg-lanka-dark">
      {schemas.length > 0 && <JsonLd schema={schemas} />}
      <SingleBlogClientWrapper slug={slug} />
    </main>
  );
}
