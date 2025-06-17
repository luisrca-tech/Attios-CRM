import { Icon } from '~/common/components/ui/Icons/_index';

interface ProductActionsItems {
	icon: (fill: string) => React.ReactNode;
	text: string;
	label: string;
	isDisabled?: boolean;
}

export const productActionItems: ProductActionsItems[] = [
	{
		icon: (fill: string) => (
			<Icon.Shop className="h-[1.375rem] w-[1.375rem]" fill={fill} />
		),
		text: 'General Information',
		label: 'Profile foto, name & language'
	},
	{
		icon: (fill: string) => (
			<Icon.Shipping className="h-[1.375rem] w-[1.375rem]" fill={fill} />
		),
		text: 'Shipping Rates',
		label: 'Setup shpping options',
		isDisabled: true
	},
	{
		icon: (fill: string) => (
			<Icon.Megaphone className="h-[1.375rem] w-[1.375rem]" fill={fill} />
		),
		text: 'Discount Codes',
		label: 'Setup sales and promo codes',
		isDisabled: true
	},
	{
		icon: (fill: string) => (
			<Icon.Bell className="h-[1.375rem] w-[1.375rem]" fill={fill} />
		),
		text: 'Notifications',
		label: 'Set your email notifications',
		isDisabled: true
	}
];
