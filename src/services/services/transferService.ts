const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const transferServiceApi = {
  bookTransfer: async (data: Record<string, unknown>) => {
    const res = await fetch(`${API_URL}/transfers/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Transfer booking failed");
    return res.json();
  },
};