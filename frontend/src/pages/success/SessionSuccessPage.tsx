import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../../components/ui/Page";

type SuccessType = "pre" | "post";

export default function SessionSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { type?: SuccessType } | null) ?? {};
  const type: SuccessType = state.type === "post" ? "post" : "pre";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate]);

  const title =
    type === "pre" ? "Intention saved" : "Reflection saved";

  const subtitle =
    type === "pre"
      ? "You’re grounded and ready to play."
      : "You’ve captured this session. Nice work.";

  return (
    <Page>
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-success-pop">
          <span className="text-3xl">✔</span>
        </div>

        <h1 className="text-xl font-semibold tracking-tight">
          {title}
        </h1>

        <p className="text-gray-600 text-center px-6">
          {subtitle}
        </p>
      </div>
    </Page>
  );
}