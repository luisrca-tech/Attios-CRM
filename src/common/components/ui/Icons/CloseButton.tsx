import Image from 'next/image';
import CloseButtonImage from '/public/icons/closeButton.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function CloseButton({ className }: IconProps) {
	return (
		<Image
			className={cn('h-4 w-4', className)}
			src={CloseButtonImage}
			alt="Close button"
		/>
	);
}
