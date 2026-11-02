const KEY = "ikisaki_review_draft";
const TTL_MS = 30 * 60 * 1000; // 30 minutes

export type ReviewDraft = {
  fullName: string;
  email: string;
  rating: number;
  experience: string;
  autoSubmit: boolean;
  savedAt: number;
};

export function saveReviewDraft(draft: Omit<ReviewDraft, "savedAt">) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ ...draft, savedAt: Date.now() }));
  } catch {
    /* storage unavailable: ignore */
  }
}

export function loadReviewDraft(): ReviewDraft | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as ReviewDraft;
    if (Date.now() - draft.savedAt > TTL_MS) {
      sessionStorage.removeItem(KEY);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function clearReviewDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}