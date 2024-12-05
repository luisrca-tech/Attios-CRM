import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import TrowelIconImage from '/public/icons/trowel.png';

export function TrowelIcon({ className }: IconProps) {
	return <Image className={cn(className)} src={TrowelIconImage} alt="Trowel" />;
}
