import { z } from "zod";

export const ContactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Please enter a valid email").max(254),
  phone: z.string().trim().max(60).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(8000),
});
export type ContactMessage = z.infer<typeof ContactMessageSchema>;

export function formatContactMessage(data: ContactMessage) {
  return [
    "Hello Northforge Labs,",
    "I'd like to discuss an enquiry submitted through your website.",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Subject: ${data.subject || "General enquiry"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}
