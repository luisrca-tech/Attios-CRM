import crypto from 'node:crypto';
import { Icon } from '~/common/components/ui/Icons';

type PopularProductCategory = {
	id: string;
	quantity: number;
	name: string;
	icon: React.ReactNode;
};

export const PopularProductCategories: PopularProductCategory[] = [
	{
		id: crypto.randomUUID(),
		quantity: 1.345,
		name: 'Eletronics',
		icon: <Icon.Laptop className="h-[1.375rem] w-[1.375rem]" />
	},
	{
		id: crypto.randomUUID(),
		quantity: 1.042,
		name: 'Accessories',
		icon: <Icon.Diamond className="h-[1.375rem] w-[1.375rem]" />
	},
	{
		id: crypto.randomUUID(),
		quantity: 980,
		name: 'Digital goods',
		icon: <Icon.Keyboard className="h-[1.375rem] w-[1.375rem]" />
	}
];
