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

    // Animation
    if (current.label === "Breathe in") setScale("scale-125");
    if (current.label === "Hold") setScale("scale-125");
    if (current.label === "Breathe out") setScale("scale-75");

    const timer = setTimeout(() => {
      const next = phaseIndex + 1;

      if (next < PHASES.length) {
        setPhaseIndex(next);
      } else {
        // Completed a full cycle
        if (cycle < 3) {
          setCycle(cycle + 1);
          setPhaseIndex(0);
        } else {
          navigate("/sos/chat");
        }
      }
    }, current.duration);

    return () => clearTimeout(timer);
  }, [phaseIndex, cycle, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center space-y-6">
      
      <h1 className="text-2xl font-semibold tracking-tight">
        Grounding
      </h1>

      <p className="text-lg text-gray-600">
        {PHASES[phaseIndex].label}
      </p>

      {/* Breathing Circle */}
      <div
        className={`w-44 h-44 bg-blue-100 rounded-full transition-transform duration-[4000ms] ${scale}`}
      />

      <p className="text-gray-500 text-sm mt-2">
        Cycle {cycle} of 3
      </p>
    </div>
  );
}