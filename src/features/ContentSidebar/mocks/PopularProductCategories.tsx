import { Icon } from '~/common/components/ui/Icons/_index';

type PopularProductCategory = {
	id: string;
	quantity: number;
	name: string;
	icon: React.ReactNode;
};

export const PopularProductCategories: PopularProductCategory[] = [
	{
		id: '1',
		quantity: 1.345,
		name: 'Eletronics',
		icon: <Icon.Laptop className="h-[1.375rem] w-[1.375rem]" />
	},
	{
		id: '2',
		quantity: 1.042,
		name: 'Accessories',
		icon: <Icon.Diamond className="h-[1.375rem] w-[1.375rem]" />
	},
	{
		id: '3',
		quantity: 980,
		name: 'Digital goods',
		icon: <Icon.Keyboard className="h-[1.375rem] w-[1.375rem]" />
	}
];
