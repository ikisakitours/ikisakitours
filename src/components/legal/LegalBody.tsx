"use client";
import { usePathname, useRouter } from "next/navigation";
import { LegalDocumentSection } from "@/components/legal/LegalDocumentSection";
import { LegalHero } from "@/components/legal/LegalHero";
import { legalDocuments, type LegalDocumentId } from "@/data/legal";
import ContainerLayout from "@/components/pageLayouts/ContainerLayout";
import { Button } from "@/components/ui/Button";

//Icons
import { ArrowLeft } from "lucide-react";

export default function LegalBody() {
  const router = useRouter();
  const pathname = usePathname();

  const currentSlug = pathname.split("/").pop() as LegalDocumentId;

  const validIds = legalDocuments.map((doc) => doc.id);
  const activeId = validIds.includes(currentSlug) ? currentSlug : "terms";

  const activeDoc = legalDocuments.find((doc) => doc.id === activeId) || legalDocuments[0];

  const handleTabChange = (id: LegalDocumentId) => {
    router.push(`/legal/${id}`, { scroll: false });
  };

  return (
    <ContainerLayout className="py-20 md:py-28 xl:py-20 2xl:py-32 3xl:py-40">
      <div className="mx-auto max-w-7xl">
        <LegalHero activeDoc={activeDoc} />

        {/* Tab Buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {legalDocuments.map((doc) => (
            <Button
              key={doc.id}
              variant="details"
              onClick={() => handleTabChange(doc.id)}
              className={activeId === doc.id ? "bg-gold! border-gold! text-lanka-black!" : ""}
            >
              {doc.title}
            </Button>
          ))}
        </div>

        <div className="glass-card space-y-10 rounded-4xl border-gold/15 p-6 shadow-2xl md:space-y-12 md:rounded-[2.5rem] md:p-12">
          {legalDocuments
            .filter((doc) => doc.id === activeId)
            .map((doc) => (
              <div key={doc.id}>
                <LegalDocumentSection document={doc} />
              </div>
            ))}

          <div className="pt-4 text-center md:pt-8">
            <button
              onClick={() => router.push("/")}
              style={{ letterSpacing: "0.5em" }}
              className="group mb-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase text-gold transition-all hover:text-gold-light"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
}
