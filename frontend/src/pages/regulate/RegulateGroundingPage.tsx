import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBreathingPhases } from "../../components/breathing/useBreathingPhases";
import { BreathingVisual } from "../../components/breathing/BreathingVisual";

export default function RegulateGroundingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRedo = location.state?.redo === true;
  const [hasStarted, setHasStarted] = useState(false);

  const [exiting, setExiting] = useState(false);

  // Start delay (skipped on redo)
  useEffect(() => {
    if (isRedo) {
      setHasStarted(true);
      return;
    }

    const t = setTimeout(() => setHasStarted(true), 3000);
    return () => clearTimeout(t);
  }, [isRedo]);

  // Breathing engine
  const { phase, cycle, totalCycles } = useBreathingPhases({
    phaseDurationMs: 4000,
    totalCycles: 3,
    paused: !hasStarted,
    onComplete: () => {
      setExiting(true);
    
      const t = setTimeout(() => {
        navigate("/regulate/redo");
      }, 250);
    
      return () => clearTimeout(t);
    }    
  });

  // Breathing text label transitions
  const [displayLabel, setDisplayLabel] = useState("");
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const [textClass, setTextClass] = useState("");

  useEffect(() => {
    if (!hasStarted) {
      setDisplayLabel("");
      setTextClass("");
      setHasAnimatedOnce(false);
      return;
    }

    if (!hasAnimatedOnce) {
      setDisplayLabel(phase.label);
      setTextClass("label-first-appear");
      setHasAnimatedOnce(true);
      return;
    }

    setTextClass("label-morph-out");

    const t = setTimeout(() => {
      setDisplayLabel(phase.label);
      setTextClass("label-morph-in");
    }, 60);

    return () => clearTimeout(t);
  }, [phase.key, hasStarted, hasAnimatedOnce]);

  const showIntroMessage = !hasStarted && !isRedo;

  return (
    <div
      className={`flex flex-col px-6 py-10 text-center min-h-screen ${
        exiting ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      <h1 className="text-2xl mb-4">Regulating</h1>

      <div className="flex-1 flex flex-col items-center justify-center space-y-10">
        {showIntroMessage ? (
          <p className="italic text-base fade-slow text-[var(--text-secondary)] leading-relaxed">
            Your first breath begins in a moment...
          </p>
        ) : (
          <p className={`text-lg text-[var(--text-secondary)] ${textClass}`}>
            {displayLabel}
          </p>
        )}

        {!showIntroMessage && (
          <BreathingVisual phaseKey={phase.key} paused={!hasStarted} />
        )}

        {!showIntroMessage && (
          <p className="text-sm fade-slow-delay text-[var(--text-secondary)]">
            Cycle {cycle} of {totalCycles}
          </p>
        )}
      </div>
    </div>
  );
}