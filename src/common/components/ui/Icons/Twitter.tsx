import Image from 'next/image';
import TwitterIconImage from '/public/icons/twitter.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function TwitterIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={TwitterIconImage}
			alt="Twitter icon"
		/>
	);
}
