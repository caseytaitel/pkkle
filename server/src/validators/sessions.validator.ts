import { z } from "zod";

export const createSessionSchema = z.object({
  type: z.enum(["pre", "post"]),
  intention: z.string().trim().min(1).max(1500).optional(),
  emotion: z.string().trim().min(1).optional(),
  reflection: z.string().trim().min(1).max(5000).optional(),
})
.superRefine((data, ctx) => {
  if (data.type === "pre") {
    if (!data.intention) {
      ctx.addIssue({ code: "custom", message: "Pre sessions require intention." });
    }
  }

  if (data.type === "post") {
    if (!data.emotion) {
      ctx.addIssue({ code: "custom", message: "Post sessions require emotion." });
    }
    if (!data.reflection) {
      ctx.addIssue({ code: "custom", message: "Post sessions require reflection." });
    }
  }
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;