import type { productImages } from '~/server/db/schema';

type BaseProductImage = typeof productImages.$inferSelect;
export type ProductImage = Pick<BaseProductImage, 'key' | 'url'>;
