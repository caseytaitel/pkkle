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
      <p className="text-[var(--text-secondary)] leading-relaxed">
        What’s coming up for you right now?
        You can write as much or as little as you’d like.
      </p>

      <div className="animate-fade-in delay-100">
        <Textarea
          className="h-40 mt-2"
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