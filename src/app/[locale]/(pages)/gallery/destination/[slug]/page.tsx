import { notFound } from "next/navigation";
import { destinationsData } from "@/data/destinationData";
import { GalleryCollection } from "@/components/gallery/GalleryCollection";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import type { GalleryItem } from "@/data/blog";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type DestinationGalleryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: DestinationGalleryPageProps): Promise<Metadata> {
  const t = await getTranslations("Gallery.Metadata");
  const { slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    return {
     title: t("notFoundTitle"),
      description: t("notFoundDestDesc"),
    };
  }

  return {
    title: t("destTitle", { name: dest.name }),
    description: t("destDesc", { name: dest.name }),
  };
}

export default async function DestinationGalleryPage({ params }: DestinationGalleryPageProps) {
  const t = await getTranslations("Gallery.Labels");
  const { slug } = await params;

  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  const dynamicBackLink = `/destination/${slug}`;
  const dynamicBackLabel = t("backToDestination");

  const itemsToShow: GalleryItem[] = dest.photos.map((photoSrc, index) => ({
    id: `${dest.slug}-${index}`,
    src: photoSrc,
    alt: `${dest.name} Image ${index + 1}`,
   title: t("destHighlights", { name: dest.name }),
    category: dest.name,
  }));

  return (
    <main className="min-h-screen bg-lanka-black">
      <GalleryHero
        backLink={dynamicBackLink}
        backLabel={dynamicBackLabel}
       title={t("explore")}
        accent={dest.name}
       subtitle={t("visualJourneyThrough", { name: dest.name })}
      />
      <GalleryCollection items={itemsToShow} />
    </main>
  );
}
