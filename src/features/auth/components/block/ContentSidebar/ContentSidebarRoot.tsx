'use client';

import { type ReactNode, useState } from 'react';
import { cn } from '~/lib/utils';
import { ContentSidebarHeader } from './ContentSidebarHeader';

export function ContentSidebarRoot({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div
			className={cn(
				'relative flex max-h-screen min-h-screen flex-col overflow-hidden border-white-200 px-7 py-6 transition-[border] duration-300',
				isOpen ? 'border-r' : 'border-none'
			)}
		>
			<ContentSidebarHeader isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="absolute top-20 right-0 left-0 h-[1px] w-full bg-white-200 transition-opacity duration-300" />
			<div
				className={cn(
					'flex flex-1 flex-col justify-between transition-[transform,opacity] duration-300',
					isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[-10px] opacity-0'
				)}
			>
				{children}
			</div>
		</div>
	);
}
