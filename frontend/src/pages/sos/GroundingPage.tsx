import { useNavigate } from "react-router-dom";
import { useBreathingPhases } from "../../components/breathing/useBreathingPhases";
import { BreathingVisual } from "../../components/breathing/BreathingVisual";

export default function GroundingPage() {
  const navigate = useNavigate();

  const { phase, cycle, totalCycles } = useBreathingPhases({
    phaseDurationMs: 4000,
    totalCycles: 3,
    onComplete: () => {
      navigate("/sos/chat");
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Grounding
      </h1>

      <p className="text-lg text-gray-600">
        {phase.label}
      </p>

      <BreathingVisual phaseKey={phase.key} />

      <p className="text-gray-500 text-sm">
        Cycle {cycle} of {totalCycles}
      </p>
    </div>
  );
}