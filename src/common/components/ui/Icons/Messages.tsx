import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import MessagesIconImage from '/public/icons/sidebar/messages.svg';

export function MessagesIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={MessagesIconImage} alt="Messages" />
	);
}
