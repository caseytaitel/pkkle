import { useEffect } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";

interface PageProps {
  title?: string;
  children: ReactNode;
  noBottomPadding?: boolean;
  exiting?: boolean;
}

export default function Page({ title, children, noBottomPadding, exiting }: PageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={clsx(
        "min-h-screen px-6 pt-[calc(1rem+var(--safe-top))] bg-white flex flex-col",
        noBottomPadding
          ? "pb-[calc(1rem+var(--safe-bottom))]"
          : "pb-[calc(6rem+var(--safe-bottom))]",
        exiting ? "animate-fade-out" : "animate-fade-in"
      )}
    >
      {title && <h1 className="text-2xl mb-4">{title}</h1>}
      <div className="space-y-6">{children}</div>
    </div>
  );
}