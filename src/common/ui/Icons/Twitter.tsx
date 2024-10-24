import Image from "next/image";
import TwitterIconImage from "/public/icons/twitter.png";
import { cn } from "~/lib/utils";
import { IconProps } from "~/common/types/Icons.type";

export function TwitterIcon({ className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={TwitterIconImage}
      alt="Error filled input"
    />
  );
}
