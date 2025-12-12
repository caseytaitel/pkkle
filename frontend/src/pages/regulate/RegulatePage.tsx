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
      <div className="pt-20 flex flex-col gap-8 text-center">

        <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
          Take a moment to regulate your nervous system.
          <br />
          A few breaths can help you settle in and play your game.
        </p>

        <Button
          className="w-full"
          onClick={() => navigateWithFade("/regulate/ground")}
        >
          Start Regulating
        </Button>

      </div>
    </Page>
  );
}