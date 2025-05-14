'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { menuItems } from '~/common/constants/menuItems';
import { cn } from '~/lib/utils';
import { CommingSoon } from './CommingSoon';
import { UserStatusLogged } from './UserStatusLogged';
import Logo from '/public/favicon.svg';
import { LinkButton } from './Button';

export function SideMenu() {
	const { isLoaded, user } = useUser();
	const [isHovered, setIsHovered] = useState(false);
	const pathname = usePathname();

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div
			className={cn(
				'hidden max-h-screen min-h-screen border-white-200 border-r bg-white-100 py-5 transition-all duration-300 ease-in-out hover:w-60 lg:flex',
				isHovered ? 'w-60' : 'w-[5.25rem]'
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<nav className="w-full">
				<ul className="flex min-h-full flex-col items-center justify-around">
					<li className="w-full">
						<LinkButton
							href="/"
							className="flex w-full items-center justify-center bg-transparent px-4 pb-5 transition-all duration-300 hover:bg-transparent"
						>
							<div className="flex gap-3">
								<Image src={Logo} alt="logo" width={30} height={30} />
								{isHovered && (
									<strong className="text-primary-100 text-xl">Attios</strong>
								)}
							</div>
						</LinkButton>
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
								href={`/${item.label}`}
								className={cn(
									'group flex items-center',
									item.isComingSoon && 'pointer-events-none opacity-30',
									isHovered ? 'w-full' : 'justify-center p-2',
									pathname === `/${item.label}` && 'rounded bg-primary-200/10',
									pathname === `/${item.label}` &&
										isHovered &&
										'rounded bg-primary-100/10'
								)}
							>
								<div
									className={cn(
										'-right-[0.2rem] absolute h-full w-[0.1875rem] scale-y-0 bg-primary-100 transition-transform group-hover:scale-y-100',
										pathname === `/${item.label}` ? 'scale-y-100' : 'scale-y-0'
									)}
								/>
								<div
									className={cn(
										'flex items-center justify-center',
										isHovered && 'flex w-full items-center p-3 hover:rounded',
										pathname === `/${item.label}` &&
											'rounded-lg bg-primary-200/10'
									)}
								>
									<div className="flex h-[1,375rem] w-[1,375rem] items-center">
										{item.icon(
											pathname === `/${item.label}` ? '#5E81F4' : '#8181A5'
										)}
									</div>
									{isHovered && (
										<span className="flex-1 text-center font-bold text-black text-sm capitalize leading-5">
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
								isHovered && 'justify-start gap-2'
							)}
						>
							{/* TODO: Create a component for the user button */}
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
								<strong className="text-sm leading-5 transition-all delay-500 duration-300">
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
