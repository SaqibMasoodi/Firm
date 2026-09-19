import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ServiceSchema } from "@/lib/schemas/service";
import { CaseStudySchema } from "@/lib/schemas/case-study";
import { BlogPostSchema } from "@/lib/schemas/blog";
import {
  TeamMemberSchema,
  FAQSchema,
  TestimonialSchema,
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
    } else if (type === "case-studies") {
      validatedData = CaseStudySchema.parse(data);
    } else if (type === "blog") {
      validatedData = BlogPostSchema.parse(data);
    } else if (type === "site") {
      if (slug === "team") {
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

    // If slug was renamed, remove the old file
    if (oldSlug && oldSlug !== slug) {
      const oldFilePath = path.join(dirPath, `${oldSlug}.json`);
      try {
        await fs.unlink(oldFilePath);
      } catch {
        // Ignore if old file did not exist
      }
    }

    const filePath = path.join(dirPath, `${slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(validatedData, null, 2), "utf-8");

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
