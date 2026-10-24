import { z } from "zod";

export const reviewFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Project description must be at least 20 characters.")
    .max(2000, "Project description cannot exceed 2,000 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
