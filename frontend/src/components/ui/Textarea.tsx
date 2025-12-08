import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: Props) {
  return (
    <textarea
      className={clsx(
        "border border-gray-300 rounded p-3 text-base w-full",
        "focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black",
        className
      )}
      {...props}
    />
  );
}