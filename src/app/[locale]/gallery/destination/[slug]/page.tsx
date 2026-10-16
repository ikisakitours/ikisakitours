import { notFound } from "next/navigation";
import { GalleryCollection } from "@/components/gallery/GalleryCollection";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import type { GalleryItem } from "@/data/blog";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchDestinationServices } from "@/services/destinations/fetchDestinationServices";

type DestinationGalleryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: DestinationGalleryPageProps): Promise<Metadata> {
  const t = await getTranslations("Gallery.Metadata");
  const { slug } = await params;

  try {
    const dest = await fetchDestinationServices.getDestinationBySlug(slug);
    return {
      title: t("destTitle", { name: dest.title }),
      description: t("destDesc", { name: dest.title }),
    };
  } catch {
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDestDesc"),
    };
  }
}

export default async function DestinationGalleryPage({ params }: DestinationGalleryPageProps) {
  const t = await getTranslations("Gallery.Labels");
  const { slug } = await params;

  let dest;
  try {
    dest = await fetchDestinationServices.getDestinationBySlug(slug);
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

  return (
    <main className="min-h-screen bg-lanka-black">
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
