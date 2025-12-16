import { useState, type FormEvent, useRef, useEffect } from "react";
import { sessionsApi } from "../../api/sessionsApi";
import { getLastPreSession } from "../../api/memoryApi";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";
import { CategorySelector } from "../../components/pre/CategorySelector";
import { PrimaryIntentionSection } from "../../components/pre/PrimaryIntentionSection";
import { SecondaryIntentionSection } from "../../components/pre/SecondaryIntentionSection";
import { ContinuityCard } from "../../components/pre/ContinuityCard";
import { useNavigate } from "react-router-dom";

export default function PreSessionPage() {
  const navigate = useNavigate();

  const [category, setCategory] =
    useState<"rec" | "drilling" | "tournament" | null>(null);

  const [intention, setIntention] = useState("");
  const [secondaryIntention, setSecondaryIntention] = useState("");

  const [lastIntention, setLastIntention] = useState<{
    intention: string;
    secondaryIntention?: string;
  } | null>(null);

  const [showContinuity, setShowContinuity] = useState(true);

  const [loading, setLoading] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const pendingTimerRef = useRef<number | null>(null);

  const [error, setError] = useState("");
  const [exiting, setExiting] = useState(false);

  function navigateWithFade(path: string, state?: unknown) {
    setExiting(true);
    setTimeout(() => navigate(path, { state }), 250);
  }

  useEffect(() => {
    sessionsApi.getToday().then((today) => {
      const hasPreToday = today.some((s) => s.type === "pre");
      if (hasPreToday) {
        navigate("/", { replace: true });
      }
    });
  }, []);  

  // ENTRY-ONLY memory read
  useEffect(() => {
    getLastPreSession().then((session) => {
      if (!session?.intention) return;

      setLastIntention({
        intention: session.intention,
        ...(session.secondaryIntention && {
          secondaryIntention: session.secondaryIntention,
        }),
      });
    });
  }, []);

  function handleUseLastIntention() {
    if (!lastIntention) return;

    setIntention(lastIntention.intention);
    setSecondaryIntention(lastIntention.secondaryIntention ?? "");
    setShowContinuity(false);
    setError("");
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
        type: "pre",
        intention,
        ...(secondaryIntention.trim().length > 0 && {
          secondaryIntention: secondaryIntention.trim(),
        }),
      });

      navigateWithFade("/session/success", { state: { type: "pre" } });
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
    <Page title="Pre-Session" noBottomPadding exiting={exiting}>
      <form
        id="pre-session-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 px-4 pb-40"
      >
        {/* Continuity */}
        {lastIntention && showContinuity && (
          <ContinuityCard
            intention={lastIntention.intention}
            onUse={handleUseLastIntention}
            onChange={() => setShowContinuity(false)}
          />
        )}

        {/* Subheading */}
        <div className="mt-0">
          <h2 className="text-base font-medium text-[var(--text-primary)]">
            Set Your Intention
          </h2>
        </div>

        {/* Category Selector */}
        <div className="mt-2">
          <CategorySelector
            value={category}
            onChange={(c) => {
              setCategory(c);
              setError("");
            }}
          />
        </div>

        {/* Primary Intentions */}
        <PrimaryIntentionSection
          category={category}
          value={intention}
          onChange={(t) => {
            setIntention(t);
            setError("");
          }}
        />

        {/* Secondary Intentions */}
        <SecondaryIntentionSection
          category={category}
          value={secondaryIntention}
          onChange={(t) => {
            setSecondaryIntention(t);
            setError("");
          }}
        />

        {error && <p className="text-red-600">{error}</p>}
      </form>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+1rem)] bg-white/90 backdrop-blur-sm shadow-lg">
        <Button
          type="submit"
          form="pre-session-form"
          disabled={loading || !category || intention.trim().length === 0}
          className={`w-full ${showPending ? "opacity-80" : ""}`}
        >
          {secondaryIntention.trim().length > 0
            ? "Set Intentions"
            : "Set Intention"}
        </Button>
      </div>
    </Page>
  );
}