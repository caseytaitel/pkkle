import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: Props) {
  return (
    <textarea
      className={clsx(
        "border border-gray-300 rounded p-3 text-lg w-full",
        "focus:ring-black/20 focus:border-black",
        "text-[var(--text-primary)]",
        className
      )}
      {...props}
    />
  );
}