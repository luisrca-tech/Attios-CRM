import Image from 'next/image';
import NotFoundImg from '/public/images/notFound.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function NotFoundImage({ className }: IconProps) {
	return <Image className={cn(className)} src={NotFoundImg} alt="Not found" />;
}
