import Image from 'next/image';
import ArrowDownImage from '/public/icons/arrowDown.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function ArrowDown({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={ArrowDownImage} alt="Arrow down" />
	);
}
