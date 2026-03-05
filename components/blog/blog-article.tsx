import type { BlogPost } from "@/lib/blog-data";

export function BlogArticle({ blog }: { blog: BlogPost }) {
  return (
    <article className="blog-card">
      <header>
        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
        <p className="blog-meta">Updated: {blog.updatedAt}</p>
      </header>

      <section>
        <h2>Overview</h2>
        <p>{blog.intro}</p>
      </section>

      {blog.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.content}</p>
        </section>
      ))}
    </article>
  );
}
