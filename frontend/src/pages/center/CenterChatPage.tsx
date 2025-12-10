import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/ui/Page";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";

export default function CenterChatPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  return (
    <Page title="Reflect">
      <div>
        <p className="text-[var(--text-secondary)] leading-relaxed flex items-center gap-1">
          Nice work — grounding complete
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[10px]">
            ✓
          </span>
        </p>

        <p className="text-[var(--text-secondary)] leading-relaxed mt-3 mb-1">
          What’s coming up for you right now?
        </p>
      </div>

      <Textarea
        className="h-40 mt-1"
        autoFocus
        placeholder="Write anything on your mind..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button className="w-full" onClick={() => navigate("/")}>
        Done
      </Button>
    </Page>
  );
}