import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionsApi } from "../../api/sessionsApi";
import type { Session } from "../../types/Session";
import Page from "../../components/ui/Page";
import { Button } from "../../components/ui/Button";

export default function TodayPage() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await sessionsApi.getToday();
        setSessions(data);
      } catch (err) {
        console.error("Failed to load today's sessions", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  const hasPre = sessions.some((s) => s.type === "pre");
  const hasPost = sessions.some((s) => s.type === "post");

  return (
    <Page title="Today">
      {!hasPre && (
        <Button onClick={() => navigate("/pre")}>
          Start Pre-Session
        </Button>
      )}
  
      {hasPre && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          Pre-session complete ✔
        </div>
      )}
  
      {!hasPost && hasPre && (
        <Button onClick={() => navigate("/post")}>
          Finish Post-Session
        </Button>
      )}
  
      {hasPost && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          Post-session complete ✔
        </div>
      )}
    </Page>
  );
}