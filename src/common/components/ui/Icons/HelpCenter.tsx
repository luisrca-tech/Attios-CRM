import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import HelpCenterIconImage from '/public/icons/sidebar/helpCenter.png';

export function HelpCenterIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={HelpCenterIconImage}
			alt="Help center"
		/>
	);
}
