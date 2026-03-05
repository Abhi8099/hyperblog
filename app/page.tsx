import Link from "next/link";

const blogEntries = [
  {
    slug: "tech-blog",
    label: "Tech Blog",
    summary: "Architecture notes, platform reliability, and web performance updates.",
  },
  {
    slug: "travel-blog",
    label: "Travel Blog",
    summary: "Practical city guides, routes, and planning tips with real constraints.",
  },
  {
    slug: "design-blog",
    label: "Design Blog",
    summary: "Design systems, UX writing, and shipping maintainable interfaces.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="page-main">
      <div className="container">
        <section className="home-card">
          <h1>Subfolder Multi-Blog Demo</h1>
          <p>
            This app uses a dynamic route (`/[blogSlug]`) so each blog can live under a
            dedicated subfolder URL. Send header <code>x-blog-domain: tech</code> to the
            root route to see middleware-based internal mapping.
          </p>
          <div className="blog-links">
            {blogEntries.map((entry) => (
              <Link key={entry.slug} href={`/${entry.slug}`} className="blog-link">
                <strong>{entry.label}</strong>
                <p>{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
