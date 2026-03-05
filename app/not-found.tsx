import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-main">
      <div className="container">
        <section className="home-card not-found-card">
          <h1>Blog not found</h1>
          <p>The requested blog slug is not configured in this demo.</p>
          <Link href="/" className="button">
            Go back home
          </Link>
        </section>
      </div>
    </main>
  );
}
