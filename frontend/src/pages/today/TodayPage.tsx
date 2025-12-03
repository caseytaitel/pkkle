import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sessionsApi } from "../../api/sessionsApi";
import type { Session } from "../../types/Session";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";

export default function TodayPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [justCompleted, setJustCompleted] = useState<"pre" | "post" | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.justCompleted) {
      setJustCompleted(location.state.justCompleted);
      // clear state so refresh doesn't retrigger
      window.history.replaceState({}, "");
    }
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const data = await sessionsApi.getToday();
        setSessions(data);
      } catch (err) {
        console.error("Failed to load today’s sessions", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    );
  }  

  const hasPre = sessions.some((s) => s.type === "pre");
  const hasPost = sessions.some((s) => s.type === "post");

  // Friendly Empty State
  if (!hasPre && !hasPost) {
    return (
      <Page title="Today">
        <div className="space-y-6 text-center pt-4">
          <p className="text-gray-600 text-lg">
            A fresh day. A fresh session.
          </p>
          <p className="text-gray-500">
            Set your intention and step into today with clarity.
          </p>

          <Button
            className="w-full mt-4"
            onClick={() => navigate("/pre")}
          >
            Start Your First Pre-Session
          </Button>
        </div>
      </Page>
    );
  }

  // Default Flow
  return (
    <Page title="Today">
      <div className="space-y-4">

        {!hasPre && (
          <Button onClick={() => navigate("/pre")}>
            Start Pre-Session
          </Button>
        )}

        {hasPre && (
          <div
            className={
              "p-4 bg-green-100 text-green-800 rounded-lg " +
              (justCompleted === "pre" ? "animate-subtle-pop" : "")
            }
          >
            Pre-session complete ✔
          </div>
                  
        )}

        {!hasPost && hasPre && (
          <Button onClick={() => navigate("/post")}>
            Finish Post-Session
          </Button>
        )}

        {hasPost && (
          <div
            className={
              `p-4 bg-green-100 text-green-800 rounded-lg ${
                justCompleted === "post" ? "animate-subtle-pop" : ""
              }`
            }
          >
            <p className="text-green-800 font-medium">All done for today 🙌</p>
            <p className="text-green-700 text-sm mt-1">
              Come back tomorrow to log a new session.
            </p>
          </div>
        )}

      </div>
    </Page>
  );
}