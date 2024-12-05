import Image from 'next/image';
import ArrowRightImage from '/public/icons/arrowRight.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function ArrowRight({ className }: IconProps) {
	return (
		<Image
			className={cn('h-3 w-3', className)}
			src={ArrowRightImage}
			alt="Arrow right"
		/>
	);
}
