import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["pt", "en"] as const;
const defaultLocale = "pt";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (acceptLanguage.includes("pt")) return "pt";
  if (acceptLanguage.includes("en")) return "en";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/robots") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|studio|.*\\..*).*)"],
};
