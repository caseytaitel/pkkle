import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { SessionType } from "../../types/Session";
import Page from "../../components/ui/Page";

export default function SessionSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { type?: SessionType } | null) ?? {};
  const type: SessionType = state.type === "post" ? "post" : "pre";

  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => navigate("/"), 250);
    }, 1200); // success page display time

    return () => clearTimeout(timer);
  }, [navigate]);

  const title = type === "pre" ? "Intention set." : "Reflection complete.";

  const subtitle =
    type === "pre"
      ? "You’re clear on your focus today."
      : "You’ve brought this to a close.";

  return (
    <Page exiting={exiting}>
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 mt-6">
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