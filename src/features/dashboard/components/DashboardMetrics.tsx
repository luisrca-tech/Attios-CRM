import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '~/common/components/ui/carousel';
import { dashboardMetricItems } from '../mocks/dashboardMetricItems';

export function DashboardMetrics() {
	return (
		<div>
			{/* This carousel is showing on mobile */}
			<Carousel className="md:hidden">
				<CarouselContent className="first:ml-0">
					{dashboardMetricItems.map((item) => (
						<CarouselItem
							className="basis-32 pl-2 first:pl-0"
							key={item.metric}
						>
							<div className="flex max-h-36 flex-col items-center justify-center gap-2 rounded-[0.625rem] bg-white-100 py-5">
								{item.icon}
								<div className="flex flex-col items-center justify-center">
									<strong className="font-bold text-black text-lg leading-7">
										{item.value}
									</strong>
									<span className="font-normal text-primary-200 text-sm leading-5">
										{item.metric}
									</span>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			{/* This div is showing on desktop */}
			<div className="hidden h-24 grid-cols-4 gap-7 bg-white-300 md:grid">
				{dashboardMetricItems.map((item) => (
					<div
						className="flex items-center justify-between gap-2 rounded-[0.625rem] bg-white-100 px-6 py-5"
						key={item.metric}
					>
						<div className="flex flex-col justify-center">
							<span className="font-normal text-primary-200 text-sm leading-5">
								{item.metric}
							</span>
							<strong className="font-bold text-black text-lg leading-7">
								{item.value}
							</strong>
						</div>
						{item.icon}
					</div>
				))}
			</div>
		</div>
	);
}
