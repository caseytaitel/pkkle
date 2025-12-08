import { useEffect, useState } from "react";
import type { Session } from "../types/Session";
import { sessionsApi } from "../api/sessionsApi";

export interface UseTodayReturn {
  sessions: Session[] | null;
  loading: boolean;
}

export function useToday(): UseTodayReturn {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions(): Promise<void> {
      try {
        const data = await sessionsApi.getToday();
        setSessions(data);
      } catch (err: unknown) {
        console.error("Failed to load today's sessions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, []);

  return { sessions, loading };
}
