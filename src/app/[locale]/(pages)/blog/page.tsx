import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { BlogClientWrapper } from "@/components/blog/BlogClientWrapper";
import { getTranslations, getLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Blog.Metadata" });
  const tHero = await getTranslations({ locale, namespace: "Blog.Hero" });

  const title = t("title");
  const description = t("description");
  const heroImage = tHero("image");

  return {
    title: title,
    description: description,
    alternates: getSeoAlternates("/blog", locale),
    openGraph: {
      title: `${title} | IkiSaki Tours`,
      description: description,
      url: `/${locale}/blog`,
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "website",
      images: [
        {
          url: heroImage,
          width: 600,
          height: 315,
          alt: tHero("alt"),
        },
        {
          url: heroImage,
          width: 400,
          height: 400,
          alt: tHero("alt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | IkiSaki Tours`,
      description: description,
      images: [heroImage],
    },
  };
}

function TranslatedHero() {
  const t = useTranslations("Blog.Hero");
  return (
    <Hero
      image={t("image")}
      altText={t("alt")}
      eyebrow={t("eyebrow")}
      title={t("title")}
      accent={t("accent")}
      strapline={t("strapline")}
    />
  );
}

export default async function BlogPage() {
  const locale = await getLocale();
  const tMeta = await getTranslations({ locale, namespace: "Blog.Metadata" });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: tMeta("title"), url: `/${locale}/blog` },
  ]);

  return (
    <main className="min-h-screen bg-lanka-dark">
      <JsonLd schema={breadcrumbSchema} />
      <TranslatedHero />
      <BlogClientWrapper />
    </main>
  );
}
