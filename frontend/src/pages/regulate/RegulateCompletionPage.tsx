import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";

export default function RegulateCompletionPage() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  function navigateWithFade(path: string) {
    setExiting(true);
    setTimeout(() => navigate(path), 250);
  }

  return (
    <Page exiting={exiting}>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-10 px-6">
        <p className="text-base text-[var(--text-secondary)] flex items-center gap-2">
          Regulation complete
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[10px]">
            ✓
          </span>
        </p>

        <div className="w-full flex flex-col gap-4">
          {/* Primary */}
          <Button onClick={() => navigateWithFade("/")}>
            Return to Today
          </Button>

          {/* Secondary */}
          <button
            type="button"
            onClick={() => navigateWithFade("/regulate/integrate")}
            className="text-sm text-gray-600 underline underline-offset-4"
          >
            Integrate
          </button>
        </div>
      </div>
    </Page>
  );
}