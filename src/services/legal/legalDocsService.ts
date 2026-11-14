import type { LegalDocumentContent } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const legalDocsService = {
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
};