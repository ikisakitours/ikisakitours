import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18nNavigation";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Delegate localized routing cleanly to intlMiddleware without messy query mutations
  return intlMiddleware(request);
}

export { middleware };

export const config = {
  matcher: ["/((?!api|exchange-rates|_next|_vercel|.*\\..*).*)"],
};
