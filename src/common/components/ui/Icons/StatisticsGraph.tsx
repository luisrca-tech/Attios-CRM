import Image from 'next/image';
import StatisticsGraphIconImage from '/public/icons/statisticsGraph.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function StatisticsGraphIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={StatisticsGraphIconImage}
			alt="Statistics graph icon"
		/>
	);
}
