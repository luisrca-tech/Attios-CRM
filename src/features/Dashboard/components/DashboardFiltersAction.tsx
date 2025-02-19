import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons/_index';

export function DashboardFiltersAction() {
	return (
		<div className="flex flex-col justify-between gap-[1.125rem] rounded-t-lg bg-white-300 md:flex-row md:items-center md:bg-white-100 lg:gap-0 lg:px-6 lg:pt-5 lg:pb-7">
			<strong className="text-black text-lg leading-7">Latest Sales</strong>
			<div className="flex items-center justify-between gap-2">
				<Button
					className="h-10 w-20 bg-transparent p-0 hover:bg-white-100 lg:w-16 lg:hover:border lg:hover:border-white-400 lg:hover:bg-transparent"
					color="secondary"
					variant="filled"
				>
					<span className="font-bold text-primary-200 text-sm leading-5 hover:text-black">
						Day
					</span>
				</Button>
				<Button
					className="h-10 w-20 bg-transparent p-0 hover:bg-white-100 lg:w-16 lg:hover:border lg:hover:border-white-400 lg:hover:bg-transparent"
					color="secondary"
					variant="filled"
				>
					<span className="font-bold text-primary-200 text-sm leading-5 hover:text-black">
						Week
					</span>
				</Button>
				<Button
					className="h-10 w-20 bg-transparent p-0 hover:bg-white-100 lg:w-16 lg:hover:border lg:hover:border-white-400 lg:hover:bg-transparent"
					color="secondary"
					variant="filled"
				>
					<span className="font-bold text-primary-200 text-sm leading-5 hover:text-black">
						Month
					</span>
				</Button>
				<Button className="h-10 w-10 p-0" color="secondary" variant="filled">
					<Icon.Sidebar.Calendar className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
