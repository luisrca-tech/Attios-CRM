import type { ReactNode } from 'react';

export function ContentSidebarCard({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-w-[20.625rem] max-w-[20.625rem] items-center justify-between self-start rounded-xl bg-white-200 px-[1.375rem] py-4">
			{children}
		</div>
	);
}
