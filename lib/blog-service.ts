import { cache } from "react";
import { headers } from "next/headers";
import type { BlogPost } from "@/lib/blog-data";

interface BlogApiPayload {
  blog: BlogPost;
}

export const fetchBlogBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  const fallbackBaseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const baseUrl = host ? `${protocol}://${host}` : fallbackBaseUrl;

  const response = await fetch(`${baseUrl}/api/blog?slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 120 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Blog API request failed: ${response.status}`);
  }

  const payload = (await response.json()) as BlogApiPayload;
  return payload.blog;
});
