import Image from "next/image";
import ErrorIconImage from "/public/icons/inputError.png";
import { cn } from "~/lib/utils";
import { IconProps } from "~/common/types/Icons.type";

export function ErrorIcon({ className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={ErrorIconImage}
      alt="Error filled input"
    />
  );
}
