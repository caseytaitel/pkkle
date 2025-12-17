import { useState, type FormEvent, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sessionsApi } from "../../api/sessionsApi";
import { getLastPreSession } from "../../api/memoryApi";
import type { SessionType } from "../../types/Session";

import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";
import { CategorySelector } from "../../components/pre/CategorySelector";
import { PrimaryIntentionSection } from "../../components/pre/PrimaryIntentionSection";
import { SecondaryIntentionSection } from "../../components/pre/SecondaryIntentionSection";
import { ContinuityCard } from "../../components/pre/ContinuityCard";

type Category = "rec" | "drilling" | "tournament";

export default function PreSessionPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category | null>(null);
  const [intention, setIntention] = useState("");
  const [secondaryIntention, setSecondaryIntention] = useState("");

  const [entryMode, setEntryMode] = useState<"continuity" | "full">("full");

  const [lastSession, setLastSession] = useState<{
    category?: Category;
    intention: string;
    secondaryIntention?: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const pendingTimerRef = useRef<number | null>(null);

  const [error, setError] = useState("");
  const [exiting, setExiting] = useState(false);

  function navigateWithFade(path: string, state?: unknown) {
    setExiting(true);
    setTimeout(() => navigate(path, { state }), 250);
  }

  /* Defensive guard: if Pre already exists today, silently redirect */
  useEffect(() => {
    sessionsApi
      .getToday()
      .then((today) => {
        if (today.some((s) => s.type === "pre")) {
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        /* fail silent by design */
      });
  }, [navigate]);

  /* Entry-only memory read */
  useEffect(() => {
    getLastPreSession().then((session) => {
      if (!session?.intention) return;

      setLastSession({
        intention: session.intention,
        ...(session.secondaryIntention && {
          secondaryIntention: session.secondaryIntention,
        }),
        ...(session.category && {
          category: session.category as Category,
        }),
      });

      setEntryMode("continuity");
    });
  }, []);

  function handleUseLastIntention() {
    if (!lastSession) return;

    setCategory(lastSession.category ?? null);
    setIntention(lastSession.intention);
    setSecondaryIntention(lastSession.secondaryIntention ?? "");

    setEntryMode("full");
    setError("");
  }

  function handleChangeIntention() {
    setEntryMode("full");
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
        type: "pre" as SessionType,
        ...(category && { category }),
        intention,
        ...(secondaryIntention.trim().length > 0 && {
          secondaryIntention: secondaryIntention.trim(),
        }),
      });

      navigateWithFade("/session/success", { state: { type: "pre" } });
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
    <Page title="Pre-Session" noBottomPadding exiting={exiting}>
      <form
        id="pre-session-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 px-4 pb-40"
      >
        {/* Continuity-only entry */}
        {entryMode === "continuity" && lastSession && (
          <ContinuityCard
            intention={lastSession.intention}
            onUse={handleUseLastIntention}
            onChange={handleChangeIntention}
          />
        )}

        {/* Full Pre-Session flow */}
        {entryMode === "full" && (
          <>
            <div>
              <h2 className="text-base font-medium text-[var(--text-primary)]">
                Set Your Intention
              </h2>
            </div>

            <CategorySelector
              value={category}
              onChange={(c) => {
                setCategory(c);
                setError("");
              }}
            />

            <PrimaryIntentionSection
              category={category}
              value={intention}
              onChange={(t) => {
                setIntention(t);
                setError("");
              }}
            />

            <SecondaryIntentionSection
              category={category}
              value={secondaryIntention}
              onChange={(t) => {
                setSecondaryIntention(t);
                setError("");
              }}
            />

            {error && <p className="text-red-600">{error}</p>}
          </>
        )}
      </form>

      {/* Sticky CTA */}
      {entryMode === "full" && (
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
      )}
    </Page>
  );
}