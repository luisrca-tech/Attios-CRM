import Image from 'next/image';
import ArrowLeftImage from '/public/icons/arrowLeft.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function ArrowLeft({ className }: IconProps) {
	return (
		<Image
			className={cn('h-3 w-3', className)}
			src={ArrowLeftImage}
			alt="Arrow left"
		/>
	);
}
