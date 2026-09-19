# Graph Report - nova-agency  (2026-09-19)

## Corpus Check
- 78 files · ~1,375,631 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: .bat 4, .css 2, (none) 1)

## Summary
- 346 nodes · 642 edges · 20 communities (15 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f6e26fb1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app/page.tsx
- content.ts
- generate-content-files.js
- scroll-reveal.tsx
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
- validate-content.js
- hero.tsx
- navbar.tsx
- app/layout.tsx
- footer.tsx

## God Nodes (most connected - your core abstractions)
1. `ScrollReveal()` - 19 edges
2. `compilerOptions` - 16 edges
3. `readFileJson()` - 14 edges
4. `next` - 13 edges
5. `zod` - 11 edges
6. `getCaseStudies()` - 11 edges
7. `getBlogPosts()` - 10 edges
8. `react` - 9 edges
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

## Communities (20 total, 5 thin omitted)

### Community 0 - "app/page.tsx"
Cohesion: 0.23
Nodes (13): AboutPage(), HomePage(), metadata, ServicesPage(), CaseStudiesPreview(), CaseStudiesPreviewProps, ClientLogos(), ServicesAccordion() (+5 more)

### Community 1 - "content.ts"
Cohesion: 0.08
Nodes (50): CONTENT_DIR, DELETE(), GET(), isDevOnly(), POST(), ServicesAccordionProps, getInitials(), Testimonials() (+42 more)

### Community 2 - "generate-content-files.js"
Cohesion: 0.08
Nodes (26): ref_fs, ref_fs_promises, ref_https, ref_path, blogPosts, caseStudies, clientLogos, dirs (+18 more)

### Community 3 - "scroll-reveal.tsx"
Cohesion: 0.07
Nodes (35): nextConfig, framer-motion, next, ref_next_image, ref_next_link, metadata, BlogPage(), metadata (+27 more)

### Community 4 - "package.json"
Cohesion: 0.06
Nodes (33): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+25 more)

### Community 5 - "constants.ts"
Cohesion: 0.13
Nodes (14): content_site_client_logos, content_site_config, content_site_faqs, content_site_featured_work, content_site_navigation, content_site_stats, content_site_team, content_site_testimonials (+6 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 7 - "contact/page.tsx"
Cohesion: 0.16
Nodes (7): ref_hookform_resolvers_zod, react, react-hook-form, ContactFormData, contactSchema, FAQ(), faqs

### Community 9 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, framer-motion, gsap, @gsap/react, @hookform/resolvers, lucide-react, next, react (+4 more)

### Community 10 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): eslintConfig, ref_eslint_config, ref_eslint_config_next_core_web_vitals, ref_eslint_config_next_typescript

### Community 11 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 15 - "validate-content.js"
Cohesion: 0.09
Nodes (18): ref_next_server, zod, BlogPostSchema, CaseStudySchema, fs, HeaderConfigSchema, headers, path (+10 more)

### Community 16 - "hero.tsx"
Cohesion: 0.27
Nodes (8): gsap, Hero(), HeroProps, CrowdCanvas(), CrowdCanvasProps, Peep, Skiper39(), HeaderConfig

### Community 17 - "navbar.tsx"
Cohesion: 0.22
Nodes (4): ref_next_navigation, metadata, Navbar(), navLinks

### Community 18 - "app/layout.tsx"
Cohesion: 0.25
Nodes (6): ref_next_font_google, src_app_globals, inter, metadata, viewport, Footer()

## Knowledge Gaps
- **124 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+119 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 181 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `zod` connect `validate-content.js` to `content.ts`, `package.json`, `contact/page.tsx`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **Why does `next` connect `scroll-reveal.tsx` to `app/page.tsx`, `navbar.tsx`, `app/layout.tsx`, `package.json`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `react` connect `contact/page.tsx` to `scroll-reveal.tsx`, `package.json`, `admin/page.tsx`, `hero.tsx`, `navbar.tsx`, `footer.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _124 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0768361581920904 - nodes in this community are weakly interconnected._
- **Should `generate-content-files.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Should `scroll-reveal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06775956284153005 - nodes in this community are weakly interconnected._