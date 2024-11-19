import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import ProductsIconImage from '/public/icons/sidebar/products.png';

export function ProductsIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={ProductsIconImage} alt="Products" />
	);
}
