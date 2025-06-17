import Image from 'next/image';
import ExpandIconImage from '/public/icons/svg/expand.svg';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function ExpandIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={ExpandIconImage} alt="Expand icon" />
	);
}
