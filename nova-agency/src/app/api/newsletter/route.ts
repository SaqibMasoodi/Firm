import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // In production, you would:
    // 1. Save to database
    // 2. Add to email marketing platform (e.g., Mailchimp, ConvertKit)
    console.log("Newsletter subscription:", email);

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
