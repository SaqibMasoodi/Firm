# Graph Report - nova-agency  (2026-09-19)

## Corpus Check
- 79 files · ~1,375,322 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: .bat 4, .css 2, (none) 1)

## Summary
- 349 nodes · 648 edges · 17 communities (14 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f6e26fb1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- scroll-reveal.tsx
- content.ts
- generate-content-files.js
- blog/[slug]/page.tsx
- package.json
- constants.ts
- compilerOptions
- contact/page.tsx
- admin/page.tsx
- devDependencies
- eslint.config.mjs
- README.md
- AGENTS.md
- postcss.config.mjs
- validate-content.js
- hero.tsx

## God Nodes (most connected - your core abstractions)
1. `ScrollReveal()` - 19 edges
2. `compilerOptions` - 16 edges
3. `readFileJson()` - 14 edges
4. `next` - 13 edges
5. `zod` - 11 edges
6. `getCaseStudies()` - 11 edges
7. `react` - 10 edges
8. `getBlogPosts()` - 10 edges
9. `scripts` - 8 edges
10. `getServices()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `getSiteHeader()`  [EXTRACTED]
  src/app/about/page.tsx → src/lib/content.ts
- `generateStaticParams()` --calls--> `getBlogPosts()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/content.ts
- `generateMetadata()` --calls--> `getBlogPostBySlug()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/content.ts
- `BlogPostPage()` --calls--> `getBlogPostBySlug()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/content.ts
- `BlogPage()` --calls--> `getBlogPosts()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/content.ts

## Import Cycles
- None detected.

## Communities (17 total, 3 thin omitted)

### Community 0 - "scroll-reveal.tsx"
Cohesion: 0.09
Nodes (31): framer-motion, ref_next_image, ref_next_link, react, AboutPage(), metadata, HomePage(), metadata (+23 more)

### Community 1 - "content.ts"
Cohesion: 0.08
Nodes (42): ref_fs_promises, ref_next_server, ref_path, zod, CONTENT_DIR, DELETE(), GET(), isDevOnly() (+34 more)

### Community 2 - "generate-content-files.js"
Cohesion: 0.13
Nodes (14): blogPosts, caseStudies, clientLogos, dirs, faqs, fs, navigation, path (+6 more)

### Community 3 - "blog/[slug]/page.tsx"
Cohesion: 0.08
Nodes (26): nextConfig, next, ref_next_navigation, react-markdown, metadata, BlogPage(), metadata, BlogPostPage() (+18 more)

### Community 4 - "package.json"
Cohesion: 0.06
Nodes (35): dependencies, framer-motion, gsap, @gsap/react, @hookform/resolvers, lucide-react, next, react (+27 more)

### Community 5 - "constants.ts"
Cohesion: 0.10
Nodes (26): content_site_client_logos, content_site_config, content_site_faqs, content_site_featured_work, content_site_navigation, content_site_stats, content_site_team, content_site_testimonials (+18 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "contact/page.tsx"
Cohesion: 0.20
Nodes (5): ref_hookform_resolvers_zod, react-hook-form, ContactFormData, contactSchema, FAQ()

### Community 8 - "admin/page.tsx"
Cohesion: 0.07
Nodes (13): ref_next_font_google, ContentItem, Tab, src_app_globals, inter, metadata, viewport, Footer() (+5 more)

### Community 9 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 10 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): eslintConfig, ref_eslint_config, ref_eslint_config_next_core_web_vitals, ref_eslint_config_next_typescript

### Community 11 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 15 - "validate-content.js"
Cohesion: 0.08
Nodes (22): ref_fs, ref_https, download(), downloads, fs, https, main(), path (+14 more)

### Community 16 - "hero.tsx"
Cohesion: 0.27
Nodes (8): gsap, Hero(), HeroProps, CrowdCanvas(), CrowdCanvasProps, Peep, Skiper39(), HeaderConfig

## Knowledge Gaps
- **125 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 182 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `zod` connect `content.ts` to `package.json`, `contact/page.tsx`, `validate-content.js`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `next` connect `blog/[slug]/page.tsx` to `scroll-reveal.tsx`, `admin/page.tsx`, `package.json`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `react` connect `scroll-reveal.tsx` to `admin/page.tsx`, `hero.tsx`, `package.json`, `contact/page.tsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `scroll-reveal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09142857142857143 - nodes in this community are weakly interconnected._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07982583454281568 - nodes in this community are weakly interconnected._
- **Should `generate-content-files.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._