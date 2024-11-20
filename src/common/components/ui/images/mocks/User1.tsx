import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import User1Image from '/public/images/mocks/users/1.png';

export function User1({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={User1Image}
			alt="User 1"
		/>
	);
}
