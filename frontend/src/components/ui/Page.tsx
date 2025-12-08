import { useEffect } from "react";
import type { ReactNode } from "react";

interface PageProps {
  title?: string;
  children: ReactNode;
}

export default function Page({ title, children }: PageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen px-6 pt-6 pb-[calc(6rem+var(--safe-bottom))] bg-white animate-fade-in">
      {title && (
        <h1 className="text-2xl mb-4">{title}</h1>
      )}

      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}