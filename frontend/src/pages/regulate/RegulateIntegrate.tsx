import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/ui/Page";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";

export default function RegulateIntegratePage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [exiting, setExiting] = useState(false);

  function softNavigate(path: string) {
    setExiting(true);
    setTimeout(() => navigate(path), 250);
  }

  return (
    <Page title="Integrate" exiting={exiting}>
       <p className="text-[var(--text-secondary)] leading-relaxed flex items-center gap-1">
          Regulation complete
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[10px]">
              ✓
          </span>
      </p>
      <div className="mb-3">
        <p className="text-[var(--text-secondary)] leading-relaxed mt-3 mb-1">
          What do you notice right now?
        </p>
      </div>

      <Textarea
        className="h-40"
        placeholder="A word, reminder, or insight…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button className="w-full mt-4" onClick={() => softNavigate("/")}>
        Done
      </Button>
    </Page>
  );
}