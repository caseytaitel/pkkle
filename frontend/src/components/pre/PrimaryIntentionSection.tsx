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

export function PrimaryIntentionSection({ category, value, onChange }: Props) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // When typing, clear preset selection
  function handleTextChange(text: string) {
    if (selectedPreset && text !== selectedPreset) {
      setSelectedPreset(null);
    }
    onChange(text);
  }

  // When user taps a preset
  function handlePresetClick(text: string) {
    setSelectedPreset(text);
    onChange(text);
  }

  // Character limit
  const remaining = 500 - value.length;

  // No category selected yet
  if (!category) {
    return (
      <div className="rounded-xl border p-4 text-gray-500">
        Select a category to see intention suggestions.
      </div>
    );
  }

  const presets = PRESETS[category];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-medium text-lg">What’s your focus today?</p>
        <p className="text-sm text-gray-500">Try one of these if you’re not sure where to start.</p>
      </div>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
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

      {/* Textarea */}
      <div>
        <Textarea
          value={value}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Write your intention…"
          maxLength={500}
          className="mt-2"
        />

        <p className={clsx(
          "text-right text-sm mt-1",
          remaining < 0 ? "text-red-600" : "text-gray-400"
        )}>
          {remaining} characters remaining
        </p>
      </div>
    </div>
  );
}