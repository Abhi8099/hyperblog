import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HyperBlog Platform",
    template: "%s | HyperBlog Platform",
  },
  description: "A multi-blog Next.js platform demo using subfolder routing and middleware mapping.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container site-header-inner">
            <Link href="/" className="brand">
              HyperBlog
            </Link>
            <nav className="nav-links" aria-label="Main">
              <Link href="/tech-blog">Tech</Link>
              <Link href="/travel-blog">Travel</Link>
              <Link href="/design-blog">Design</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
