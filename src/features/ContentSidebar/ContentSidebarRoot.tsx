'use client';

import { useAtom } from 'jotai';
import { type ReactNode } from 'react';
import { isOpenContentSidebar } from '~/common/atoms/content-sidebar.atom';
import { cn } from '~/lib/utils';
import { ContentSidebarHeader } from './ContentSidebarHeader';

type ContentSidebarRootProps = {
	children: ReactNode;
	className?: string;
	hasHeader?: boolean;
	headerTitle?: string;
	headerDescription?: string;
};

export function ContentSidebarRoot({
	children,
	className,
	hasHeader = true,
	headerTitle,
	headerDescription
}: ContentSidebarRootProps) {
	const [isOpen, setIsOpen] = useAtom(isOpenContentSidebar);

	return (
		<div
			className={cn(
				'relative hidden max-h-screen min-h-screen max-w-[24.1875rem] flex-col border-white-200 px-7 py-6 lg:flex',
				className,
				!isOpen && 'lg:hidden'
			)}
		>
			{hasHeader && (
				<ContentSidebarHeader
					isOpen={isOpen}
					onToggleSidebar={setIsOpen}
					title={headerTitle}
					description={headerDescription}
				/>
			)}
			<div
				className={cn(
					'absolute top-20 right-0 left-0 h-[1px] w-full bg-white-200',
					!hasHeader && 'hidden'
				)}
			/>
			<div
				className=
					'flex flex-1 flex-col justify-between overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'	
			>
				{children}
			</div>
		</div>
	);
}
