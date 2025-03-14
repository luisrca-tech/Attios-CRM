import type { InferSelectModel } from "drizzle-orm";
import type { products } from "~/server/db/schema";

export type Product = InferSelectModel<typeof products> & {
	category?: { name: string };
	productImages?: { url: string }[];
};