import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/ui/Page";
import { Textarea } from "../../components/ui/Textarea";
import { Button } from "../../components/ui/Button";

export default function ChatbotPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  return (
    <Page title="Reflect">
      <div className="text-left w-full mb-1">
        <p className="text-[var(--text-secondary)]">
          Nice work — grounding complete
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[10px] ml-1">
            ✓
          </span>
        </p>
        <p className="text-[var(--text-secondary)]">
          What’s coming up for you right now?
        </p>
      </div>

      <div className="animate-fade-in delay-100">
        <Textarea
          className="h-40"
          autoFocus
          placeholder="Write anything on your mind..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="pt-2">
        <Button className="w-full" onClick={() => navigate("/")}>
          Done
        </Button>
      </div>
    </Page>
  );
}