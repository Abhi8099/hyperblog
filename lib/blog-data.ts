export type BlogSlug = "tech-blog" | "travel-blog" | "design-blog";
export type BlogDomain = "tech" | "travel" | "design";

export interface BlogSection {
  heading: string;
  content: string;
}

export interface BlogPost {
  slug: BlogSlug;
  domain: BlogDomain;
  title: string;
  description: string;
  intro: string;
  updatedAt: string;
  sections: BlogSection[];
}

const BLOGS: Record<BlogSlug, BlogPost> = {
  "tech-blog": {
    slug: "tech-blog",
    domain: "tech",
    title: "Tech Blog: Building Stable Systems",
    description:
      "A performance-oriented engineering blog focused on reliability, clean architecture, and delivery speed.",
    intro:
      "Tech teams get faster when architecture is explicit. This blog documents small decisions that reduce maintenance cost over time.",
    updatedAt: "2026-03-05",
    sections: [
      {
        heading: "Architecture Signals",
        content:
          "A healthy architecture keeps domain logic independent from framework-specific details. That keeps migrations and refactors cheap.",
      },
      {
        heading: "Performance Budgeting",
        content:
          "Performance is easier to sustain when every route has a clear budget for JavaScript, network requests, and rendering cost.",
      },
      {
        heading: "Operational Quality",
        content:
          "Small reliability practices like idempotent handlers, structured logs, and safe defaults create compounding impact in production.",
      },
    ],
  },
  "travel-blog": {
    slug: "travel-blog",
    domain: "travel",
    title: "Travel Blog: Practical Route Planning",
    description:
      "A trip-planning blog that prioritizes practical tradeoffs, transit constraints, and realistic schedules.",
    intro:
      "Travel plans fail when they ignore transfer times, fatigue, and budget pressure. This blog keeps itineraries practical.",
    updatedAt: "2026-03-05",
    sections: [
      {
        heading: "City-by-City Blocks",
        content:
          "Break travel into city blocks with clear arrival, transport, and check-in windows. This avoids domino delays across the trip.",
      },
      {
        heading: "Transport Reliability",
        content:
          "Choose transport with slack by default. It is often better to arrive 40 minutes early than miss the next leg of the route.",
      },
      {
        heading: "Expense Control",
        content:
          "Track accommodation, transit, and meals separately. A simple split gives faster visibility into where to cut or reallocate.",
      },
    ],
  },
  "design-blog": {
    slug: "design-blog",
    domain: "design",
    title: "Design Blog: Systems That Scale",
    description:
      "A design blog focused on reusable components, content hierarchy, and maintainable interface decisions.",
    intro:
      "Design quality improves when teams move from isolated screens to coherent systems with shared language.",
    updatedAt: "2026-03-05",
    sections: [
      {
        heading: "Hierarchy Before Decoration",
        content:
          "A clear heading and spacing hierarchy improves comprehension before any visual polish is added.",
      },
      {
        heading: "Component Contracts",
        content:
          "Components should define strict input and behavior contracts so they remain predictable across product surfaces.",
      },
      {
        heading: "Content as a First-Class Layer",
        content:
          "UX writing is part of system design. Consistent language reduces support overhead and clarifies user actions.",
      },
    ],
  },
};

export const BLOG_DOMAIN_TO_SLUG: Record<BlogDomain, BlogSlug> = {
  tech: "tech-blog",
  travel: "travel-blog",
  design: "design-blog",
};

export function getBlogBySlug(slug: string): BlogPost | null {
  return (BLOGS as Record<string, BlogPost>)[slug] ?? null;
}

export function listBlogSlugs(): BlogSlug[] {
  return Object.keys(BLOGS) as BlogSlug[];
}
