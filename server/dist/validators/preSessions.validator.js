"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreSessionSchema = void 0;
const zod_1 = require("zod");
exports.createPreSessionSchema = zod_1.z.object({
    intention: zod_1.z
        .string()
        .trim()
        .min(1, "Intention is required")
        .max(1500, "Intention cannot exceed 1500 characters"),
});
