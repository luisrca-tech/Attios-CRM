import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import MoreActionsIconImage from '/public/icons/moreActions.png';

export function MoreActionsIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={MoreActionsIconImage}
			alt="More Actions"
		/>
	);
}
