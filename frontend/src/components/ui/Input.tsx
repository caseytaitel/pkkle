import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={clsx(
        "w-full border border-gray-300 rounded-lg px-3 py-2 text-base",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        className
      )}
      {...props}
    />
  );
}