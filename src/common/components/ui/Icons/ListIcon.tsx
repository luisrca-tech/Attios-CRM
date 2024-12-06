import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import ListIconWhiteImage from '/public/icons/listWhite.png';
import ListIconBlueImage from '/public/icons/listBlue.png';

export function ListIconWhite({ className }: IconProps) {
	return (
		<Image
			className={cn('text-primary-100 ', className)}
			src={ListIconWhiteImage}
			alt="List"
		/>
	);
}

export function ListIconBlue({ className }: IconProps) {
	return (
		<Image
			className={cn('text-primary-100 ', className)}
			src={ListIconBlueImage}
			alt="List"
		/>
	);
}
