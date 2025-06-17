import { Icon } from '~/common/components/ui/Icons/_index';

type LeadsOverview = {
	id: string;
	quantity: number;
	name: string;
	icon: React.ReactNode;
};

export const LeadsOverview: LeadsOverview[] = [
	{
		id: '1',
		quantity: 1.345,
		name: 'Employees',
		icon: (
			<Icon.Sidebar.Leads
				className="h-[1.375rem] w-[1.375rem]"
				fill="#5E81F4"
			/>
		)
	},
	{
		id: '2',
		quantity: 342,
		name: 'Partners',
		icon: <Icon.LeadsCheck className="h-[1.375rem] w-[1.375rem]" />
	},
	{
		id: '3',
		quantity: 3.908,
		name: 'Customers',
		icon: <Icon.LeadsWaiting className="h-[1.375rem] w-[1.375rem]" />
	}
];
