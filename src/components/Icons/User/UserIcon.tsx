import Image from "next/image";
import { cn } from "~/lib/utils";
import UserIconImage from "/public/icons/inputIcon.png";

interface UserIcon {
  className?: string;
}

export function UserIcon({ className }: UserIcon) {
  return (
    <Image className={cn(className)} src={UserIconImage} alt="User Icon" />
  );
}
