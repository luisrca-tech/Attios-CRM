import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import ProjectsIconImage from '/public/icons/sidebar/projects.svg';

export function ProjectsIcon({ className }: IconProps) {
	return (
		<Image className={cn(className)} src={ProjectsIconImage} alt="Projects" />
	);
}
