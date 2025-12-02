import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatbotPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  return (
    <div className="p-6 flex flex-col gap-6 min-h-screen">
      <h1 className="text-2xl font-semibold">Reflection</h1>

      <textarea
        className="border rounded p-3 text-lg flex-1"
        placeholder="Write anything on your mind..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white p-4 rounded-lg text-lg"
      >
        Done
      </button>
    </div>
  );
}