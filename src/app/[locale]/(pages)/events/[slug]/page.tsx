import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allSpecialEventsList } from "@/data/specialEvents";
import { EventBody } from "@/components/Events/slug/EventBody";
import { getLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { getEventSchema, getBreadcrumbSchema, getSeoAlternates } from "@/components/seo/schemas";
// import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
// import { PromoModal } from "@/components/ui/PromoModal";
interface PageProps {
  params: Promise<{
    slug: string;
    locale?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale = "en" } = await params;
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
    alternates: getSeoAlternates(`/events/${slug}`, locale),
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
  const locale = await getLocale();

  const listItem = allSpecialEventsList.find((e) => e.slug === slug);

  if (!listItem) {
    notFound();
  }

  const eventSchema = getEventSchema(listItem, locale);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "ja" ? "ホーム" : "Home", url: `/${locale}` },
    { name: locale === "ja" ? "イベント" : "Events", url: `/${locale}/events` },
    { name: listItem.title, url: `/${locale}/events/${slug}` },
  ]);

  return (
    <main className="min-h-screen bg-lanka-dark">
      <JsonLd schema={[eventSchema, breadcrumbSchema]} />
      <EventBody listItem={listItem} />
      {/* <ContainerLayout>
        <PromoModal />
      </ContainerLayout> */}
    </main>
  );
}
