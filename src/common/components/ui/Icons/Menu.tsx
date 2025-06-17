import Image from 'next/image';
import MenuIconImage from '/public/icons/menu.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function MenuIcon({ className }: IconProps) {
	return <Image className={cn(className)} src={MenuIconImage} alt="Menu" />;
}
