import clsx from "clsx";

type Category = "rec" | "drilling" | "tournament";

interface CategorySelectorProps {
  value: Category | null;
  onChange: (c: Category) => void;
}

const OPTIONS: { label: string; value: Category }[] = [
  { label: "Rec Play", value: "rec" },
  { label: "Drilling", value: "drilling" },
  { label: "Tournament", value: "tournament" },
];

export function CategorySelector({ value, onChange }: CategorySelectorProps) {
  return (
    <div className="flex rounded-xl border overflow-hidden bg-white">
      {OPTIONS.map((opt, idx) => {
        const active = value === opt.value;

        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={clsx(
              "flex-1 py-3 text-center text-sm font-medium transition",
              active
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100",
              idx !== 0 && "border-l border-gray-200"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}