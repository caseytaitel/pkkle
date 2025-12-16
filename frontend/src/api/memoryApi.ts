import { sessionsApi } from "./sessionsApi";
import type { Session } from "../types/Session";

 /* Fail-silent helper */
const safeRead = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await fn();
  } catch {
    return fallback;
  }
};

/* Fetch most recent pre-session (any date) */
export const getLastPreSession = async (): Promise<Session | null> => {
  const sessions = await safeRead(
    () => sessionsApi.getAll("pre"),
    []
  );

  return sessions.length > 0 ? sessions[0] : null;
};

/* Fetch all historical pre-sessions */
export const getAllPreSessions = async (): Promise<Session[]> => {
  return safeRead(() => sessionsApi.getAll("pre"), []);
};

/* Fetch all historical post-sessions */
export const getAllPostSessions = async (): Promise<Session[]> => {
  return safeRead(() => sessionsApi.getAll("post"), []);
};

/* Fetch today's pre-session only */
export const getTodaysPreSession = async (): Promise<Session | null> => {
  const todaySessions = await safeRead(
    () => sessionsApi.getToday(),
    []
  );

  return (
    todaySessions.find((s) => s.type === "pre") ?? null
  );
};
