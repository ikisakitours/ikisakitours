const KEY = "ikisaki_contact_draft";
const TTL_MS = 30 * 60 * 1000; // 30 minutes

export type ContactDraft = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
  tourType: string;
  autoSubmit: boolean;
  savedAt: number;
};

export function saveContactDraft(draft: Omit<ContactDraft, "savedAt">) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ ...draft, savedAt: Date.now() }));
  } catch {
    /* storage unavailable: ignore */
  }
}

export function loadContactDraft(): ContactDraft | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as ContactDraft;
    if (Date.now() - draft.savedAt > TTL_MS) {
      sessionStorage.removeItem(KEY);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function clearContactDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}