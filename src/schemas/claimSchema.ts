import { z } from "zod";

export const claimSchema = z.object({
  claimerName: z.string().trim().min(2, "Enter your full name."),
  claimerEmail: z
    .string()
    .email("Enter a valid email address.")
    .refine(
      (email) => email.toLowerCase().endsWith("@dlsl.edu.ph"),
      "Use your DLSL email address.",
    ),
  ownershipDetails: z
    .string()
    .trim()
    .min(20, "Provide at least 20 characters to verify ownership."),
});

export type ClaimFormValues = z.infer<typeof claimSchema>;
