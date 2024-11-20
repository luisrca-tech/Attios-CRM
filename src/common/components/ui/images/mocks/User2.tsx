import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import User2Image from '/public/images/mocks/users/2.png';

export function User2({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={User2Image}
			alt="User 2"
		/>
	);
}
