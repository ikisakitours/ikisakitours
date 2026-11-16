import { notFound } from "next/navigation";
import { GalleryCollection } from "@/components/gallery/GalleryCollection";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import type { GalleryItem } from "@/data/blog";
import type { Metadata } from "next";
// import { getTranslations } from "next-intl/server";
import { getTranslations, getLocale } from "next-intl/server";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";

type DestinationGalleryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: DestinationGalleryPageProps): Promise<Metadata> {
  const t = await getTranslations("Gallery.Metadata");
  const locale = await getLocale();
  const { slug } = await params;

  try {
    const dest = await fetchDestinationServices.getDestinationBySlug(slug, locale);
    return {
      title: t("destTitle", { name: dest.title }),
      description: t("destDesc", { name: dest.title }),
      alternates: getSeoAlternates(`/gallery/destination/${slug}`, locale),
    };
  } catch {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDestDesc"),
      alternates: getSeoAlternates(`/gallery/destination/${slug}`, locale),
    };
  }
}

export default async function DestinationGalleryPage({ params }: DestinationGalleryPageProps) {
  const t = await getTranslations("Gallery.Labels");
  const locale = await getLocale();
  const { slug } = await params;

  let dest;
  try {
    dest = await fetchDestinationServices.getDestinationBySlug(slug, locale);
  } catch {
    notFound();
  }

  if (!dest) {
    notFound();
  }
  const dynamicBackLink = `/destination/${slug}`;
  const dynamicBackLabel = t("backToDestination");

  const itemsToShow: GalleryItem[] = (dest.images || []).map((photoSrc, index) => ({
    id: `${dest.slug}-${index}`,
    src: photoSrc,
    alt: `${dest.title} Image ${index + 1}`,
    title: t("destHighlights", { name: dest.title }),
    category: dest.title,
  }));

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${dest.title} Photo Gallery`,
    description: dest.summary,
    image: dest.images || [],
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: locale === "ja" ? "観光スポット" : "Destinations", url: `/${locale}/destination` },
    { name: `${dest.title} Gallery`, url: `/gallery/destination/${slug}` },
  ]);

  return (
    <main className="min-h-screen bg-lanka-black">
      <JsonLd schema={[gallerySchema, breadcrumbSchema]} />
      <GalleryHero
        backLink={dynamicBackLink}
        backLabel={dynamicBackLabel}
        title={t("explore")}
        accent={dest.title}
        subtitle={t("visualJourneyThrough", { name: dest.title })}
      />
      <GalleryCollection items={itemsToShow} />
    </main>
  );
}
