import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import TasksIconImage from '/public/icons/sidebar/tasks.svg';

export function TasksIcon({ className }: IconProps) {
	return <Image className={cn(className)} src={TasksIconImage} alt="Tasks" />;
}
