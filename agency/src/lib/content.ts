import fs from "fs/promises";
import path from "path";
import { ServiceSchema, type Service } from "@/lib/schemas/service";
import { CaseStudySchema, type CaseStudy } from "@/lib/schemas/case-study";
import { BlogPostSchema, type BlogPost } from "@/lib/schemas/blog";
import {
  TeamMemberSchema,
  FAQSchema,
  TestimonialsSectionSchema,
  StatSchema,
  WorkflowStepSchema,
  ClientLogoSchema,
  SiteConfigSchema,
  NavLinkSchema,
  FeaturedWorkSchema,
  SiteHeadersSchema,
  type TeamMember,
  type FAQ,
  type TestimonialsSectionData,
  type Stat,
  type WorkflowStep,
  type ClientLogo,
  type SiteConfig,
  type NavLink,
  type SiteHeaders,
  type HeaderConfig,
} from "@/lib/schemas/site";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readDirectoryJson<T>(
  dirName: string,
  schema: z.ZodType<T>
): Promise<T[]> {
  const dirPath = path.join(CONTENT_DIR, dirName);
  try {
    const filenames = await fs.readdir(dirPath);
    const jsonFiles = filenames.filter((f) => f.endsWith(".json"));

    const items = await Promise.all(
      jsonFiles.map(async (filename) => {
        const filePath = path.join(dirPath, filename);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const cleanContent = fileContent.replace(/^\uFEFF/, "").trim();
        const parsed = JSON.parse(cleanContent);
        return schema.parse(parsed);
      })
    );

    return items;
  } catch (error) {
    console.error(`Error reading directory content from ${dirName}:`, error);
    return [];
  }
}

async function readFileJson<T>(
  relFilePath: string,
  schema: z.ZodType<T>
): Promise<T | null> {
  const filePath = path.join(CONTENT_DIR, relFilePath);
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const cleanContent = fileContent.replace(/^\uFEFF/, "").trim();
    const parsed = JSON.parse(cleanContent);
    return schema.parse(parsed);
  } catch (error) {
    console.error(`Error reading content file ${relFilePath}:`, error);
    return null;
  }
}

// Services
export async function getServices(): Promise<Service[]> {
  return readDirectoryJson("services", ServiceSchema);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return readFileJson(`services/${slug}.json`, ServiceSchema);
}

// Case Studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return readDirectoryJson("case-studies", CaseStudySchema);
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  return readFileJson(`case-studies/${slug}.json`, CaseStudySchema);
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await readDirectoryJson("blog", BlogPostSchema);
  // Sort latest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return readFileJson(`blog/${slug}.json`, BlogPostSchema);
}

// Site Configurations & Shared Data
export async function getTeamMembers(): Promise<TeamMember[]> {
  const result = await readFileJson("site/team.json", z.array(TeamMemberSchema));
  return result || [];
}

export async function getFaqs(): Promise<FAQ[]> {
  const result = await readFileJson("site/faqs.json", z.array(FAQSchema));
  return result || [];
}

export async function getTestimonials(): Promise<TestimonialsSectionData> {
  const result = await readFileJson(
    "site/testimonials.json",
    TestimonialsSectionSchema
  );
  return (
    result || {
      image: "/images/testimonials/featured.webp",
      testimonials: [],
    }
  );
}

export async function getStats(): Promise<Stat[]> {
  const result = await readFileJson("site/stats.json", z.array(StatSchema));
  return result || [];
}

export async function getWorkflowSteps(): Promise<WorkflowStep[]> {
  const result = await readFileJson(
    "site/workflow.json",
    z.array(WorkflowStepSchema)
  );
  return result || [];
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const result = await readFileJson(
    "site/client-logos.json",
    z.array(ClientLogoSchema)
  );
  return result || [];
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const result = await readFileJson("site/config.json", SiteConfigSchema);
  if (!result) {
    throw new Error("Missing content/site/config.json");
  }
  return result;
}

export async function getNavLinks(): Promise<NavLink[]> {
  const result = await readFileJson(
    "site/navigation.json",
    z.array(NavLinkSchema)
  );
  return result || [];
}

export async function getFeaturedWorkSlugs(): Promise<string[]> {
  const result = await readFileJson("site/featured-work.json", FeaturedWorkSchema);
  return result || [];
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  const [allStudies, featuredSlugs] = await Promise.all([
    getCaseStudies(),
    getFeaturedWorkSlugs(),
  ]);

  if (!featuredSlugs || featuredSlugs.length === 0) {
    return allStudies.slice(0, 3);
  }

  const map = new Map(allStudies.map((study) => [study.slug, study]));
  const featured = featuredSlugs
    .map((slug) => map.get(slug))
    .filter(Boolean) as CaseStudy[];

  return featured.length > 0 ? featured : allStudies.slice(0, 3);
}

export async function getSiteHeaders(): Promise<SiteHeaders> {
  const defaultHeaders: SiteHeaders = {
    home: {
      image: "/images/hero/hero-banner.jpg",
      objectPosition: "50% 50%",
      alt: "Northforge Labs Creative Office",
    },
    about: {
      image: "/images/about/team-culture.webp",
      objectPosition: "50% 50%",
      alt: "Modern office lobby",
    },
    services: {
      image: "/images/cta/cta-banner.webp",
      objectPosition: "50% 50%",
      alt: "Our services",
    },
  };

  const result = await readFileJson("site/headers.json", SiteHeadersSchema);
  return result || defaultHeaders;
}

export async function getSiteHeader(
  key: "home" | "about" | "services"
): Promise<HeaderConfig> {
  const headers = await getSiteHeaders();
  return headers[key];
}


