import { prisma } from "../prisma/client";
import { CreateSessionInput } from "../validators/sessions.validator";

export const sessionsService = {
  findToday: async () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return prisma.session.findMany({
      where: {
        timestamp: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { timestamp: "asc" },
    });
  },

  findAll: async (type?: "pre" | "post") => {
    return prisma.session.findMany({
      where: type ? { type } : undefined,
      orderBy: { createdAt: "desc" },
    });
  },  

  create: async (data: CreateSessionInput) => {
    return prisma.session.create({
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