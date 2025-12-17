import clsx from "clsx";
import { Textarea } from "../ui/Textarea";
import { useEffect, useState } from "react";

type Category = "rec" | "drilling" | "tournament";

interface Props {
  category: Category | null;
  value: string;
  onChange: (text: string) => void;
}

const PRESETS: Record<Category, string[]> = {
  rec: [
    "Stay loose and breathe.",
    "Move with ease, not urgency.",
    "Play one ball at a time.",
    "Work the middle with patience.",
    "Choose smart targets.",
  ],
  drilling: [
    "Work hard. Have fun.",
    "Active feet. Strong base.",
    "Watch the ball. Let it come to you.",
    "Progress > comfort.",
    "Stay curious, not critical.",
  ],
  tournament: [
    "Stand tall. Shoulders soft. Commit to your shot.",
    "Follow the gameplan.",
    "Breathe and anchor between points.",
    "Connect with your partner.",
    "One point at a time.",
  ],
};

export function SecondaryIntentionSection({ category, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  // 🔑 auto-open if value exists (continuity)
  useEffect(() => {
    if (value && value.length > 0) {
      setOpen(true);
    }
  }, [value]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left text-sm font-medium text-[var(--text-primary)] underline"
      >
        + Add another intention
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-medium text-[var(--text-primary)]">
        Second Intention
      </p>

      {category && (
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 pr-8">
            {PRESETS[category].map((preset) => {
              const selected = value === preset;

              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChange(preset)}
                  className={clsx(
                    "px-3 py-2 text-sm whitespace-nowrap rounded-xl border transition",
                    selected
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  )}
                >
                  {preset}
                </button>
              );
            })}
          </div>

          <div className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-white to-transparent" />
        </div>
      )}

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add another intention…"
        maxLength={500}
        className="mt-3 text-sm placeholder:text-gray-400"
      />
    </div>
  );
}