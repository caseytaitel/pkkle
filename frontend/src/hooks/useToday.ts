import { useEffect, useState } from "react";
import type { Session } from "../types/Session";
import { sessionsApi } from "../api/sessionsApi";

export function useToday() {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await sessionsApi.getToday();
        setSessions(data);
      } catch (err) {
        console.error("Failed to load today's sessions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, []);

  return { sessions, loading };
}

