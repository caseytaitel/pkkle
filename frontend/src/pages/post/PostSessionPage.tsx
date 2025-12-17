import { useState, type FormEvent, useRef, useEffect } from "react";
import { sessionsApi } from "../../api/sessionsApi";
import { getTodaysPreSession, getAllPostSessions } from "../../api/memoryApi";
import Page from "../../components/ui/Page";
import { EMOTIONS, type Emotion } from "../../constants/emotions";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Textarea";
import clsx from "clsx";

export default function PostSessionPage() {
  const [emotion, setEmotion] = useState<Emotion | "">("");
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const pendingTimerRef = useRef<number | null>(null);
  const [error, setError] = useState("");
  const [exiting, setExiting] = useState(false);

  const [todaysIntention, setTodaysIntention] = useState<string | null>(null);

  // Inline history state
  const [showNotes, setShowNotes] = useState(false);
  const [pastPosts, setPastPosts] = useState<any[]>([]);

  // ENTRY-ONLY memory read (fail-silent)
  useEffect(() => {
    getTodaysPreSession().then((pre) => {
      if (pre?.intention) {
        setTodaysIntention(pre.intention);
      }
    });
  }, []);

  async function toggleNotes() {
    if (!showNotes && pastPosts.length === 0) {
      const posts = await getAllPostSessions();
      setPastPosts(posts);
    }
    setShowNotes((v) => !v);
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

      setExiting(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 250);
    } catch {
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
        {todaysIntention && (
          <p className="text-sm text-gray-600">
            Today’s intention: {todaysIntention}
          </p>
        )}

        <div className="flex flex-col gap-4">
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
                  emotion === "" ? "text-gray-400" : "text-black",
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

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                ▾
              </span>
            </div>
          </div>

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

        {/* Inline History Toggle */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={toggleNotes}
            className="text-sm text-gray-500 underline underline-offset-4"
          >
            Recent notes
          </button>
        </div>

        {/* Inline History Panel */}
        {showNotes && (
          <div className="mt-4 border-t pt-4 flex flex-col gap-4">
            {pastPosts.map((p) => (
              <div key={p.id} className="text-sm text-gray-800">
                <p className="text-xs text-gray-500 mb-1">
                  {new Date(p.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="capitalize text-gray-600 mb-1">
                  {p.emotion}
                </p>
                <p className="text-gray-800">{p.reflection}</p>
              </div>
            ))}
          </div>
        )}
      </form>
    </Page>
  );
}