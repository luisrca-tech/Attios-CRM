import type { Invoice } from '../types/invoice.type';

export const skeletonInvoicesData = ({
	pageSize
}: {
	pageSize: number;
}): Invoice[] => {
	return Array.from({ length: pageSize }).map((_, index) => ({
		id: index,
		number: '',
		date: new Date(),
		amount: 0,
		status: '',
		customerId: null,
		customer: null,
		createdAt: new Date(),
		updatedAt: new Date()
	}));
};
