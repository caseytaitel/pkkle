import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/ui/Page";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";

export default function RegulateChatPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const [exiting, setExiting] = useState(false);

  function softNavigate(path: string) {
    setExiting(true);
    setTimeout(() => navigate(path), 250);
  }

  return (
    <Page title="Reflect" exiting={exiting}>
      <div>
        <p className="text-[var(--text-secondary)] leading-relaxed flex items-center gap-1">
          Nice work. Regulation complete
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[10px]">
            ✓
          </span>
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed mt-3 mb-1">
          What do you notice right now?
        </p>
      </div>

      <Textarea
        className="h-40 mt-1"
        autoFocus
        placeholder="A thought, feeling, or something you want to carry forward..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button className="w-full" onClick={() => softNavigate("/")}>
        Done
      </Button>
    </Page>
  );
}