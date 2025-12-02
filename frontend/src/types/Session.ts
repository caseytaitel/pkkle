export type SessionType = "pre" | "post";

export interface Session {
  id: number;
  type: SessionType;
  timestamp: string; // ISO string from backend
  intention?: string | null;
  emotion?: string | null;
  reflection?: string | null;
  createdAt: string;
  updatedAt: string;
}