import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

interface InputRootProps {
  children: ReactNode;
  fieldText?: string;
  className?: string;
  error?: boolean;
  isValid?: boolean;
}

export function InputRoot({
  fieldText,
  className,
  error,
  isValid,
  children,
}: InputRootProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label className={cn("flex flex-col gap-1", className)}>
      {fieldText && (
        <span className="font-normal text-primary-200 text-sm leading-5">
          {fieldText}
        </span>
      )}
      {children}
      <div
        className={cn(
          "h-[1px] w-full bg-white-400",
          error && "bg-secondary-300",
          isValid && "bg-secondary-200",
        )}
      />
    </label>
  );
}
