import { api } from "./client";
import type { Session, SessionType } from "../types/Session";

export const sessionsApi = {
  getToday: async (): Promise<Session[]> => {
    const res = await api.get("/sessions/today");
    return res.data;
  },

  create: async (data: {
    type: SessionType;
    intention?: string | null;
    emotion?: string | null;
    reflection?: string | null;
  }): Promise<Session> => {
    const res = await api.post("/sessions", data);
    return res.data;
  },
};