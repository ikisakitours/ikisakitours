// src/utils/draft/servicesDraft.ts
import type { ServiceType } from "@/components/services/VehicleSelector";

export type ServicesDraft = {
  // Service Fields
  activeFilter?: string;
  selectedVehicleId?: string;
  serviceType?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  date?: string;
  time?: string;
  language?: string;
  tourDays?: number;
  travelerCounts?: Record<string, number>;
  tourRequests?: string;
  tourPackageType?: ServiceType;

  // Contact Fields
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;

  autoSubmit?: boolean;
  savedAt: number;
};

const TTL_MS = 30 * 60 * 1000;

const keyFor = (key: string) => `ikisaki_service_draft_${key}`;

export function saveServiceDraft(key: string, draft: Omit<ServicesDraft, "savedAt">) {
  try {
    sessionStorage.setItem(keyFor(key), JSON.stringify({ ...draft, savedAt: Date.now() }));
  } catch {
    /* storage unavailable: ignore */
  }
}

export function loadServiceDraft(key: string): ServicesDraft | null {
  try {
    const raw = sessionStorage.getItem(keyFor(key));
    if (!raw) return null;
    const draft = JSON.parse(raw) as ServicesDraft;
    if (Date.now() - draft.savedAt > TTL_MS) {
      sessionStorage.removeItem(keyFor(key));
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function claimServiceDraft(key: string): ServicesDraft | null {
  const draft = loadServiceDraft(key);
  if (!draft) return null;
  clearServiceDraft(key);
  return draft;
}

export function clearServiceDraft(key: string) {
  try {
    sessionStorage.removeItem(keyFor(key));
  } catch {
    /* ignore */
  }
}