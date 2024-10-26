import Image from "next/image";
import OpenPadlockIconImage from "/public/icons/svg/openPadlock.svg";
import { cn } from "~/lib/utils";
import { IconProps } from "~/common/types/Icons.type";

export function OpenPadlockIcon({ className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={OpenPadlockIconImage}
      alt="Open padlock icon"
    />
  );
}
