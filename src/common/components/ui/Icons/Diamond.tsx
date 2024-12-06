import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import DiamondIconImage from '/public/icons/diamond.png';

export function DiamondIcon({ className }: IconProps) {
	return (
		<Image
			className={cn('text-primary-100 ', className)}
			src={DiamondIconImage}
			alt="Diamond"
		/>
	);
}
