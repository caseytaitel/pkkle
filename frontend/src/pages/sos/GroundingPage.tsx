import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PHASES = [
  { label: "Breathe in", duration: 4000 },
  { label: "Hold", duration: 2000 },
  { label: "Breathe out", duration: 4000 },
];

export default function GroundingPage() {
  const navigate = useNavigate();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycle, setCycle] = useState(1);
  const [scale, setScale] = useState("scale-75");

  useEffect(() => {
    const current = PHASES[phaseIndex];

    // Phase animation logic
    if (current.label === "Breathe in") setScale("scale-125");
    if (current.label === "Hold") setScale("scale-125");
    if (current.label === "Breathe out") setScale("scale-75");

    const timer = setTimeout(() => {
      // Move to next phase
      const next = phaseIndex + 1;

      if (next < PHASES.length) {
        setPhaseIndex(next);
      } else {
        // Completed full cycle
        if (cycle < 3) {
          setCycle(cycle + 1);
          setPhaseIndex(0);
        } else {
          // After 3 cycles, navigate to chat
          navigate("/sos/chat");
        }
      }
    }, current.duration);

    return () => clearTimeout(timer);
  }, [phaseIndex, cycle, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-semibold mb-4">Grounding</h1>
      <p className="text-lg text-gray-600 mb-8">{PHASES[phaseIndex].label}</p>

      <div
        className={`w-48 h-48 bg-blue-400 rounded-full transition-transform duration-[4000ms] ${scale}`}
      />
      <p className="text-gray-500 mt-6">Cycle {cycle} of 3</p>
    </div>
  );
}