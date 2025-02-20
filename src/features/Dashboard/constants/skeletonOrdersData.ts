interface SkeletonOrder {
	pageSize: number;
}

export const skeletonOrdersData = ({ pageSize }: SkeletonOrder) =>
	Array.from({ length: pageSize }, (_, index) => ({
		id: index,
		orderItems: [
			{
				id: 0,
				product: { id: '', name: '' },
				productImage: '',
				listPrice: '0',
				quantity: 0,
				orderId: 0,
				productId: '',
				discount: '0',
				createdAt: new Date(),
				updatedAt: new Date()
			}
		],
		customer: {
			id: 0,
			firstName: '',
			lastName: '',
			email: '',
			phone: null,
			street: null,
			city: null,
			state: null,
			zipCode: null,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		orderStatus: 'pending' as const,
		createdAt: new Date(),
		updatedAt: new Date(),
		customerId: 0,
		orderDate: new Date(),
		requiredDate: null,
		shippedDate: null,
		storeId: null,
		staffId: null,
		userId: ''
	}));
