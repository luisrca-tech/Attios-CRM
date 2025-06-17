import { desc } from 'drizzle-orm';

import { invoices } from '~/server/db/schema/invoices';

import { asc } from 'drizzle-orm';

export const getInvoiceOrderBy = (
	column: string,
	direction: 'asc' | 'desc'
) => {
	const sortMap = {
		customer:
			direction === 'asc'
				? asc(invoices.customerId)
				: desc(invoices.customerId),
		number: direction === 'asc' ? asc(invoices.number) : desc(invoices.number),
		date: direction === 'asc' ? asc(invoices.date) : desc(invoices.date),
		status: direction === 'asc' ? asc(invoices.status) : desc(invoices.status)
	};

	return sortMap[column as keyof typeof sortMap] ?? sortMap.number;
};
