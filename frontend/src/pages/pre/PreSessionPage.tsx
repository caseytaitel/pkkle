import { useState } from "react";
import { sessionsApi } from "../../api/sessionsApi";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Textarea";
import { useNavigate } from "react-router-dom";

export default function PreSessionPage() {
  const [intention, setIntention] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sessionsApi.create({
        type: "pre",
        intention,
      });
      navigate("/session/success", { state: { type: "pre"} });
    } catch (err) {
      setError("Failed to save your intention. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Set Your Intention">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Textarea
        autoFocus
        placeholder="What’s your intention for this session?"
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
        required
        />

        {error && <p className="text-red-600">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Intention"}
        </Button>
      </form>
    </Page>
  );
}