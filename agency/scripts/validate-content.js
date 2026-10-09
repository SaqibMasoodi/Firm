const fs = require('fs');
const path = require('path');
const { z } = require('zod');

// Schemas in JS
const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().default(""),
  slug: z.string(),
  features: z.array(z.string()).optional().default([]),
});

const ExternalUrl = z.string().url().refine(value => /^https?:\/\//i.test(value), "Use an http or https URL").or(z.literal("")).default("");

const WorkProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().default(""),
  slug: z.string(),
  category: z.enum(["websites", "apps", "social-media"]).default("websites"),
  siteUrl: ExternalUrl,
  playStoreUrl: ExternalUrl,
  tags: z.array(z.string()).default([]),
  client: z.string().default(""),
  challenge: z.string().default(""),
  solution: z.string().default(""),
  results: z.array(z.string()).default([]),
});

const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  image: z.string().default(""),
  slug: z.string(),
  author: z.string(),
  date: z.string(),
  category: z.string(),
  readTime: z.string(),
});

const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string(),
  socials: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
  }).default({}),
});

function validateDirectory(dir, schema, name) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  console.log(`Validating ${files.length} ${name} files in ${dir}...`);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error(`[ERROR] Validation failed for ${filePath}:`, result.error.format());
      process.exit(1);
    }
    console.log(` [PASS] ${file}`);
  }
}

validateDirectory('content/services', ServiceSchema, 'services');
validateDirectory('content/our-work', WorkProjectSchema, 'projects');
validateDirectory('content/blog', BlogPostSchema, 'blog posts');

// Validate site files
const team = JSON.parse(fs.readFileSync('content/site/team.json', 'utf8'));
z.array(TeamMemberSchema).parse(team);
console.log(' [PASS] content/site/team.json');

const HeaderConfigSchema = z.object({
  image: z.string(),
  objectPosition: z.string().default("50% 50%"),
  alt: z.string().optional().default(""),
});
const SiteHeadersSchema = z.object({
  home: HeaderConfigSchema,
  about: HeaderConfigSchema,
  services: HeaderConfigSchema,
});
const headers = JSON.parse(fs.readFileSync('content/site/headers.json', 'utf8'));
SiteHeadersSchema.parse(headers);
console.log(' [PASS] content/site/headers.json');

const TestimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  rating: z.number().default(5),
});

const TestimonialsSectionSchema = z.union([
  z.object({
    image: z.string().default("/images/testimonials/client-showcase.webp"),
    testimonials: z.array(TestimonialSchema),
  }),
  z.array(TestimonialSchema),
]);

const testimonials = JSON.parse(fs.readFileSync('content/site/testimonials.json', 'utf8'));
TestimonialsSectionSchema.parse(testimonials);
console.log(' [PASS] content/site/testimonials.json');

console.log('ALL CONTENT FILES PASSED ZOD VALIDATION!');

const SectionSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  emptyText: z.string(),
  visible: z.boolean(),
});

const OurWorkPageSettingsSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  ctaTitle: z.string().trim().min(1),
  ctaDescription: z.string(),
  sections: z.object({
    websites: SectionSchema,
    apps: SectionSchema,
    "social-media": SectionSchema,
  }),
});


OurWorkPageSettingsSchema.parse(JSON.parse(fs.readFileSync("content/site/our-work-page.json", "utf8")));
console.log(" [PASS] content/site/our-work-page.json");
