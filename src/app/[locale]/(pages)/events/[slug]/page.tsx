import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allSpecialEventsList } from "@/data/specialEvents";
import { EventBody } from "@/components/Events/slug/EventBody";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { PromoModal } from "@/components/ui/PromoModal";
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const listItem = allSpecialEventsList.find((e) => e.slug === slug);

  if (!listItem) {
    return {
      title: "Event Not Found - IkiSaki Tours Sri Lanka",
    };
  }

  const defaultImage = "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=95&w=1600&auto=format&fit=crop";
  const eventImage = listItem.image || defaultImage;

  return {
    title: `${listItem.title} | ${listItem.mode}`,
    description: listItem.description,
    openGraph: {
      title: `${listItem.title} | ${listItem.mode}`,
      description: listItem.description,
      images: [{ url: eventImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${listItem.title} | ${listItem.mode}`,
      description: listItem.description,
      images: [eventImage],
    },
  };
}

export default async function SpecialEventDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const listItem = allSpecialEventsList.find((e) => e.slug === slug);

  if (!listItem) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-lanka-dark">
      <EventBody listItem={listItem} />
      <ContainerLayout>
        <PromoModal />
      </ContainerLayout>
    </main>
  );
}
