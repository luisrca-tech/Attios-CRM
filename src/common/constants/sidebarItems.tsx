import { Icon } from "../components/ui/Icons";

type SidebarItem = {
	label: string;
	icon: React.ReactNode;
	isComingSoon?: boolean;
};

export const sidebarItems: SidebarItem[] = [
	{
		label: 'Dashboard',
		icon: <Icon.Sidebar.Dashboard />,
		isComingSoon: false
	},
	{
		label: 'Projects',
		icon: <Icon.Sidebar.Projects />,
		isComingSoon: false
	},
	{
		label: 'Tasks',
		icon: <Icon.Sidebar.Tasks />,
		isComingSoon: true
	},
	{
		label: 'Kanban',
		icon: <Icon.Sidebar.Kanban />,
		isComingSoon: true
	},
	{
		label: 'Calendar',
		icon: <Icon.Sidebar.Calendar />,
		isComingSoon: true
	},
	{
		label: 'Contacts',
		icon: <Icon.Sidebar.Contacts />,
		isComingSoon: true
	},
	{
		label: 'Messages',
		icon: <Icon.Sidebar.Messages />,
		isComingSoon: true
	},
	{
		label: 'Products',
		icon: <Icon.Sidebar.Products />,
		isComingSoon: true
	},
	{
		label: 'Invoices',
		icon: <Icon.Sidebar.Invoices />,
		isComingSoon: true
	},
	{
		label: 'File Browser',
		icon: <Icon.Sidebar.FileBrowser />,
		isComingSoon: true
	},
	{
		label: 'Notifications',
		icon: <Icon.Sidebar.Notifications />,
		isComingSoon: true
	},
	{
		label: 'Reports',
		icon: <Icon.Sidebar.Reports />,
		isComingSoon: true
	},
	{
		label: 'Help Center',
		icon: <Icon.Sidebar.HelpCenter />,
		isComingSoon: true
	}
];
