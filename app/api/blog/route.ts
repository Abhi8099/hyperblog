import { NextResponse } from "next/server";
import { getBlogBySlug, listBlogSlugs } from "@/lib/blog-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      {
        error: "Missing `slug` query parameter.",
        availableSlugs: listBlogSlugs(),
      },
      { status: 400 },
    );
  }

  const blog = getBlogBySlug(slug);

  if (!blog) {
    return NextResponse.json({ error: "Blog not found." }, { status: 404 });
  }

  return NextResponse.json(
    { blog },
    {
      headers: {
        "cache-control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    },
  );
}
