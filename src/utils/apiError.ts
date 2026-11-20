export interface EnrichedApiError extends Error {
  status?: number;
  error?: string | unknown;
  data?: Record<string, unknown>;
  response?: {
    status: number;
    data: Record<string, unknown>;
  };
}

export async function parseApiError(res: Response, fallbackMessage: string): Promise<never> {
  let errorData: Record<string, unknown> = {};
  try {
    errorData = await res.json();
  } catch {
    /* non-JSON or empty response */
  }

  const message =
    (typeof errorData.message === "string" && errorData.message) ||
    (typeof errorData.error === "string" && errorData.error) ||
    `${fallbackMessage} (${res.status})`;

  const err = new Error(message) as EnrichedApiError;
  err.status = res.status;
  err.error = errorData.error || errorData.code;
  err.data = errorData;
  err.response = { status: res.status, data: errorData };
  throw err;
}

export function isSuspensionError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as {
    status?: number;
    error?: unknown;
    data?: { error?: unknown };
    response?: { status?: number; data?: { error?: unknown } };
  };

  return (
    e.status === 403 ||
    e.response?.status === 403 ||
    e.error === "ACCOUNT_SUSPENDED" ||
    e.data?.error === "ACCOUNT_SUSPENDED" ||
    e.response?.data?.error === "ACCOUNT_SUSPENDED"
  );
}

export function getSuspensionRefId(err: unknown): string | undefined {
  if (!err || typeof err !== "object") return undefined;
  const e = err as {
    data?: { user?: { customerReferenceId?: string; referenceId?: string } };
    response?: { data?: { user?: { customerReferenceId?: string; referenceId?: string } } };
  };

  return (
    e.data?.user?.customerReferenceId ||
    e.data?.user?.referenceId ||
    e.response?.data?.user?.customerReferenceId ||
    e.response?.data?.user?.referenceId
  );
}
