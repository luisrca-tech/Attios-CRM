import type { MockProduct } from '../types/mockProduct.type';

export const mockFilterProducts: MockProduct[] = [
	{
		id: 'PROD1',
		name: 'Test Product 1',
		brandId: 1,
		categoryId: 1,
		categoryName: 'Electronics',
		modelYear: 2024,
		quantity: 0, // Empty
		listPrice: '99.99',
		sku: null,
		currency: null,
		subcategory: null,
		description: null
	},
	{
		id: 'PROD2',
		name: 'Test Product 2',
		brandId: 1,
		categoryId: 2,
		categoryName: 'Clothing',
		modelYear: 2024,
		quantity: 150, // Over 100
		listPrice: '149.99',
		sku: null,
		currency: null,
		subcategory: null,
		description: null
	},
	{
		id: 'PROD3',
		name: 'Test Product 3',
		brandId: 1,
		categoryId: 1,
		categoryName: 'Electronics',
		modelYear: 2024,
		quantity: 1200, // Over 1000
		listPrice: '1200.00',
		sku: null,
		currency: null,
		subcategory: null,
		description: null
	},
	{
		id: 'PROD4',
		name: 'Test Product 4',
		brandId: 1,
		categoryId: 3,
		categoryName: 'Books',
		modelYear: 2024,
		quantity: 1000000, // Ilimited
		listPrice: '2500.00', // Over 2000
		sku: null,
		currency: null,
		subcategory: null,
		description: null
	},
	{
		id: 'PROD5',
		name: 'Test Product 5',
		brandId: 1,
		categoryId: 1,
		categoryName: 'Electronics',
		modelYear: 2024,
		quantity: 50,
		listPrice: '5500.00', // 5000+
		sku: null,
		currency: null,
		subcategory: null,
		description: null
	}
];
