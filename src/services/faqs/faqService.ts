import type { Faq } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const faqService = {
  async getFaqs(): Promise<Faq[]> {
    const response = await fetch(`${API_URL}/faqs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }

    return response.json();
  },
};
