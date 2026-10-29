const keyFor = (key: string) => `ikisaki_booking_draft_${key}`;
const TTL_MS = 30 * 60 * 1000; // 30 minutes

// Atomically takes the draft: the first caller gets it, everyone else gets null.
// Prevents double auto-submit when two hook instances (desktop widget + mobile modal) mount.
export function claimBookingDraft(key: string): BookingDraft | null {
  const draft = loadBookingDraft(key);
  if (!draft) return null;
  clearBookingDraft(key);
  return draft;
}

export type BookingDraft = {
  journeyDate: string;
  travelerCounts: Record<string, number>;
  autoSubmit?: boolean;
  savedAt: number;
};

export function saveBookingDraft(key: string, draft: Omit<BookingDraft, "savedAt">) {
  try {
    sessionStorage.setItem(keyFor(key), JSON.stringify({ ...draft, savedAt: Date.now() }));
  } catch {
    /* storage unavailable: ignore */
  }
}

export function loadBookingDraft(key: string): BookingDraft | null {
  try {
    const raw = sessionStorage.getItem(keyFor(key));
    if (!raw) return null;
    const draft = JSON.parse(raw) as BookingDraft;
    if (Date.now() - draft.savedAt > TTL_MS) {
      sessionStorage.removeItem(keyFor(key));
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function clearBookingDraft(key: string) {
  try {
    sessionStorage.removeItem(keyFor(key));
  } catch {
    /* ignore */
  }
}