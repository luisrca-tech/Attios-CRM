import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import SearchIconImage from '/public/icons/search.png';

export function SearchIcon({ className }: IconProps) {
	return <Image className={cn(className)} src={SearchIconImage} alt="Search" />;
}
