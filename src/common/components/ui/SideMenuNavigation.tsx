'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { menuItems } from '~/common/constants/menuItems';
import useClickOutside from '~/common/hooks/useClickOutside';
import { cn } from '~/lib/utils';
import { CommingSoon } from './CommingSoon';
import { Icon } from './Icons';
import { UserStatusLogged } from './UserStatusLogged';
import Logo from '/public/favicon.svg';

export function SideMenu() {
	const { isLoaded } = useUser();
	const [isExpanded, setIsExpanded] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useClickOutside(menuRef, () => {
		setIsExpanded(false);
	});

	const handleExpand = () => {
		setIsExpanded((prev) => !prev);
	};

	return (
		<div
			ref={menuRef}
			className={cn(
				'hidden border-white-200 border-r bg-white-100 py-5 transition-all duration-300 ease-in-out lg:flex',
				isExpanded ? 'w-44' : 'w-[5.25rem]'
			)}
		>
			<nav className="w-full">
				<ul className="flex min-h-full flex-col items-center justify-around">
					<li className="w-full">
						<button
							type="button"
							onClick={handleExpand}
							className={cn(
								'flex w-full items-center px-4 transition-all duration-300',
								isExpanded ? 'justify-start' : 'justify-center'
							)}
						>
							<div className="relative items-center gap-1">
								{!isExpanded && (
									<Icon.Expand className="-top-6 -left-4 absolute h-3 w-3" />
								)}
								<Image
									src={Logo}
									alt="logo"
									width={30}
									height={30}
									className="mb-4 transition-transform duration-300"
									style={{
										transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
									}}
								/>
							</div>
						</button>
					</li>

					{menuItems.map((item) => (
						<li
							className={cn(
								'relative flex w-full items-center px-4',
								isExpanded ? 'justify-start' : 'justify-center'
							)}
							key={item.label}
						>
							<Link
								aria-disabled={item.isComingSoon}
								href={item.label}
								className={cn(
									'group flex items-center',
									item.isComingSoon && 'pointer-events-none opacity-30',
									isExpanded ? 'w-full' : 'w-12 justify-center'
								)}
							>
								<div
									className={cn(
										'-right-[0.2rem] absolute h-full w-[0.1875rem] scale-y-0 bg-primary-100 transition-transform group-hover:scale-y-100'
									)}
								/>
								<div className="flex items-center gap-2">
									<div
										className={cn(
											'flex h-[1,375rem] w-[1,375rem] items-center'
										)}
									>
										{item.icon}
									</div>
									{isExpanded && (
										<span className="flex-1 font-bold text-black text-sm">
											{item.isComingSoon ? (
												<CommingSoon
													className="min-w-max rounded-xl"
													message="Coming Soon"
												/>
											) : (
												item.label
											)}
										</span>
									)}
								</div>
							</Link>
						</li>
					))}

					<li className="relative mt-4">
						<UserButton
							appearance={{
								elements: {
									avatarBox: `${isExpanded ? 'h-10 w-10 ' : 'h-[1,375rem] w-[1,375rem]'} rounded-xl`
								}
							}}
						/>
						<UserStatusLogged
							className="-right-1 bottom-1"
							isOnline={isLoaded}
						/>
					</li>
				</ul>
			</nav>
		</div>
	);
}
