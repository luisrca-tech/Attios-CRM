import { Icon } from '../components/ui/Icons';

type Props = {
	label: string;
	icon: React.ReactNode;
	isComingSoon?: boolean;
};

export const menuItems: Props[] = [
	{
		label: 'Dashboard',
		icon: <Icon.Sidebar.Dashboard className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: false
	},
	{
		label: 'Projects',
		icon: <Icon.Sidebar.Projects className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: false
	},
	{
		label: 'Tasks',
		icon: <Icon.Sidebar.Tasks className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Kanban',
		icon: <Icon.Sidebar.Kanban className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Calendar',
		icon: <Icon.Sidebar.Calendar className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Contacts',
		icon: <Icon.Sidebar.Contacts className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Messages',
		icon: <Icon.Sidebar.Messages className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Products',
		icon: <Icon.Sidebar.Products className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Invoices',
		icon: <Icon.Sidebar.Invoices className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'File Browser',
		icon: <Icon.Sidebar.FileBrowser className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Notifications',
		icon: <Icon.Sidebar.Notifications className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Reports',
		icon: <Icon.Sidebar.Reports className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'Help Center',
		icon: <Icon.Sidebar.HelpCenter className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	}
];
