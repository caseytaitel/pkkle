import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";
import { sessionsApi } from "../../api/sessionsApi";

const STATE_ECHO_KEY = "hasCompletedRegulation";

export default function RegulateCompletionPage() {
  const navigate = useNavigate();

  const [showBeginSession, setShowBeginSession] = useState(false);
  const [showStateEcho, setShowStateEcho] = useState(false);

  // On mount:
  // 1) record that regulation was completed (for future state echo)
  // 2) decide whether "Begin session" should be shown
  useEffect(() => {
    localStorage.setItem(STATE_ECHO_KEY, "true");
    setShowStateEcho(true);

    async function checkPreSession() {
      try {
        const today = await sessionsApi.getToday();
        const hasPre = today.some((s) => s.type === "pre");
        setShowBeginSession(!hasPre);
      } catch {
        // fail-silent by design
        setShowBeginSession(false);
      }
    }

    checkPreSession();
  }, []);

  return (
    <Page title="Regulation Complete">
      <div className="pt-24 flex flex-col gap-8 text-center">
        {/* Completion acknowledgment */}
        <p className="text-lg text-[var(--text-primary)]">
          This state is available to you.
        </p>

        {/* State echo (non-evaluative) */}
        {showStateEcho && (
          <p className="text-sm text-[var(--text-secondary)]">
            You’ve accessed this state before.
          </p>
        )}

        {/* Exit options */}
        <div className="flex flex-col gap-4 mt-6">
          {/* Primary */}
          <Button onClick={() => navigate("/")}>
            Return to Today
          </Button>

          {/* Optional integrate */}
          <button
            type="button"
            onClick={() => navigate("/regulate/integrate")}
            className="text-sm text-gray-600 underline underline-offset-4"
          >
            Integrate
          </button>

          {/* Contextual begin session */}
          {showBeginSession && (
            <button
              type="button"
              onClick={() => navigate("/pre")}
              className="text-sm text-gray-600 underline underline-offset-4"
            >
              Begin session
            </button>
          )}
        </div>
      </div>
    </Page>
  );
}