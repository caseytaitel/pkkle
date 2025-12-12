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
          className="text-left text-[var(--text-primary)] underline text-sm font-medium"
        >
          + Add another intention
        </button>
      )}

      {open && (
        <div className="flex flex-col gap-4 p-4 border rounded-xl">

          <p className="font-medium text-lg">Second Intention</p>

          {/* No category yet */}
          {!category && (
            <p className="text-gray-500">Select a category to see suggestions.</p>
          )}

          {/* Preset chips */}
          {category && (
            <div className="flex flex-wrap gap-2">
              {PRESETS[category].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => handlePresetClick(preset)}
                  className={clsx(
                    "px-3 py-2 rounded-full text-sm border transition",
                    selectedPreset === preset
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  )}
                >
                  {preset}
                </button>
              ))}
            </div>
          )}

          {/* Textarea */}
          <div>
            <Textarea
              value={value}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Write your intention…"
              maxLength={500}
            />
          </div>
        </div>
      )}
    </div>
  );
}