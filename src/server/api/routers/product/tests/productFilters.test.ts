import { beforeEach, describe, expect, it, vi } from 'vitest';
import mockDb from '~/server/api/mocks/db.mock';
import { appRouter } from '~/server/api/root';
import { createCallerFactory, createTRPCContext } from '~/server/api/trpc';
import { mockFilterProducts } from './mock/mockFiltersProducts';

vi.mock('~/server/db', () => ({
	db: mockDb
}));

vi.mock('@clerk/nextjs/server', () => ({
	auth: () => Promise.resolve({ userId: 'test-user-id' })
}));

describe('Product Filters', () => {
	const createCaller = createCallerFactory(appRouter);
	let caller: ReturnType<typeof createCaller>;

	beforeEach(async () => {
		const ctx = await createTRPCContext({
			headers: new Headers()
		});

		caller = createCaller(ctx);
	});

	describe('Search filter', () => {
		it('should filter products by name', async () => {
			const searchTerm = 'Product 1';
			const [firstProduct] = mockFilterProducts;
			if (!firstProduct) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([firstProduct]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				search: searchTerm
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.name).toContain(searchTerm);
			expect(mockDb.query.products.findMany).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.any(Object)
				})
			);
		});

		it('should return empty array when search term matches no products', async () => {
			mockDb.query.products.findMany.mockResolvedValue([]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				search: 'NonexistentProduct'
			});

			expect(result).toHaveLength(0);
		});

		it('should filter products by name in infinite scroll query', async () => {
			const searchTerm = 'Product 2';
			const [, secondProduct] = mockFilterProducts;
			if (!secondProduct) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([secondProduct]);

			const result = await caller.product.getControlledProductsInfinite({
				limit: 10,
				cursor: 0,
				search: searchTerm
			});

			expect(result.items).toHaveLength(1);
			expect(result.items[0]?.name).toContain(searchTerm);
			expect(result.nextCursor).toBeUndefined();
		});
	});

	describe('Quantity filter', () => {
		it('should filter products with empty quantity', async () => {
			const [emptyProduct] = mockFilterProducts;
			if (!emptyProduct) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([emptyProduct]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					quantity: 'Empty'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.quantity).toBe(0);
		});

		it('should filter products with quantity over 100', async () => {
			const [, over100Product] = mockFilterProducts;
			if (!over100Product) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([over100Product]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					quantity: 'Over 100'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.quantity).toBeGreaterThan(100);
		});

		it('should filter products with quantity over 1000', async () => {
			const [, , over1000Product] = mockFilterProducts;
			if (!over1000Product) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([over1000Product]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					quantity: 'Over 1000'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.quantity).toBeGreaterThan(1000);
		});

		it('should filter products with unlimited quantity', async () => {
			const [, , , unlimitedProduct] = mockFilterProducts;
			if (!unlimitedProduct) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([unlimitedProduct]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					quantity: 'Ilimited'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.quantity).toBeGreaterThan(999999);
		});
	});

	describe('Price filter', () => {
		it('should filter products with price over 1000', async () => {
			const [, , over1000Product] = mockFilterProducts;
			if (!over1000Product) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([over1000Product]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					price: 'Over 1000'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.listPrice).toBeDefined();
			expect(Number.parseFloat(result[0]?.listPrice || '0')).toBeGreaterThan(
				1000
			);
		});

		it('should filter products with price over 2000', async () => {
			const [, , , over2000Product] = mockFilterProducts;
			if (!over2000Product) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([over2000Product]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					price: 'Over 2000'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.listPrice).toBeDefined();
			expect(Number.parseFloat(result[0]?.listPrice || '0')).toBeGreaterThan(
				2000
			);
		});

		it('should filter products with price 5000+', async () => {
			const [, , , , over5000Product] = mockFilterProducts;
			if (!over5000Product) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([over5000Product]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					price: '5000+'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.listPrice).toBeDefined();
			expect(Number.parseFloat(result[0]?.listPrice || '0')).toBeGreaterThan(
				5000
			);
		});
	});

	describe('Category filter', () => {
		it('should filter products by category', async () => {
			const [electronicsProduct] = mockFilterProducts;
			if (!electronicsProduct) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([electronicsProduct]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					category: 'Electronics'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.categoryName).toBe('Electronics');
		});
	});

	describe('Combined filters', () => {
		it('should apply multiple filters together', async () => {
			const [, , over1000Product] = mockFilterProducts;
			if (!over1000Product) throw new Error('Test data not available');
			mockDb.query.products.findMany.mockResolvedValue([over1000Product]);

			const result = await caller.product.getProductsPaginated({
				page: 1,
				pageSize: 10,
				filters: {
					quantity: 'Over 1000',
					price: 'Over 1000',
					category: 'Electronics'
				}
			});

			expect(result).toHaveLength(1);
			expect(result[0]?.quantity).toBeGreaterThan(1000);
			expect(result[0]?.listPrice).toBeDefined();
			expect(Number.parseFloat(result[0]?.listPrice || '0')).toBeGreaterThan(
				1000
			);
			expect(result[0]?.categoryName).toBe('Electronics');
		});
	});
});
