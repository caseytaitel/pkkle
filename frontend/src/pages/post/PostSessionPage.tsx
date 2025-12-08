import { useState, type FormEvent } from "react";
import { sessionsApi } from "../../api/sessionsApi";
import Page from "../../components/ui/Page";
import { EMOTIONS, type Emotion } from "../../constants/emotions";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Textarea";
import { useNavigate } from "react-router-dom";

export default function PostSessionPage() {
  const [emotion, setEmotion] = useState<Emotion | "">("");
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sessionsApi.create({
        type: "post",
        emotion,
        reflection,
      });

      navigate("/session/success", { state: { type: "post" }});
    } catch (err) {
      setError("Failed to save your reflection. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Post-Session Reflection">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* EMOTION DROPDOWN */}
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">How do you feel?</label>
          <select
            className="border rounded p-3 text-lg bg-white"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value as Emotion)}
            required
          >
            <option value="" disabled>
              Select an emotion…
            </option>
            {EMOTIONS.map((e) => (
              <option key={e} value={e}>
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* REFLECTION */}
        <Textarea
          placeholder="Write your reflection…"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          required
        />

        {error && <p className="text-red-600">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Reflection"}
        </Button>
      </form>
    </Page>
  );
}