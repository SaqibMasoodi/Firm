import { NextResponse } from "next/server";
import { z } from "zod";
import { getSiteConfig } from "@/lib/content";
import { ContactMessageSchema, formatContactMessage } from "@/lib/contact-message";

const requestSchema = ContactMessageSchema.extend({ requestId: z.string().uuid().optional() });

export async function POST(request: Request) {
  if (process.env.CONTACT_EMAIL_ENABLED !== "true") {
    return NextResponse.json({ message: "Email enquiries are disabled for now. Please use the WhatsApp contact form." }, { status: 503 });
  }
  let data: z.infer<typeof requestSchema>;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return NextResponse.json({ message: "Message is too large." }, { status: 413 });
    data = requestSchema.parse(JSON.parse(raw));
  } catch {
    return NextResponse.json({ message: "Please check your form details and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ message: "Email sending is temporarily unavailable. Please contact us by email or WhatsApp." }, { status: 503 });
  }

  try {
    const config = await getSiteConfig();
    const recipient = process.env.CONTACT_TO_EMAIL || config.email;
    if (!z.string().email().safeParse(recipient).success) {
      return NextResponse.json({ message: "Email sending is temporarily unavailable." }, { status: 503 });
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${data.requestId || crypto.randomUUID()}`,
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: data.email,
        subject: `Website enquiry: ${(data.subject || data.name).replace(/[\r\n]/g, " ")}`,
        text: formatContactMessage(data),
      }),
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok || typeof result.id !== "string") {
      // Do not log message contents, credentials or provider response bodies.
      console.error("Contact email provider rejected the request", response.status);
      return NextResponse.json({ message: "Your email could not be sent. Please try again or contact us directly." }, { status: 502 });
    }
    const number = config.whatsappNumber.replace(/\D/g, "");
    const whatsappUrl = /^\d{7,15}$/.test(number)
      ? `https://wa.me/${number}?text=${encodeURIComponent(formatContactMessage(data))}`
      : null;
    return NextResponse.json({ emailAccepted: true, whatsappUrl });
  } catch {
    return NextResponse.json({ message: "Your email could not be sent. Please try again or contact us directly." }, { status: 502 });
  }
}
