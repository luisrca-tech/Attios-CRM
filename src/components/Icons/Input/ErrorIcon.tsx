import Image from "next/image";
import ErrorIconImage from "/public/icons/inputError.png";
import { cn } from "~/lib/utils";

interface ErrorIcon {
  className?: string;
}

export function ErrorIcon({ className }: ErrorIcon) {
  return (
    <Image
      className={cn(className)}
      src={ErrorIconImage}
      alt="Error filled input"
    />
  );
}
