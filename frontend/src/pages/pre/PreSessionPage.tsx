import { useState } from "react";
import { sessionsApi } from "../../api/sessionsApi";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";

export default function PreSessionPage() {
  const [intention, setIntention] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sessionsApi.create({
        type: "pre",
        intention,
      });
      window.location.href = "/"; // redirect back
    } catch (err) {
      setError("Failed to save your intention. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Set Your Intention">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="border rounded p-3 text-lg"
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