import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import LaptopIconImage from '/public/icons/laptop.png';

export function LaptopIcon({ className }: IconProps) {
	return (
		<Image
			className={cn('text-primary-100 ', className)}
			src={LaptopIconImage}
			alt="Laptop"
		/>
	);
}
