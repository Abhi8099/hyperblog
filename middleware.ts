import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { BLOG_DOMAIN_TO_SLUG } from "@/lib/blog-data";

export function middleware(request: NextRequest) {
  const domainHeader = request.headers.get("x-blog-domain")?.trim().toLowerCase();

  if (!domainHeader) {
    return NextResponse.next();
  }

  const blogSlug = (BLOG_DOMAIN_TO_SLUG as Record<string, string>)[domainHeader];

  if (!blogSlug) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = `/${blogSlug}`;
    return NextResponse.rewrite(url);
  }

  if (url.pathname === "/api/blog" && !url.searchParams.get("slug")) {
    url.searchParams.set("slug", blogSlug);
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();
  response.headers.set("x-resolved-blog", blogSlug);
  return response;
}

export const config = {
  matcher: ["/", "/api/blog"],
};
