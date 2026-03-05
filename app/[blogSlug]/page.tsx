import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { LazyHeavyInsightsPanel } from "@/components/blog/lazy-heavy-insights-panel";
import { fetchBlogBySlug } from "@/lib/blog-service";

type BlogPageProps = {
  params: Promise<{ blogSlug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { blogSlug } = await params;
  const blog = await fetchBlogBySlug(blogSlug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: `/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: `/${blog.slug}`,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { blogSlug } = await params;
  const blog = await fetchBlogBySlug(blogSlug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="page-main">
      <div className="container blog-layout">
        <BlogArticle blog={blog} />
        <LazyHeavyInsightsPanel slug={blog.slug} />
      </div>
    </main>
  );
}
