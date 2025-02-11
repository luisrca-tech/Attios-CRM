import { Icon } from '../components/ui/Icons/_index';

type Props = {
	label: string;
	icon: (fill: string) => React.ReactNode;
	isComingSoon?: boolean;
};

export const menuItems: Props[] = [
	{
		label: 'dashboard',
		icon: (fill: string) => (
			<Icon.Sidebar.Dashboard
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: false
	},
	{
		label: 'projects',
		icon: (fill: string) => (
			<Icon.Sidebar.Projects
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: false
	},
	{
		label: 'products',
		icon: (fill: string) => (
			<Icon.Sidebar.Products
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: false
	},
	{
		label: 'tasks',
		icon: (fill: string) => (
			<Icon.Sidebar.Tasks className="h-[1.375rem] w-[1.375rem]" fill={fill} />
		),
		isComingSoon: true
	},
	{
		label: 'kanban',
		icon: (fill: string) => (
			<Icon.Sidebar.Kanban className="h-[1.375rem] w-[1.375rem]" fill={fill} />
		),
		isComingSoon: true
	},
	{
		label: 'calendar',
		icon: (fill: string) => (
			<Icon.Sidebar.Calendar
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: true
	},
	{
		label: 'contacts',
		icon: (fill: string) => (
			<Icon.Sidebar.Contacts
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: true
	},
	{
		label: 'messages',
		icon: (fill: string) => (
			<Icon.Sidebar.Messages
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: true
	},
	{
		label: 'invoices',
		icon: (fill: string) => (
			<Icon.Sidebar.Invoices
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: true
	},
	{
		label: 'file-browser',
		icon: (fill: string) => (
			<Icon.Sidebar.FileBrowser
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: true
	},
	{
		label: 'notifications',
		icon: (fill: string) => (
			<Icon.Sidebar.Notifications
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: true
	},
	{
		label: 'reports',
		icon: (fill: string) => (
			<Icon.Sidebar.Reports className="h-[1.375rem] w-[1.375rem]" fill={fill} />
		),
		isComingSoon: true
	},
	{
		label: 'help-center',
		icon: (fill: string) => (
			<Icon.Sidebar.HelpCenter
				className="h-[1.375rem] w-[1.375rem]"
				fill={fill}
			/>
		),
		isComingSoon: true
	}
];
