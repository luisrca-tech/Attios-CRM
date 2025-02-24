"use client";

import Image from "next/image";
import type { IconProps } from "~/common/types/Icons.type";
import { cn } from "~/lib/utils";
import { useUploadThingImage } from "~/common/hooks/useUploadThingImage";

const creatorImageKeys = {
  1: "oOhzVgQXSdmBMWQp9RxERyOD1IHwuXhQlmf2i6pTaUtgx0Br",
  2: "oOhzVgQXSdmBesPCoVRvRBCyhgYxidkrHLGSTv3aJjADU5wO",
  3: "oOhzVgQXSdmBaUSOjKi2PlzsqbJwL7MgFrSQZ5OHK40yfEeW",
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
          "h-9 w-9 animate-pulse bg-gray-200 rounded-full",
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
