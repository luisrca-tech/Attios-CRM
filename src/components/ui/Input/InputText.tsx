import Image, { type StaticImageData } from "next/image";
import React from "react";

import { cn } from "~/lib/utils";

interface InputText {
  className?: string;
  iconLeft?: StaticImageData;
  iconRight?: StaticImageData;
}

const InputText = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputText
>(({ iconLeft, iconRight, className, ...rest }, ref) => {
  return (
    <div className="relative">
      {iconLeft && <Image className="absolute top-2" src={iconLeft} alt="" />}
      <input
        className={cn(
          "h-full w-full border-none font-bold text-black text-sm leading-5 outline-none placeholder:text-primary-200",
          className
        )}
        ref={ref}
        {...rest}
      />
      {iconRight && <Image className="absolute top-2 right-0" src={iconRight} alt="" />}
    </div>
  );
});

export default InputText;
