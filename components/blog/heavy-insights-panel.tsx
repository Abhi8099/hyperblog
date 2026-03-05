"use client";

import { useMemo, useState } from "react";
import type { BlogSlug } from "@/lib/blog-data";

const snippet = Array.from({ length: 120 }, (_, index) => `// insight line ${index + 1}`).join(
  "\n",
);

export default function HeavyInsightsPanel({ slug }: { slug: BlogSlug }) {
  const [expanded, setExpanded] = useState(false);

  const insightLabel = useMemo(() => {
    const labels: Record<BlogSlug, string> = {
      "tech-blog": "Runtime metrics and architecture notes",
      "travel-blog": "Route analysis and timeline simulation",
      "design-blog": "Design token and component audit",
    };

    return labels[slug];
  }, [slug]);

  return (
    <aside className="panel" aria-label="Optional insights panel">
      <h2>Heavy Insights Panel</h2>
      <p>
        This non-critical tool is lazy-loaded with <code>next/dynamic</code> so it does not
        inflate the main route bundle.
      </p>
      <h3>{insightLabel}</h3>
      <button className="button" type="button" onClick={() => setExpanded((value) => !value)}>
        {expanded ? "Hide preview" : "Show preview"}
      </button>
      {expanded ? <pre>{snippet}</pre> : null}
    </aside>
  );
}
