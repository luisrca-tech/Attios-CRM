'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { menuItems } from '~/common/constants/menuItems';
import useClickOutside from '~/common/hooks/useClickOutside';
import { cn } from '~/lib/utils';
import { CommingSoon } from './CommingSoon';
import { Icon } from './Icons/_index';
import { UserStatusLogged } from './UserStatusLogged';
import Logo from '/public/favicon.svg';

export function SideMenu() {
	const { isLoaded, user } = useUser();
	const [isExpanded, setIsExpanded] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

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
				'hidden max-h-screen min-h-screen border-white-200 border-r bg-white-100 py-5 transition-all duration-300 ease-in-out lg:flex',
				isExpanded ? 'w-60' : 'w-[5.25rem]'
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
								<div className='flex gap-2'>
								<Image
									src={Logo}
									alt="logo"
									width={30}
									height={30}
								/>
								{isExpanded && <strong className='text-xl text-primary-100'>Attios CRM</strong>}
								</div>
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
									isExpanded ? 'w-full' : 'p-2 justify-center',
									pathname === `/${item.label}` && 'bg-primary-200/10 rounded',
									pathname === `/${item.label}` && isExpanded && 'bg-primary-100 rounded'
								)}
							>
								<div
									className={cn(
										'-right-[0.2rem] absolute h-full w-[0.1875rem] scale-y-0 bg-primary-100 transition-transform group-hover:scale-y-100',
										pathname === `/${item.label}` ? 'scale-y-100' : 'scale-y-0'
									)}
								/>
								<div className={cn('flex items-center justify-center', 
									isExpanded && 'flex items-center w-full hover:rounded p-3',
									pathname === `/${item.label}` && 'bg-primary-200/10 rounded-lg'
								)}>
									<div
										className=
											'flex h-[1,375rem] w-[1,375rem] items-center'
									>
										{item.icon(pathname === `/${item.label}` ? '#5E81F4' : '#8181A5')}
									</div>
									{isExpanded && (
										<span className="flex-1 font-bold leading-5 text-black text-sm capitalize text-center">
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

					<li className="mt-4 w-full px-4">
						<div
							className={cn(
								'flex items-center justify-center',
								isExpanded && 'gap-2 justify-start'
							)}
						>
							{/* TODO: Create a component for the user button */}
							<div className="relative">
								<UserButton
									appearance={{
										elements: {
											avatarBox: cn(
												'h-[1.875rem] w-[1.875rem] rounded-xl',
												isExpanded && 'h-10 w-10'
											)
										}
									}}
								/>
								<UserStatusLogged
									className="-right-1 bottom-[1px]"
									userStatus={`${isLoaded ? 'online' : 'offline'}`}
								/>
							</div>
							{isExpanded && user && (
								<strong className="text-sm leading-5 transition-all duration-300 delay-500">
									{user.fullName}
								</strong>
							)}
						</div>
					</li>
				</ul>
			</nav>
		</div>
	);
}
