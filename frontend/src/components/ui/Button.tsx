import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: Props) {
  return (
    <button
      className={clsx(
        "w-full px-4 py-3 rounded-lg font-medium transition active:scale-[0.98]",
        variant === "primary"
          ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
          : "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-200",
        className
      )}
      {...props}
    />
  );
}