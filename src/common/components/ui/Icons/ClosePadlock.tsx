import Image from "next/image";
import ClosePadlockIconImage from "/public/icons/svg/closePadlock.svg";
import { cn } from "~/lib/utils";
import { IconProps } from "~/common/types/Icons.type";

export function ClosePadlockIcon({ className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={ClosePadlockIconImage}
      alt="Close padlock icon"
    />
  );
}
