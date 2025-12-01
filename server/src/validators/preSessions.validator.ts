import { z } from "zod";

export const createPreSessionSchema = z.object({
  intention: z
    .string()
    .trim()
    .min(1, "Intention is required")
    .max(1500, "Intention cannot exceed 1500 characters"),
});

// Type for controllers/services
export type CreatePreSessionInput = z.infer<typeof createPreSessionSchema>;