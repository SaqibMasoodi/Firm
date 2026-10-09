import { HomePageSettingsSchema } from "@/lib/schemas/home-page-settings";
import { revalidatePath } from "next/cache";
import { OurWorkPageSettingsSchema } from "@/lib/schemas/our-work-page-settings";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ServiceSchema } from "@/lib/schemas/service";
import { WorkProjectSchema } from "@/lib/schemas/work-project";
import { BlogPostSchema } from "@/lib/schemas/blog";
import {
  TeamMemberSchema,
  FAQSchema,
  TestimonialsSectionSchema,
  StatSchema,
  SiteConfigSchema,
  WorkflowStepSchema,
  ClientLogoSchema,
  NavLinkSchema,
  FeaturedWorkSchema,
  SiteHeadersSchema,
} from "@/lib/schemas/site";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

function isDevOnly() {
  return process.env.NODE_ENV !== "production";
}

export async function GET(req: NextRequest) {
  if (!isDevOnly()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!type) {
    return NextResponse.json({ error: "Missing type parameter" }, { status: 400 });
  }

  try {
    const targetDir = path.join(CONTENT_DIR, type);

    if (slug) {
      const filePath = path.join(targetDir, `${slug}.json`);
      const data = await fs.readFile(filePath, "utf-8");
      return NextResponse.json(JSON.parse(data));
    }

    const files = await fs.readdir(targetDir);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const items = await Promise.all(
      jsonFiles.map(async (file) => {
        const data = await fs.readFile(path.join(targetDir, file), "utf-8");
        return {
          filename: file,
          slug: file.replace(".json", ""),
          data: JSON.parse(data),
        };
      })
    );

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isDevOnly()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const body = await req.json();
    const { type, slug, oldSlug, data } = body;

    if (!type || !slug || !data) {
      return NextResponse.json(
        { error: "Missing type, slug, or data" },
        { status: 400 }
      );
    }

    // Validate with Zod
    let validatedData: unknown;
    if (type === "services") {
      validatedData = ServiceSchema.parse(data);
    } else if (type === "our-work") {
      validatedData = WorkProjectSchema.parse(data);
      const pageSettings = OurWorkPageSettingsSchema.parse(JSON.parse(await fs.readFile(path.join(CONTENT_DIR, "site/our-work-page.json"), "utf-8")));
      const projectCategories = validatedData as { category: string; additionalCategories: string[] };
      if ([projectCategories.category, ...projectCategories.additionalCategories].some(category => !Object.hasOwn(pageSettings.sections, category))) {
        return NextResponse.json({ error: "Choose an existing work category. Refresh the editor if categories have changed." }, { status: 400 });
      }
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || (oldSlug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(oldSlug))) {
        return NextResponse.json({ error: "Use lowercase letters, numbers, and hyphens for project slugs" }, { status: 400 });
      }
      if ((validatedData as { slug: string }).slug !== slug) {
        return NextResponse.json({ error: "Project slug must match the saved URL" }, { status: 400 });
      }
      if (oldSlug && oldSlug !== slug) {
        try {
          await fs.access(path.join(CONTENT_DIR, type, `${slug}.json`));
          return NextResponse.json({ error: "A project with this slug already exists" }, { status: 400 });
        } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
      }
    } else if (type === "blog") {
      validatedData = BlogPostSchema.parse(data);
    } else if (type === "site") {
      if (slug === "home-page") {
        validatedData = HomePageSettingsSchema.parse(data);
      } else if (slug === "our-work-page") {
        validatedData = OurWorkPageSettingsSchema.parse(data);
        await saveWorkCategories(validatedData as z.infer<typeof OurWorkPageSettingsSchema>);
        refreshWorkPages(type, slug);
        return NextResponse.json({ success: true, message: "Saved work categories and page settings" });
      } else if (slug === "team") {
        validatedData = z.array(TeamMemberSchema).parse(data);
      } else if (slug === "faqs") {
        validatedData = z.array(FAQSchema).parse(data);
      } else if (slug === "testimonials") {
        validatedData = TestimonialsSectionSchema.parse(data);
      } else if (slug === "stats") {
        validatedData = z.array(StatSchema).parse(data);
      } else if (slug === "config") {
        validatedData = SiteConfigSchema.parse(data);
      } else if (slug === "workflow") {
        validatedData = z.array(WorkflowStepSchema).parse(data);
      } else if (slug === "client-logos") {
        validatedData = z.array(ClientLogoSchema).parse(data);
      } else if (slug === "navigation") {
        validatedData = z.array(NavLinkSchema).parse(data);
      } else if (slug === "featured-work") {
        validatedData = FeaturedWorkSchema.parse(data);
      } else if (slug === "headers") {
        validatedData = SiteHeadersSchema.parse(data);
      } else {
        validatedData = data;
      }
    } else {
      return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    const dirPath = path.join(CONTENT_DIR, type);
    await fs.mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, `${slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(validatedData, null, 2), "utf-8");

    // If slug was renamed, remove the old file
    if (oldSlug && oldSlug !== slug) {
      const oldFilePath = path.join(dirPath, `${oldSlug}.json`);
      try {
        await fs.unlink(oldFilePath);
      } catch {
        // Ignore if old file did not exist
      }
    }

    if (type === "our-work" && oldSlug && oldSlug !== slug) await updateFeaturedProject(oldSlug, slug);
    refreshWorkPages(type, slug);

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${type}/${slug}.json`,
    });
  } catch (error) {
    console.error("Save error:", error);
    if (error instanceof z.ZodError) {
      const formatted = error.issues
        .map((issue) => `${issue.path.join(".") || "field"}: ${issue.message}`)
        .join("; ");
      return NextResponse.json({ error: formatted }, { status: 400 });
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isDevOnly()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!type || !slug) {
    return NextResponse.json({ error: "Missing type or slug" }, { status: 400 });
  }

  if (type === "site") {
    return NextResponse.json(
      { error: "Cannot delete core site configuration files" },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(CONTENT_DIR, type, `${slug}.json`);
    await fs.unlink(filePath);
    if (type === "our-work") await updateFeaturedProject(slug);
    refreshWorkPages(type, slug);
    return NextResponse.json({
      success: true,
      message: `Deleted ${type}/${slug}.json`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function updateFeaturedProject(oldSlug: string, newSlug?: string) {
  const file = path.join(CONTENT_DIR, "site/featured-work.json");
  const current = FeaturedWorkSchema.parse(JSON.parse(await fs.readFile(file, "utf-8")));
  if (!current.includes(oldSlug)) return;
  const next = current.flatMap(slug => slug === oldSlug ? newSlug ? [newSlug] : [] : [slug]);
  await fs.writeFile(file, JSON.stringify(next, null, 2), "utf-8");
}

function refreshWorkPages(type: string, slug: string) {
  if (type === "site" && slug === "config") { revalidatePath("/", "layout"); return; }
  if (type !== "our-work" && !(type === "site" && ["our-work-page", "featured-work"].includes(slug))) return;
  for (const page of ["/our-work", "/", "/sitemap", "/sitemap.xml"]) revalidatePath(page);
  revalidatePath("/our-work/[slug]", "page");
}

// Save category changes together with reassignment of projects from removed categories.
async function saveWorkCategories(settings: z.infer<typeof OurWorkPageSettingsSchema>) {
  const changes: { file: string; previous: string; next: string }[] = [];
  const fallback = Object.keys(settings.sections)[0];
  const projectDir = path.join(CONTENT_DIR, "our-work");
  for (const filename of (await fs.readdir(projectDir)).filter(name => name.endsWith(".json"))) {
    const file = path.join(projectDir, filename);
    const previous = await fs.readFile(file, "utf-8");
    const project = JSON.parse(previous);
    const category = Object.hasOwn(settings.sections, project.category || "websites") ? project.category || "websites" : fallback;
    const additionalCategories = (project.additionalCategories || []).filter((id: string) => Object.hasOwn(settings.sections, id) && id !== category);
    if (category !== (project.category || "websites") || additionalCategories.length !== (project.additionalCategories || []).length) {
      changes.push({ file, previous, next: JSON.stringify({ ...project, category, additionalCategories }, null, 2) });
    }
  }
  const settingsFile = path.join(CONTENT_DIR, "site/our-work-page.json");
  changes.push({ file: settingsFile, previous: await fs.readFile(settingsFile, "utf-8"), next: JSON.stringify(settings, null, 2) });
  const written: typeof changes = [];
  try {
    for (const change of changes) {
      written.push(change);
      await fs.writeFile(change.file, change.next, "utf-8");
    }
  } catch (error) {
    // Restore original files if any part of the category save fails.
    const restored = await Promise.allSettled(written.map(change => fs.writeFile(change.file, change.previous, "utf-8")));
    if (restored.some(result => result.status === "rejected")) console.error("Category save rollback failed");
    throw error;
  }
}
