import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18nNavigation";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isSuspended = request.cookies.get("customer_suspended")?.value === "true";

  // Determine current locale (en or ja)
  const segments = pathname.split("/").filter(Boolean);
  const locale = routing.locales.includes(segments[0] as "en" | "ja") ? segments[0] : routing.defaultLocale;

  const isAccessRestricted = pathname.includes("/access-restricted");

  // 1. If user is suspended and trying to access any page other than access-restricted, redirect to /access-restricted
  if (isSuspended && !isAccessRestricted) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/access-restricted`;
    return NextResponse.redirect(url);
  }

  // 2. If user is active (not suspended) and visits /access-restricted with a valid session, redirect to /profile
  if (!isSuspended && isAccessRestricted) {
    const hasToken = request.cookies.get("customer_token")?.value === "true";
    if (hasToken) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/profile`;
      return NextResponse.redirect(url);
    }
  }

  // Delegate localized routing cleanly to intlMiddleware without messy query mutations
  return intlMiddleware(request);
}

export { middleware };

export const config = {
  matcher: ["/((?!api|exchange-rates|_next|_vercel|.*\\..*).*)"],
};
