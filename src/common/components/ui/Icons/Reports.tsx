import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import ReportsIconImage from '/public/icons/sidebar/reports.svg';

export function ReportsIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={ReportsIconImage} alt="Reports" />
	);
}
