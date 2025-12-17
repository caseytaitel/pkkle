export type SessionType = "pre" | "post";
export type SessionCategory = "rec" | "drilling" | "tournament";

export interface Session {
  id: number;
  type: SessionType;
  timestamp: string;
  category?: SessionCategory | null;
  intention?: string | null;
  secondaryIntention?: string | null;
  emotion?: string | null;
  reflection?: string | null;
  createdAt: string;
  updatedAt: string;
}