import { cn } from '~/lib/utils';

type Props = {
	className?: string;
	message: string;
};

export function CommingSoon({ message, className }: Props) {
	return (
		<div
			className={cn(
				'ml-auto inline-flex items-center rounded-full border bg-white-100 px-2.5 py-0.5 font-bold text-black text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
				className
			)}
		>
			<span>{message}</span>
		</div>
	);
}
