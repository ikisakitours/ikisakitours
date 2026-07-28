import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allSpecialEventsList } from "@/data/specialEvents";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
import { EventBody } from "@/components/specialEvents/slug/EventBody";
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
      title: "Event Not Found - MapMate Sri Lanka",
    };
  }

  return {
    title: `${listItem.title} | Special Events | MapMate Sri Lanka`,
    description: listItem.description,
    openGraph: {
      title: listItem.title,
      description: listItem.description,
      images: [{ url: listItem.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: listItem.title,
      description: listItem.description,
      images: [listItem.image],
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
    <UserPageLayout>
      <EventBody listItem={listItem} />
    </UserPageLayout>
  );
}
