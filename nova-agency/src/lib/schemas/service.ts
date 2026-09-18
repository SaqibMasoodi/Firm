import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().default(""),
  slug: z.string(),
  features: z.array(z.string()).optional().default([]),
});

export type Service = z.infer<typeof ServiceSchema>;
