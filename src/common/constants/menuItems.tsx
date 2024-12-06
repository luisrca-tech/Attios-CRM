import { Icon } from '../components/ui/Icons/_index';

type Props = {
	label: string;
	icon: React.ReactNode;
	isComingSoon?: boolean;
};

export const menuItems: Props[] = [
	{
		label: 'dashboard',
		icon: <Icon.Sidebar.Dashboard className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: false
	},
	{
		label: 'projects',
		icon: <Icon.Sidebar.Projects className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: false
	},
	{
		label: 'products',
		icon: <Icon.Sidebar.Products className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: false
	},
	{
		label: 'tasks',
		icon: <Icon.Sidebar.Tasks className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'kanban',
		icon: <Icon.Sidebar.Kanban className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'calendar',
		icon: <Icon.Sidebar.Calendar className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'contacts',
		icon: <Icon.Sidebar.Contacts className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'messages',
		icon: <Icon.Sidebar.Messages className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'invoices',
		icon: <Icon.Sidebar.Invoices className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'file-browser',
		icon: <Icon.Sidebar.FileBrowser className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'notifications',
		icon: <Icon.Sidebar.Notifications className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'reports',
		icon: <Icon.Sidebar.Reports className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	},
	{
		label: 'help-center',
		icon: <Icon.Sidebar.HelpCenter className="h-[1.375rem] w-[1.375rem]" />,
		isComingSoon: true
	}
];
