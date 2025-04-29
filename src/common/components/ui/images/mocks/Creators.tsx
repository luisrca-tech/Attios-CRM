"use client";

import Image from "next/image";
import type { IconProps } from "~/common/types/Icons.type";
import { cn } from "~/lib/utils";
import { useUploadThingImage } from "~/common/hooks/useUploadThingImage";

const creatorImageKeys = {
  1: "oOhzVgQXSdmBF9IIfv1s7T3wLUWezZIfSB1jc5PpldO6KDMt",
  2: "oOhzVgQXSdmBo377rD1QXSdmB8x06WOevrluy5ipZFH3QfDa",
  3: "oOhzVgQXSdmB9elNt8z8ONTink6zM9Q7pxdCtoYHJZ2aAlh4",
} as const;

type CreatorNumber = keyof typeof creatorImageKeys;

interface CreatorProps extends IconProps {
  creatorNumber: CreatorNumber;
}

export function Creator({ className, creatorNumber }: CreatorProps) {
  const { imageUrl, isLoading } = useUploadThingImage(
    creatorImageKeys[creatorNumber]
  );

  if (isLoading || !imageUrl) {
    return (
      <div
        className={cn(
          "h-9 w-9 animate-pulse rounded-full bg-gray-200",
          className
        )}
      />
    );
  }

  return (
    <Image
      className={cn("h-9 w-9", className)}
      src={imageUrl}
      alt={`Creator ${creatorNumber}`}
      width={36}
      height={36}
    />
  );
}
