import Image from "next/image";
import PasswordIconImage from "/public/icons/password.png";
import { cn } from "~/lib/utils";
import { IconProps } from "~/common/types/Icons.type";

export function PasswordIcon({ className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={PasswordIconImage}
      alt="Error filled input"
    />
  );
}
