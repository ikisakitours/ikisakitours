import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import ContactIntroCard from "@/components/contact/ContactIntroCard";
import ContactSidebar from "@/components/contact/ContactSidebar";
import ContactForm from "@/components/contact/ContactForm";
import ContactFeatures from "@/components/contact/ContactFeatures";

export default function ContactBody() {
  return (
    <ContainerLayout className="pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      <ContactIntroCard />

      <div className="grid grid-cols-1 gap-12 xl:grid-cols-3">
        <ContactSidebar />
        <ContactForm />
      </div>

      <ContactFeatures />
    </ContainerLayout>
  );
}
