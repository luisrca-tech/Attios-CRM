import type { SkeletonTable } from '~/common/types/skeletonTable.type';

export const skeletonLeadsData = ({ pageSize }: SkeletonTable) =>
	Array.from({ length: pageSize }, (_, index) => ({
		id: index,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		role: '',
		image: '/placeholder-avatar.png',
		status: '',
		convertedToCustomer: false,
		convertedToCustomerAt: null,
		createdAt: new Date(),
		updatedAt: new Date()
	}));
