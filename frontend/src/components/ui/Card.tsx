import type { ReactNode } from "react";
import clsx from "clsx";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "p-5 rounded-xl bg-white shadow-sm border border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
}