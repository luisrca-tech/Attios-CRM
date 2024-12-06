type MetricProps = {
	metric: string;
	value: string;
};

export function Metric({ metric, value }: MetricProps) {
	return (
		<div className="flex flex-col items-center">
			<strong className="text-base leading-6">{value}</strong>
			<span className="font-normal text-primary-200 text-sm leading-5">
				{metric}
			</span>
		</div>
	);
}
