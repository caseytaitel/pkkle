import { Button } from "../ui/Button";

interface ContinuityCardProps {
  intention: string;
  onUse: () => void;
  onChange: () => void;
}

export function ContinuityCard({
  intention,
  onUse,
  onChange,
}: ContinuityCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
      <p className="text-sm text-gray-700 truncate">
        Last intention: {intention}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <Button type="button" onClick={onUse}>
          Use last intention
        </Button>

        <button
          type="button"
          onClick={onChange}
          className="text-sm text-gray-500 underline underline-offset-2"
        >
          Change intention
        </button>
      </div>
    </div>
  );
}
