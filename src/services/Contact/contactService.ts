// src/services/Contact/contactService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const contactApi = {
  submitForm: async (data: Record<string, string>) => {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return response.json();
  },
};
