import type { LegalDocumentContent } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const legalDocsService = {
  // 1. තනි document එකක් ලබාගැනීමට
  getLegalDocument: async (
    id: string = "terms",
    lang: string = "en",
    signal?: AbortSignal,
  ): Promise<LegalDocumentContent> => {
    const res = await fetch(
      `${API_URL}/legaldocs/client/${id}?lang=${encodeURIComponent(lang)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      },
    );
    if (!res.ok) throw new Error("Failed to fetch legal document content");
    return res.json();
  },

  // 2. අලුතින් එකතු කරන dynamic documents ඇතුළු සියලුම documents ලබාගැනීමට (NEW)
  getAllLegalDocuments: async (
    lang: string = "en",
    signal?: AbortSignal,
  ): Promise<LegalDocumentContent[]> => {
    const res = await fetch(
      `${API_URL}/legaldocs/client?lang=${encodeURIComponent(lang)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      },
    );
    if (!res.ok) throw new Error("Failed to fetch all legal documents");
    return res.json();
  },
};