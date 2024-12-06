import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import GridIconImage from '/public/icons/grid.png';

export function GridIcon({ className }: IconProps) {
	return (
		<Image
			className={cn('text-primary-100 ', className)}
			src={GridIconImage}
			alt="Grid"
		/>
	);
}
