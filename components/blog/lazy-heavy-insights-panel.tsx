"use client";

import dynamic from "next/dynamic";
import type { BlogSlug } from "@/lib/blog-data";

const HeavyInsightsPanel = dynamic(() => import("@/components/blog/heavy-insights-panel"), {
  ssr: false,
  loading: () => <aside className="panel panel-loading">Loading insights tools...</aside>,
});

export function LazyHeavyInsightsPanel({ slug }: { slug: BlogSlug }) {
  return <HeavyInsightsPanel slug={slug} />;
}
