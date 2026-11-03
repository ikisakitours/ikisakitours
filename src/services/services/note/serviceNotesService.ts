// src/services/services/note/serviceNotesService.ts

import type { ServiceNoteItem } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const serviceNotesService = {
  getServiceNotes: async (
    serviceType: string = "custom",
    lang: string = "en",
    signal?: AbortSignal,
  ): Promise<ServiceNoteItem[]> => {
    const res = await fetch(
      `${API_URL}/services/notes?serviceType=${encodeURIComponent(serviceType)}&lang=${encodeURIComponent(lang)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch service notes for type: ${serviceType}`);
    }
    const jsonRes = await res.json();
    console.log("📦 [RAW SERVICE NOTES RESPONSE]:", jsonRes);
    return jsonRes;
  },
};
