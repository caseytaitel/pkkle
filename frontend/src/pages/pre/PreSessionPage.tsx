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
  const [category, setCategory] = useState<"rec" | "drilling" | "tournament" | null>(null);
  const [intention, setIntention] = useState("");
  const [secondaryIntention, setSecondaryIntention] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Submit handler — kept but NOT fully wired yet
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
  
      navigate("/session/success", { state: { type: "pre" } });
    } catch (err) {
      setError("Failed to save your intention. Try again.");
    } finally {
      setLoading(false);
    }
  }  

  return (
    <Page title="Pre-Session">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 px-4 py-4">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Let’s get centered for today.</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Choose the type of session you’re stepping into.
          </p>
        </div>

        <div>
          <CategorySelector
            value={category}
            onChange={(c) => {
              setCategory(c);
              setError("");
            }}            
          />
        </div>

        <PrimaryIntentionSection
          category={category}
          value={intention}
          onChange={(text) => {
            setIntention(text);
            setError("");
          }}          
        />

        <SecondaryIntentionSection
          category={category}
          value={secondaryIntention}
          onChange={(text) => {
            setSecondaryIntention(text);
            setError("");
          }}
        />

        {error && <p className="text-red-600">{error}</p>}

        <Button
          type="submit"
          disabled={loading || !category || intention.trim().length === 0}
          className="w-full"
        >
          {loading ? "Saving..." : "Set Intention"}
        </Button>

      </form>
    </Page>
  );
}