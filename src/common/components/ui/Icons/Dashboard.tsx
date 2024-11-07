import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import DashboardIconImage from '/public/icons/sidebar/dashboard.png';

export function DashboardIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={DashboardIconImage} alt="Dashboard" />
	);
}
