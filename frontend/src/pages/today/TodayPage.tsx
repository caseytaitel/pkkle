import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sessionsApi } from "../../api/sessionsApi";
import type { Session } from "../../types/Session";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";
import clsx from "clsx";

export default function TodayPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [justCompleted, setJustCompleted] =
    useState<"pre" | "post" | null>(null);

  const [exiting, setExiting] = useState(false);

  function navigateWithFade(path: string) {
    setExiting(true);
    setTimeout(() => navigate(path), 250);
  }

  // detect completion banner
  useEffect(() => {
    if (location.state?.justCompleted) {
      setJustCompleted(location.state.justCompleted);
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  // load today's sessions
  useEffect(() => {
    async function load() {
      try {
        const data = await sessionsApi.getToday();
        setSessions(data);
      } catch (err) {
        console.error("Couldn't load today's sessions. Please try again.", err);
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

  // CASE 1 — no sessions yet
  if (!hasPre && !hasPost) {
    return (
      <Page title="Today" exiting={exiting}>
        <div className="pt-28 text-center">
          <div className="space-y-2">
            <p className="text-[var(--text-primary)] text-lg font-medium">
              A fresh day. A fresh session.
            </p>

            <p className="text-[var(--text-secondary)] text-base">
              Set your intention and step into play with clarity.
            </p>
          </div>

          <Button
            className="w-full mt-7"
            onClick={() => navigateWithFade("/pre")}
          >
            Start Pre-Session
          </Button>
        </div>
      </Page>
    );
  }

  // CASE 2 — normal state
  return (
    <Page title="Today" exiting={exiting}>
      <div className="pt-28 space-y-6">
        {!hasPre && (
          <Button className="w-full" onClick={() => navigateWithFade("/pre")}>
            Start Pre-Session
          </Button>
        )}

        {hasPre && (
          <div
            className={clsx(
              "rounded-xl p-4 bg-green-50 border border-green-100 text-green-800 shadow-sm",
              justCompleted === "pre" && "animate-subtle-pop"
            )}
          >
            <p className="font-medium inline-flex items-center gap-1 text-green-800">
              Pre-session complete
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[10px]">
                ✓
              </span>
            </p>
          </div>
        )}

        {!hasPost && hasPre && (
          <Button
            className="w-full"
            onClick={() => navigateWithFade("/post")}
          >
            Finish Post-Session
          </Button>
        )}

        {hasPost && (
          <div
            className={clsx(
              "rounded-xl p-4 bg-green-50 border border-green-100 text-green-800 shadow-sm",
              justCompleted === "post" && "animate-subtle-pop"
            )}
          >
            <p className="font-semibold">All done for today 🙌</p>
            <p className="text-sm mt-1 text-green-700">
              Come back tomorrow to log a new session.
            </p>
          </div>
        )}
      </div>
    </Page>
  );
}