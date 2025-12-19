// CURRENTLY UNUSED //

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Textarea";

export default function RegulateIntegratePage() {
  const navigate = useNavigate();
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");

  const [exiting, setExiting] = useState(false);

  function softNavigate(path: string) {
    setExiting(true);
    setTimeout(() => navigate(path), 250);
  }

  return (
    <Page title="Integrate" exiting={exiting}>
      <div className="flex flex-col gap-6">
        {/* Step 1 — Recognition */}
        <p className="text-sm text-[var(--text-secondary)]">
          Regulation complete.
        </p>

        {/* Step 2 — Interpretation (process-level only) */}
        <p className="text-sm text-[var(--text-secondary)]">
          Regulation creates a small pause in the nervous system, allowing things to
          settle on their own.
        </p>

        {/* Step 3 — Somatic tie-in */}
        <p className="text-sm text-[var(--text-secondary)]">
          You might notice that pause in your body — or you might not. Either is fine.
        </p>

        {/* Step 4 — Optional expression */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowNote((v) => !v)}
            className="text-sm text-gray-600 underline underline-offset-4"
          >
            Add a note
          </button>

          {showNote && (
            <div className="mt-3">
              <Textarea
                className="h-32 text-sm"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      <Button className="w-full mt-4" onClick={() => softNavigate("/")}>
        Done
      </Button>
    </Page>
  );
}