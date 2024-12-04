import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import User1Image from '/public/images/mocks/users/1.png';
import User2Image from '/public/images/mocks/users/2.png';
import User3Image from '/public/images/mocks/users/3.png';
import User4Image from '/public/images/mocks/users/4.png';

const userImages = {
  1: User1Image,
  2: User2Image,
  3: User3Image,
  4: User4Image,
} as const;

type UserNumber = keyof typeof userImages;

interface UserProps extends IconProps {
  userNumber: UserNumber;
}

export function User({ className, userNumber }: UserProps) {
  return (
    <Image
      className={cn('h-[2.375rem] w-[2.375rem] self-start', className)}
      src={userImages[userNumber]}
      alt={`User ${userNumber}`}
    />
  );
}
