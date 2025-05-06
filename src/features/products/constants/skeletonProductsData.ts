import type { SkeletonTable } from '~/common/types/skeletonTable.type';

export const skeletonProductsData = ({ pageSize }: SkeletonTable) =>
	Array.from({ length: pageSize }, (_, index) => ({
		id: `skeleton-${index}`,
		name: '',
		quantity: 0,
		sales: 0,
		listPrice: '',
		modelYear: 0,
		category: { name: '' },
		productImages: [{ url: '' }],
		brandId: 0,
		categoryId: 0,
		categoryName: '',
		sku: '',
		currency: '',
		subcategory: '',
		description: null,
		isActive: true
	}));
