import Image from 'next/image';
import AddButtonImageIcon from '/public/icons/addButton.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function AddButtonIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={AddButtonImageIcon}
			alt="Add button"
		/>
	);
}
