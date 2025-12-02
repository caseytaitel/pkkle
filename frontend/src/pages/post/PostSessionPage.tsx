import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionsApi } from "../../api/sessionsApi";

export default function PostSessionPage() {
  const navigate = useNavigate();

  const [emotion, setEmotion] = useState("");
  const [reflection, setReflection] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emotions = [
    "Calm",
    "Confident",
    "Excited",
    "Anxious",
    "Frustrated",
    "Neutral",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sessionsApi.create({
        type: "post",
        emotion,
        reflection,
      });

      navigate("/");
    } catch (err) {
      setError("Failed to save post-session.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">How Did It Go?</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-sm font-medium">Emotion</label>
        <select
          className="border rounded p-3 text-lg"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
          required
        >
          <option value="">Select one...</option>
          {emotions.map((emo) => (
            <option key={emo} value={emo}>
              {emo}
            </option>
          ))}
        </select>

        <textarea
          className="border rounded p-3 text-lg"
          placeholder="Write a quick reflection..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          required
        />

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white rounded p-3 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Save Reflection"}
        </button>
      </form>
    </div>
  );
}