import { z } from "zod";

export const createSessionSchema = z.object({
  type: z.enum(["pre", "post"]),
  category: z.enum(["rec", "drilling", "tournament"]).optional(),
  intention: z.string().min(1).optional(),
  secondaryIntention: z.string().min(1).optional(),
  emotion: z.string().min(1).optional(),
  reflection: z.string().min(1).optional(),
}).refine(
  (data) => {
    if (data.type === "pre") {
      return (
        !!data.intention &&
        !!data.category &&
        !data.emotion &&
        !data.reflection
      );
    }

    if (data.type === "post") {
      return (
        !!data.emotion &&
        !!data.reflection &&
        !data.intention &&
        !data.secondaryIntention &&
        !data.category
      );
    }

    return false;
  },
  {
    message: "Invalid session data for the given type.",
    path: ["type"],
  }
);

export type CreateSessionInput = z.infer<typeof createSessionSchema>;