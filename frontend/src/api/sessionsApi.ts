import { api } from "./client";
import type { Session, SessionType } from "../types/Session";

export interface CreateSessionInput {
  type: SessionType;
  intention?: string | null;
  emotion?: string | null;
  reflection?: string | null;
}

export const sessionsApi = {
  getToday: async (): Promise<Session[]> => {
    const res = await api.get("/sessions/today");
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
