'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, useState } from 'react';
import { cn } from '~/lib/utils';
import { ContentSidebarHeader } from './ContentSidebarHeader';

type ContentSidebarRootProps = {
	children: ReactNode;
	className?: string;
	hasHeader?: boolean;
};

export function ContentSidebarRoot({
	children,
	className,
	hasHeader = true
}: ContentSidebarRootProps) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div
			className={cn(
				'relative hidden max-h-screen min-h-screen flex-col border-white-200 px-7 py-6 transition-[border] duration-300 lg:flex',
				className,
				isOpen ? 'border-r' : 'border-none'
			)}
		>
			{hasHeader && (
				<ContentSidebarHeader
					isOpen={isOpen}
					onToggleSidebar={setIsOpen}
				/>
			)}
			<div
				className={cn(
					'absolute top-20 right-0 left-0 h-[1px] w-full bg-white-200 transition-opacity duration-300',
					!hasHeader && 'hidden'
				)}
			/>
			<div
				className={cn(
					'flex flex-1 flex-col justify-between overflow-y-auto transition-[transform,opacity] duration-300 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
					isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[-10px] opacity-0'
				)}
			>
				{children}
			</div>
		</div>
	);
}
