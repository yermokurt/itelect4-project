import { z } from "zod";
import { ItemStatus } from "../types";

export const itemSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters."),
  description: z.string().trim().min(5, "Description must be at least 5 characters."),
  location: z.string().trim().min(2, "Location is required."),
  status: z.nativeEnum(ItemStatus),
});

export type ItemFormValues = z.infer<typeof itemSchema>;
