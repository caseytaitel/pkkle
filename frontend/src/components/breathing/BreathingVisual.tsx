import { useEffect, useState } from "react";
import type { PhaseKey } from "./useBreathingPhases";

const ORB_BASE = 150;
const ORB_CENTER = ORB_BASE / 2;

const INHALE_RADIUS = 72;
const EXHALE_RADIUS = 54;

interface BreathingVisualProps {
  phaseKey: PhaseKey;
  paused?: boolean;
}

export function BreathingVisual({ phaseKey, paused }: BreathingVisualProps) {
  const [radius, setRadius] = useState(EXHALE_RADIUS);
  const [visible, setVisible] = useState(false);

  const isInhaleOrHold = phaseKey === "inhale" || phaseKey === "holdFull";

  // Fade in orb AFTER component mounts
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  // Smooth breathing transitions
  useEffect(() => {
    if (paused) return;

    const t = setTimeout(() => {
      const target = isInhaleOrHold ? INHALE_RADIUS : EXHALE_RADIUS;
      setRadius(target);
    }, 100);

    return () => clearTimeout(t);
  }, [isInhaleOrHold, paused]);

  return (
    <div
      className={`relative flex items-center justify-center mt-3 ${
        visible ? "orb-enter-slow" : "orb-hidden"
      }`}
    >
      {/* HALO / CLOUD LAYERS */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full absolute"
          style={{
            width: ORB_BASE * 1.32,
            height: ORB_BASE * 1.32,
            transform: "scale(0.80)",
            background: `
              radial-gradient(
                circle,
                rgba(180,235,210,0.25),
                rgba(180,235,210,0.00) 80%
              )
            `,
            filter: "blur(38px)",
            opacity: 0.85,
          }}
        />
        <div
          className="rounded-full absolute"
          style={{
            width: ORB_BASE * 1.22,
            height: ORB_BASE * 1.22,
            transform: "scale(0.80)",
            background: `
              radial-gradient(
                circle,
                rgba(180,235,210,0.22),
                rgba(180,235,210,0.00) 75%
              )
            `,
            filter: "blur(32px)",
            opacity: 0.75,
          }}
        />
        <div
          className="rounded-full absolute"
          style={{
            width: ORB_BASE * 1.14,
            height: ORB_BASE * 1.14,
            transform: "scale(0.82)",
            background: `
              radial-gradient(
                circle,
                rgba(180,240,220,0.28),
                rgba(165,220,200,0.00) 70%
              )
            `,
            filter: "blur(24px)",
            opacity: 0.68,
          }}
        />
      </div>

      {/* ORB */}
      <svg
        width={ORB_BASE}
        height={ORB_BASE}
        viewBox={`0 0 ${ORB_BASE} ${ORB_BASE}`}
        className="relative z-10"
        style={{ filter: "drop-shadow(0 0 28px rgba(80,150,120,0.35))" }}
      >
        <defs>
          {/* Base matte sphere */}
          <radialGradient id="orbBase" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#8FBFA1" stopOpacity="0.90" />
            <stop offset="55%" stopColor="#7EAE92" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#6E9E82" stopOpacity="1" />
          </radialGradient>

          {/* Soft inner breathing glow */}
          <radialGradient id="orbInnerGlow" cx="50%" cy="50%" r="45%">
            <stop offset="0%" stopColor="#D8F1E3" stopOpacity="0.18" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Rim light */}
          <radialGradient id="orbRim" cx="50%" cy="50%" r="90%">
            <stop offset="70%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
          </radialGradient>

          {/* Specular highlight (no hotspot, just silky depth) */}
          <radialGradient id="orbHighlight" cx="40%" cy="38%" r="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Warm/Cool shimmer for inhale/exhale */}
          <radialGradient id="orbShimmer" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Base matte sphere */}
        <circle
          cx={ORB_CENTER}
          cy={ORB_CENTER}
          r={radius}
          fill="url(#orbBase)"
          style={{ transition: "r 4000ms ease-in-out" }}
        />

        {/* Inner breathing glow */}
        <circle
          cx={ORB_CENTER}
          cy={ORB_CENTER}
          r={radius}
          fill="url(#orbInnerGlow)"
          style={{ transition: "r 4000ms ease-in-out" }}
        />

        {/* Rim light */}
        <circle
          cx={ORB_CENTER}
          cy={ORB_CENTER}
          r={radius}
          fill="url(#orbRim)"
          style={{ transition: "r 4000ms ease-in-out" }}
        />

        {/* Soft highlight */}
        <circle
          cx={ORB_CENTER}
          cy={ORB_CENTER}
          r={radius}
          fill="url(#orbHighlight)"
          style={{ transition: "r 4000ms ease-in-out" }}
        />

        {/* Inhale/exhale shimmer */}
        <circle
          cx={ORB_CENTER}
          cy={ORB_CENTER}
          r={radius}
          fill="url(#orbShimmer)"
          style={{
            transition:
              "r 4000ms ease-in-out, opacity 2600ms ease-in-out, transform 3000ms ease-in-out",
            opacity: isInhaleOrHold ? 0.30 : 0.10,
            transform: isInhaleOrHold ? "scale(1.04)" : "scale(1.00)",
          }}
        />
      </svg>
    </div>
  );
}