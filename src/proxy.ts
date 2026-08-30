import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18nNavigation";
export default createMiddleware(routing);
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

// import createMiddleware from "next-intl/middleware";
// import { routing } from "@/lib/i18nNavigation";
// import { NextRequest, NextResponse } from "next/server";

// const handleI18nRouting = createMiddleware(routing);

// export default function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;
//   const { pathname } = request.nextUrl;

//   const locales = routing.locales;
//   const pathnameWithoutLocale = locales.reduce((acc, locale) => {
//     if (acc.startsWith(`/${locale}/`) || acc === `/${locale}`) {
//       return acc.replace(`/${locale}`, "") || "/";
//     }
//     return acc;
//   }, pathname);

//   // pathnameWithoutLocale.startsWith("/blog") ||
//   // pathnameWithoutLocale.startsWith("/destination") ||
//   // pathnameWithoutLocale.startsWith("/events");

//   const isPublicRoute =
//     pathnameWithoutLocale === "/" ||
//     pathnameWithoutLocale.startsWith("/about") ||
//     pathnameWithoutLocale.startsWith("/contact") ||
//     pathnameWithoutLocale.startsWith("/faq") ||
//     pathnameWithoutLocale.startsWith("/legal");

//   const isAuthRoute = pathnameWithoutLocale.startsWith("/login") || pathnameWithoutLocale.startsWith("/signup");

//   const currentLocale = locales.find((l) => pathname.startsWith(`/${l}`)) || routing.defaultLocale;

//   if (!token && !isPublicRoute && !isAuthRoute) {
//     return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
//   }

//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
//   }

//   return handleI18nRouting(request);
// }

// export const config = {
//   matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// };
