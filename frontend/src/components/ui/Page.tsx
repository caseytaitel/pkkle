import type { ReactNode } from "react";

interface PageProps {
  title?: string;
  children: ReactNode;
}

export default function Page({ title, children }: PageProps) {
  return (
    <div className="min-h-screen px-6 py-8 space-y-6">
      {title && (
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}