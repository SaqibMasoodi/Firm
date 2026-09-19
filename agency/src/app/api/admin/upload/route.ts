import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

function isDevOnly() {
  return process.env.NODE_ENV !== "production";
}

export async function POST(req: NextRequest) {
  if (!isDevOnly()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const section =
      (formData.get("section") as string) ||
      (formData.get("category") as string) ||
      "general";
    const slug =
      (formData.get("slug") as string) ||
      (formData.get("subfolder") as string) ||
      "";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Clean filename
    const originalName = file.name.replace(/\s+/g, "-").toLowerCase();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Target folder inside public/images
    const subfolder = slug ? path.join(section, slug) : section;
    const targetDir = path.join(process.cwd(), "public", "images", subfolder);
    await fs.mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, originalName);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/images/${subfolder.replace(/\\/g, "/")}/${originalName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: publicUrl,
      filename: originalName,
      size: buffer.length,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
