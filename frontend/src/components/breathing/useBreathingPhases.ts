import { useEffect, useState } from "react";

export type PhaseKey = "inhale" | "holdFull" | "exhale" | "holdEmpty";

export interface BreathingPhase {
  key: PhaseKey;
  label: string;
}

interface UseBreathingPhasesOptions {
  phaseDurationMs?: number;
  totalCycles?: number;
  autoStart?: boolean;
  paused?: boolean;
  onComplete?: () => void;
}

interface BreathingState {
  phase: BreathingPhase;
  cycle: number;
  totalCycles: number;
}

const PHASES: BreathingPhase[] = [
  { key: "inhale", label: "Breathe in" },
  { key: "holdFull", label: "Hold" },
  { key: "exhale", label: "Breathe out" },
  { key: "holdEmpty", label: "Hold" },
];

export function useBreathingPhases(
  options: UseBreathingPhasesOptions = {}
): BreathingState {
  const {
    phaseDurationMs = 4000,
    totalCycles = 3,
    autoStart = true,
    paused = false,
    onComplete,
  } = options;

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    if (!autoStart) return;
    if (paused) return;

    const timer = setTimeout(() => {
      const nextIndex = (phaseIndex + 1) % PHASES.length;

      if (nextIndex === 0) {
        if (cycle < totalCycles) {
          setCycle((c) => c + 1);
        } else {
          onComplete?.();
          return;
        }
      }

      setPhaseIndex(nextIndex);
    }, phaseDurationMs);

    return () => clearTimeout(timer);
  }, [autoStart, paused, phaseDurationMs, phaseIndex, cycle, totalCycles, onComplete]);

  return {
    phase: PHASES[phaseIndex],
    cycle,
    totalCycles,
  };
}