import { NewProductModal } from '~/features/products/components/NewProductModal';
import { Icon } from '../components/ui/Icons/_index';
import { NewLeadModal } from '~/features/leads/components/NewLeadModal';

interface AddActionItem {
	label: string;
	icon: React.ReactNode;
	isComingSoon?: boolean;
	renderModal?: () => React.ReactNode;
	mobileHref?: string;
	startsWith?: string;
}

export const addActionItems: AddActionItem[] = [
	{
		label: 'New Product',
		icon: (
			<Icon.Sidebar.Products
				className="h-[1.125rem] w-[1.125rem]"
				fill="#5E81F4"
			/>
		),
		isComingSoon: false,
		renderModal: () => <NewProductModal />,
		mobileHref: '/products/new',
		startsWith: '/products'
	},
	{
		label: 'New Project',
		icon: (
			<Icon.Sidebar.Projects
				className="h-[1.125rem] w-[1.125rem]"
				fill="#5E81F4"
			/>
		),
		isComingSoon: true,
		startsWith: '/projects'
	},
	{
		label: 'New Task',
		icon: (
			<Icon.Sidebar.Tasks
				className="h-[1.125rem] w-[1.125rem]"
				fill="#5E81F4"
			/>
		),
		isComingSoon: true,
		startsWith: '/tasks'
	},
	{
		label: 'New Lead',
		icon: (
			<Icon.Sidebar.Leads
				className="h-[1.125rem] w-[1.125rem]"
				fill="#5E81F4"
			/>
		),
		isComingSoon: false,
		renderModal: () => <NewLeadModal />,
		mobileHref: '/leads/new',
		startsWith: '/leads'
	},
	{
		label: 'New Event',
		icon: (
			<Icon.Sidebar.Calendar
				className="h-[1.125rem] w-[1.125rem]"
				fill="#5E81F4"
			/>
		),
		isComingSoon: true,
		startsWith: '/events'
	},
	{
		label: 'New Invoice',
		icon: (
			<Icon.Sidebar.Invoices
				className="h-[1.125rem] w-[1.125rem]"
				fill="#5E81F4"
			/>
		),
		isComingSoon: true,
		startsWith: '/invoices'
	}
];
