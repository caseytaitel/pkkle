"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
const zod_1 = require("zod");
exports.createSessionSchema = zod_1.z.object({
    type: zod_1.z.enum(["pre", "post"]),
    intention: zod_1.z.string().min(1).optional(),
    secondaryIntention: zod_1.z.string().min(1).optional(),
    emotion: zod_1.z.string().min(1).optional(),
    reflection: zod_1.z.string().min(1).optional(),
}).refine((data) => {
    if (data.type === "pre") {
        // Must have intention; may have secondaryIntention; must NOT have emotion/reflection
        return (!!data.intention &&
            !data.emotion &&
            !data.reflection);
    }
    if (data.type === "post") {
        // Must have emotion + reflection; must NOT have intention or secondaryIntention
        return (!!data.emotion &&
            !!data.reflection &&
            !data.intention &&
            !data.secondaryIntention);
    }
    return false;
}, {
    message: "Invalid session data for the given type.",
    path: ["type"],
});
