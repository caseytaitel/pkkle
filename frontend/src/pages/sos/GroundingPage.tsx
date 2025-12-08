import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBreathingPhases } from "../../components/breathing/useBreathingPhases";
import { BreathingVisual } from "../../components/breathing/BreathingVisual";

export default function GroundingPage() {
  const navigate = useNavigate();

  // Delay the exercise start
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasStarted(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Breathing engine
  const { phase, cycle, totalCycles } = useBreathingPhases({
    phaseDurationMs: 4000,
    totalCycles: 3,
    paused: !hasStarted,
    onComplete: () => {
      setIsExiting(true);
      setTimeout(() => navigate("/sos/chat"), 450); 
    },    
  });

  // Label animation logic
  const [displayLabel, setDisplayLabel] = useState("");
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const [textClass, setTextClass] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      setDisplayLabel("");
      setTextClass("");
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

  const showIntroMessage = !hasStarted;

  return (
    <div
      className={`flex flex-col px-6 py-10 text-center min-h-screen transition-all duration-500 ${
        isExiting ? "ground-exit" : ""
      }`}
    >
      {/* Title stays fixed at the top */}
      <h1 className="text-2xl font-semibold tracking-tight">Grounding</h1>

      {/* Main content area: centers intro OR centers breathing */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Intro prompt (centered vertically) */}
        {showIntroMessage ? (
          <p className="text-gray-600 italic text-base fade-slow">
            Your first breath begins in a moment...
          </p>
        ) : (
          <p className={`text-lg text-gray-600 ${textClass}`}>
            {displayLabel}
          </p>
        )}

        {/* Orb (hidden during intro) */}
        {!showIntroMessage && (
          <BreathingVisual phaseKey={phase.key} paused={!hasStarted} />
        )}

        {/* Cycle count (hidden during intro) */}
        {!showIntroMessage && (
          <p className="text-gray-500 text-sm fade-slow-delay">
            Cycle {cycle} of {totalCycles}
          </p>
        )}
      </div>
    </div>
  );
}