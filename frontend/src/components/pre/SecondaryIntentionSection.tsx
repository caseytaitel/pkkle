import { useState } from "react";
import clsx from "clsx";
import { Textarea } from "../ui/Textarea";

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

export function SecondaryIntentionSection({
  category,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  function handlePresetClick(text: string) {
    setSelectedPreset(text);
    onChange(text);
  }

  function handleTextChange(text: string) {
    if (selectedPreset) {
      const startsWithPreset = text.startsWith(selectedPreset);
      if (text.length === 0 || !startsWithPreset) {
        setSelectedPreset(null);
      }
    }
    onChange(text);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Collapsed header */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-left text-sm font-medium text-[var(--text-primary)] underline"
        >
          + Add another intention
        </button>
      )}
  
      {open && (
        <div className="flex flex-col gap-3">
          <p className="text-base font-medium text-[var(--text-primary)]">
            Second Intention
          </p>
  
          {/* No category yet */}
          {!category && (
            <p className="text-sm text-gray-500">
              Select a category to see suggestions.
            </p>
          )}
  
          {/* Preset chips */}
          {category && (
            <div className="relative">
              {/* Scrollable chips */}
              <div
                className="
                  flex gap-2 overflow-x-auto no-scrollbar
                  py-1 pr-8
                  snap-x snap-mandatory
                "
              >
                {PRESETS[category].map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    className={clsx(
                      "px-3 py-2 text-sm font-normal whitespace-nowrap",
                      "rounded-xl border transition duration-150 active:scale-[0.97]",
                      selectedPreset === preset
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                    )}
                  >
                    {preset}
                  </button>
                ))}
              </div>
  
              {/* Right fade (visual only, never overlaps chips) */}
              <div
                className="
                  pointer-events-none
                  absolute right-0 top-0 h-full w-4
                  bg-gradient-to-l from-white to-transparent
                "
              />
            </div>
          )}
  
          {/* Textarea */}
          <Textarea
            value={value}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Add another intention…"
            maxLength={500}
            className="mt-3 text-sm placeholder:text-gray-400"
          />
        </div>
      )}
    </div>
  );  
}