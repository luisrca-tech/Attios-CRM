import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import Creator1Image from '/public/images/mocks/creators/productCreator1.png';
import Creator2Image from '/public/images/mocks/creators/productCreator2.png';
import Creator3Image from '/public/images/mocks/creators/productCreator3.png';

const creatorsImages = {
  1: Creator1Image,
  2: Creator2Image,
  3: Creator3Image,
} as const;

type CreatorNumber = keyof typeof creatorsImages;

interface CreatorProps extends IconProps {
  creatorNumber: CreatorNumber;
}

export function Creator({ className, creatorNumber }: CreatorProps) {
  return (
    <Image
      className={cn('h-9 w-9 self-start', className)}
      src={creatorsImages[creatorNumber]}
      alt={`Creator ${creatorNumber}`}
    />
  );
}
