import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegulateRedoPage() {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(false);

  const [exiting, setExiting] = useState(false);

  function softNavigate(path: string, state?: any) {
    if (locked) return;

    setLocked(true);
    setExiting(true);

    setTimeout(() => {
      navigate(path, state ? { state } : undefined);
    }, 250);
  }

  function handleRedo() {
    softNavigate("/regulate/ground", { redo: true });
  }

  function handleContinue() {
    softNavigate("/regulate/chat");
  }

  return (
    <div
      className={`p-6 flex flex-col gap-8 min-h-screen text-center ${
        exiting ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      <h1 className="text-xl font-semibold">
        If you still feel unsettled, take another round.
      </h1>

      <div className="flex flex-col gap-5 mt-4">
        {/* PRIMARY ACTION (continue) */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={locked}
          className="w-full bg-black text-white p-4 rounded-xl text-lg active:scale-[0.97] transition disabled:opacity-50"
        >
          I’m ready — continue
        </button>

        {/* SECONDARY ACTION (redo) */}
        <button
          type="button"
          onClick={handleRedo}
          disabled={locked}
          className="w-full bg-gray-100 text-black p-4 rounded-xl text-lg active:scale-[0.97] transition disabled:opacity-50"
        >
          Do another round
        </button>
      </div>
    </div>
  );
}