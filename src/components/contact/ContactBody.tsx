import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Hero } from "@/components/services/Hero";

import ContactIntroCard from "@/components/contact/ContactIntroCard";
import ContactSidebar from "@/components/contact/ContactSidebar";
import ContactForm from "@/components/contact/ContactForm";
import ContactFeatures from "@/components/contact/ContactFeatures";

import { contactData } from "@/data/contactData";

export default function ContactBody() {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        image={contactData.hero.image}
        altText={contactData.hero.altText}
        eyebrow={contactData.hero.eyebrow}
        title={contactData.hero.title}
        accent={contactData.hero.accent}
        strapline={contactData.hero.strapline}
      />

      <ContainerLayout className="pb-20 md:pb-28 xl:pb-20 2xl:pb-32 3xl:pb-40">
        <ContactIntroCard data={contactData.introCard} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <ContactSidebar data={contactData.sidebar} />
          <ContactForm title={contactData.form.title} tourOptions={contactData.form.tourOptions} />
        </div>

        <ContactFeatures features={contactData.features} />
      </ContainerLayout>
    </main>
  );
}
