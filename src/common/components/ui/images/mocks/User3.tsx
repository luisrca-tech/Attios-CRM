import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import User3Image from '/public/images/mocks/users/3.png';

export function User3({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={User3Image}
			alt="User 3"
		/>
	);
}
