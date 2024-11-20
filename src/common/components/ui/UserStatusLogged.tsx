'use client';

import { cn } from '~/lib/utils';

interface UserStatusLoggedProps {
	className?: string;
	userStatus: 'online' | 'offline' | 'away' | 'busy';
}

export function UserStatusLogged({
	className,
	userStatus
}: UserStatusLoggedProps) {
	return (
		<div
			className={cn(
				'-right-1 -bottom-1 absolute h-3 w-3 rounded-full border-2 border-white-100',
				userStatus === 'online' && 'bg-secondary-200',
				userStatus === 'offline' && 'bg-secondary-300',
				userStatus === 'away' && 'bg-secondary-300',
				userStatus === 'busy' && 'bg-secondary-100',
				className
			)}
		/>
	);
}
