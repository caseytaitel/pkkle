export const EMOTIONS = [
  "calm",
  "confident",
  "focused",
  "neutral",
  "frustrated",
  "anxious",
  "excited",
] as const;

export type Emotion = (typeof EMOTIONS)[number];  