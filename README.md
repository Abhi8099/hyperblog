# HyperBlog Task

Next.js App Router demo that simulates a multi-blog platform with subfolder routing, middleware-based domain mapping, SSR SEO metadata, and performance-aware component loading.

## GitHub Repository Link

Add your repository URL here after pushing:

`https://github.com/<your-username>/<your-repo>`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/tech-blog`
- `/travel-blog`
- `/design-blog`
- `/:blogSlug` (dynamic route implementation in `app/[blogSlug]/page.tsx`)

## Rendering Choice

- **Blog pages use SSR** (Server Components + server-side data fetch through `/api/blog`).
- This keeps blog content and metadata in the server HTML, which is useful for crawlability and predictable SEO output.
- The non-critical insights widget is client-only and loaded lazily.

## SEO Approach

- `generateMetadata()` in `app/[blogSlug]/page.tsx` sets:
  - Dynamic title
  - Meta description
  - Canonical URL
  - Open Graph metadata
- Content is rendered server-side with semantic heading hierarchy:
  - `h1` for page title
  - `h2` for sections
- SEO tags and body content are visible in View Page Source.

## Performance Decisions

- Heavy optional UI (`components/blog/heavy-insights-panel.tsx`) is loaded via `next/dynamic` with `ssr: false`.
- Core content remains server-rendered to avoid unnecessary client hydration.
- API/data fetch deduping uses `react` `cache()` in `lib/blog-service.ts`.
- Minimal dependencies to keep bundle size small.

## Middleware Logic

File: `middleware.ts`

- Reads custom request header: `x-blog-domain`.
- Maps fake domain keys to slugs:
  - `tech -> tech-blog`
  - `travel -> travel-blog`
  - `design -> design-blog`
- Rewrites `/` internally to the mapped blog route.
- Also rewrites `/api/blog` if no slug is provided.

### Header Test Example

```bash
curl -H "x-blog-domain: tech" http://localhost:3000/
```

This request is internally rewritten to `/tech-blog`.

## Mock API

Route handler: `app/api/blog/route.ts`

- Example:
  - `/api/blog?slug=tech-blog`
- Uses static in-memory mock data from `lib/blog-data.ts`.
- Returns typed JSON and proper 400/404 responses.

## Bonus: Scaling Notes (Domain + Subdomain + Subfolder)

To scale this architecture:

1. Add a routing-resolver module that normalizes request host + path into a tenant/blog context.
2. Keep blog config in a shared store (database or edge config), cached aggressively.
3. Resolve tenant in middleware/proxy and pass context through headers to server routes.
4. Use the same rendering surface (`app/[blogSlug]`) while supporting:
   - Main domain subfolders (`example.com/tech-blog`)
   - Subdomains (`tech.example.com`)
   - Custom domains (`mytechblog.com`)
5. Introduce tenant-aware cache keys and invalidation strategy for content updates.
