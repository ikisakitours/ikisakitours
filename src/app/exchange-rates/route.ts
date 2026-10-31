export const revalidate = 43200; // පැය 12

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 43200 },
    });
    if (!res.ok) throw new Error("Rates fetch failed");

    const data = await res.json();
    return Response.json({ base: "USD", rates: data.rates as Record<string, number> });
  } catch {
    return Response.json({ error: "Unable to load rates" }, { status: 502 });
  }
}