import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useBreathingPhases } from "../../components/breathing/useBreathingPhases";
import { BreathingVisual } from "../../components/breathing/BreathingVisual";

function BreathingBlock({
  paused,
  showActions,
  onComplete,
}: {
  paused: boolean;
  showActions: boolean;
  onComplete: () => void;
}) {
  const { phase, cycle, totalCycles } = useBreathingPhases({
    phaseDurationMs: 4000,
    totalCycles: 3,
    paused,
    onComplete,
  });

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-6 transition-all duration-500",
        showActions && "opacity-40 scale-95"
      )}
    >
      <p className="text-lg text-[var(--text-secondary)]">
        {phase.label}
      </p>

      <BreathingVisual phaseKey={phase.key} paused={paused} />

      <p className="text-sm fade-slow-delay text-[var(--text-secondary)]">
        Cycle {cycle} of {totalCycles}
      </p>
    </div>
  );
}

export default function RegulateGroundingPage() {
  const navigate = useNavigate();

  // Core state
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinishedCycles, setHasFinishedCycles] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Redo control
  const [engineKey, setEngineKey] = useState(0);
  const [isRedoing, setIsRedoing] = useState(false);

  const exitTimerRef = useRef<number | null>(null);

  // Initial start delay (first entry only)
  useEffect(() => {
    const t = window.setTimeout(() => setHasStarted(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  // Cleanup exit timers
  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    };
  }, []);

  const showIntroMessage = !hasStarted && !isRedoing;
  const showActions = hasFinishedCycles && !isComplete;

  function handleRedo() {
    if (exitTimerRef.current) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    setIsComplete(false);
    setHasFinishedCycles(false);

    // Never show intro again
    setIsRedoing(true);
    setHasStarted(true);

    // Force remount of breathing engine
    setEngineKey((k) => k + 1);
  }

  function handleFinish() {
    setIsComplete(true);

    exitTimerRef.current = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => navigate("/"), 250);
    }, 700);
  }

  return (
    <div
      className={clsx(
        "flex flex-col px-6 py-10 text-center min-h-screen",
        exiting ? "animate-fade-out" : "animate-fade-in"
      )}
    >
      <h1 className="text-2xl mb-4">Regulating</h1>

      <div className="flex-1 flex flex-col items-center justify-center space-y-10 -mt-6">
        {showIntroMessage ? (
          <p className="italic text-base fade-slow text-[var(--text-secondary)] leading-relaxed -mt-4">
            Your first breath begins in a moment...
          </p>
        ) : (
          <BreathingBlock
            key={engineKey}
            paused={!hasStarted}
            showActions={showActions}
            onComplete={() => setHasFinishedCycles(true)}
          />
        )}

        {/* Inline redo / finish controls */}
        {showActions && (
          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col gap-4 w-full">
            <button
              type="button"
              onClick={handleRedo}
              className="w-full bg-gray-100 text-black p-4 rounded-xl text-lg active:scale-[0.97] transition"
            >
              Do another round
            </button>

            <button
              type="button"
              onClick={handleFinish}
              className="w-full bg-black text-white p-4 rounded-xl text-lg active:scale-[0.97] transition"
            >
              Finish
            </button>
          </div>
        )}

        {/* Completion acknowledgment */}
        {isComplete && (
          <p className="text-lg text-[var(--text-primary)] mt-10">
            You’re ready to go.
          </p>
        )}
      </div>
    </div>
  );
}