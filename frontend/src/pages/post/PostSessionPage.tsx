import { useState, type FormEvent, useRef } from "react";
import { sessionsApi } from "../../api/sessionsApi";
import Page from "../../components/ui/Page";
import { EMOTIONS, type Emotion } from "../../constants/emotions";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Textarea";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export default function PostSessionPage() {
  const [emotion, setEmotion] = useState<Emotion | "">("");
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const pendingTimerRef = useRef<number | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  function navigateWithFade(path: string, state?: unknown) {
    setExiting(true);
    setTimeout(() => navigate(path, { state }), 250);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    pendingTimerRef.current = window.setTimeout(() => {
      setShowPending(true);
    }, 300);

    try {
      await sessionsApi.create({
        type: "post",
        emotion,
        reflection,
      });

      navigateWithFade("/session/success", { state: { type: "post" } });
    } catch (err) {
      setError("Couldn't save. Please try again.");
    } finally {
      if (pendingTimerRef.current) {
        clearTimeout(pendingTimerRef.current);
      }
      setShowPending(false);
      setLoading(false);
    }
  }

  return (
    <Page title="Post-Session Reflection" exiting={exiting}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Emotion + Reflection group */}
        <div className="flex flex-col gap-4">
          {/* Emotion dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-[var(--text-primary)]">
              How was today's play?
            </label>

            <div className="relative">
              <select
                className={clsx(
                  "w-full border rounded-lg bg-white",
                  "py-2.5 pl-3 pr-12",
                  "text-sm appearance-none",
                  emotion === ""
                    ? "text-gray-400"
                    : "text-black",
                  "focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
                )}
                value={emotion}
                onChange={(e) => setEmotion(e.target.value as Emotion)}
                required
              >
                <option value="" disabled>
                  Select an emotion…
                </option>
                {EMOTIONS.map((e) => (
                  <option key={e} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </select>

              {/* Custom arrow */}
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                ▾
              </span>
            </div>
          </div>

          {/* Reflection */}
          <Textarea
            placeholder="What stood out to you?"
            className="text-sm placeholder:text-gray-400"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            required
          />
        </div>
  
        {error && <p className="text-red-600">{error}</p>}
  
        <Button
          type="submit"
          disabled={loading}
          className={showPending ? "opacity-80" : ""}
        >
          Save Reflection
        </Button>
      </form>
    </Page>
  );  
}