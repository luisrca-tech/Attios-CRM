import Image from 'next/image';
import GarageIconImage from '/public/icons/garage.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function GarageIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={GarageIconImage} alt="Garage icon" />
	);
}
