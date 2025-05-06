import { eq, sql, gte } from 'drizzle-orm';
import { products } from '~/server/db/schema';

export const applyQuantityFilter = (quantityFilter: string | undefined) => {
	if (!quantityFilter) return undefined;

	switch (quantityFilter) {
		case 'Empty':
			return eq(products.quantity, 0);
		case 'Over 100':
			return gte(products.quantity, 100);
		case 'Over 1000':
			return gte(products.quantity, 1000);
		case 'Ilimited':
			return gte(products.quantity, 999999);
		default:
			return undefined;
	}
};

export const applyPriceFilter = (priceFilter: string | undefined) => {
	if (!priceFilter) return undefined;

	switch (priceFilter) {
		case 'Over 1000':
			return gte(products.listPrice, sql`1000::decimal`);
		case 'Over 2000':
			return gte(products.listPrice, sql`2000::decimal`);
		case '5000+':
			return gte(products.listPrice, sql`5000::decimal`);
		default:
			return undefined;
	}
};
