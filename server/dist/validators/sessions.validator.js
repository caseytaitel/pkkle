"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
const zod_1 = require("zod");
exports.createSessionSchema = zod_1.z.object({
    type: zod_1.z.enum(["pre", "post"]),
    intention: zod_1.z.string().trim().min(1).max(1500).optional(),
    emotion: zod_1.z.string().trim().min(1).optional(),
    reflection: zod_1.z.string().trim().min(1).max(5000).optional(),
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
