import { useEffect, useState } from "react";
import Page from "../../components/ui/Page";
import { getAllPostSessions } from "../../api/memoryApi";
import type { Session } from "../../types/Session";

export default function HistoryPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    async function load() {
      const posts = await getAllPostSessions();
      setSessions(posts);
    }
    load();
  }, []);

  return (
    <Page title="Recent Notes">
      <div className="flex flex-col gap-6 px-4 pt-4 pb-32">
        {sessions.map((session) => (
          <SessionRow key={session.id} session={session} />
        ))}
      </div>
    </Page>
  );
}

function SessionRow({ session }: { session: Session }) {
  const date = new Date(session.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border-b border-gray-200 pb-4">
      <p className="text-xs text-gray-500 mb-1">{date}</p>

      <div className="text-sm text-gray-800">
        <p className="capitalize text-gray-600 mb-1">
          {session.emotion}
        </p>
        <ExpandableText text={session.reflection ?? ""} />
      </div>
    </div>
  );
}

function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate = text.length > 120;
  const displayText =
    !expanded && shouldTruncate ? text.slice(0, 120) + "…" : text;

  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      className="text-left text-sm text-gray-800"
    >
      {displayText}
    </button>
  );
}