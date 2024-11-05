import Image from 'next/image';
import GoogleIconImage from '/public/icons/google.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function GoogleIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={GoogleIconImage} alt="Google icon" />
	);
}
