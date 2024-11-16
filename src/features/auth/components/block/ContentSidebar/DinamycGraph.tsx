import type { ReactNode } from 'react';

export function DinamycGraph({ children }: { children: ReactNode }) {
	return (
		<div className="mt-2 flex min-w-[20.625rem] max-w-[20.625rem] flex-col rounded-xl bg-white-200 px-[1.4375rem] py-[1.375rem]">
			{children}
		</div>
	);
}
