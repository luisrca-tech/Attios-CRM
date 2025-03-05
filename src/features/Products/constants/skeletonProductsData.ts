interface SkeletonProduct {
	pageSize: number;
}

export const skeletonProductsData = ({ pageSize }: SkeletonProduct) =>
	Array.from({ length: pageSize }, (_, index) => ({
		id: `skeleton-${index}`,
		name: '',
		quantity: 0,
		listPrice: '',
		modelYear: 0,
		category: { name: '' },
		productImages: [{ url: '' }],
		brandId: 0,
		categoryId: 0,
		categoryName: '',
		sku: '',
		currency: '',
		subcategory: ''
	}));
