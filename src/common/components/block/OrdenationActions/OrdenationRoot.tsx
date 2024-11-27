import { cn } from '~/lib/utils';

type OrdenationRootProps = {
	children: React.ReactNode;
	className?: string;
};

export function OrdenationRoot({ children, className }: OrdenationRootProps) {
	return (
		<div
			className={cn(
				'hidden w-full items-center justify-between bg-white-200 p-4 lg:grid',
				className
			)}
		>
			{children}
		</div>
	);
}
