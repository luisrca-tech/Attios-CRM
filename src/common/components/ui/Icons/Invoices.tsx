import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import InvoicesIconImage from '/public/icons/sidebar/invoices.png';

export function InvoicesIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={InvoicesIconImage} alt="Invoices" />
	);
}
