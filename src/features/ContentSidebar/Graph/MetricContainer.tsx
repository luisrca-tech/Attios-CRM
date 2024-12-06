import { cn } from '~/lib/utils';

type MetricContainerProps = {
	leftMetric: React.ReactNode;
	rightMetric: React.ReactNode;
	className?: string;
};

export function MetricContainer({
	leftMetric,
	rightMetric,
	className
}: MetricContainerProps) {
	return (
		<div className={cn('flex w-full border-white-400 border-t', className)}>
			<div className="flex flex-1 items-center justify-center border-white-400 border-r py-4">
				{leftMetric}
			</div>
			<div className="flex flex-1 items-center justify-center py-4">
				{rightMetric}
			</div>
		</div>
	);
}
