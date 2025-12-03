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
      <p className="text-gray-700 leading-relaxed mb-2">
        What’s coming up for you right now?
        You can write as much or as little as you’d like.
      </p>

      <Textarea
        className="h-40"
        autoFocus
        placeholder="Write anything on your mind..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button onClick={() => navigate("/")}>
        Done
      </Button>
    </Page>
  );
}