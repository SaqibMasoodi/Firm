# Graph Report - nova-agency  (2026-09-19)

## Corpus Check
- 81 files · ~1,375,430 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: .bat 4, .css 2, (none) 1)

## Summary
- 354 nodes · 653 edges · 19 communities (16 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `96095c84`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- scroll-reveal.tsx
- content.ts
- generate-content-files.js
- next
- package.json
- constants.ts
- compilerOptions
- dependencies
- admin/page.tsx
- localize-images.js
- eslint.config.mjs
- README.md
- AGENTS.md
- postcss.config.mjs
- validate-content.js
- skiper39.tsx
- ref_next_server
- ref_path

## God Nodes (most connected - your core abstractions)
1. `ScrollReveal()` - 19 edges
2. `compilerOptions` - 16 edges
3. `next` - 15 edges
4. `readFileJson()` - 14 edges
5. `zod` - 11 edges
6. `getCaseStudies()` - 11 edges
7. `react` - 10 edges
8. `getBlogPosts()` - 10 edges
9. `scripts` - 8 edges
10. `getServices()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `CaseStudiesPreviewProps` --references--> `CaseStudy`  [EXTRACTED]
  src/components/sections/case-studies-preview.tsx → src/lib/schemas/case-study.ts
- `HeroProps` --references--> `HeaderConfig`  [EXTRACTED]
  src/components/sections/hero.tsx → src/lib/schemas/site.ts
- `ServicesAccordionProps` --references--> `Service`  [EXTRACTED]
  src/components/sections/services-accordion.tsx → src/lib/schemas/service.ts
- `AboutPage()` --calls--> `getSiteHeader()`  [EXTRACTED]
  src/app/about/page.tsx → src/lib/content.ts
- `generateStaticParams()` --calls--> `getBlogPosts()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/content.ts

## Import Cycles
- None detected.

## Communities (19 total, 3 thin omitted)

### Community 0 - "scroll-reveal.tsx"
Cohesion: 0.09
Nodes (31): framer-motion, ref_next_image, ref_next_link, AboutPage(), metadata, HomePage(), metadata, ServicesPage() (+23 more)

### Community 1 - "content.ts"
Cohesion: 0.09
Nodes (50): ref_fs_promises, zod, CONTENT_DIR, DELETE(), GET(), isDevOnly(), POST(), TestimonialsProps (+42 more)

### Community 2 - "generate-content-files.js"
Cohesion: 0.13
Nodes (14): blogPosts, caseStudies, clientLogos, dirs, faqs, fs, navigation, path (+6 more)

### Community 3 - "next"
Cohesion: 0.07
Nodes (26): nextConfig, next, ref_next_navigation, react-markdown, metadata, BlogPage(), metadata, BlogPostPage() (+18 more)

### Community 4 - "package.json"
Cohesion: 0.06
Nodes (32): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+24 more)

### Community 5 - "constants.ts"
Cohesion: 0.08
Nodes (20): content_site_client_logos, content_site_config, content_site_faqs, content_site_featured_work, content_site_navigation, content_site_stats, content_site_team, content_site_testimonials (+12 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, framer-motion, gsap, @gsap/react, @hookform/resolvers, lucide-react, next, react (+4 more)

### Community 8 - "admin/page.tsx"
Cohesion: 0.07
Nodes (14): ref_next_font_google, react, ContentItem, Tab, src_app_globals, inter, metadata, viewport (+6 more)

### Community 9 - "localize-images.js"
Cohesion: 0.25
Nodes (8): ref_fs, ref_https, download(), downloads, fs, https, main(), path

### Community 10 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): eslintConfig, ref_eslint_config, ref_eslint_config_next_core_web_vitals, ref_eslint_config_next_typescript

### Community 11 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 15 - "validate-content.js"
Cohesion: 0.12
Nodes (14): BlogPostSchema, CaseStudySchema, fs, HeaderConfigSchema, headers, path, ServiceSchema, SiteHeadersSchema (+6 more)

### Community 16 - "skiper39.tsx"
Cohesion: 0.43
Nodes (5): gsap, CrowdCanvas(), CrowdCanvasProps, Peep, Skiper39()

### Community 17 - "ref_next_server"
Cohesion: 0.29
Nodes (3): ref_next_server, contactSchema, newsletterSchema

### Community 18 - "ref_path"
Cohesion: 0.67
Nodes (3): ref_path, isDevOnly(), POST()

## Knowledge Gaps
- **126 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+121 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 185 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `zod` connect `content.ts` to `ref_next_server`, `package.json`, `constants.ts`, `validate-content.js`?**
  _High betweenness centrality (0.176) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `scroll-reveal.tsx`, `admin/page.tsx`, `package.json`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `react` connect `admin/page.tsx` to `scroll-reveal.tsx`, `skiper39.tsx`, `package.json`, `constants.ts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _126 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `scroll-reveal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09049773755656108 - nodes in this community are weakly interconnected._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08709273182957393 - nodes in this community are weakly interconnected._
- **Should `generate-content-files.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._