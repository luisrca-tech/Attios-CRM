import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import User4Image from '/public/images/mocks/users/4.png';

export function User4({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={User4Image}
			alt="User 4"
		/>
	);
}
