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
    if (selectedPreset) {
      const startsWithPreset = text.startsWith(selectedPreset);
  
      if (text.length === 0 || !startsWithPreset) {
        setSelectedPreset(null);
      }
    }
    onChange(text);
  }  

  // When user taps a preset
  function handlePresetClick(text: string) {
    setSelectedPreset(text);
    onChange(text);
  }

  // No category selected yet
  if (!category) {
    return null;
  }

  const presets = PRESETS[category];

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="font-medium text-lg">What’s your focus today?</p>
        <p className="text-sm text-gray-500">Try one of these if you’re not sure where to start.</p>
      </div>

      {/* Preset chips */}
      <div
        className="
          relative flex gap-2 overflow-x-auto no-scrollbar
          py-1 pr-2
          snap-x snap-mandatory
          after:absolute after:right-0 after:top-0 after:h-full after:w-6
          after:bg-gradient-to-l after:from-white after:to-transparent
        "
      >
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePresetClick(preset)}
            className={clsx(
              "px-3 py-2 rounded-full text-sm border transition whitespace-nowrap snap-start",
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
      </div>
    </div>
  );
}