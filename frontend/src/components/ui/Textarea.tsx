import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import { useRef } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function autoResize(e: React.FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <textarea
      ref={ref}
      rows={1}
      onInput={autoResize}
      className={clsx(
        "border border-gray-300 rounded p-3 text-base w-full",
        "resize-none overflow-hidden",
        "focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black",
        className
      )}
      {...props}
    />
  );
}