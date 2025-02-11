'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '~/common/components/ui/sheet';
import { menuItems } from '~/common/constants/menuItems';
import { cn } from '~/lib/utils';
import { Button } from './Button';
import { CommingSoon } from './CommingSoon';
import { Icon } from './Icons/_index';
import { UserStatusLogged } from './UserStatusLogged';
import { usePathname } from 'next/navigation';
import { AddActionMenu } from './AddActionMenu';

export function BottomMenu() {
	const { user, isLoaded } = useUser();
	const userImage = user?.imageUrl;
	const userName = user?.fullName;
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const mainItemsMenu = menuItems.slice(0, 4);
	const remainingItemsMenu = menuItems.slice(6);

	const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(
		<Icon.Menu className="text-primary-200" />
	);

	return (
		<div className="fixed right-0 bottom-0 left-0 z-10 flex h-[11.5lvh] w-full items-center justify-between border-white-200 border-t bg-white-100 px-2 py-[0.875rem] lg:hidden">
			<nav className={cn('flex w-full', isOpen && 'hidden')}>
				<ul className="flex w-full items-center justify-around">
					<li>
						<UserButton
							appearance={{
								elements: {
									avatarBox: 'h-[1,375rem] w-[1,375rem]'
								}
							}}
						/>
					</li>
					{mainItemsMenu.map((item) => (
						<li
							className="relative flex h-12 w-12 items-center justify-center"
							key={item.label}
						>
							<Link
								aria-disabled={item.isComingSoon}
								href={`/${item.label}`}
								className={cn(
									'group flex h-full w-full items-center justify-center',
									item.isComingSoon && 'pointer-events-none opacity-50'
								)}
							>
								<div
									className={cn(
										'-top-[1.125rem] absolute h-[2px] w-full bg-primary-100 transition-transform',
										pathname === `/${item.label}`
											? 'scale-x-100'
											: 'scale-x-0 group-hover:scale-x-100'
									)}
								/>
								<div
									className={cn(
										'relative flex h-full w-full items-center justify-center rounded',
										pathname === `/${item.label}`
											? 'bg-primary-200/10'
											: 'hover:bg-primary-200/10'
									)}
								>
									{item.isComingSoon && (
										<CommingSoon
											message="Soon"
											className="absolute rotate-45 bg-primary-200/10 px-1.5 py-0 text-[0.625rem] text-black"
										/>
									)}
									{item.icon(
										pathname === `/${item.label}` ? '#5E81F4' : '#8181A5'
									)}
								</div>
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger className="group relative flex h-12 w-12 items-center justify-center hover:bg-primary-200/10 hover:outline-none">
					<div className="-top-[1.125rem] absolute h-[2px] w-full scale-x-0 bg-primary-100 transition-transform group-hover:scale-x-100" />
					<div className="flex h-full w-full items-center justify-center rounded hover:bg-primary-200/10">
						{selectedIcon}
					</div>
				</SheetTrigger>
				<SheetContent
					side="bottom"
					className="flex h-full flex-col overflow-y-scroll bg-white-300 pb-3"
				>
					<SheetClose />
					<SheetHeader className="bg-white-100">
						<Button
							variant="outlined"
							color="secondary"
							className="h-10 w-10 border-0 bg-primary-200/10 px-0 hover:bg-primary-200/70"
						>
							<Icon.Search />
						</Button>
						<SheetTitle>Navigation</SheetTitle>
						<AddActionMenu />
					</SheetHeader>
					<div className="mt-[3.625rem] flex flex-col items-center justify-center">
						<div className="mb-[2.3125rem] flex flex-col items-center justify-center">
							<div className="relative">
								<Image
									src={userImage || '/default-avatar.png'}
									alt="user"
									width={94}
									height={94}
									className="rounded-xl"
								/>
								<UserStatusLogged
									userStatus={`${isLoaded ? 'online' : 'offline'}`}
								/>
							</div>
							<span className="font-bold text-2xl text-black leading-[2.375rem]">
								{userName}
							</span>
						</div>
						<nav className="w-full pb-2">
							<ul className="w-full">
								{remainingItemsMenu.map((item) => (
									<li key={item.label} className="w-full px-3 pb-1">
										<SheetClose asChild>
											<Link
												aria-disabled={item.isComingSoon}
												href={`/${item.label}`}
												className={cn(
													'group relative flex items-center gap-7 rounded-[0.625rem] bg-white-100 px-7 py-6 hover:bg-white-200',
													item.isComingSoon && 'pointer-events-none opacity-50'
												)}
												onClick={() =>
													!item.isComingSoon &&
													setSelectedIcon(item.icon('#8181A5'))
												}
											>
												{item.icon('#8181A5')}
												<span className="font-bold text-primary-200/80 text-sm leading-5">
													{item.label}
												</span>
												{item.isComingSoon && (
													<CommingSoon
														message="Coming soon"
														className="absolute right-2"
													/>
												)}
											</Link>
										</SheetClose>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
