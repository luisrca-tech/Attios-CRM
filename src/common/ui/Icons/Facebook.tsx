import Image from "next/image";
import FacebookIconImage from "/public/icons/facebook.png";
import { cn } from "~/lib/utils";
import { IconProps } from "~/common/types/Icons.type";

export function FacebookIcon({ className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={FacebookIconImage}
      alt="Error filled input"
    />
  );
}