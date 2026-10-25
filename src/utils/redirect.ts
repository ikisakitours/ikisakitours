export function getSafeRedirect(fallback = "/") {
  if (typeof window === "undefined") return fallback;

  const target = new URLSearchParams(window.location.search).get("redirect");
  if (!target) return fallback;

  // Only allow internal paths (blocks https://evil.com and //evil.com)
  if (!target.startsWith("/") || target.startsWith("//") || target.includes("\\")) return fallback;

  // Never send the user back to login/register pages
  if (/^\/(login|register)(\/|\?|$)/.test(target)) return fallback;

  return target;
}