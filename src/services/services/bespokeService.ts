const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const bespokeService = {
  submitBespokeTour: async (data: Record<string, unknown>) => {
    const res = await fetch(`${API_URL}/tours/bespoke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Bespoke tour submission failed");
    return res.json();
  },
};