'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { menuItems } from '~/common/constants/menuItems';
import { cn } from '~/lib/utils';
import { CommingSoon } from './CommingSoon';
import { UserStatusLogged } from './UserStatusLogged';
import Logo from '/public/favicon.svg';

export function SideMenu() {
	const { isLoaded, user } = useUser();
	const [isHovered, setIsHovered] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={menuRef}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={cn(
				'hidden max-h-screen min-h-screen border-white-200 border-r bg-white-100 py-5 transition-all duration-300 ease-in-out lg:flex',
				isHovered ? 'w-60' : 'w-[5.25rem]'
			)}
		>
			<nav className="w-full overflow-hidden">
				<ul className="flex min-h-full flex-col items-center justify-around">
					<li className="w-full">
						<div
							className={cn(
								'flex w-full items-center px-4 transition-all duration-300',
								isHovered ? 'justify-start' : 'justify-center'
							)}
						>
							<div className="relative items-center gap-1">
								<div className='flex gap-2'>
									<Image
										src={Logo}
										alt="logo"
										width={30}
										height={30}
									/>
									{isHovered && <strong className='text-xl text-primary-100'>Attios CRM</strong>}
								</div>
							</div>
						</div>
					</li>

					{menuItems.map((item) => (
						<li
							className={cn(
								'relative flex w-full items-center px-4',
								isHovered ? 'justify-start' : 'justify-center'
							)}
							key={item.label}
						>
							<Link
								aria-disabled={item.isComingSoon}
								href={item.label}
								className={cn(
									'group flex items-center',
									item.isComingSoon && 'pointer-events-none opacity-30',
									isHovered ? 'w-full' : 'w-12 justify-center'
								)}
							>
								<div
									className={cn(
										'-right-[0.2rem] absolute h-full w-[0.1875rem] scale-y-0 bg-primary-100 transition-transform group-hover:scale-y-100'
									)}
								/>
								<div className={cn('flex items-center justify-center', 
									isHovered && 'flex items-center w-full hover:bg-primary-100 hover:rounded p-3'
								)}>
									<div
										className={cn(
											'flex h-[1,375rem] w-[1,375rem] items-center'
										)}
									>
										{item.icon}
									</div>
									{isHovered && (
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
								isHovered && 'gap-2 justify-start'
							)}
						>
							<div className="relative">
								<UserButton
									appearance={{
										elements: {
											avatarBox: cn(
												'h-[1.875rem] w-[1.875rem] rounded-xl',
												isHovered && 'h-10 w-10'
											)
										}
									}}
								/>
								<UserStatusLogged
									className="-right-1 bottom-[1px]"
									userStatus={`${isLoaded ? 'online' : 'offline'}`}
								/>
							</div>
							{isHovered && user && (
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
