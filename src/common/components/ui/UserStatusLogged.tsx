'use client';

import { cn } from "~/lib/utils";

interface UserStatusLoggedProps {
	className?: string;
	isOnline?: boolean;
	isOffline?: boolean;
}

export function UserStatusLogged({
	className,
	isOnline,
	isOffline,
}: UserStatusLoggedProps) {
	return (
		<div
			className={cn(
				'-right-1 -bottom-1 absolute h-3 w-3 rounded-full border-2 border-white-100',
				isOnline && 'bg-secondary-200',
				isOffline && 'bg-secondary-300',
				className
			)}
		/>
	);
}
