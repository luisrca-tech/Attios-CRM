import { Button } from './Button';
import { Icon } from './Icons/_index';

type PagesHeaderProps = {
	pageTitle: string;
};

export function PagesHeader({ pageTitle }: PagesHeaderProps) {
	return (
		<div className="border-white-200 border-b bg-white-100 p-[0.9375rem] lg:bg-white-300 lg:py-6">
			<div className="flex w-full items-center justify-between lg:hidden">
				<Button className="p-3 hover:bg-white-200/60" color="secondary">
					<Icon.Search className="h-4 w-4" />
				</Button>
				<strong>{pageTitle}</strong>
				<Button className="p-3 hover:bg-white-200/60" color="secondary">
					<Icon.AddButton className="h-4 w-4" />
				</Button>
			</div>
			<div className="hidden lg:flex lg:w-full lg:items-center lg:justify-between">
				<div className="flex items-center gap-5">
					<Icon.Sidebar.Products className="h-4 w-4" />
					<strong className="text-xl leading-8">{pageTitle}</strong>
				</div>
				<div className="flex gap-[0.375rem]">
					<Button
						className="bg-white-500 p-3 hover:bg-white-200"
						color="secondary"
					>
						<Icon.Search className="h-4 w-4" />
					</Button>
					<Button
						className="bg-white-500 p-3 hover:bg-white-300"
						color="secondary"
					>
						<Icon.AddButton className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
