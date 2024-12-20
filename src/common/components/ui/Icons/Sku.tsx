import Image from 'next/image';
import SkuIconImage from '/public/icons/sku.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function SkuIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={SkuIconImage}
			alt="Sku icon"
		/>
	);
}
