import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons/_index';
import { api } from '~/trpc/react';
import { DashboardFilterButton } from './DashboardFilterButton';

type TimeFrame = 'day' | 'week' | 'month';

interface DashboardFiltersActionProps {
	selectedTimeFrame?: TimeFrame;
	onTimeFrameChange: (value: TimeFrame | null) => void;
}

export function DashboardFiltersAction({
	selectedTimeFrame,
	onTimeFrameChange
}: DashboardFiltersActionProps) {
	const utils = api.useUtils();

	const handleTimeFrameClick = async (timeFrame: TimeFrame) => {
		onTimeFrameChange(timeFrame === selectedTimeFrame ? null : timeFrame);
		await utils.orders.getOrdersPaginated.invalidate();
		await utils.orders.getTotalPages.invalidate();
	};

	return (
		<div className="flex flex-col justify-between gap-[1.125rem] rounded-t-lg bg-white-300 md:flex-row md:items-center md:bg-white-100 lg:gap-0 lg:px-6 lg:pt-5 lg:pb-7">
			<strong className="text-black text-lg leading-7">Latest Sales</strong>
			<div className="flex items-center justify-between gap-2">
				<DashboardFilterButton
					selectedTimeFrame={selectedTimeFrame}
					handleTimeFrameClick={handleTimeFrameClick}
					title="Day"
				/>
				<DashboardFilterButton
					selectedTimeFrame={selectedTimeFrame}
					handleTimeFrameClick={handleTimeFrameClick}
					title="Week"
				/>
				<DashboardFilterButton
					selectedTimeFrame={selectedTimeFrame}
					handleTimeFrameClick={handleTimeFrameClick}
					title="Month"
				/>
				<Button className="h-10 w-10 p-0" color="secondary" variant="filled">
					<Icon.Sidebar.Calendar className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
