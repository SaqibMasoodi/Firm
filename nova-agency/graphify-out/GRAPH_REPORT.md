# Graph Report - nova-agency  (2026-09-18)

## Corpus Check
- 76 files · ~715,792 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: .bat 3, .css 2, (none) 1)

## Summary
- 338 nodes · 628 edges · 15 communities (11 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30f91d9d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- scroll-reveal.tsx
- content.ts
- validate-content.js
- blog/[slug]/page.tsx
- package.json
- constants.ts
- compilerOptions
- contact/page.tsx
- admin/page.tsx
- dependencies
- eslint.config.mjs
- README.md
- AGENTS.md
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `ScrollReveal()` - 19 edges
2. `compilerOptions` - 16 edges
3. `readFileJson()` - 14 edges
4. `next` - 13 edges
5. `zod` - 11 edges
6. `getCaseStudies()` - 11 edges
7. `getBlogPosts()` - 10 edges
8. `react` - 8 edges
9. `getServices()` - 8 edges
10. `getSiteHeader()` - 8 edges

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

## Communities (15 total, 4 thin omitted)

### Community 0 - "scroll-reveal.tsx"
Cohesion: 0.09
Nodes (33): framer-motion, ref_next_image, ref_next_link, react, AboutPage(), metadata, HomePage(), metadata (+25 more)

### Community 1 - "content.ts"
Cohesion: 0.08
Nodes (49): CONTENT_DIR, DELETE(), GET(), isDevOnly(), POST(), CaseStudiesPreviewProps, ServicesAccordionProps, TestimonialsProps (+41 more)

### Community 2 - "validate-content.js"
Cohesion: 0.05
Nodes (40): ref_fs, ref_fs_promises, ref_https, ref_path, blogPosts, caseStudies, clientLogos, dirs (+32 more)

### Community 3 - "blog/[slug]/page.tsx"
Cohesion: 0.08
Nodes (25): nextConfig, next, ref_next_navigation, react-markdown, metadata, BlogPage(), metadata, BlogPostPage() (+17 more)

### Community 4 - "package.json"
Cohesion: 0.06
Nodes (32): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+24 more)

### Community 5 - "constants.ts"
Cohesion: 0.07
Nodes (21): content_site_client_logos, content_site_config, content_site_faqs, content_site_featured_work, content_site_navigation, content_site_stats, content_site_team, content_site_testimonials (+13 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "contact/page.tsx"
Cohesion: 0.12
Nodes (9): ref_hookform_resolvers_zod, ref_next_server, react-hook-form, zod, contactSchema, newsletterSchema, ContactFormData, contactSchema (+1 more)

### Community 9 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, framer-motion, gsap, @gsap/react, @hookform/resolvers, lucide-react, next, react (+4 more)

### Community 10 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): eslintConfig, ref_eslint_config, ref_eslint_config_next_core_web_vitals, ref_eslint_config_next_typescript

### Community 11 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **122 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+117 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 179 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `zod` connect `contact/page.tsx` to `content.ts`, `validate-content.js`, `package.json`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Why does `next` connect `blog/[slug]/page.tsx` to `scroll-reveal.tsx`, `package.json`, `constants.ts`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `react` connect `scroll-reveal.tsx` to `admin/page.tsx`, `package.json`, `constants.ts`, `contact/page.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _122 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `scroll-reveal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08506493506493507 - nodes in this community are weakly interconnected._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08441558441558442 - nodes in this community are weakly interconnected._
- **Should `validate-content.js` be split into smaller, more focused modules?**
  _Cohesion score 0.048484848484848485 - nodes in this community are weakly interconnected._