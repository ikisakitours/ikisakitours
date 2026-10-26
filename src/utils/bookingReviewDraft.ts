// utils/bookingReviewDraft.ts
const KEY_PREFIX = "ikisaki_booking_review_draft";
const TTL_MS = 30 * 60 * 1000; // 30 minutes

export type BookingReviewDraft = {
  fullName: string;
  email: string;
  country: string;
  rating: number;
  experience: string;
  savedAt: number;
};

const keyFor = (slug: string) => `${KEY_PREFIX}:${slug}`;

export function saveBookingReviewDraft(slug: string, draft: Omit<BookingReviewDraft, "savedAt">) {
  try {
    sessionStorage.setItem(keyFor(slug), JSON.stringify({ ...draft, savedAt: Date.now() }));
  } catch {
    /* storage unavailable: ignore */
  }
}

export function loadBookingReviewDraft(slug: string): BookingReviewDraft | null {
  try {
    const raw = sessionStorage.getItem(keyFor(slug));
    if (!raw) return null;
    const draft = JSON.parse(raw) as BookingReviewDraft;
    if (Date.now() - draft.savedAt > TTL_MS) {
      sessionStorage.removeItem(keyFor(slug));
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function clearBookingReviewDraft(slug: string) {
  try {
    sessionStorage.removeItem(keyFor(slug));
  } catch {
    /* ignore */
  }
}