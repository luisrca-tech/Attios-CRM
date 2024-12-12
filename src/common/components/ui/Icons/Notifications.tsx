import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import NotificationsIconImage from '/public/icons/sidebar/notifications.svg';

export function NotificationsIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={NotificationsIconImage}
			alt="Notifications"
		/>
	);
}
