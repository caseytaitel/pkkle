import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={clsx(
        "w-full border border-gray-300 rounded-lg px-3 py-2 text-base",
        "focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black",
        className
      )}
      {...props}
    />
  );
}