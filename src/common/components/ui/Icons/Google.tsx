import Image from "next/image";
import GoogleIconImage from "/public/icons/google.png";
import { cn } from "~/lib/utils";
import { IconProps } from "~/common/types/Icons.type";

export function GoogleIcon({ className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={GoogleIconImage}
      alt="Error filled input"
    />
  );
}
