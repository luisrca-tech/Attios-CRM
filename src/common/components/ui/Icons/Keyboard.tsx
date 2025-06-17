import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import KeyboardIconImage from '/public/icons/keyboard.png';

export function KeyboardIcon({ className }: IconProps) {
	return (
		<Image
			className={cn('text-primary-100 ', className)}
			src={KeyboardIconImage}
			alt="Keyboard"
		/>
	);
}
