import Image from 'next/image';
import GraphIconImage from '/public/icons/graph.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function GraphIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={GraphIconImage} alt="Graph icon" />
	);
}
