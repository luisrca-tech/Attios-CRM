import Image from 'next/image';
import { mockedShippingPrice } from '../mocks/MockedShippingPrice';
import type { Order } from '../types/order.type';

export function DashboardListCard(order: Order) {
	const SHIPPING_PRICE = mockedShippingPrice;
	const firstItem = order.orderItems[0];
	const subtotal = order.orderItems.reduce(
		(acc, item) => acc + Number(item.listPrice) * item.quantity,
		0
	);
	const total = subtotal + SHIPPING_PRICE;

	return (
		<div className="flex h-[4.625rem] justify-between rounded-[0.625rem] bg-white-100 px-[0.875rem] md:hidden">
			<div className="flex items-center justify-center gap-4">
				<div className="h-[3.25rem] w-[3.25rem]">
					<Image
						src={firstItem?.productImage ?? ''}
						alt={firstItem?.product.name ?? ''}
						width={52}
						height={52}
						className="h-full w-full rounded-lg object-cover"
					/>
				</div>
				<div className="flex flex-col">
					<strong className="text-black text-sm leading-5">
						{firstItem?.product.name}
					</strong>
					<span className="font-normal text-black text-sm leading-5">
						{firstItem?.product.id}
					</span>
				</div>
			</div>
			<span className="pt-4 font-bold text-black text-sm leading-5">
				${total.toFixed(2)}
			</span>
		</div>
	);
}
