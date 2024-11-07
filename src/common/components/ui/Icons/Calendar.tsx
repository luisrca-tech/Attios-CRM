import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import CalendarIconImage from '/public/icons/sidebar/calendar.png';

export function CalendarIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={CalendarIconImage} alt="Calendar" />
	);
}
