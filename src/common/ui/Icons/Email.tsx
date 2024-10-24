import Image from "next/image";
import EmailIconImage from "/public/icons/email.png";
import { cn } from "~/lib/utils";
import { IconProps } from "~/common/types/Icons.type";

export function EmailIcon({ className }: IconProps) {
  return (
    <Image
      className={cn(className)}
      src={EmailIconImage}
      alt="Error filled input"
    />
  );
}
