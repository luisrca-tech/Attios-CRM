import type { StatusType } from '../types/invoiceFilters.type';

export const statusOptions: { value: StatusType; label: string }[] = [
	{ value: 'All', label: 'All' },
	{ value: 'Draft', label: 'Draft' },
	{ value: 'Paid', label: 'Paid' },
	{ value: 'Unpaid', label: 'Unpaid' },
	{ value: 'Scheduled', label: 'Scheduled' }
];
