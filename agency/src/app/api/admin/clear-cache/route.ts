import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function POST() {
  try {
    // 1. Invalidate Next.js Data Cache and Full Route Cache across the entire layout
    revalidatePath("/", "layout");

    let diskCachePurged = false;

    // 2. In development mode, also clean .next/cache if present
    if (process.env.NODE_ENV !== "production") {
      const cacheDir = path.join(process.cwd(), ".next", "cache");
      try {
        await fs.rm(cacheDir, { recursive: true, force: true });
        diskCachePurged = true;
      } catch {
        // Cache directory may not exist or may be locked
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      revalidated: "/* (layout)",
      diskCachePurged,
      message: "Cache successfully purged and paths revalidated.",
    });
  } catch (error) {
    console.error("Failed to clear cache:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Unknown error during cache clear",
      },
      { status: 500 }
    );
  }
}
