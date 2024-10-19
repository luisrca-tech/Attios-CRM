import Image from "next/image";
import ArrowDownImage from "/public/icons/arrowDown.png";
import { cn } from "~/lib/utils";

interface ArrowDown {
  className?: string;
}

export function ArrowDown({ className }: ArrowDown) {
  return (
    <Image className={cn(className)} src={ArrowDownImage} alt="Arrow down" />
  );
}
