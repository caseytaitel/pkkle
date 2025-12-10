export type SessionType = "pre" | "post";

export interface Session {
  id: number;
  type: SessionType;
  timestamp: string;
  intention?: string | null;
  secondaryIntention?: string | null;
  emotion?: string | null;
  reflection?: string | null;
  createdAt: string;
  updatedAt: string;
}