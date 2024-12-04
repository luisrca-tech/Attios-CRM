import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

type DinamycGraphProps = {
	children: ReactNode;
	className?: string;
};

export function DinamycGraph({ children, className }: DinamycGraphProps) {
	return (
		<div
			className={cn(
				'mt-2 flex min-w-[20.625rem] max-w-[20.625rem] flex-col rounded-xl bg-white-200 px-[1.4375rem] py-[1.375rem]',
				className
			)}
		>
			{children}
		</div>
	);
}
