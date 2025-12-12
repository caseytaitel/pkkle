import { useState, type FormEvent } from "react";
import { sessionsApi } from "../../api/sessionsApi";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";
import { CategorySelector } from "../../components/pre/CategorySelector";
import { PrimaryIntentionSection } from "../../components/pre/PrimaryIntentionSection";
import { SecondaryIntentionSection } from "../../components/pre/SecondaryIntentionSection";
import { useNavigate } from "react-router-dom";

export default function PreSessionPage() {
  const navigate = useNavigate();

  const [category, setCategory] =
    useState<"rec" | "drilling" | "tournament" | null>(null);

  const [intention, setIntention] = useState("");
  const [secondaryIntention, setSecondaryIntention] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [exiting, setExiting] = useState(false);

  function navigateWithFade(path: string, state?: unknown) {
    setExiting(true);
    setTimeout(() => navigate(path, { state }), 250);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

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
      setError("Couldn't save. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Pre-Session" noBottomPadding exiting={exiting}>
      {/* FORM CONTENT */}
      <form
        id="pre-session-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 px-4 pb-40"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Set Your Intention</h1>
        </div>

        {/* Category Selector */}
        <div className="mt-1">
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
          className="w-full"
        >
          {loading
            ? "Saving..."
            : secondaryIntention.trim().length > 0
              ? "Set Intentions"
              : "Set Intention"}
        </Button>
      </div>
    </Page>
  );
}