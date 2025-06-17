import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import StarRatingIconImage from '/public/icons/starRating.png';

export function StarRatingIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={StarRatingIconImage}
			alt="Star Rating"
		/>
	);
}
