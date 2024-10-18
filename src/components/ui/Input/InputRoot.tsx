import type { ReactNode } from "react"
import { cn } from "~/lib/utils";

interface InputRootProps {
  children: ReactNode
  fieldText?: string
  className?: string
  error?: boolean
}

export function InputRoot({ fieldText, className, error, children }: InputRootProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {fieldText && (
        <span className="font-normal text-primary-200 text-sm leading-5">
          {fieldText}
        </span>
      )}
      {children}
      <div className={cn("mt-2 h-[1px] w-full bg-white-400", error && 'bg-secondary-300')} />
    </div>
  );
}