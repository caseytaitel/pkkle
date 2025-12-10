"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsService = void 0;
const client_1 = require("../prisma/client");
exports.sessionsService = {
    findToday: async () => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        return client_1.prisma.session.findMany({
            where: {
                timestamp: {
                    gte: start,
                    lte: end,
                },
            },
            orderBy: { timestamp: "asc" },
        });
    },
    create: async (data) => {
        return client_1.prisma.session.create({
            data: {
                type: data.type,
                intention: data.intention ?? null,
                secondaryIntention: data.secondaryIntention ?? null,
                emotion: data.emotion ?? null,
                reflection: data.reflection ?? null,
            },
        });
    },
};
