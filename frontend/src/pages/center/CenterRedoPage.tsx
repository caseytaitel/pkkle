import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CenterRedoPage() {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(false); // prevent multi-taps

  function handleRedo() {
    if (locked) return;
    setLocked(true);

    navigate("/center/ground", {
      state: { redo: true },
    });
  }

  function handleContinue() {
    if (locked) return;
    setLocked(true);

    navigate("/center/chat");
  }

  return (
    <div className="p-6 flex flex-col gap-8 min-h-screen text-center">
      <h1 className="text-2xl font-semibold">How are you feeling now?</h1>

      <p className="text-[var(--text-secondary)] leading-relaxed">
        If you still feel unsettled, take another round to steady yourself.
      </p>

      <div className="flex flex-col gap-4 mt-4">
        <button
          type="button"
          onClick={handleRedo}
          disabled={locked}
          className="w-full bg-black text-white p-4 rounded-xl text-lg active:scale-[0.97] transition disabled:opacity-50"
        >
          Do another cycle
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={locked}
          className="w-full bg-gray-100 text-black p-4 rounded-xl text-lg active:scale-[0.97] transition disabled:opacity-50"
        >
          I’m steady 👍 — continue
        </button>
      </div>
    </div>
  );
}