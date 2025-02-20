import { Button } from '~/common/components/ui/Button';

type TimeFrame = 'day' | 'week' | 'month';

interface DashboardFilterButtonProps {
	selectedTimeFrame?: TimeFrame;
	handleTimeFrameClick: (timeFrame: TimeFrame) => void;
	title: string;
}

export function DashboardFilterButton({
	selectedTimeFrame,
	handleTimeFrameClick,
	title
}: DashboardFilterButtonProps) {
	const timeFrame = title.toLowerCase() as TimeFrame;

	return (
		<Button
			className={`h-10 w-20 ${
				selectedTimeFrame === timeFrame
					? 'border border-white-400 bg-white-100 text-black'
					: 'bg-transparent text-primary-200'
			} p-0 hover:bg-white-100 lg:w-16 lg:hover:border lg:hover:border-white-400 lg:hover:bg-transparent`}
			color="secondary"
			variant="filled"
			onClick={() => handleTimeFrameClick(timeFrame)}
		>
			<span
				className={`font-bold ${
					selectedTimeFrame === timeFrame ? 'text-white' : 'text-primary-200'
				} text-sm leading-5 hover:text-black`}
			>
				{title}
			</span>
		</Button>
	);
}
