import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import KanbanIconImage from '/public/icons/sidebar/kanban.png';

export function KanbanIcon({ className }: IconProps) {
	return <Image className={cn(className)} src={KanbanIconImage} alt="Kanban" />;
}
