import { cn } from '~/lib/utils';

type ListItemCardProps = {
	metricValue: string;
	metricLabel: string;
	className?: string;
};

export function ListItemCard({
	metricValue,
	metricLabel,
	className
}: ListItemCardProps) {
	return (
		<div className="hidden flex-col items-center lg:flex">
			<span
				className={cn('font-normal text-base text-black leading-5', className)}
			>
				{metricValue}
			</span>
			<p className="font-normal text-primary-200 text-sm leading-6">
				{metricLabel}
			</p>
		</div>
	);
}
