import React, { type ReactNode } from "react";
import { cn } from "~/lib/utils";

interface InputText {
  className?: string;
  renderIconLeft?: () => ReactNode;
  renderIconRight?: () => ReactNode;
}

const InputText = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputText
>(({ renderIconLeft, renderIconRight, className, ...rest }, ref) => {
  return (
    <div className="relative">
      {renderIconLeft && <div className="absolute top-2">{renderIconLeft()}</div>}
      <input
        className={cn(
          "h-full w-full border-none font-bold text-black text-sm leading-5 outline-none placeholder:text-primary-200",
          className
        )}
        ref={ref}
        {...rest}
      />
      {renderIconRight && <div className="absolute top-2 right-0">{renderIconRight()}</div>}
    </div>
  );
});

export default InputText;
