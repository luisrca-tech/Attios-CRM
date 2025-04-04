import type { PriceFilter, QuantityFilter } from '../types/productFilters.type';
import { createParser } from 'nuqs';

export const quantityFilterParser = createParser<QuantityFilter | null>({
	parse: (value) => (value ? (value as QuantityFilter) : null),
	serialize: (value) => value ?? ''
});

export const priceFilterParser = createParser<PriceFilter | null>({
	parse: (value) => (value ? (value as PriceFilter) : null),
	serialize: (value) => value ?? ''
});
