import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";

export default function RegulatePage() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  function navigateWithFade(path: string) {
    setExiting(true);
    setTimeout(() => navigate(path), 250);
  }

  return (
    <Page title="Regulate" exiting={exiting}>
      <div className="pt-20 flex flex-col gap-4 text-center">
        <p className="text-base font-medium text-[var(--text-primary)]">
          Take a moment to shift modes and gain clarity.
        </p>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
          A few breaths can help you access a steadier state.
        </p>

        <Button
          className="w-full mt-6"
          onClick={() => navigateWithFade("/regulate/ground")}
        >
          Start Regulating
        </Button>
      </div>
    </Page>
  );
}