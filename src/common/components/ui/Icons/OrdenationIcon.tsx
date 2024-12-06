import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import OrdenationIconImage from '/public/icons/ordenation.png';

export function OrdenationIcon({ className }: IconProps) {
	return (
		<Image
			className={cn('h-4 w-4 text-primary-100', className)}
			src={OrdenationIconImage}
			alt="Ordenation"
		/>
	);
}
