import Image from "next/image";
import { IconProps } from "~/common/types/Icons.type";
import { cn } from "~/lib/utils";
import UserIconImage from "/public/icons/inputIcon.png";

export function UserIcon({ className }: IconProps) {
  return (
    <Image className={cn(className)} src={UserIconImage} alt="User Icon" />
  );
}
