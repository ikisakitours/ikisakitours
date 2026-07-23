import { notFound } from "next/navigation";
import { destinationsData } from "@/data/destinationData";
import { GalleryCollection } from "@/components/gallery/GalleryCollection";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import type { GalleryItem } from "@/data/blog";

type DestinationGalleryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function DestinationGalleryPage({ params }: DestinationGalleryPageProps) {
  const { slug } = await params;

  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  const dynamicBackLink = `/destination/${slug}`;
  const dynamicBackLabel = "Back to Destination";

  const itemsToShow: GalleryItem[] = dest.photos.map((photoSrc, index) => ({
    id: `${dest.slug}-${index}`,
    src: photoSrc,
    alt: `${dest.name} Image ${index + 1}`,
    title: `${dest.name} Highlights`,
    category: dest.name,
  }));

  return (
    <main className="min-h-screen bg-lanka-black">
      <GalleryHero
        backLink={dynamicBackLink}
        backLabel={dynamicBackLabel}
        title="Explore"
        accent={dest.name}
        subtitle={`Visual Journey Through ${dest.name}`}
      />
      <GalleryCollection items={itemsToShow} />
    </main>
  );
}
