import { useNavigate } from "react-router-dom";

export default function SOSPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">SOS Reset</h1>

      <p className="text-gray-600 text-lg">
        Feeling overwhelmed?
        Start a quick grounding exercise to reset your mind.
      </p>

      <button
        onClick={() => navigate("/sos/ground")}
        className="w-full bg-red-600 text-white p-4 rounded-lg text-lg"
      >
        Start Grounding Tool
      </button>
    </div>
  );
}