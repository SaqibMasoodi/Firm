import { z } from "zod";
import { StatSchema } from "./site";
export const HomePageSettingsSchema = z.object({
 snapshotVisible:z.boolean(), snapshotTagline:z.string(), snapshotTitle:z.string().trim().min(1), snapshotDescription:z.string(), stats:z.array(StatSchema),
 ctaVisible:z.boolean(), ctaTitle:z.string().trim().min(1), ctaDescription:z.string(), ctaImage:z.string(),
});
export type HomePageSettings = z.infer<typeof HomePageSettingsSchema>;
