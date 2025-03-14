'use client';

import { useAtom } from 'jotai';
import { isOpenContentSidebar } from '~/common/atoms/content-sidebar.atom';
import { AddActionMenu } from './AddActionMenu';
import { Button } from './Button';
import { Icon } from './Icons/_index';
import type { ReactNode } from 'react';

type PagesHeaderProps = {
	title: string;
	iconLeft?: ReactNode;
	onClickIconLeft?: () => void;
	children?: ReactNode;
};

export function PagesHeader({
	title,
	iconLeft,
	onClickIconLeft,
	children
}: PagesHeaderProps) {
	const [, setIsShowingContentSidebar] = useAtom(isOpenContentSidebar);

	const toggleContentSidebar = () => {
		setIsShowingContentSidebar((prev) => !prev);
	};

	return (
		<header className="w-full border-white-200 border-b bg-white-100 p-4 lg:bg-white-300 lg:py-6">
			<div className="flex w-full items-center justify-between lg:hidden">
				<Button
					onClick={onClickIconLeft}
					className="h-10 w-10 p-0 hover:bg-white-200/60"
					color="secondary"
				>
					{iconLeft}
				</Button>
				<strong>{title}</strong>
				{children}
			</div>
			<div className="hidden lg:flex lg:w-full lg:items-center lg:justify-between">
				<div className="flex items-center gap-5">
					<Button
						onClick={toggleContentSidebar}
						className="bg-primary-200/10 p-[0.625rem] hover:bg-primary-200/50"
						color="secondary"
					>
						<Icon.Menu className="h-4 w-4" />
					</Button>
					<strong className="text-xl leading-8">{title}</strong>
				</div>
				<div className="flex gap-[0.375rem]">
					<Button
						className="bg-white-500 p-3 hover:bg-white-200"
						color="secondary"
					>
						<Icon.Search className="h-4 w-4" />
					</Button>
					<AddActionMenu />
				</div>
			</div>
		</header>
	);
}
