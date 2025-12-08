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
  onComplete?: () => void;
}

interface BreathingState {
  phase: BreathingPhase;
  cycle: number;
  totalCycles: number;
}

const PHASES: BreathingPhase[] = [
  { key: "inhale",    label: "Breathe in" },
  { key: "holdFull",  label: "Hold" },
  { key: "exhale",    label: "Breathe out" },
  { key: "holdEmpty", label: "Hold" },
];

export function useBreathingPhases(
  options: UseBreathingPhasesOptions = {}
): BreathingState {
  const {
    phaseDurationMs = 4000,
    totalCycles = 3,
    autoStart = true,
    onComplete,
  } = options;

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    if (!autoStart) return;

    const timer = setTimeout(() => {
      const nextPhaseIndex = (phaseIndex + 1) % PHASES.length;

      // If we wrapped back to phase 0, we completed a cycle
      if (nextPhaseIndex === 0) {
        if (cycle < totalCycles) {
          setCycle((prev) => prev + 1);
        } else {
          // completed all cycles
          if (onComplete) {
            onComplete();
          }
          return;
        }
      }

      setPhaseIndex(nextPhaseIndex);
    }, phaseDurationMs);

    return () => clearTimeout(timer);
  }, [autoStart, cycle, phaseDurationMs, phaseIndex, totalCycles, onComplete]);

  return {
    phase: PHASES[phaseIndex],
    cycle,
    totalCycles,
  };
}