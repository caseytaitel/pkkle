import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: Props) {
  return (
    <button
      className={clsx(
        "px-4 py-3 rounded-xl font-medium transition",
        "active:scale-[0.97] duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",

        variant === "primary"
          ? "bg-black text-white hover:bg-black/90"
          : "bg-gray-100 text-[var(--text-primary)] hover:bg-gray-200",

        className
      )}
      {...props}
    />
  );
}