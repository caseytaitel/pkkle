import { api } from "./client";
import type { Session, SessionType } from "../types/Session";

export interface CreateSessionInput {
  type: SessionType;
  category?: "rec" | "drilling" | "tournament";
  intention?: string | null;
  secondaryIntention?: string | null;
  emotion?: string | null;
  reflection?: string | null;
}

export const sessionsApi = {
  getToday: async (): Promise<Session[]> => {
    const res = await api.get("/sessions/today");
    return res.data;
  },

  getAll: async (type?: SessionType): Promise<Session[]> => {
    const res = await api.get("/sessions", {
      params: type ? { type } : undefined,
    });
    return res.data;
  },

  create: async (data: CreateSessionInput): Promise<Session> => {
    try {
      const res = await api.post("/sessions", data);
      return res.data;
    } catch (err: unknown) {
      console.error("API error creating session:", err);
      throw err;
    }
  },
};