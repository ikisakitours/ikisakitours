const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const chatMailService = {
  submitMail: async (data: {
    fullName: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const res = await fetch(`${API_URL}/chat/mail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Chat mail submission failed");
    return res.json();
  },
};