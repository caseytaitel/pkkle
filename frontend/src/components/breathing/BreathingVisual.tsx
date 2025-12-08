import { useEffect, useState } from "react";
import type { PhaseKey } from "./useBreathingPhases";

const ORB_BASE = 150; // overall orb size
const ORB_CENTER = ORB_BASE / 2;

const INHALE_RADIUS = 62;
const EXHALE_RADIUS = 42;

interface BreathingVisualProps {
  phaseKey: PhaseKey;
}

export function BreathingVisual({ phaseKey }: BreathingVisualProps) {
  const [radius, setRadius] = useState(EXHALE_RADIUS);

  const isInhaleOrHold = phaseKey === "inhale" || phaseKey === "holdFull";

  useEffect(() => {
    const target = isInhaleOrHold ? INHALE_RADIUS : EXHALE_RADIUS;
    setRadius(target);
  }, [isInhaleOrHold]);

  return (
    <div className="relative flex items-center justify-center">
      {/* SOFT HALO / CLOUD */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: ORB_BASE * 1.2,
          height: ORB_BASE * 1.2,
          background: `
            radial-gradient(
              circle,
              rgba(180, 220, 195, 0.22) 0%,
              rgba(180, 220, 195, 0.12) 45%,
              rgba(180, 220, 195, 0.03) 80%,
              rgba(180, 220, 195, 0.00) 100%
            )
          `,
        }}
      />

      {/* GLOWING ORB */}
      <svg
        width={ORB_BASE}
        height={ORB_BASE}
        viewBox={`0 0 ${ORB_BASE} ${ORB_BASE}`}
        className="relative z-10"
        style={{
          // symmetric glow hugging the orb
          filter: "drop-shadow(0 0 26px rgba(34, 197, 94, 0.45))",
        }}
      >
        <defs>
          {/* green performance orb with bright core */}
          <radialGradient id="orbGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#F6FFF7" stopOpacity={1} />     {/* soft white core */}
            <stop offset="55%" stopColor="#A0C7A9" stopOpacity={0.95} /> {/* natural mid-green */}
            <stop offset="100%" stopColor="#6EA07A" stopOpacity={1} />   {/* deeper edge shading */}
          </radialGradient>
        </defs>

        <circle
          cx={ORB_CENTER}
          cy={ORB_CENTER}
          r={radius}
          fill="url(#orbGradient)"
          style={{
            transition: "r 4000ms ease-in-out",
          }}
        />
      </svg>
    </div>
  );
}