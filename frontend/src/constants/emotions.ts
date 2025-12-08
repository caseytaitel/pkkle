export const EMOTIONS = [
  "happy",
  "focused",
  "frustrated",
  "proud",
  "tired",
  "neutral",
] as const;

export type Emotion = typeof EMOTIONS[number];