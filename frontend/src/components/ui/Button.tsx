import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: Props) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-lg font-medium transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/40",

        variant === "primary"
          ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.98]"
          : "bg-gray-200 text-gray-900 hover:bg-gray-300 active:scale-[0.98]",

        className
      )}
      {...props}
    />
  );
}