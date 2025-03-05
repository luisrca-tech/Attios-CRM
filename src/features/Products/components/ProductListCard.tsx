import type { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';
import type { products } from '~/server/db/schema';
import { Button } from '../../../common/components/ui/Button';
import { Icon } from '../../../common/components/ui/Icons/_index';

type Product = InferSelectModel<typeof products> & {
	category?: { name: string };
	productImages?: { url: string }[];
};

export function ProductListCard({
	productImages,
	name,
	modelYear,
	id
}: Product) {
	return (
		<div className="flex w-full items-center justify-between rounded-xl bg-white-100 px-[1.625rem] py-[0.6875rem] md:hidden lg:hidden">
			<div className="flex gap-4">
				<Image
					className="h-[3.25rem] w-[3.25rem] rounded-md"
					src={productImages?.[0]?.url ?? ''}
					alt={name}
					width={52}
					height={52}
				/>
				<div className="flex flex-col">
					<div className="flex items-center">
						<strong className="text-base leading-6">{name}</strong>
						<span className="font-bold text-base leading-6">{modelYear}</span>
					</div>
					<span className="text-primary-200 text-sm leading-5">{id}</span>
				</div>
			</div>
			<Button color="septenary" className="h-9 w-9 border border-white-200">
				<Icon.MoreActions />
			</Button>
		</div>
	);
}
