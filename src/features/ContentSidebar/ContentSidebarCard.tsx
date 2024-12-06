import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

type ContentSidebarCardProps = {
	children: ReactNode;
	className?: string;
};

export function ContentSidebarCard({
	children,
	className
}: ContentSidebarCardProps) {
	return (
		<div
			className={cn(
				'flex min-w-[20.625rem] max-w-[20.625rem] items-center justify-between self-start rounded-xl bg-white-200 px-[1.375rem] py-4',
				className
			)}
		>
			{children}
		</div>
	);
}
