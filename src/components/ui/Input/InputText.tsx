import React, { type ReactNode } from "react";
import { cn } from "~/lib/utils";

interface InputText {
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const InputText = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputText
>(({ iconLeft, iconRight, className, ...rest }, ref) => {
  return (
    <div className="relative">
      {iconLeft && <div className="absolute top-2">{iconLeft}</div>}
      <input
        className={cn(
          "h-full w-full border-none font-bold text-black text-sm leading-5 outline-none placeholder:text-primary-200",
          className
        )}
        ref={ref}
        {...rest}
      />
      {iconRight && <div className="absolute top-2 right-0">{iconRight}</div>}
    </div>
  );
});

export default InputText;
